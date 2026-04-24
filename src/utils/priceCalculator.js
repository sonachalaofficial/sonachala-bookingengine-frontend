/**
 * Price Calculator - Unified Pricing Utility
 * 
 * This file serves as the main entry point for all pricing calculations.
 * It re-exports from bookingUtils.js for consistency across the application.
 * 
 * USAGE:
 * import { calculateRoomPrice, fetchAdminCharges, DEFAULT_ADMIN_CHARGES } from '../../utils/priceCalculator';
 * 
 * PRICING LOGIC (from bookingUtils.js):
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
 */

// Import from bookingUtils.js to use in this module
import {
  safeParseNumber,
  roundToTwo,
  fetchAdminCharges,
  calculateNights as calculateNightsUtil,
  calculateRoomPriceBreakdown,
  calculateTotalBookingPrice,
  formatPrice,
  generateConfirmationId,
  validateBookingData,
  createBookingObject,
  DEFAULT_ADMIN_CHARGES
} from './bookingUtils';

// Re-export everything from bookingUtils.js
export {
  safeParseNumber,
  roundToTwo,
  fetchAdminCharges,
  calculateNightsUtil as calculateNights,
  calculateRoomPriceBreakdown,
  calculateTotalBookingPrice,
  formatPrice,
  generateConfirmationId,
  validateBookingData,
  createBookingObject,
  DEFAULT_ADMIN_CHARGES
};

/**
 * Calculate room price with a simplified return structure
 * This is a convenience wrapper around calculateRoomPriceBreakdown
 * 
 * @param {Object} roomDetails - Room details with pricing fields
 * @param {number} nights - Number of nights
 * @param {number} adults - Number of adults
 * @param {number} children - Number of children  
 * @param {number} roomsCount - Number of rooms
 * @param {Object} adminCharges - Admin charges object
 * @returns {Object} - Simplified price breakdown with total
 */
export const calculateRoomPrice = (roomDetails, nights, adults = 1, children = 0, roomsCount = 1, adminCharges = null) => {
  // Use default admin charges if not provided
  const charges = adminCharges || {
    gstPercentage: 12,
    taxPercentage: 4,
    commissionPercentage: 10
  };
  
  const breakdown = calculateRoomPriceBreakdown(roomDetails, nights, adults, children, roomsCount, charges);
  
  return {
    // Main total
    total: breakdown.grandTotal,
    
    // Price breakdown
    baseRoomAmount: breakdown.baseRoomAmount,
    extraGuestTotal: breakdown.extraGuestTotal,
    roomSubtotal: breakdown.roomSubtotal,
    discountAmount: breakdown.discountAmount,
    amountAfterDiscount: breakdown.amountAfterDiscount,
    
    // Taxes and fees
    gstAmount: breakdown.gstAmount,
    taxAmount: breakdown.taxAmount,
    platformFee: breakdown.platformFee,
    
    // Percentage info
    gstPercentage: breakdown.gstPercentage,
    taxPercentage: breakdown.taxPercentage,
    commissionPercentage: breakdown.commissionPercentage,
    
    // Guest info
    extraGuests: breakdown.extraGuests,
    extraAdults: breakdown.extraAdults,
    extraChildren: breakdown.extraChildren,
    
    // Full breakdown for detailed view
    breakdown
  };
};

/**
 * Calculate total price for property card display (simplified)
 * Used in listing pages for quick price display
 * 
 * @param {Object} roomDetails - Room details
 * @param {number} nights - Number of nights
 * @param {number} adults - Number of adults
 * @param {number} children - Number of children
 * @param {number} roomsCount - Number of rooms
 * @returns {number} - Total price
 */
export const calculateTotalPrice = (roomDetails, nights, adults = 1, children = 0, roomsCount = 1) => {
  const result = calculateRoomPrice(roomDetails, nights, adults, children, roomsCount);
  return result.total;
};

export default {
  calculateRoomPrice,
  calculateTotalPrice,
  calculateNights: calculateNightsUtil,
  fetchAdminCharges,
  DEFAULT_ADMIN_CHARGES
};
