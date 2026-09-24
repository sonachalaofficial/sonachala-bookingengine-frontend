import React, { useState } from "react";
import { FaTrain, FaExchangeAlt, FaCalendarAlt, FaUser, FaPlus, FaTrash, FaShieldAlt, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const POPULAR_STATIONS = [
  { code: "TNM", name: "Tiruvannamalai" },
  { code: "MAS", name: "Chennai Central" },
  { code: "KPD", name: "Katpadi Junction" },
  { code: "SBC", name: "KSR Bengaluru" },
  { code: "MDU", name: "Madurai Junction" },
  { code: "CBE", name: "Coimbatore Junction" },
  { code: "PDY", name: "Puducherry" },
  { code: "TPJ", name: "Tiruchchirappalli" },
  { code: "VM", name: "Villupuram Junction" },
  { code: "MS", name: "Chennai Egmore" },
];

const CLASSES = [
  { code: "ALL", label: "All Classes" },
  { code: "SL", label: "Sleeper (SL)" },
  { code: "3A", label: "AC 3 Tier (3A)" },
  { code: "2A", label: "AC 2 Tier (2A)" },
  { code: "1A", label: "AC 1st Class (1A)" },
  { code: "3E", label: "AC 3 Economy (3E)" },
  { code: "CC", label: "AC Chair Car (CC)" },
  { code: "2S", label: "Second Sitting (2S)" },
];

const QUOTAS = [
  { code: "GN", label: "General (GN)" },
  { code: "TQ", label: "Tatkal (TQ)" },
  { code: "PT", label: "Premium Tatkal (PT)" },
  { code: "LD", label: "Ladies (LD)" },
  { code: "SS", label: "Senior Citizen (SS)" },
  { code: "HP", label: "Person With Disability (HP)" },
];

const SAMPLE_TRAINS = [
  {
    number: "16861",
    name: "Sonachala Superfast Express",
    from: "MAS (Chennai Central)",
    to: "TNM (Tiruvannamalai)",
    deptTime: "06:15 AM",
    arrTime: "09:45 AM",
    duration: "03h 30m",
    runsOn: "Mon, Wed, Fri, Sun",
    classes: [
      { type: "SL", status: "AVAILABLE - 42", price: 185 },
      { type: "3A", status: "AVAILABLE - 18", price: 540 },
      { type: "2A", status: "AVAILABLE - 06", price: 760 },
      { type: "1A", status: "WL - 02", price: 1250 },
    ],
  },
  {
    number: "12605",
    name: "Arunachala Intercity Express",
    from: "MAS (Chennai Central)",
    to: "TNM (Tiruvannamalai)",
    deptTime: "02:30 PM",
    arrTime: "06:10 PM",
    duration: "03h 40m",
    runsOn: "Daily",
    classes: [
      { type: "CC", status: "AVAILABLE - 84", price: 310 },
      { type: "2S", status: "AVAILABLE - 120", price: 115 },
      { type: "3A", status: "AVAILABLE - 22", price: 520 },
    ],
  },
  {
    number: "22675",
    name: "Tiruvannamalai SF Passenger",
    from: "KPD (Katpadi)",
    to: "TNM (Tiruvannamalai)",
    deptTime: "08:10 PM",
    arrTime: "09:50 PM",
    duration: "01h 40m",
    runsOn: "Daily",
    classes: [
      { type: "SL", status: "AVAILABLE - 65", price: 145 },
      { type: "3A", status: "AVAILABLE - 30", price: 495 },
    ],
  },
];

const TrainForm = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [fromStation, setFromStation] = useState("MAS - Chennai Central");
  const [toStation, setToStation] = useState("TNM - Tiruvannamalai");
  const [journeyDate, setJourneyDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [selectedQuota, setSelectedQuota] = useState("GN");

  // IRCTC / Passenger details
  const [irctcUsername, setIrctcUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "Male", berth: "No Preference", food: "Veg" },
  ]);

  const [freeCancellation, setFreeCancellation] = useState(true);
  const [travelInsurance, setTravelInsurance] = useState(true);
  const [autoUpgrade, setAutoUpgrade] = useState(false);

  const [searchResults, setSearchResults] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([
        ...passengers,
        { name: "", age: "", gender: "Male", berth: "No Preference", food: "Veg" },
      ]);
    }
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSearchTrains = (e) => {
    e.preventDefault();
    setSearchResults(SAMPLE_TRAINS);
  };

  const handleBookNow = (train, cls) => {
    setBookingConfirmed({
      trainName: train.name,
      trainNumber: train.number,
      classType: cls.type,
      price: cls.price,
      pnr: "PNR" + Math.floor(1000000000 + Math.random() * 9000000000),
      from: fromStation,
      to: toStation,
      date: journeyDate,
    });
  };

  return (
    <div style={{ backgroundColor: "#edf7f4", minHeight: "100vh", paddingTop: "40px", paddingBottom: "60px" }}>
      <div className="container">

        {/* PAGE TITLE BANNER */}
        <div
          className="text-white p-4 mb-4 rounded-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #038A5E 0%, #02593d 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-md-8">
              <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
                <FaTrain style={{ fontSize: "1.8rem" }} /> Train Ticket Reservation
              </h2>
              <p className="mb-0 text-white-50">
                Book IRCTC Train Tickets with Instant Refunds & Zero Service Fee
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <span className="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill">
                IRCTC Authorized Partner
              </span>
            </div>
          </div>
        </div>

        {/* MAIN FORM CARD */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            {/* TRIP TYPE TABS */}
            <div className="d-flex gap-2 mb-4">
              <button
                className={`btn px-4 py-2 rounded-pill fw-semibold ${
                  tripType === "oneWay" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setTripType("oneWay")}
              >
                One Way
              </button>
              <button
                className={`btn px-4 py-2 rounded-pill fw-semibold ${
                  tripType === "roundTrip" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setTripType("roundTrip")}
              >
                Round Trip
              </button>
            </div>

            <form onSubmit={handleSearchTrains}>
              {/* STATIONS & DATE ROW */}
              <div className="row g-3 align-items-center mb-4">
                
                {/* FROM STATION */}
                <div className="col-lg-4 col-md-5">
                  <label className="form-label fw-bold text-secondary small">
                    FROM STATION
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaTrain className="text-success" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 bg-light"
                      value={fromStation}
                      onChange={(e) => setFromStation(e.target.value)}
                      placeholder="Enter city or station"
                      list="fromStationsList"
                      required
                    />
                    <datalist id="fromStationsList">
                      {POPULAR_STATIONS.map((s) => (
                        <option key={s.code} value={`${s.code} - ${s.name}`} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* SWAP BUTTON */}
                <div className="col-lg-1 col-md-2 text-center mt-md-4">
                  <button
                    type="button"
                    className="btn btn-outline-success rounded-circle shadow-sm"
                    onClick={handleSwapStations}
                    title="Swap Stations"
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FaExchangeAlt />
                  </button>
                </div>

                {/* TO STATION */}
                <div className="col-lg-4 col-md-5">
                  <label className="form-label fw-bold text-secondary small">
                    TO STATION
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaTrain className="text-success" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 bg-light"
                      value={toStation}
                      onChange={(e) => setToStation(e.target.value)}
                      placeholder="Enter city or station"
                      list="toStationsList"
                      required
                    />
                    <datalist id="toStationsList">
                      {POPULAR_STATIONS.map((s) => (
                        <option key={s.code} value={`${s.code} - ${s.name}`} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* DATE OF JOURNEY */}
                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-bold text-secondary small">
                    JOURNEY DATE
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaCalendarAlt className="text-success" />
                    </span>
                    <input
                      type="date"
                      className="form-control border-start-0 bg-light"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* RETURN DATE (IF ROUND TRIP) */}
                {tripType === "roundTrip" && (
                  <div className="col-lg-3 col-md-6">
                    <label className="form-label fw-bold text-secondary small">
                      RETURN DATE
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaCalendarAlt className="text-success" />
                      </span>
                      <input
                        type="date"
                        className="form-control border-start-0 bg-light"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CLASS & QUOTA SELECTION */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-secondary small">
                    CLASS PREFERENCE
                  </label>
                  <select
                    className="form-select bg-light"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    {CLASSES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold text-secondary small">
                    QUOTA
                  </label>
                  <select
                    className="form-select bg-light"
                    value={selectedQuota}
                    onChange={(e) => setSelectedQuota(e.target.value)}
                  >
                    {QUOTAS.map((q) => (
                      <option key={q.code} value={q.code}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PASSENGER DETAILS SECTION */}
              <div className="border-top pt-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="fw-bold mb-0 text-success d-flex align-items-center gap-2">
                    <FaUser /> Passenger Details (Reservation Form)
                  </h5>
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm rounded-pill d-flex align-items-center gap-1"
                    onClick={addPassenger}
                    disabled={passengers.length >= 6}
                  >
                    <FaPlus /> Add Passenger
                  </button>
                </div>

                {passengers.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 mb-3 rounded-3"
                    style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-dark small">Passenger {idx + 1}</span>
                      {passengers.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0 text-decoration-none small"
                          onClick={() => removePassenger(idx)}
                        >
                          <FaTrash /> Remove
                        </button>
                      )}
                    </div>

                    <div className="row g-2">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Full Name (as on ID proof)"
                          value={p.name}
                          onChange={(e) => updatePassenger(idx, "name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Age"
                          min="1"
                          max="120"
                          value={p.age}
                          onChange={(e) => updatePassenger(idx, "age", e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <select
                          className="form-select form-select-sm"
                          value={p.gender}
                          onChange={(e) => updatePassenger(idx, "gender", e.target.value)}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <select
                          className="form-select form-select-sm"
                          value={p.berth}
                          onChange={(e) => updatePassenger(idx, "berth", e.target.value)}
                        >
                          <option value="No Preference">No Berth Choice</option>
                          <option value="Lower">Lower Berth</option>
                          <option value="Middle">Middle Berth</option>
                          <option value="Upper">Upper Berth</option>
                          <option value="Side Lower">Side Lower</option>
                          <option value="Side Upper">Side Upper</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <select
                          className="form-select form-select-sm"
                          value={p.food}
                          onChange={(e) => updatePassenger(idx, "food", e.target.value)}
                        >
                          <option value="Veg">Veg Meal</option>
                          <option value="Non-Veg">Non-Veg Meal</option>
                          <option value="No Food">No Food</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONTACT & IRCTC USERNAME */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label className="form-label fw-bold text-secondary small">
                    IRCTC USER ID (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    placeholder="Enter IRCTC Username"
                    value={irctcUsername}
                    onChange={(e) => setIrctcUsername(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold text-secondary small">
                    MOBILE NUMBER (For SMS & PNR)
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-light"
                    placeholder="10 digit Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold text-secondary small">
                    EMAIL ID (For E-Ticket PDF)
                  </label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    placeholder="Email Address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* CHECKBOXES / ADDONS */}
              <div className="bg-light p-3 rounded-3 mb-4">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="freeCancel"
                    checked={freeCancellation}
                    onChange={(e) => setFreeCancellation(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="freeCancel">
                    <FaShieldAlt className="text-success me-1" />
                    <strong>Free Cancellation Guarantee</strong> - Get 100% instant refund if you cancel anytime before chart preparation.
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="insurance"
                    checked={travelInsurance}
                    onChange={(e) => setTravelInsurance(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="insurance">
                    Add Travel Insurance for ₹0.45 / passenger (Cover up to ₹10 Lakhs).
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autoUpgrade"
                    checked={autoUpgrade}
                    onChange={(e) => setAutoUpgrade(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="autoUpgrade">
                    Consider for Auto-Upgradation (Free upgrade to higher class if seats are empty).
                  </label>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{ background: "#038A5E" }}
              >
                <FaTicketAlt /> SEARCH TRAINS & BOOK RESERVATION
              </button>
            </form>
          </div>
        </div>

        {/* SEARCH RESULTS SECTION */}
        {searchResults && (
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h4 className="fw-bold text-dark mb-0">
                Available Trains from {fromStation} to {toStation}
              </h4>
              <p className="text-muted small">Journey Date: {journeyDate}</p>
            </div>
            <div className="card-body p-4">
              <div className="d-flex flex-column gap-3">
                {searchResults.map((train) => (
                  <div
                    key={train.number}
                    className="border rounded-3 p-3 bg-white hover-shadow transition"
                  >
                    <div className="row align-items-center">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <span className="badge bg-secondary mb-1">#{train.number}</span>
                        <h5 className="fw-bold mb-1 text-success">{train.name}</h5>
                        <p className="small text-muted mb-0">Runs on: {train.runsOn}</p>
                      </div>

                      <div className="col-md-4 mb-3 mb-md-0 text-md-center">
                        <div className="fw-bold">{train.deptTime} ➔ {train.arrTime}</div>
                        <div className="small text-muted">{train.duration}</div>
                      </div>

                      <div className="col-md-4 text-md-end">
                        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                          {train.classes.map((cls) => (
                            <button
                              key={cls.type}
                              type="button"
                              className="btn btn-outline-success btn-sm p-2 text-start"
                              style={{ minWidth: "100px" }}
                              onClick={() => handleBookNow(train, cls)}
                            >
                              <div className="fw-bold small">{cls.type}</div>
                              <div className="small text-success">{cls.status}</div>
                              <div className="fw-bold text-dark">₹{cls.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOOKING CONFIRMATION MODAL */}
        {bookingConfirmed && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 10000 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-header bg-success text-white border-0">
                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                    <FaCheckCircle /> Reservation Requested!
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setBookingConfirmed(null)}
                  />
                </div>
                <div className="modal-body p-4">
                  <div className="text-center mb-3">
                    <div className="badge bg-success-subtle text-success p-2 fs-6 mb-2">
                      PNR: {bookingConfirmed.pnr}
                    </div>
                    <h5 className="fw-bold">{bookingConfirmed.trainName} ({bookingConfirmed.trainNumber})</h5>
                    <p className="text-muted small">
                      {bookingConfirmed.from} to {bookingConfirmed.to} | Date: {bookingConfirmed.date}
                    </p>
                  </div>

                  <div className="border-top border-bottom py-3 mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Class / Seat:</span>
                      <strong className="text-success">{bookingConfirmed.classType}</strong>
                    </div>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Passengers:</span>
                      <strong>{passengers.length} Person(s)</strong>
                    </div>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Total Ticket Fare:</span>
                      <strong className="fs-5 text-success">
                        ₹{bookingConfirmed.price * passengers.length}
                      </strong>
                    </div>
                  </div>

                  <p className="small text-muted text-center mb-0">
                    A confirmation SMS & IRCTC booking link has been sent to <strong>{mobileNumber || "your mobile"}</strong>.
                  </p>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-success w-100 rounded-3"
                    onClick={() => setBookingConfirmed(null)}
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrainForm;
