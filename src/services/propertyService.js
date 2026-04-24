/**
 * Property Service
 * Handles property-related Firebase operations
 * Including fetching payment details for UPI
 */

import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../core/firebase/config.user';

/**
 * Get property payment details by property ID
 * @param {string} propertyId - The property ID
 * @returns {Promise<Object|null>}
 */
export const getPropertyPaymentDetails = async (propertyId) => {
  try {
    // Try Hotels collection first
    const hotelRef = doc(db, 'Hotels', propertyId);
    const hotelDoc = await getDoc(hotelRef);
    
    if (hotelDoc.exists()) {
      const data = hotelDoc.data();
      return {
        propertyId,
        propertyName: data['Property Name'] || data.name || 'Property',
        propertyType: 'Hotel',
        paymentDetails: data.paymentDetails || null,
        upiId: data.paymentDetails?.upiId || data.upiId || null,
        accountHolderName: data.paymentDetails?.accountHolderName || data.accountHolderName || null,
        upiEnabled: data.paymentDetails?.upiEnabled ?? data.upiEnabled ?? true,
      };
    }
    
    // Try Homestays collection
    const homestayRef = doc(db, 'Homestays', propertyId);
    const homestayDoc = await getDoc(homestayRef);
    
    if (homestayDoc.exists()) {
      const data = homestayDoc.data();
      return {
        propertyId,
        propertyName: data['Property Name'] || data.name || 'Property',
        propertyType: 'Homestay',
        paymentDetails: data.paymentDetails || null,
        upiId: data.paymentDetails?.upiId || data.upiId || null,
        accountHolderName: data.paymentDetails?.accountHolderName || data.accountHolderName || null,
        upiEnabled: data.paymentDetails?.upiEnabled ?? data.upiEnabled ?? true,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching property payment details:', error);
    return null;
  }
};

/**
 * Generate UPI payment URL
 * @param {Object} params - UPI parameters
 * @returns {string} - UPI payment URL
 */
export const generateUpiUrl = ({ upiId, accountHolderName, amount, transactionNote = '' }) => {
  if (!upiId) return null;
  
  const params = new URLSearchParams({
    pa: upiId, // Payee Address (UPI ID)
    pn: accountHolderName || 'Property Payment', // Payee Name
    am: amount.toFixed(2), // Amount
    cu: 'INR', // Currency
  });
  
  if (transactionNote) {
    params.append('tn', transactionNote);
  }
  
  return `upi://pay?${params.toString()}`;
};

/**
 * Generate UPI QR data
 * @param {Object} params - UPI parameters
 * @returns {string} - UPI payment string for QR code
 */
export const generateUpiQrData = ({ upiId, accountHolderName, amount, propertyName = '' }) => {
  if (!upiId) return null;
  
  const transactionNote = propertyName 
    ? `Payment for ${propertyName}` 
    : 'Hotel Booking Payment';
  
  return generateUpiUrl({
    upiId,
    accountHolderName,
    amount,
    transactionNote,
  });
};

/**
 * Check if UPI payment is enabled for a property
 * @param {string} propertyId - The property ID
 * @returns {Promise<boolean>}
 */
export const isUpiPaymentEnabled = async (propertyId) => {
  try {
    const paymentDetails = await getPropertyPaymentDetails(propertyId);
    return paymentDetails?.upiEnabled && !!paymentDetails?.upiId;
  } catch (error) {
    console.error('Error checking UPI payment status:', error);
    return false;
  }
};

/**
 * Get property details by ID
 * @param {string} propertyId - The property ID
 * @returns {Promise<Object|null>}
 */
export const getPropertyById = async (propertyId) => {
  try {
    // Try Hotels collection first
    const hotelRef = doc(db, 'Hotels', propertyId);
    const hotelDoc = await getDoc(hotelRef);
    
    if (hotelDoc.exists()) {
      return {
        id: hotelDoc.id,
        ...hotelDoc.data(),
        type: 'Hotel',
      };
    }
    
    // Try Homestays collection
    const homestayRef = doc(db, 'Homestays', propertyId);
    const homestayDoc = await getDoc(homestayRef);
    
    if (homestayDoc.exists()) {
      return {
        id: homestayDoc.id,
        ...homestayDoc.data(),
        type: 'Homestay',
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};

export default {
  getPropertyPaymentDetails,
  generateUpiUrl,
  generateUpiQrData,
  isUpiPaymentEnabled,
  getPropertyById,
};