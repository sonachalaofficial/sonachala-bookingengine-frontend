import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaRupeeSign, 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle,
  FaCopy,
  FaExternalLinkAlt,
  FaQrcode,
  FaSpinner,
  FaCreditCard,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheck
} from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from "qrcode";

import { auth, db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { 
  submitPayment, 
  getPaymentStatus,
  canSubmitPayment,
  subscribeToPaymentStatus
} from "../../../services/paymentService";
import { 
  getPropertyPaymentDetails, 
  generateUpiUrl, 
  generateUpiQrData
} from "../../../services/propertyService";

// Images
import allupiimg from "../Upi/allupiimg.png";

const Upi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  // State for UPI and Property
  const [propertyPaymentInfo, setPropertyPaymentInfo] = useState(null);
  const [loadingProperty, setLoadingProperty] = useState(true);
  const [upiError, setUpiError] = useState(null);

  // State for Transaction ID
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [canSubmit, setCanSubmit] = useState({ canSubmit: true, reason: null });

  // QR Code State
  const [generatedQrCode, setGeneratedQrCode] = useState("");
  const [generatingQr, setGeneratingQr] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Booking details
  const guestName = bookingData?.["Full Name"] || "Guest";
  const guestEmail = bookingData?.["Email Address"] || "example@email.com";
  const guestPhone = bookingData?.["Phone Number"] || "N/A";
  const totalPrice = bookingData?.["Total Price"] || 0;
  const basePrice = totalPrice * 0.9;
  const tax = totalPrice * 0.1;
  const totalNights = bookingData?.["Total Nights"] || 1;
  const propertyName = bookingData?.["Property Name"] || "Hotel";
  const propertyAddress = bookingData?.["Property Address"] || "N/A";
  const propertyId = bookingData?.propertyId || bookingData?.["Property ID"] || bookingData?.hotelId;
  const bookingId = bookingData?.id;

  const checkIn = bookingData?.["Check-In Date"]
    ? new Date(bookingData["Check-In Date"].seconds * 1000).toLocaleDateString("en-IN")
    : "N/A";

  const checkOut = bookingData?.["Check-Out Date"]
    ? new Date(bookingData["Check-Out Date"].seconds * 1000).toLocaleDateString("en-IN")
    : "N/A";

  // Fetch property payment details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!propertyId) {
        setUpiError("Property ID not found in booking data");
        setLoadingProperty(false);
        return;
      }

      try {
        const paymentInfo = await getPropertyPaymentDetails(propertyId);
        
        if (!paymentInfo) {
          setUpiError("Property payment details not found. Please contact support.");
          setLoadingProperty(false);
          return;
        }

        if (!paymentInfo.upiEnabled) {
          setUpiError("UPI payments are not enabled for this property. Please use other payment methods.");
          setLoadingProperty(false);
          return;
        }

        if (!paymentInfo.upiId) {
          setUpiError("UPI ID not configured for this property. Please contact the property owner.");
          setLoadingProperty(false);
          return;
        }

        setPropertyPaymentInfo(paymentInfo);
        setUpiError(null);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setUpiError("Failed to load payment details. Please try again.");
      } finally {
        setLoadingProperty(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  // Generate QR Code when property payment info is loaded
  useEffect(() => {
    if (propertyPaymentInfo && totalPrice > 0) {
      generateDynamicQrCode();
    }
  }, [propertyPaymentInfo, totalPrice]);

  const generateDynamicQrCode = async () => {
    if (!propertyPaymentInfo?.upiId) return;

    setGeneratingQr(true);
    try {
      const qrData = generateUpiQrData({
        upiId: propertyPaymentInfo.upiId,
        accountHolderName: propertyPaymentInfo.accountHolderName || propertyName,
        amount: totalPrice,
        propertyName: propertyName,
      });

      if (!qrData) {
        throw new Error("Failed to generate UPI data");
      }

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: { dark: '#000000', light: '#FFFFFF' }
      });

      setGeneratedQrCode(qrCodeDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setGeneratingQr(false);
    }
  };

  // Check if can submit payment on mount
  useEffect(() => {
    const checkSubmitStatus = async () => {
      if (bookingId) {
        const result = await canSubmitPayment(bookingId);
        setCanSubmit(result);
        
        const status = await getPaymentStatus(bookingId);
        if (status) {
          setPaymentInfo(status);
          setPaymentSubmitted(true);
        }
      }
    };
    checkSubmitStatus();
  }, [bookingId]);

  // Subscribe to real-time payment status updates
  useEffect(() => {
    if (!bookingId) return;

    const unsubscribe = subscribeToPaymentStatus(bookingId, (data) => {
      if (data) {
        setPaymentInfo(data);
        setPaymentSubmitted(true);
        
        const status = data.status?.toLowerCase();
        if (status === 'pending_verification') {
          setCanSubmit({ canSubmit: false, reason: 'Payment is under verification.' });
        } else if (status === 'confirmed') {
          setCanSubmit({ canSubmit: false, reason: 'Payment confirmed! Your booking is confirmed.' });
        }
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [bookingId]);

  // Handle Pay Now - Opens UPI intent link
  const handlePayNow = () => {
    if (!propertyPaymentInfo?.upiId) {
      toast.error("UPI ID not available");
      return;
    }

    const upiLink = generateUpiUrl({
      upiId: propertyPaymentInfo.upiId,
      accountHolderName: propertyPaymentInfo.accountHolderName || propertyName,
      amount: totalPrice,
      transactionNote: `Payment for ${propertyName} - ${guestName}`,
    });

    if (upiLink) {
      window.location.href = upiLink;
    } else {
      toast.error("Failed to generate payment link");
    }
  };

  // Copy UPI ID to clipboard
  const handleCopyUpiId = () => {
    if (!propertyPaymentInfo?.upiId) return;

    navigator.clipboard.writeText(propertyPaymentInfo.upiId)
      .then(() => {
        setCopySuccess(true);
        toast.success("UPI ID copied to clipboard!");
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy UPI ID");
      });
  };

  // Handle Confirm Booking
  const handleConfirmBooking = async () => {
    console.log('🔵 handleConfirmBooking called');
    
    if (!transactionId || transactionId.trim() === '') {
      toast.warning("Please enter Transaction ID");
      return;
    }

    if (!bookingId) {
      console.error('❌ Missing booking ID');
      toast.error("Missing booking ID");
      return;
    }

    console.log('📌 Submitting payment for booking:', bookingId);
    console.log('📝 Transaction ID:', transactionId);

    setSubmitting(true);

    try {
      console.log('🚀 Calling submitPayment...');
      
      // Prepare payment data from booking info
      const paymentData = {
        bookingId: bookingId,
        guestName: guestName,
        guestEmail: guestEmail,
        phone: guestPhone,
        checkIn: checkIn,
        checkOut: checkOut,
        totalAmount: totalPrice,
        transactionId: transactionId.trim(),
        propertyName: propertyName,
        propertyId: propertyId,
        userId: bookingData?.userId
      };

      console.log('📤 Payment data:', paymentData);
      
      const result = await submitPayment(paymentData);
      
      console.log('📦 Submit result:', result);

      if (result.success) {
        console.log('✅ Payment submitted successfully!');
        console.log('📄 Payment ID:', result.paymentId);
        
        setPaymentSubmitted(true);
        setCanSubmit({ canSubmit: false, reason: result.message });
        toast.success("Booking confirmed! Waiting for admin verification.");
      } else {
        console.error('❌ Payment submission failed:', result.error);
        toast.error(result.error || "Failed to submit payment");
      }
    } catch (error) {
      console.error("❌ Submission exception:", error);
      toast.error("Failed to submit payment. Please try again.");
    } finally {
      console.log('🔄 Resetting submit state');
      setSubmitting(false);
    }
  };

  // Get status display info
  const getStatusDisplay = () => {
    if (!paymentInfo) return null;
    
    const status = paymentInfo.status?.toLowerCase();
    
    switch (status) {
      case 'pending_verification':
        return {
          text: 'Verification in Progress',
          color: '#3b82f6',
          icon: '🔍',
          description: 'Admin is verifying your payment'
        };
      case 'confirmed':
        return {
          text: 'Booking Confirmed',
          color: '#10b981',
          icon: '✅',
          description: 'Your booking is confirmed'
        };
      case 'rejected':
        return {
          text: 'Payment Rejected',
          color: '#ef4444',
          icon: '❌',
          description: 'Please contact support'
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  // Loading state
  if (loadingProperty) {
    return (
      <div className="container my-4">
        <div className="text-center py-5">
          <FaSpinner className="fa-spin fa-3x text-success mb-3" />
          <p className="text-muted">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (upiError && !propertyPaymentInfo) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">
          <FaTimesCircle className="me-2" />
          {upiError}
          <hr />
          <Link to="/PaymentPage" state={{ bookingData }} className="btn btn-outline-danger">
            <FaArrowLeft className="me-2" />
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Booking Info Card */}
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div>
                  <h5 className="text-success mb-3">
                    <FaBuilding className="me-2" />
                    {propertyName}
                  </h5>
                  <p className="mb-1">
                    <FaUser className="me-2 text-muted" />
                    <strong>{guestName}</strong>
                  </p>
                  <p className="mb-1">
                    <FaMapMarkerAlt className="me-2 text-muted" />
                    {propertyAddress}
                  </p>
                  <p className="mb-1">
                    <FaCalendarAlt className="me-2 text-muted" />
                    {checkIn} → {checkOut} ({totalNights} nights)
                  </p>
                  <p className="mb-1">
                    <FaEnvelope className="me-2 text-muted" />
                    {guestEmail}
                  </p>
                  <p className="mb-0">
                    <FaPhone className="me-2 text-muted" />
                    {guestPhone}
                  </p>
                </div>
                <div className="text-end mt-3 mt-md-0">
                  <p className="text-muted mb-0"><strong>Total Due</strong></p>
                  <h3 className="text-success mb-1">
                    <FaRupeeSign />{totalPrice.toLocaleString("en-IN")}
                  </h3>
                  <small className="text-muted">
                    Base: ₹{basePrice.toFixed(0)} + Tax: ₹{tax.toFixed(0)}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status Card */}
      {statusDisplay && (
        <div 
          className="card shadow-sm mb-4"
          style={{ borderLeft: `4px solid ${statusDisplay.color}` }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center">
              <span style={{ fontSize: '2rem', marginRight: '12px' }}>{statusDisplay.icon}</span>
              <div>
                <h5 className="mb-1">{statusDisplay.text}</h5>
                {statusDisplay.description && (
                  <p className="text-muted mb-0">{statusDisplay.description}</p>
                )}
              </div>
            </div>
            {paymentInfo?.createdAt && (
              <small className="text-muted d-block mt-2">
                Submitted: {new Date(paymentInfo.createdAt?.seconds * 1000 || paymentInfo.createdAt).toLocaleString()}
              </small>
            )}
          </div>
        </div>
      )}

      {/* Property Payment Info */}
      {propertyPaymentInfo && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <FaCreditCard className="me-2" />
              Pay to {propertyPaymentInfo.propertyName || propertyName}
            </h5>
          </div>
          <div className="card-body">
            {/* UPI Details */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="bg-light p-3 rounded">
                  <p className="mb-1 text-muted">Account Holder</p>
                  <h6 className="mb-3">{propertyPaymentInfo.accountHolderName || 'Property Owner'}</h6>
                  <p className="mb-1 text-muted">UPI ID</p>
                  <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0 text-break">{propertyPaymentInfo.upiId}</h6>
                    <button 
                      className="btn btn-sm btn-outline-success"
                      onClick={handleCopyUpiId}
                      title="Copy UPI ID"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <p className="text-muted mb-2">Amount to Pay</p>
                <h2 className="text-success mb-3">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </h2>
                <button 
                  className="btn btn-success btn-lg"
                  onClick={handlePayNow}
                >
                  <FaExternalLinkAlt className="me-2" />
                  Pay Now with UPI
                </button>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="text-center py-4 border-top">
              <h6 className="mb-3">
                <FaQrcode className="me-2" />
                Scan QR Code to Pay
              </h6>
              {generatingQr ? (
                <div className="py-4">
                  <FaSpinner className="fa-spin fa-2x text-success" />
                  <p className="text-muted mt-2">Generating QR Code...</p>
                </div>
              ) : generatedQrCode ? (
                <div>
                  <img
                    src={generatedQrCode}
                    alt="UPI QR Code"
                    className="border rounded p-2"
                    style={{ maxWidth: "256px" }}
                  />
                  <p className="text-muted mt-2">
                    Scan using any UPI app (GPay, PhonePe, Paytm, BHIM)
                  </p>
                </div>
              ) : (
                <div className="py-4 text-muted">
                  <p>QR code will be generated automatically</p>
                </div>
              )}
            </div>

            {/* Transaction ID Section */}
            <div className="border-top pt-4">
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle className="text-success me-2" />
                <h6 className="mb-0">Confirm Your Payment</h6>
              </div>
              
              {!canSubmit.canSubmit ? (
                <div className="alert alert-info d-flex align-items-center">
                  <FaCheckCircle className="me-2" />
                  {canSubmit.reason}
                </div>
              ) : (
                <>
                  <div className="bg-light p-3 rounded mb-3">
                    <p className="mb-2 text-muted">
                      <strong>After completing payment via UPI, enter your Transaction ID below:</strong>
                    </p>
                    <ol className="mb-0 small">
                      <li>Complete payment using QR code or UPI ID</li>
                      <li>Copy the Transaction ID from your UPI app</li>
                      <li>Enter it below and click "Confirm Booking"</li>
                    </ol>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">
                      <strong>Transaction ID</strong> <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter UPI Transaction ID (e.g., 123456789012)"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      disabled={submitting}
                    />
                    <small className="text-muted">
                      Find your Transaction ID in your UPI app payment history
                    </small>
                  </div>

                  <button
                    className="btn btn-success btn-lg w-100"
                    onClick={handleConfirmBooking}
                    disabled={submitting || !transactionId.trim()}
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <FaCheck className="me-2" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Transaction ID Display after submission */}
              {paymentSubmitted && paymentInfo?.transactionId && (
                <div className="mt-3 p-3 bg-light rounded">
                  <p className="mb-1 text-muted">Your Transaction ID:</p>
                  <h5 className="mb-0 text-success">
                    <strong>{paymentInfo.transactionId}</strong>
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Supported Apps */}
      <div className="card shadow-sm mb-4">
        <div className="card-body text-center">
          <p className="mb-1 text-muted">All UPI apps supported</p>
          <img src={allupiimg} alt="UPI Apps" style={{ height: "50px" }} className="img-fluid" />
          <p className="text-muted mt-2" style={{ fontSize: "0.8rem" }}>
            Powered by <b>UPI</b>
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="fw-bold mb-3">📋 How to Pay</h6>
          <ol className="mb-0">
            <li className="mb-2">
              <strong>Step 1:</strong> Click "Pay Now with UPI" or scan the QR code
            </li>
            <li className="mb-2">
              <strong>Step 2:</strong> Complete payment for <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </li>
            <li className="mb-2">
              <strong>Step 3:</strong> Copy your Transaction ID from the UPI app
            </li>
            <li className="mb-2">
              <strong>Step 4:</strong> Enter Transaction ID and click "Confirm Booking"
            </li>
            <li>
              <strong>Step 5:</strong> Wait for admin verification (usually within 24 hours)
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Upi;