import { useState } from "react";
import "./HotelDevelopment.css";
import BrandTiers from "../common/BrandTiers";

const stats = [
  { icon: "bi-building", value: "40+", label: "Hotels" },
  { icon: "bi-door-open", value: "600+", label: "Keys" },
  { icon: "bi-geo-alt", value: "12+", label: "Towns" },
];

const models = [
  {
    title: "Manchising",
    desc: "Under this model, the hotel operates under the Sonachala brand while the owner manages day-to-day operations.",
  },
  {
    title: "Management Contract",
    desc: "We license the Sonachala brand to the hotel owner and also take charge of daily operations on behalf of ownership.",
  },
  {
    title: "Revenue Share",
    desc: "For a truly hands-off approach, we take full control of the hotel's operations and sales.",
  },
];

export default function HotelDevelopment() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    remarks: "",
    propertyName: "",
    keys: "",
    city: "",
    status: "",
    address: "",
    pincode: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this to Firestore -> collection "hotelDevelopmentLeads"
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document
      .getElementById("hd-callback-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hd-page">
      {/* HERO */}
      <section className="hd-hero d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 className="fw-bold display-5 mb-4">
            Trusted by Partners, <br />
            L<i className="bi bi-heart-fill hd-heart mx-1"></i>ved by Guests
          </h1>
          <button className="btn hd-btn-light" onClick={scrollToForm}>
            List Your Property
          </button>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">About Us</h2>
          <p className="text-muted mx-auto mb-2" style={{ maxWidth: "760px" }}>
            At Sonachala Hotels, we are shaping the future of comfortable,
            trustworthy stays around Tiruvannamalai and Tamil Nadu's
            spiritual circuit. With a portfolio of dependable brands and a
            proven track record of quality and guest delight, we are building
            a hospitality ecosystem primed for sustained growth.
          </p>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: "760px" }}>
            As we continue to expand our footprint, we invite property
            owners to partner with us, unlocking new markets and creating
            long-term value together.
          </p>
          <button className="btn hd-btn-primary mb-5" onClick={scrollToForm}>
            Partner With Us
          </button>

          <div className="row justify-content-center g-4">
            {stats.map((s) => (
              <div className="col-4 col-md-3" key={s.label}>
                <i className={`bi ${s.icon} hd-stat-icon d-block mb-2`} />
                <div className="fw-bold hd-stat-value">{s.value}</div>
                <div className="text-muted small">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMERCIAL MODELS */}
      <section className="py-5 hd-models-bg">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Our Commercial Models</h2>
          <div className="row g-4">
            {models.map((m) => (
              <div className="col-md-4" key={m.title}>
                <div className="card h-100 border-0 shadow-sm hd-model-card p-4">
                  <h5 className="fw-bold hd-model-title mb-3">{m.title}</h5>
                  <p className="text-muted small mb-0">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND TIERS */}
      <BrandTiers />

      {/* REQUEST A CALLBACK */}
      <section className="py-5 hd-form-section" id="hd-callback-form">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="hd-callback-panel h-100 p-4 rounded-3 d-flex flex-column justify-content-center">
                <h3 className="fw-bold mb-4">Request a Callback</h3>
                <button
                  type="button"
                  className="btn hd-btn-primary"
                  onClick={() =>
                    document.getElementById("hd-name")?.focus()
                  }
                >
                  Partner With Us
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="col-lg-9">
                <div className="card border-0 shadow-sm p-5 text-center h-100 d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-success display-5 mb-3" />
                  <h5 className="fw-bold">
                    Thanks, {form.name.split(" ")[0] || "there"}!
                  </h5>
                  <p className="text-muted mb-0">
                    Our hotel development team will reach out shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="col-lg-9">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100">
                      <h6 className="fw-bold hd-form-heading mb-3">
                        Your Details
                      </h6>
                      <div className="mb-3">
                        <label className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          id="hd-name"
                          type="text"
                          name="name"
                          className="form-control"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Phone Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Email ID <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Remarks</label>
                        <textarea
                          name="remarks"
                          className="form-control"
                          rows={3}
                          value={form.remarks}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100">
                      <h6 className="fw-bold hd-form-heading mb-3">
                        Property Information
                      </h6>
                      <div className="mb-3">
                        <label className="form-label">
                          Property Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="propertyName"
                          className="form-control"
                          value={form.propertyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Number of Keys <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          name="keys"
                          className="form-control"
                          value={form.keys}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          City <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          value={form.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Property/Asset Status{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          name="status"
                          className="form-select"
                          value={form.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select status</option>
                          <option value="operational">
                            Operational Hotel
                          </option>
                          <option value="under-construction">
                            Under Construction
                          </option>
                          <option value="plot">Plot / Land</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Google Pin / Hotel Address{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={form.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">
                          Pincode <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          className="form-control"
                          value={form.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-end">
                    <button
                      type="submit"
                      className="btn hd-btn-primary px-5"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}