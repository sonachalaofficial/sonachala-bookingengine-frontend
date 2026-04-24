/**
 * Booking Service
 * Handles booking-related Firebase operations
 * Used by both user and admin sides
 */

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  serverTimestamp,
  onSnapshot,
  orderBy 
} from 'firebase/firestore';
import { db, auth } from '../core/firebase/config.user';

/**
 * Get all pending payments for admin verification
 * @returns {Promise<Array>} - Array of bookings awaiting verification
 */
export const getPendingPayments = async () => {
  try {
    const bookingsRef = collection(db, 'Bookings');
    const q = query(
      bookingsRef,
      where('payment.status', '==', 'verification_pending'),
      orderBy('payment.uploadedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const bookings = [];
    
    snapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    // Fallback: try fetching from all users' bookings
    return await getPendingPaymentsFromUsers();
  }
};

/**
 * Fallback: Get pending payments from users subcollections
 * @returns {Promise<Array>}
 */
const getPendingPaymentsFromUsers = async () => {
  try {
    const usersRef = collection(db, 'Users');
    const usersSnapshot = await getDocs(usersRef);
    const bookings = [];
    
    for (const userDoc of usersSnapshot.docs) {
      const bookingsRef = collection(db, 'Users', userDoc.id, 'Bookings');
      const q = query(
        bookingsRef,
        where('payment.status', '==', 'verification_pending')
      );
      const bookingsSnapshot = await getDocs(q);
      
      bookingsSnapshot.forEach((bookingDoc) => {
        bookings.push({
          id: bookingDoc.id,
          userId: userDoc.id,
          ...bookingDoc.data()
        });
      });
    }
    
    return bookings;
  } catch (error) {
    console.error('Error fetching pending payments from users:', error);
    return [];
  }
};

/**
 * Approve a payment (Admin action)
 * @param {string} bookingId - The booking ID
 * @param {string} userId - The user ID (owner of the booking)
 * @param {string} adminId - The admin ID performing the action
 * @returns {Promise<Object>}
 */
export const approvePayment = async (bookingId, userId, adminId) => {
  try {
    const updateData = {
      'payment.status': 'approved',
      'payment.verifiedAt': serverTimestamp(),
      'payment.verifiedBy': adminId,
      'bookingStatus': 'confirmed',
      'Status': 'Confirmed'
    };

    // Update in main Bookings collection
    const mainBookingRef = doc(db, 'Bookings', bookingId);
    const mainBookingDoc = await getDoc(mainBookingRef);
    
    if (mainBookingDoc.exists()) {
      await updateDoc(mainBookingRef, updateData);
    }

    // Update in user's bookings subcollection
    if (userId) {
      const userBookingRef = doc(db, 'Users', userId, 'Bookings', bookingId);
      const userBookingDoc = await getDoc(userBookingRef);
      
      if (userBookingDoc.exists()) {
        await updateDoc(userBookingRef, updateData);
      }
    } else {
      // If userId not provided, find the booking owner
      const usersRef = collection(db, 'Users');
      const usersSnapshot = await getDocs(usersRef);
      
      for (const userDoc of usersSnapshot.docs) {
        const userBookingRef = doc(db, 'Users', userDoc.id, 'Bookings', bookingId);
        const userBookingDoc = await getDoc(userBookingRef);
        
        if (userBookingDoc.exists()) {
          await updateDoc(userBookingRef, updateData);
          break;
        }
      }
    }

    return { success: true, message: 'Payment approved successfully' };
  } catch (error) {
    console.error('Error approving payment:', error);
    return { success: false, error: 'Failed to approve payment' };
  }
};

/**
 * Reject a payment (Admin action)
 * @param {string} bookingId - The booking ID
 * @param {string} userId - The user ID (owner of the booking)
 * @param {string} adminId - The admin ID performing the action
 * @param {string} reason - Rejection reason (optional)
 * @returns {Promise<Object>}
 */
export const rejectPayment = async (bookingId, userId, adminId, reason = '') => {
  try {
    const updateData = {
      'payment.status': 'rejected',
      'payment.rejectedAt': serverTimestamp(),
      'payment.rejectedBy': adminId,
      'payment.rejectionReason': reason,
      'bookingStatus': 'payment_pending',
      'Status': 'Payment Pending'
    };

    // Update in main Bookings collection
    const mainBookingRef = doc(db, 'Bookings', bookingId);
    const mainBookingDoc = await getDoc(mainBookingRef);
    
    if (mainBookingDoc.exists()) {
      await updateDoc(mainBookingRef, updateData);
    }

    // Update in user's bookings subcollection
    if (userId) {
      const userBookingRef = doc(db, 'Users', userId, 'Bookings', bookingId);
      const userBookingDoc = await getDoc(userBookingRef);
      
      if (userBookingDoc.exists()) {
        await updateDoc(userBookingRef, updateData);
      }
    } else {
      // If userId not provided, find the booking owner
      const usersRef = collection(db, 'Users');
      const usersSnapshot = await getDocs(usersRef);
      
      for (const userDoc of usersSnapshot.docs) {
        const userBookingRef = doc(db, 'Users', userDoc.id, 'Bookings', bookingId);
        const userBookingDoc = await getDoc(userBookingRef);
        
        if (userBookingDoc.exists()) {
          await updateDoc(userBookingRef, updateData);
          break;
        }
      }
    }

    return { success: true, message: 'Payment rejected. User can re-upload.' };
  } catch (error) {
    console.error('Error rejecting payment:', error);
    return { success: false, error: 'Failed to reject payment' };
  }
};

/**
 * Subscribe to booking status changes (real-time)
 * @param {string} bookingId - The booking ID
 * @param {Function} callback - Callback function called on status change
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToBookingStatus = (bookingId, callback) => {
  const user = auth.currentUser;
  if (!user) {
    callback(null);
    return () => {};
  }

  const bookingRef = doc(db, 'Users', user.uid, 'Bookings', bookingId);
  
  const unsubscribe = onSnapshot(bookingRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        id: doc.id,
        bookingStatus: data.bookingStatus || data.Status,
        payment: data.payment || {},
        ...data
      });
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error subscribing to booking status:', error);
    callback(null);
  });

  return unsubscribe;
};

/**
 * Get user's booking history
 * @returns {Promise<Array>}
 */
export const getUserBookings = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return [];
    }

    const bookingsRef = collection(db, 'Users', user.uid, 'Bookings');
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const bookings = [];
    snapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
};

