import { useState } from "react";
import "./CorporateEnquiry.css";

// Sonachala brand tokens
// --sona-green: #0F7A4C (primary)
// --sona-green-dark: #0A5C3A
// --sona-gold: #D4A94C (accent, replaces FabHotels yellow)

const clients = [
  "Sri Ramana Ashram Trust",
  "Vellore Infra Projects",
  "Hrify Technologies",
  "Chennai Corporate Travels",
  "Metro Textiles Ltd",
  "Southern Logistics Group",
  "Bright Path Foundation",
  "Coastal Enterprises",
];

const promises = [
  {
    icon: "bi-percent",
    title: "Exclusive corporate rates",
    desc: "Negotiated pricing across all our partner properties, wherever your team travels.",
  },
  {
    icon: "bi-receipt",
    title: "Centralized billing",
    desc: "One consolidated monthly invoice for every stay booked under your company.",
  },
  {
    icon: "bi-laptop",
    title: "Tech enabled experience",
    desc: "Book, track and manage employee stays from a single dashboard.",
  },
  {
    icon: "bi-hand-thumbs-up",
    title: "High employee satisfaction",
    desc: "Comfortable rooms with the amenities business travelers actually look for.",
  },
  {
    icon: "bi-headset",
    title: "24/7 booking support",
    desc: "Round-the-clock help from our dedicated corporate travel desk.",
  },
  {
    icon: "bi-patch-check",
    title: "Priority reservations",
    desc: "Room availability held for you even during peak travel season.",
  },
];

const amenities = [
  { icon: "bi-wifi", label: "Free WiFi" },
  { icon: "bi-tv", label: "TV" },
  { icon: "bi-snow", label: "AC" },
  { icon: "bi-camera-video", label: "24x7 Security" },
  { icon: "bi-bag-check", label: "Clean Towels" },
  { icon: "bi-droplet", label: "Hot Water" },
  { icon: "bi-basket2", label: "Toiletries" },
  { icon: "bi-person-badge", label: "Room Service" },
];

export default function CorporateEnquiry() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this to Firestore -> collection "corporateEnquiries"
    setSubmitted(true);
  };

  return (
    <div className="sona-corporate">
      {/* HERO + FORM */}
      <section className="sona-hero py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-white mb-3">
                Corporate travel, <span className="text-gold">simplified.</span>
              </h1>
              <p className="lead text-white-50">
                Streamline your team's stays across every city you operate in
                with exclusive rates and centralized billing.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-md-7">
                  <div className="card sona-form-card border-0 shadow-lg p-4 h-100">
                    {submitted ? (
                      <div className="text-center py-4">
                        <i className="bi bi-check-circle-fill text-success display-6 mb-3 d-block" />
                        <h5 className="fw-bold">Thanks, {form.name.split(" ")[0] || "there"}!</h5>
                        <p className="text-muted mb-0">
                          Our corporate desk will call you back shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Your name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Phone number
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">+91</span>
                            <input
                              type="tel"
                              name="phone"
                              className="form-control"
                              value={form.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Work email
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
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            Company name
                          </label>
                          <input
                            type="text"
                            name="company"
                            className="form-control"
                            value={form.company}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-gold w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        >
                          Request a callback <i className="bi bi-arrow-right" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                <div className="col-md-5 d-none d-md-flex flex-column gap-3">
                  <div className="card sona-testimonial-card border-0 h-50 p-3 text-white">
                    <p className="small mb-2">
                      "Sonachala has handled our team's monthly offsite
                      stays for over a year. Rooms are always ready and
                      billing is one clean invoice."
                    </p>
                    <div className="mt-auto small fw-semibold">
                      Murugan K. <span className="text-white-50 fw-normal">— Ashram Trust</span>
                    </div>
                  </div>
                  <div className="card sona-dashboard-card border-0 h-50 p-3">
                    <div className="small text-muted mb-2">Corporate Dashboard</div>
                    <div className="d-flex gap-2 mb-2">
                      <span className="badge sona-badge">Stays</span>
                      <span className="badge bg-light text-dark">Travel</span>
                      <span className="badge bg-light text-dark">Buses</span>
                    </div>
                    <div className="small fw-semibold">Good morning, Team!</div>
                    <div className="small text-muted">
                      12 upcoming stays this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HAPPY CLIENTS */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h6 className="text-muted text-uppercase mb-4">Our happy clients</h6>
          <div className="row row-cols-2 row-cols-md-4 g-4 align-items-center">
            {clients.map((c) => (
              <div className="col" key={c}>
                <div className="sona-client-chip py-3 px-2 rounded-3 fw-semibold text-secondary">
                  {c}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="py-5 sona-light-bg">
        <div className="container">
          <h2 className="fw-bold mb-4">Our promise</h2>
          <div className="row g-4">
            {promises.map((p) => (
              <div className="col-md-6" key={p.title}>
                <div className="card border-0 shadow-sm p-4 h-100">
                  <i className={`bi ${p.icon} sona-icon mb-3`} />
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted mb-0">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES STRIP */}
      <section className="py-5 sona-strip text-white">
        <div className="container text-center">
          <span className="badge sona-badge-pill mb-3">Fabulous, or Free</span>
          <h2 className="fw-bold mb-2">
            Great <span className="text-gold">sleep.</span> Refreshing{" "}
            <span className="text-gold">showers.</span>
          </h2>
          <p className="text-white-50 mb-4">
            Hassle free stay, else we refund. <a href="#" className="text-white text-decoration-underline">Know more.</a>
          </p>
          <div className="row row-cols-4 row-cols-md-8 g-4 justify-content-center">
            {amenities.map((a) => (
              <div className="col" key={a.label}>
                <div className="sona-amenity mx-auto mb-2">
                  <i className={`bi ${a.icon}`} />
                </div>
                <div className="small">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}