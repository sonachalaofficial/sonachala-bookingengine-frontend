import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

import upi from "./paymentpageimages/upi.png";
import creditcard from "./paymentpageimages/creditcard.png";
import netbanking from "./paymentpageimages/netbanking.png";
import paylater from "./paymentpageimages/paylater.png";
import { fetchAdminCharges, DEFAULT_ADMIN_CHARGES, calculateRoomPriceBreakdown } from "../../utils/bookingUtils";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  console.log("UPI PAGE bookingData:", bookingData);
  console.log("bookingId:", bookingData?.id);

  // State for admin charges
  const [adminCharges, setAdminCharges] = useState(DEFAULT_ADMIN_CHARGES);

  // Fetch admin charges on mount
  useEffect(() => {
    const loadAdminCharges = async () => {
      const charges = await fetchAdminCharges();
      setAdminCharges(charges);
    };
    loadAdminCharges();
  }, []);

  // Safely get total price with NaN protection
  const getTotalPrice = () => {
    const price = bookingData?.["Total Price"];
    if (price !== undefined && price !== null && !isNaN(Number(price))) {
      return Number(price);
    }
    return 0;
  };

  const totalPrice = getTotalPrice();

  // Get price breakdown from booking data (already calculated during booking creation)
  // If booking data has the breakdown fields, use them directly
  const priceBreakdown = {
    baseRoomAmount: bookingData?.["Base Price"] || 0,
    subtotal: bookingData?.["Subtotal"] || 0,
    discountAmount: bookingData?.["Discount Amount"] || 0,
    subtotalAfterDiscount: bookingData?.["Subtotal After Discount"] || 0,
    gstAmount: bookingData?.["GST Amount"] || 0,
    taxAmount: bookingData?.["Tax Amount"] || 0,
    platformFee: bookingData?.["Platform Fee"] || bookingData?.["Commission Amount"] || 0,
    gstPercentage: bookingData?.["GST Percentage"] || adminCharges.gstPercentage,
    taxPercentage: bookingData?.["Tax Percentage"] || adminCharges.taxPercentage,
    commissionPercentage: bookingData?.["Commission Percentage"] || adminCharges.commissionPercentage,
    extraGuestCharges: bookingData?.["Extra Guest Charges"] || 0
  };

  // Calculate the base room charge (after discount but before taxes)
  // If we have subtotalAfterDiscount, use it; otherwise calculate from total
  const baseRoomCharge = priceBreakdown.subtotalAfterDiscount || 
    (totalPrice / (1 + (priceBreakdown.gstPercentage + priceBreakdown.taxPercentage + priceBreakdown.commissionPercentage) / 100));

  return (
    <div className="container my-5">
      <div className="row gy-4">
        {/* Left Column */}
        <div className="col-md-8">
          {/* Booking Info */}

          <div className="card p-3">
            <h5 className="text-success border-bottom pb-2 mb-3 fw-bold">
              🏨 Booking Information
            </h5>

            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1">
                  <strong>Guest Name:</strong>{" "}
                  {bookingData?.["Full Name"] || "Guest"}
                </p>

                <p className="mb-1">
                  <strong>Check-In:</strong>{" "}
                  {new Date(
                    bookingData?.["Check-In Date"]?.seconds * 1000
                  ).toLocaleDateString()}{" "}
                  → <strong>Check-Out:</strong>{" "}
                  {new Date(
                    bookingData?.["Check-Out Date"]?.seconds * 1000
                  ).toLocaleDateString()}
                </p>

                <p className="mb-1">
                  <strong>Stay Details:</strong>{" "}
                  {bookingData?.Rooms?.length || 1} Room |{" "}
                  {bookingData?.["Total Adults"] || 2} Adults |{" "}
                  {bookingData?.["Total Nights"] || 1} Night
                </p>

                <p className="mb-0">
                  <strong>Email:</strong>{" "}
                  {bookingData?.["Email Address"] || "N/A"},{" "}
                  <strong>Phone:</strong>{" "}
                  {bookingData?.["Phone Number"] || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="card p-3 mt-3">
            <h5 className="mb-3">Payment Options</h5>

            <div className="list-group">
              <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                // onClick={() => navigate("/upi", { state: { bookingData } })}
                onClick={() =>
                  navigate("/upi", {
                    state: {
                      bookingData: { ...bookingData, id: bookingData?.id },
                    },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={upi}
                    alt="UPI"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>UPI Options</span>
                </div>
                <small className="text-muted">
                  Pay Directly From Your Bank Account
                </small>
              </div>

              <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                onClick={() => navigate("/cards", { state: { bookingData } })}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={creditcard}
                    alt="Credit Card"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>Credit & Debit Cards</span>
                </div>
                <small className="text-muted">
                  Visa, Mastercard, Amex, Rupay and more
                </small>
              </div>

              {/* <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={netbanking}
                    alt="Net Banking"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>Net Banking</span>
                </div>
                <small className="text-muted">40+ Banks Available</small>
              </div> */}

              <div
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                role="button"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={paylater}
                    alt="Pay Later"
                    className="me-3"
                    style={{ width: "40px" }}
                  />
                  <span>Pay Later</span>
                </div>
                <small className="text-muted">Simpl, Lazypay</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-4">
            {/* Price Breakdown */}
            <div className="card p-3 shadow-sm border">
            <h5 className="fw-bold mb-3">Price Breakup</h5>

            {/* Room Charge */}
            <div className="d-flex justify-content-between mb-2">
              <div>
                <div className="fw-semibold">
                  {bookingData?.Rooms?.length || 1} Room x{" "}
                  {bookingData?.["Total Nights"] || 1} Night
                </div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Room Charge
                </div>
              </div>
              <div>
                ₹{baseRoomCharge.toFixed(2)}
              </div>
            </div>

            {/* Extra Guest Charges (if any) */}
            {priceBreakdown.extraGuestCharges > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <span className="fw-medium">Extra Guest Charges</span>
                </div>
                <div>₹{priceBreakdown.extraGuestCharges.toFixed(2)}</div>
              </div>
            )}

            {/* Discount (if any) */}
            {priceBreakdown.discountAmount > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <span className="fw-medium text-success">Discount</span>
                </div>
                <div className="text-success">-₹{priceBreakdown.discountAmount.toFixed(2)}</div>
              </div>
            )}

            <hr className="my-3" />

            {/* GST */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span className="fw-medium">GST ({priceBreakdown.gstPercentage}%)</span>
              </div>
              <div>₹{priceBreakdown.gstAmount.toFixed(2)}</div>
            </div>

            {/* Tax */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span className="fw-medium">Tax ({priceBreakdown.taxPercentage}%)</span>
              </div>
              <div>₹{priceBreakdown.taxAmount.toFixed(2)}</div>
            </div>

            {/* Platform Fee */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-medium">Platform Fee ({priceBreakdown.commissionPercentage}%)</span>
              </div>
              <div>₹{priceBreakdown.platformFee.toFixed(2)}</div>
            </div>

            <hr className="my-3" />

            {/* Total */}
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount to be paid</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            {/* Price breakdown note */}
            <div className="mt-2">
              <small className="text-muted">
                * Price includes GST, Tax, and Platform Fee. Extra adult charges apply when adults exceed 2 per room.
              </small>
            </div>
          </div>

          {/* QR Code */}
          {/* <div className="card p-3 mt-3 text-center">
            <h6>Scan to Pay</h6>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?data=https://razorpay.com&size=150x150"
              alt="QR Code"
              className="img-fluid my-2"
            />
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              Instant Refund & High Success Rate
            </p>
            <div className="d-flex justify-content-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo.svg/64px-Google_Pay_Logo.svg.png"
                alt="GPay"
                height="24"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Paytm_logo.png/64px-Paytm_logo.png"
                alt="Paytm"
                height="24"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/PhonePe_Logo.svg/64px-PhonePe_Logo.svg.png"
                alt="PhonePe"
                height="24"
              />
            </div>
          </div> */}

          {/* <button className="btn btn-success w-100 mt-3">
            Proceed to Pay ₹{bookingData?.["Total Price"] || "0"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