/**
 * Get booking details by ID
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object|null>}
 */
export const getBookingById = async (bookingId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    const bookingRef = doc(db, 'Users', user.uid, 'Bookings', bookingId);
    const bookingDoc = await getDoc(bookingRef);

    if (bookingDoc.exists()) {
      return {
        id: bookingDoc.id,
        ...bookingDoc.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
};

/**
 * Format booking status for display
 * @param {string} status - The booking status
 * @returns {Object} - { text, color, icon }
 */
export const formatBookingStatus = (status) => {
  const statusLower = status?.toLowerCase() || '';
  
  switch (statusLower) {
    case 'payment_pending':
    case 'payment pending':
      return {
        text: 'Waiting for Payment',
        color: '#f59e0b', // amber
        icon: '⏳',
        description: 'Please complete your payment'
      };
    case 'verification_pending':
    case 'verification pending':
      return {
        text: 'Verification in Progress',
        color: '#3b82f6', // blue
        icon: '🔍',
        description: 'Admin is verifying your payment'
      };
    case 'confirmed':
      return {
        text: 'Booking Confirmed',
        color: '#10b981', // green
        icon: '✅',
        description: 'Your booking is confirmed'
      };
    case 'rejected':
      return {
        text: 'Payment Rejected',
        color: '#ef4444', // red
        icon: '❌',
        description: 'Please re-upload payment proof'
      };
    case 'cancelled':
      return {
        text: 'Booking Cancelled',
        color: '#6b7280', // gray
        icon: '🚫',
        description: 'This booking has been cancelled'
      };
    default:
      return {
        text: status || 'Unknown',
        color: '#6b7280',
        icon: '❓',
        description: ''
      };
  }
};

export default {
  getPendingPayments,
  approvePayment,
  rejectPayment,
  subscribeToBookingStatus,
  getUserBookings,
  getBookingById,
  formatBookingStatus
};