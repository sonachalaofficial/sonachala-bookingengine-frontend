import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import './PaymentModal.css';
import { fetchAdminCharges, DEFAULT_ADMIN_CHARGES, calculateRoomPriceBreakdown } from '../utils/bookingUtils';

const PaymentModal = ({ show, isOpen, onClose, room, property, bookingDetails, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [name, setName] = useState(bookingDetails?.name || "");
  const [phone, setPhone] = useState(bookingDetails?.phone || "");
  const [adminCharges, setAdminCharges] = useState(DEFAULT_ADMIN_CHARGES);
  const [priceBreakdown, setPriceBreakdown] = useState(null);

  // Fetch admin charges on mount
  useEffect(() => {
    const loadAdminCharges = async () => {
      const charges = await fetchAdminCharges();
      setAdminCharges(charges);
    };
    loadAdminCharges();
  }, []);

  // Calculate price breakdown when room, bookingDetails, or adminCharges change
  useEffect(() => {
    if (room && bookingDetails) {
      // If room already has a priceBreakdown, use it
      if (room.priceBreakdown) {
        setPriceBreakdown(room.priceBreakdown);
      } else {
        // Otherwise calculate it
        const checkIn = new Date(bookingDetails.checkIn);
        const checkOut = new Date(bookingDetails.checkOut);
        const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
        
        const breakdown = calculateRoomPriceBreakdown(
          {
            roomPrice: Number.parseFloat(room.roomPrice || room.perNightPrice) || 0,
            maxGuestAllowed: Number.parseInt(room.maxGuestAllowed) || 2,
            perAdultPrice: Number.parseFloat(room.perAdultPrice) || 0,
            perChildPrice: Number.parseFloat(room.perChildPrice) || 0,
            discount: Number.parseFloat(room.discount || room.discountValue) || 0
          },
          nights,
          Number.parseInt(bookingDetails.adults) || 1,
          Number.parseInt(bookingDetails.children) || 0,
          1,
          adminCharges
        );
        setPriceBreakdown(breakdown);
      }
    }
  }, [room, bookingDetails, adminCharges]);

  // Support both 'show' and 'isOpen' props for flexibility
  const isVisible = show || isOpen;
  if (!isVisible) return null;

  const handleConfirm = async () => {
    if (!name || !phone) {
      alert("Please enter both your name and phone number.");
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing or call an API
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentConfirmed(true);
      // Wait 5 seconds before signaling confirmation to the parent (which triggers redirect)
      setTimeout(() => {
        if (onConfirm) onConfirm({ name, phone });
      }, 5000);
    }, 2000);
  };

  // Get total price from breakdown or room
  const totalPrice = priceBreakdown?.grandTotal || room?.calculatedPrice || 0;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-container">
        <button className="payment-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {paymentConfirmed ? (
          <div className="payment-success-view">
            <FaCheckCircle className="success-icon" />
            <h3>Booking Confirmed!</h3>
            <p>Your payment for {room?.name} has been received.</p>
            <p className="booking-ref">Ref: #INV-{Math.floor(Math.random() * 100000)}</p>
            <button className="ota-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className="payment-content-view">
            <div className="payment-header">
              <h2>Confirm Booking</h2>
              <p className="property-name">{property?.["Property Name"]}</p>
            </div>

            <div className="payment-body">
              <div className="room-summary">
                <h4>{room?.customName || room?.name || room?.roomType}</h4>
                <div className="highlight-tag">{room?.bedType}</div>
                
                {/* Price Breakdown */}
                {priceBreakdown && (
                  <div className="price-breakdown mt-3">
                    <div className="breakdown-row">
                      <span>Base Room Price</span>
                      <span>₹{priceBreakdown.baseRoomPrice?.toLocaleString()}</span>
                    </div>
                    {priceBreakdown.extraAdultCharge > 0 && (
                      <div className="breakdown-row">
                        <span>Extra Adult Charges</span>
                        <span>₹{priceBreakdown.extraAdultCharge?.toLocaleString()}</span>
                      </div>
                    )}
                    {priceBreakdown.extraChildCharge > 0 && (
                      <div className="breakdown-row">
                        <span>Extra Child Charges</span>
                        <span>₹{priceBreakdown.extraChildCharge?.toLocaleString()}</span>
                      </div>
                    )}
                    {priceBreakdown.discountAmount > 0 && (
                      <div className="breakdown-row text-success">
                        <span>Discount ({priceBreakdown.discount}%)</span>
                        <span>-₹{priceBreakdown.discountAmount?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="breakdown-row">
                      <span>Subtotal</span>
                      <span>₹{priceBreakdown.subtotal?.toLocaleString()}</span>
                    </div>
                    {priceBreakdown.platformFee > 0 && (
                      <div className="breakdown-row">
                        <span>Platform Fee</span>
                        <span>₹{priceBreakdown.platformFee?.toLocaleString()}</span>
                      </div>
                    )}
                    {priceBreakdown.gstAmount > 0 && (
                      <div className="breakdown-row">
                        <span>GST ({priceBreakdown.gstPercentage}%)</span>
                        <span>₹{priceBreakdown.gstAmount?.toLocaleString()}</span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="breakdown-row total">
                      <span className="fw-bold">Total</span>
                      <span className="fw-bold price-amount">₹{totalPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                {!priceBreakdown && (
                  <div className="price-summary">
                    <span>Total Price:</span>
                    <span className="price-amount">₹{totalPrice}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary small">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="qr-section">
                <p className="qr-instruction">Scan to Pay via UPI</p>
                {property?.paymentQr ? (
                  <div className="qr-image-wrapper">
                    <img src={property.paymentQr} alt="Payment QR Code" className="qr-code-img" />
                  </div>
                ) : (
                  <div className="qr-placeholder">
                    <p>No QR Code Available</p>
                  </div>
                )}
                <p className="qr-help">Use any UPI app (GPay, PhonePe, Paytm) to scan and pay.</p>
              </div>
            </div>

            <div className="payment-footer">
              <button
                className="ota-btn-primary w-100"
                onClick={handleConfirm}
                disabled={isProcessing || !name || !phone}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="spinner-icon" /> Processing...
                  </>
                ) : (
                  'I Have Made the Payment'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  room: PropTypes.object,
  property: PropTypes.object,
  bookingDetails: PropTypes.object,
  onConfirm: PropTypes.func
};

export default PaymentModal;
