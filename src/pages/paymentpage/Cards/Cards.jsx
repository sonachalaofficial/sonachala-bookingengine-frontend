import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../../../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Cards = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    bookingData?.latestProofUrl || null
  );

  const handlePaymentRequest = () => {
    if (!upiId.includes("@")) {
      setError("Please enter a valid UPI ID (example@upi)");
    } else {
      setError("");
      alert("Payment request sent to: " + upiId);
    }
  };

  // ✅ Handle Screenshot Upload for Card Payments
  const handleImageUpload = async () => {
    if (!screenshotFile) {
      alert("📎 Please select a screenshot to upload.");
      return;
    }

    try {
      setUploading(true);
      const userId = bookingData?.userId;
      const bookingId = bookingData?.id;

      if (!userId || !bookingId) {
        alert("❌ Missing User ID or Booking ID");
        return;
      }

      // Determine the correct collection based on booking data
      const collectionName = bookingData.collectionName || "Hotels";

      console.log("🔍 Looking for booking in:", collectionName, "with userId:", userId, "bookingId:", bookingId);

      // Fetch existing Firestore booking data (avoid overwriting)
      const guestRef = doc(db, collectionName, userId, "Guest Details", bookingId);
      const guestSnap = await getDoc(guestRef);

      if (!guestSnap.exists()) {
        console.error("❌ Booking not found in", collectionName, "collection");
        alert("❌ Booking not found in database. Please try again.");
        setUploading(false);
        return;
      }

      console.log("✅ Found booking data:", guestSnap.data());

      const existingData = guestSnap.data();

      // Preserve original extension
      const ext =
        screenshotFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const timestamp = Date.now();
      const fileRef = ref(
        storage,
        `paymentProofs/${userId}/${bookingId}/${timestamp}.${ext}`
      );

      // Upload with resumable method (works better on mobile)
      const uploadTask = uploadBytesResumable(fileRef, screenshotFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(0)}% done`);
        },
        (error) => {
          console.error("❌ Upload failed:", error);
          alert("Upload failed, please try again.");
          setUploading(false);
        },
        async () => {
          try {
            // Upload complete → get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("✅ Upload successful, URL:", downloadURL);

            const newProof = {
              url: downloadURL,
              uploadedAt: new Date().toISOString(),
              timestamp: timestamp
            };

            // Get existing payment proof array or create new one
            const existingProofs = Array.isArray(existingData["Payment Proof"])
              ? [...existingData["Payment Proof"]]
              : [];

            // Add new proof to array
            existingProofs.push(newProof);

            // Update document with new data
            const updatedData = {
              latestProofUrl: downloadURL,
              "Payment Status": "Pending",
              "Payment Proof": existingProofs,
              updatedAt: new Date(),
            };

            console.log("📝 Updating document with:", updatedData);

            await setDoc(guestRef, updatedData, { merge: true });

            setUploadedImageUrl(downloadURL);
            alert("✅ Payment proof uploaded and saved successfully.");
            setUploading(false);
          } catch (urlError) {
            console.error("❌ Error getting download URL or updating document:", urlError);
            alert("Upload failed during URL generation. Please try again.");
            setUploading(false);
          }
        }
      );
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed, please try again.");
      setUploading(false);
    }
  };

  const guestName = bookingData?.["Full Name"] || "Guest";
  const guestEmail = bookingData?.["Email Address"] || "example@email.com";
  const guestPhone = bookingData?.["Phone Number"] || "N/A";
  const totalPrice = bookingData?.["Total Price"] || 0;
  const basePrice = totalPrice * 0.9;
  const tax = totalPrice * 0.1;
  const totalNights = bookingData?.["Total Nights"] || 1;
  const roomsCount = bookingData?.Rooms?.length || 1;
  const adultsCount = bookingData?.["Total Adults"] || 1;
  const childrenCount = bookingData?.["Total Children"] || 0;
  const propertyName = bookingData?.["Property Name"] || "Hotel";
  const propertyAddress = bookingData?.["Property Address"] || "N/A";

  const checkIn = bookingData?.["Check-In Date"]
    ? new Date(bookingData["Check-In Date"].seconds * 1000).toLocaleDateString(
        "en-IN"
      )
    : "N/A";

  const checkOut = bookingData?.["Check-Out Date"]
    ? new Date(bookingData["Check-Out Date"].seconds * 1000).toLocaleDateString(
        "en-IN"
      )
    : "N/A";

  return (
    <div className="container my-4">
      {/* Hotel Booking Summary */}
      <div className="row">
        <div className="col-lg-12  col-md-8">
          <div className="card shadow-sm mb-3">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
              <div>
                <p className="mb-1">
                  <strong>Guest Name:</strong> {guestName}
                </p>
                <p className="mb-1">
                  <strong>Hotel Name:</strong> {propertyName}
                </p>
                <p className="mb-1">
                  <strong>Hotel Address:</strong> {propertyAddress}
                </p>
                <p className="mb-1">
                  <strong>Stay Dates:</strong> 📅 {checkIn} → {checkOut}
                </p>
                <p className="mb-1">
                  <strong>Rooms & Guests:</strong> 🛏️ {roomsCount} Room | 👤{" "}
                  {adultsCount} Adults, {childrenCount} Children
                </p>
                <p className="mb-1">
                  <strong>Total Nights:</strong> 🕒 {totalNights} Night(s)
                </p>
                <p className="mb-0">
                  <strong>Contact:</strong> 📧 {guestEmail}, 📱 +91-{guestPhone}
                </p>
              </div>
              <div className="text-end">
                <p className="text-muted mb-1">
                  <strong>Total Due</strong>
                </p>
                <h4 className="text-success mb-0">
                  <FaRupeeSign /> {totalPrice.toLocaleString("en-IN")}
                </h4>
                <small className="text-muted">
                  <strong>Breakup:</strong> Hotel Fare ₹{basePrice.toFixed(2)} +
                  Taxes ₹{tax.toFixed(2)}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>





  <div className="mb-3">
            <Link
              to="/PaymentPage"
              state={{ bookingData }}
              className="btn btn-link text-success p-0 text-decoration-none "
            >
              <FaArrowLeft className="me-1" /> ALL PAYMENT OPTIONS
            </Link>
          </div>






      {/* UPI Payment Section */}
     <div className="card shadow-sm p-4 rounded" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h5 className="mb-3 fw-bold">Credit & Debit Cards</h5>
      <div className="d-flex align-items-start mb-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/633/633611.png" // Card icon placeholder
          alt="card icon"
          style={{ width: "32px", height: "32px", marginRight: "10px" }}
        />
        <div>
          <p className="mb-0 fw-semibold">Enter card details</p>
          <small className="text-muted">We support all major domestic & international cards</small>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ENTER CARD NUMBER"
          maxLength="19"
        />
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <select className="form-select">
            <option>MM</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {(i + 1).toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select">
            <option>YY</option>
            {[...Array(10)].map((_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-4">
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="ENTER CVV"
              maxLength="3"
            />
            <span className="input-group-text">
              <FaInfoCircle />
            </span>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary w-100" disabled>
        Pay Now
      </button>

      {/* Payment Proof Upload Section */}
      <div className="mt-4">
        <h6 className="fw-bold mb-3">Upload Payment Screenshot (Optional)</h6>
        <p className="text-muted small mb-3">
          If you've completed the payment, upload a screenshot of the transaction for verification.
        </p>
        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={(e) => setScreenshotFile(e.target.files[0])}
        />
        <button
          className="btn btn-outline-success w-100"
          onClick={handleImageUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Payment Proof"}
        </button>
      </div>

      {uploadedImageUrl && (
        <div className="mt-3">
          <p className="text-muted">📸 Uploaded Screenshot Preview:</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="img-fluid border rounded"
            style={{ maxWidth: "400px" }}
          />
        </div>
      )}
    </div>
    </div>
  );
};

export default Cards;
