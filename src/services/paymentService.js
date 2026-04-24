/**
 * Payment Service
 * Handles all payment-related Firebase operations
 * 
 * NEW FLOW:
 * 1. User scans QR and pays via UPI
 * 2. User enters Transaction ID
 * 3. User clicks Confirm Booking
 * 4. Payment document created in "payments" collection
 * 
 * Payment record is created ONLY AFTER transaction ID submission
 * NO screenshot upload required
 * 
 * Payment Document Structure:
 * - paymentId (auto)
 * - bookingId
 * - guestId (userId)
 * - guestName
 * - guestEmail
 * - phone
 * - checkIn
 * - checkOut
 * - roomDetails
 * - totalAmount
 * - transactionId
 * - paymentMethod: "UPI"
 * - paymentStatus: "pending" | "approved" | "rejected"
 * - bookingStatus: "Pending Payment" | "Confirmed" | "Payment Rejected"
 * - createdAt
 * - updatedAt
 */

import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../core/firebase/config.user';

/**
 * Submit payment with Transaction ID
 * Creates payment document in "payments" collection
 * 
 * @param {Object} paymentData - Booking/payment data
 * @returns {Promise<Object>} - { success: boolean, paymentId?: string, error?: string }
 */
export const submitPayment = async (paymentData) => {
  console.log('='.repeat(50));
  console.log('🚀 STARTING PAYMENT SUBMISSION');
  console.log('='.repeat(50));
  console.log('📌 Booking ID:', paymentData?.bookingId);
  console.log('📝 Transaction ID:', paymentData?.transactionId);

  try {
    // Step 1: Validate transaction ID
    console.log('\n--- STEP 1: Validating Transaction ID ---');
    if (!paymentData.transactionId || paymentData.transactionId.trim() === '') {
      console.error('❌ Transaction ID is required');
      return { success: false, error: 'Transaction ID is required' };
    }
    console.log('✅ Transaction ID validated');

    // Step 2: Check authentication
    console.log('\n--- STEP 2: Checking authentication ---');
    const user = auth.currentUser;
    console.log('🔐 Current user:', user?.uid);
    
    if (!user) {
      console.error('❌ User not authenticated');
      return { success: false, error: 'User not authenticated. Please log in again.' };
    }
    console.log('✅ User is authenticated');

    // Step 3: Create payment document in Firestore "payments" collection
    console.log('\n--- STEP 3: Creating payment document in Firestore ---');
    
    const paymentRecord = {
      // Booking identification
      bookingId: paymentData.bookingId || '',
      
      // Guest information
      guestId: user.uid,
      guestName: paymentData.guestName || '',
      guestEmail: paymentData.guestEmail || '',
      phone: paymentData.phone || '',
      
      // Booking details
      checkIn: paymentData.checkIn || '',
      checkOut: paymentData.checkOut || '',
      roomDetails: paymentData.roomDetails || null,
      
      // Payment information
      totalAmount: paymentData.totalAmount || 0,
      transactionId: paymentData.transactionId.trim(),
      paymentMethod: 'UPI',
      
      // Status fields (SINGLE SOURCE OF TRUTH)
      paymentStatus: 'pending',
      bookingStatus: 'Pending Payment',
      
      // Property information
      propertyName: paymentData.propertyName || '',
      propertyId: paymentData.propertyId || '',
      
      // Timestamps
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      
      // User reference
      userId: user.uid
    };

    console.log('📤 Payment record:', paymentRecord);

    const paymentsCollection = collection(db, 'payments');
    const docRef = await addDoc(paymentsCollection, paymentRecord);
    
    console.log('✅ Payment document created with ID:', docRef.id);

    console.log('\n' + '='.repeat(50));
    console.log('✅ PAYMENT SUBMISSION COMPLETE');
    console.log('='.repeat(50));

    return { 
      success: true, 
      paymentId: docRef.id,
      message: 'Booking submitted successfully! Waiting for admin verification.'
    };

  } catch (error) {
    console.error('\n' + '='.repeat(50));
    console.error('❌ PAYMENT SUBMISSION FAILED');
    console.error('='.repeat(50));
    console.error('❌ Error:', error);
    console.error('❌ Error code:', error?.code);
    console.error('❌ Error message:', error?.message);
    
    let errorMessage = 'Failed to submit payment. Please try again.';
    
    if (error?.code === 'permission-denied') {
      errorMessage = 'Permission denied. Cannot create payment record.';
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Get payment status by booking ID
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object|null>}
 */
export const getPaymentStatus = async (bookingId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    // Check if payment exists in payments collection
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, where('bookingId', '==', bookingId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting payment status:', error);
    return null;
  }
};

/**
 * Check if user can submit payment
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object>}
 */
export const canSubmitPayment = async (bookingId) => {
  try {
    const payment = await getPaymentStatus(bookingId);
    
    if (!payment) {
      // No payment record exists, allow submission
      return { canSubmit: true, reason: null };
    }

    const status = payment.paymentStatus?.toLowerCase();
    
    if (status === 'pending') {
      return { canSubmit: false, reason: 'Payment is under verification. Please wait for admin approval.' };
    }

    if (status === 'approved') {
      return { canSubmit: false, reason: 'Payment already confirmed. Your booking is confirmed!' };
    }

    if (status === 'rejected') {
      return { canSubmit: true, reason: null };
    }

    return { canSubmit: true, reason: null };
  } catch (error) {
    console.error('Error checking payment status:', error);
    return { canSubmit: true, reason: null };
  }
};

/**
 * Subscribe to payment status changes (real-time)
 * @param {string} bookingId - The booking ID
 * @param {Function} callback - Callback function
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToPaymentStatus = (bookingId, callback) => {
  const user = auth.currentUser;
  if (!user) {
    callback(null);
    return () => {};
  }

  // Import onSnapshot dynamically
  return import('firebase/firestore').then(({ onSnapshot }) => {
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, where('bookingId', '==', bookingId));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        callback({
          id: doc.id,
          ...doc.data()
        });
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Error subscribing to payment status:', error);
      callback(null);
    });

    return unsubscribe;
  }).catch((error) => {
    console.error('Error setting up subscription:', error);
    return () => {};
  });
};

export default {
  submitPayment,
  getPaymentStatus,
  canSubmitPayment,
  subscribeToPaymentStatus
};