/**
 * Booking Utility Functions
 * Centralized price calculations to ensure consistency and prevent NaN errors
 * 
 * PRICING LOGIC:
 * 1. Room Price is PER NIGHT for MAX GUESTS only
 * 2. Extra guests = Selected Guests - Max Guests (per room)
 * 3. Discount is applied on Room Subtotal BEFORE taxes
 * 4. GST, Tax, Platform Fee are applied AFTER discount
 * 5. All calculations round to 2 decimal places
 */

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Default admin charges (used if settings not found)
const DEFAULT_ADMIN_CHARGES = {
  gstPercentage: 12,
  taxPercentage: 4,
  commissionPercentage: 10
};

/**
 * Safely parse a number with default value
 * @param {any} value - The value to parse
 * @param {number} defaultValue - Default value if parsing fails
 * @returns {number} - Parsed number or default
 */
export const safeParseNumber = (value, defaultValue = 0) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Round a number to 2 decimal places
 * @param {number} value - The value to round
 * @returns {number} - Rounded value
 */
export const roundToTwo = (value) => {
  return Math.round(value * 100) / 100;
};

/**
 * Fetch admin charges from Firestore
 * Admin charges are stored in 'PlatformSettings/adminCharges' document
 * @returns {Promise<Object>} - Admin charges { gstPercentage, taxPercentage, commissionPercentage }
 */
export const fetchAdminCharges = async () => {
  try {
    const settingsRef = doc(db, 'PlatformSettings', 'adminCharges');
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      return {
        gstPercentage: safeParseNumber(data.gstPercentage, DEFAULT_ADMIN_CHARGES.gstPercentage),
        taxPercentage: safeParseNumber(data.taxPercentage, DEFAULT_ADMIN_CHARGES.taxPercentage),
        commissionPercentage: safeParseNumber(data.commissionPercentage, DEFAULT_ADMIN_CHARGES.commissionPercentage)
      };
    }
    
    // Return defaults if document doesn't exist
    return DEFAULT_ADMIN_CHARGES;
  } catch (error) {
    console.error('Error fetching admin charges:', error);
    return DEFAULT_ADMIN_CHARGES;
  }
};

/**
 * Calculate total nights between two dates
 * @param {string} checkIn - Check-in date string (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date string (YYYY-MM-DD)
 * @returns {number} - Number of nights (minimum 1)
 */
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;
  
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  return Math.max(1, Math.ceil(diffDays));
};

/**
 * =====================================================
 * MAIN PRICING CALCULATION FUNCTION
 * =====================================================
 * 
 * This is the SINGLE SOURCE OF TRUTH for all pricing calculations.
 * Used by: CreatePlan, Stay, HotelDetailsNew, Reservation, PaymentPage
 * 
 * PRICING LOGIC:
 * 1. Room Price = Per Night for Max Guests (defined in admin)
 * 2. Extra Guests = Selected Guests - Max Guests (if any)
 * 3. Extra Amount = Extra Guests × Extra Person Price × Nights
 * 4. Room Subtotal = Base Room Price + Extra Amount
 * 5. Discount = Room Subtotal × (Discount % / 100)
 * 6. Amount After Discount = Room Subtotal - Discount
 * 7. GST = Amount After Discount × (GST % / 100)
 * 8. Tax = Amount After Discount × (Tax % / 100)
 * 9. Platform Fee = Amount After Discount × (Commission % / 100)
 * 10. Final Total = Amount After Discount + GST + Tax + Platform Fee
 * 
 * @param {Object} room - Room details with fields:
 *   - roomPrice (or price): Base price per night
 *   - maxGuestAllowed (or maxGuests): Max guests included in base price
 *   - perAdultPrice: Extra adult price per night
 *   - perChildPrice: Extra child price per night
 *   - discount (or discountValue): Discount percentage
 * @param {number} nights - Number of nights
 * @param {number} totalAdults - Total number of adults
 * @param {number} totalChildren - Total number of children
 * @param {number} roomsCount - Number of rooms
 * @param {Object} adminCharges - Admin charges { gstPercentage, taxPercentage, commissionPercentage }
 * @returns {Object} - Complete price breakdown
 */
export const calculateRoomPriceBreakdown = (room, nights, totalAdults = 1, totalChildren = 0, roomsCount = 1, adminCharges = DEFAULT_ADMIN_CHARGES) => {
  // Safely parse all values
  const roomPrice = safeParseNumber(room?.roomPrice || room?.price);
  const maxGuestAllowed = safeParseNumber(room?.maxGuestAllowed || room?.maxGuests || room?.maxguestAllowed, 2); // Default 2 if not set
  const extraAdultPrice = safeParseNumber(room?.perAdultPrice);
  const perChildPrice = safeParseNumber(room?.perChildPrice);
  const discountPercent = safeParseNumber(room?.discount || room?.discountValue);
  
  const nightsCount = Math.max(1, safeParseNumber(nights, 1));
  const adultsCount = Math.max(0, safeParseNumber(totalAdults, 1));
  const childrenCount = Math.max(0, safeParseNumber(totalChildren, 0));
  const roomsCountNum = Math.max(1, safeParseNumber(roomsCount, 1));
  
  // ✅ STEP 1: Calculate Base Room Amount (Per Night × Nights × Rooms)
  const baseRoomAmount = roundToTwo(roomPrice * nightsCount * roomsCountNum);
  
  // ✅ STEP 2: Calculate Extra Guest Charges
  // Max guests allowed per room (from admin settings)
  const totalAllowedGuests = maxGuestAllowed * roomsCountNum;
  const totalGuests = adultsCount + childrenCount;
  
  // Extra guests = Total guests - Allowed guests
  const extraGuests = Math.max(0, totalGuests - totalAllowedGuests);
  
  // Separate extra adults and children for pricing
  // First, count how many are covered by maxGuestAllowed
  const coveredAdults = Math.min(adultsCount, maxGuestAllowed * roomsCountNum);
  const coveredChildren = Math.min(childrenCount, maxGuestAllowed * roomsCountNum - coveredAdults);
  
  // Extra adults and children
  const extraAdults = Math.max(0, adultsCount - coveredAdults);
  const extraChildren = Math.max(0, childrenCount - coveredChildren);
  
  // Extra guest charges (per night × nights)
  const extraAdultTotal = roundToTwo(extraAdults * extraAdultPrice * nightsCount);
  const extraChildTotal = roundToTwo(extraChildren * perChildPrice * nightsCount);
  const extraGuestTotal = roundToTwo(extraAdultTotal + extraChildTotal);
  
  // ✅ STEP 3: Calculate Room Subtotal (Before Discount)
  const roomSubtotal = roundToTwo(baseRoomAmount + extraGuestTotal);
  
  // ✅ STEP 4: Calculate Discount (on Room Subtotal)
  const discountAmount = roundToTwo(roomSubtotal * (discountPercent / 100));
  const amountAfterDiscount = roundToTwo(Math.max(0, roomSubtotal - discountAmount));
  
  // ✅ STEP 5: Calculate Taxes and Platform Fee (on Amount After Discount)
  const { gstPercentage, taxPercentage, commissionPercentage } = adminCharges;
  
  const gstAmount = roundToTwo((amountAfterDiscount * gstPercentage) / 100);
  const taxAmount = roundToTwo((amountAfterDiscount * taxPercentage) / 100);
  const platformFee = roundToTwo((amountAfterDiscount * commissionPercentage) / 100);
  
  // ✅ STEP 6: Calculate Final Grand Total
  const grandTotal = roundToTwo(amountAfterDiscount + gstAmount + taxAmount + platformFee);
  
  return {
    // Base room info
    roomPrice,
    maxGuestAllowed,
    nights: nightsCount,
    rooms: roomsCountNum,
    
    // Guest breakdown
    totalGuests,
    totalAllowedGuests,
    extraGuests,
    extraAdults,
    extraChildren,
    extraAdultPrice,
    perChildPrice,
    
    // Price components (all rounded to 2 decimals)
    baseRoomAmount,          // Room price × nights × rooms
    extraAdultTotal,         // Extra adults × price × nights
    extraChildTotal,         // Extra children × price × nights
    extraGuestTotal,         // Total extra guest charges
    roomSubtotal,            // Base + Extra (before discount)
    discountPercent,
    discountAmount,
    amountAfterDiscount,     // After discount
    
    // Admin charges
    gstPercentage,
    taxPercentage,
    commissionPercentage,
    gstAmount,
    taxAmount,
    platformFee,
    
    // Final total
    grandTotal,
    
    // Guest info
    adults: adultsCount,
    children: childrenCount
  };
};

/**
 * Calculate total booking price for multiple rooms
 * Uses the centralized calculateRoomPriceBreakdown function
 * 
 * @param {Array} rooms - Array of room booking details with:
 *   - nights: Number of nights
 *   - adults: Number of adults
 *   - children: Number of children
 *   - roomsCount (or rooms): Number of rooms
 *   - Room pricing fields (roomPrice, maxGuestAllowed, etc.)
 * @param {Object} adminCharges - Admin charges { gstPercentage, taxPercentage, commissionPercentage }
 * @returns {Object} - Total price breakdown with aggregated totals
 */
export const calculateTotalBookingPrice = (rooms, adminCharges = DEFAULT_ADMIN_CHARGES) => {
  if (!Array.isArray(rooms) || rooms.length === 0) {
    return {
      totalBaseRoomAmount: 0,
      totalExtraGuestCharges: 0,
      totalDiscount: 0,
      roomSubtotal: 0,
      amountAfterDiscount: 0,
      totalGst: 0,
      totalTax: 0,
      totalPlatformFee: 0,
      grandTotal: 0,
      breakdown: [],
      adminCharges
    };
  }
  
  // Calculate breakdown for each room
  const breakdown = rooms.map(room => {
    const priceBreakdown = calculateRoomPriceBreakdown(
      room,
      room.nights || 1,
      room.adults || 1,
      room.children || 0,
      room.roomsCount || room.rooms || 1,
      adminCharges
    );
    
    return {
      ...room,
      priceBreakdown
    };
  });
  
  // Aggregate totals (all rounded to 2 decimals)
  const totalBaseRoomAmount = roundToTwo(
    breakdown.reduce((sum, r) => sum + (r.priceBreakdown.baseRoomAmount || 0), 0)
  );
  const totalExtraGuestCharges = roundToTwo(
    breakdown.reduce((sum, r) => sum + (r.priceBreakdown.extraGuestTotal || 0), 0)
  );
  const totalDiscount = roundToTwo(
    breakdown.reduce((sum, r) => sum + (r.priceBreakdown.discountAmount || 0), 0)
  );
  
  const roomSubtotal = roundToTwo(totalBaseRoomAmount + totalExtraGuestCharges);
  const amountAfterDiscount = roundToTwo(roomSubtotal - totalDiscount);
  
  // Admin charges totals
  const totalGst = roundToTwo(
    breakdown.reduce((sum, r) => sum + (r.priceBreakdown.gstAmount || 0), 0)
  );
  const totalTax = roundToTwo(
    breakdown.reduce((sum, r) => sum + (r.priceBreakdown.taxAmount || 0), 0)
  );
  const totalPlatformFee = roundToTwo(
    breakdown.reduce((sum, r) => sum + (r.priceBreakdown.platformFee || 0), 0)
  );
  
  // Grand total
  const grandTotal = roundToTwo(amountAfterDiscount + totalGst + totalTax + totalPlatformFee);
  
  return {
    totalBaseRoomAmount,
    totalExtraGuestCharges,
    totalDiscount,
    roomSubtotal,
    amountAfterDiscount,
    totalGst,
    totalTax,
    totalPlatformFee,
    grandTotal,
    breakdown,
    adminCharges
  };
};

/**
 * Format price for display
 * @param {number} price - Price to format
 * @param {string} currency - Currency symbol
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = '₹') => {
  const numPrice = safeParseNumber(price, 0);
  return `${currency}${numPrice.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

/**
 * Generate booking confirmation ID
 * @returns {string} - Confirmation ID
 */
export const generateConfirmationId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CONF-${timestamp}-${random}`;
};

/**
 * Validate booking data
 * @param {Object} bookingData - Booking data to validate
 * @returns {Object} - Validation result { isValid, errors }
 */
export const validateBookingData = (bookingData) => {
  const errors = [];
  
  if (!bookingData) {
    errors.push('Booking data is required');
    return { isValid: false, errors };
  }
  
  if (!bookingData.checkIn || !bookingData.checkOut) {
    errors.push('Check-in and check-out dates are required');
  }
  
  if (!bookingData.propertyId) {
    errors.push('Property ID is required');
  }
  
  if (!bookingData.rooms || bookingData.rooms.length === 0) {
    errors.push('At least one room must be selected');
  }
  
  if (!bookingData.guestName) {
    errors.push('Guest name is required');
  }
  
  if (!bookingData.guestEmail) {
    errors.push('Guest email is required');
  }
  
  if (!bookingData.guestPhone) {
    errors.push('Guest phone is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Create booking object for Firestore
 * @param {Object} params - Booking parameters
 * @param {Object} adminCharges - Admin charges (optional)
 * @returns {Object} - Booking object ready for Firestore
 */
export const createBookingObject = (params, adminCharges = DEFAULT_ADMIN_CHARGES) => {
  const {
    propertyId,
    propertyName,
    propertyAddress,
    propertyImages,
    rooms,
    guestName,
    guestEmail,
    guestPhone,
    checkIn,
    checkOut,
    userId,
    paymentMethod = 'pending',
    status = 'Booked'
  } = params;
  
  const priceDetails = calculateTotalBookingPrice(rooms, adminCharges);
  
  return {
    propertyId,
    propertyName,
    propertyAddress,
    propertyImages: propertyImages || [],
    
    'Full Name': guestName,
    'Email Address': guestEmail,
    'Phone Number': guestPhone,
    
    Rooms: rooms.map(room => ({
      roomId: room.id || room.roomId,
      roomType: room.roomType,
      adults: room.adults || 0,
      children: room.children || 0,
      price: room.price || room.totalPrice,
      nights: room.nights || 1
    })),
    
    'Check-In Date': new Date(checkIn),
    'Check-Out Date': new Date(checkOut),
    'Total Nights': calculateNights(checkIn, checkOut),
    'Total Adults': rooms.reduce((sum, r) => sum + (r.adults || 0), 0),
    'Total Children': rooms.reduce((sum, r) => sum + (r.children || 0), 0),
    
    // Price breakdown (using new field names)
    'Base Price': priceDetails.totalBaseRoomAmount,
    'Extra Guest Charges': priceDetails.totalExtraGuestCharges,
    'Subtotal': priceDetails.roomSubtotal,
    'Discount Amount': priceDetails.totalDiscount,
    'Subtotal After Discount': priceDetails.amountAfterDiscount,
    
    // Admin charges
    'GST Amount': priceDetails.totalGst,
    'Tax Amount': priceDetails.totalTax,
    'Platform Fee': priceDetails.totalPlatformFee,
    
    // Admin percentages (for reference)
    'GST Percentage': adminCharges.gstPercentage,
    'Tax Percentage': adminCharges.taxPercentage,
    'Commission Percentage': adminCharges.commissionPercentage,
    
    'Total Price': priceDetails.grandTotal,
    
    'Payment Method': paymentMethod,
    'Payment Status': paymentMethod === 'Check-In Pay' ? 'Pending' : 'Paid',
    Status: status,
    
    userId,
    confirmationId: generateConfirmationId(),
    createdAt: new Date()
  };
};

// Export default admin charges for use in other files
export { DEFAULT_ADMIN_CHARGES };
