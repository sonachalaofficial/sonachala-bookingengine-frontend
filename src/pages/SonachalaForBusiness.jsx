import { useState } from "react";
import BrandTiers from "../common/BrandTiers";
import "./SonachalaForBusiness.css";

const properties = [
  {
    name: "Sonachala Heritage Villa",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
  },
  {
    name: "Sonachala Premium Suites",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
  },
  {
    name: "Sonachala Nest Homestay",
    image:
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=600",
  },
];

const problems = [
  {
    icon: "bi-clock-history",
    title: "Bookings largely unorganised",
    desc: "Bookings remain scattered across calls, WhatsApp, and walk-ins.",
  },
  {
    icon: "bi-exclamation-circle",
    title: "GST reconciliation = chaos",
    desc: "Incomplete invoices. Errors everywhere. Hours wasted fixing them.",
  },
  {
    icon: "bi-person-x",
    title: "No single point of contact",
    desc: "Issues bounce around. Resolution takes forever.",
  },
  {
    icon: "bi-building",
    title: "No consistency in stays",
    desc: "Unpredictable room quality. Frustrated employees.",
  },
];

const features = [
  {
    icon: "bi-headset",
    title: "Dedicated Account Management",
    desc: "A single point of contact for stays, billing, payments, and guest needs across Tamil Nadu.",
  },
  {
    icon: "bi-display",
    title: "Online or Assisted Booking",
    desc: "Self-booking tool with live inventory and contracted rates, or assisted bookings via your account manager.",
  },
  {
    icon: "bi-geo-alt",
    title: "Tamil Nadu Coverage",
    desc: "40+ properties across Tiruvannamalai, Chennai, and the surrounding spiritual circuit.",
  },
  {
    icon: "bi-easel",
    title: "MICE & Event Solutions",
    desc: "Conference halls, team offsites, training activities, and buffet catering — all under one roof.",
  },
  {
    icon: "bi-gift",
    title: "Sonachala  Rewards",
    desc: "Earn up to 5% of booking value as reward points. Redeem for gift vouchers or future stays.",
  },
  {
    icon: "bi-shield-check",
    title: "Quality You Can Count On",
    desc: "Consistently rated among the highest in the segment by our corporate guests.",
  },
];

const testimonials = [
  {
    quote:
      "Sonachala has been our preferred partner for volunteer batch stays. Rooms are always ready and billing is one clean invoice.",
    name: "Murugan K.",
    org: "Sri Ramana Ashram Trust",
  },
  {
    quote:
      "Our experience with Sonachala has always been positive, thanks to prompt responses and consistent service across all our bookings.",
    name: "Kavitha R.",
    org: "Tiruvannamalai Textiles",
  },
  {
    quote:
      "We've used Sonachala for over a year now for our team travel and it's always been smooth. Good rates and great hospitality.",
    name: "Arun S.",
    org: "Vellore Infra Projects",
  },
  {
    quote:
      "Billing is transparent and the account manager resolves everything quickly. Highly recommend Sonachala to any corporate team.",
    name: "Priya M.",
    org: "Chennai Corporate Travels",
  },
];

const whySonachala = [
  "40+ hotels and homestays across Tiruvannamalai and Tamil Nadu",
  "100% GST-compliant automated invoicing",
  "Dedicated account manager for your organisation",
  "Self-booking portal with live inventory & contracted rates",
  "MICE solutions — conferences, training, offsites",
  "Earn up to 5% rewards on every booking",
];

export default function SonachalaForBusiness() {
  const [form, setForm] = useState({
    userType: "corporate",
    company: "",
    city: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this to Firestore -> collection "businessRateCardLeads"
    setSubmitted(true);
  };

  const scrollToForm = () =>
    document.getElementById("sfb-rate-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sfb-page">
      {/* MINI HEADER */}
      <div className="sfb-mini-header py-3">
        <div className="container d-flex align-items-center gap-2">
          <i className="bi bi-triangle-fill sfb-logo-icon"></i>
          <span className="sfb-logo-text">
            SONACHALA <span className="sfb-logo-accent"></span>
          </span>
          <span className="sfb-logo-sub ms-1">FOR BUSINESS</span>
        </div>
      </div>

      {/* HERO */}
      <section className="sfb-hero py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 text-white">
              <h1 className="fw-bold display-5 mb-3">
                Wherever Work Takes You,{" "}
                <span className="sfb-gold">Business Travel Should Feel
                Effortless</span>
              </h1>
              <div className="d-flex flex-wrap gap-3 mb-4 sfb-stats-row">
                <span><strong>40+</strong> Hotels</span>
                <span className="sfb-divider">|</span>
                <span><strong>12+</strong> Towns</span>
                <span className="sfb-divider">|</span>
                <span className="sfb-gold fw-semibold">
                  Tamil Nadu's Trusted Stay Partner
                </span>
              </div>
              <p className="mb-4 text-white-50">
                Self-book in minutes, track expenses with GST-ready invoices,
                and get end-to-end support from a dedicated account manager.
              </p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <button className="btn sfb-btn-light" onClick={scrollToForm}>
                  Get Your Corporate Rate Card
                </button>
                <span className="text-white-50 small">
                  Free setup · No lock-in
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
                    className="img-fluid rounded-4 shadow sfb-collage-img"
                    alt="Sonachala room"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500"
                    className="img-fluid rounded-4 shadow sfb-collage-img mt-4"
                    alt="Sonachala lobby"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=500"
                    className="img-fluid rounded-4 shadow sfb-collage-img"
                    alt="Sonachala pool"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500"
                    className="img-fluid rounded-4 shadow sfb-collage-img mt-4"
                    alt="Sonachala suite"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND TIERS (reused) */}
      <BrandTiers />

      {/* GLIMPSE OF PROPERTIES */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <span className="sfb-eyebrow">STAY WITH US</span>
          <h2 className="fw-bold mb-5">A Glimpse of Our Properties</h2>
          <div className="row g-4">
            {properties.map((p) => (
              <div className="col-md-4" key={p.name}>
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={p.image}
                    className="card-img-top sfb-property-img"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <p className="fw-semibold mb-0">{p.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IS CORPORATE TRAVEL MESSY */}
      <section className="py-5 sfb-light-bg">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">
            Why Is Corporate Travel Still This Messy?
          </h2>
          <div className="row g-4">
            {problems.map((p) => (
              <div className="col-md-6" key={p.title}>
                <div className="card border-0 shadow-sm p-4 h-100">
                  <div className="sfb-problem-icon mb-3">
                    <i className={`bi ${p.icon}`} />
                  </div>
                  <h5 className="fw-bold mb-2">{p.title}</h5>
                  <p className="text-muted mb-0">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE PARTNER TOTAL CONTROL */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-2">
            One Partner. <span className="sfb-green-text">Total Control.</span>
          </h2>
          <p className="text-muted mb-4">
            From stays and billing to support and events, all managed by one
            trusted partner.
          </p>
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200"
            className="img-fluid rounded-4 shadow sfb-banner-img"
            alt="Sonachala partner room"
          />
        </div>
      </section>

      {/* 6 FEATURE CARDS */}
      <section className="py-5 sfb-light-bg">
        <div className="container">
          <div className="row g-4">
            {features.map((f) => (
              <div className="col-md-4" key={f.title}>
                <div className="card border-0 shadow-sm p-4 h-100 sfb-feature-card">
                  <div className="sfb-feature-icon mb-3">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h6 className="fw-bold sfb-green-text mb-2">{f.title}</h6>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <span className="sfb-eyebrow">CLIENT TESTIMONIALS</span>
          <h2 className="fw-bold mb-2">What Travel Desks Say</h2>
          <p className="text-muted mb-5">
            Real feedback from corporate travel and admin teams using
            Sonachala.
          </p>
          <div className="row g-4 text-start">
            {testimonials.map((t) => (
              <div className="col-md-6" key={t.name}>
                <div className="card border-0 shadow-sm p-4 h-100 position-relative">
                  <i className="bi bi-quote sfb-quote-icon"></i>
                  <p className="mb-4">{t.quote}</p>
                  <div className="d-flex align-items-center gap-2 mt-auto">
                    <div className="sfb-avatar">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="fw-semibold small">{t.name}</div>
                      <div className="text-muted small">{t.org}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SONACHALA */}
      <section className="py-5 sfb-light-bg">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="sfb-eyebrow">WHY SONACHALA</span>
              <h2 className="fw-bold mb-4">
                One Partner for All Your Corporate Travel Needs
              </h2>
              <ul className="list-unstyled">
                {whySonachala.map((item) => (
                  <li className="d-flex align-items-start gap-2 mb-3" key={item}>
                    <i className="bi bi-check-circle-fill sfb-check-icon mt-1"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn sfb-btn-primary" onClick={scrollToForm}>
                Get Started — It's Free <i className="bi bi-arrow-right ms-1" />
              </button>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800"
                className="img-fluid rounded-4 shadow"
                alt="Sonachala dining"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RATE CARD FORM */}
      <section className="py-5 bg-white" id="sfb-rate-form">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="sfb-eyebrow">TAKES 30 SECONDS</span>
              <h2 className="fw-bold mb-3">Get Your Custom Rate Card</h2>
              <p className="text-muted mb-4">
                Tell us about your team. We'll build a plan that fits your
                volume and routes.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check2 sfb-check-icon me-2"></i>
                  Live in 48 hours
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 sfb-check-icon me-2"></i>
                  No contracts or minimums
                </li>
                <li>
                  <i className="bi bi-check2 sfb-check-icon me-2"></i>
                  Dedicated account manager from day one
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg p-4">
                {submitted ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle-fill text-success display-6 mb-3 d-block" />
                    <h5 className="fw-bold">Thanks!</h5>
                    <p className="text-muted mb-0">
                      Your custom rate card will reach your inbox shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <label className="form-label fw-semibold mb-2">
                      I am a
                    </label>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <button
                          type="button"
                          className={`btn w-100 sfb-toggle-btn ${
                            form.userType === "corporate" ? "active" : ""
                          }`}
                          onClick={() =>
                            setForm({ ...form, userType: "corporate" })
                          }
                        >
                          Corporate — Travel Desk / Admin / HR
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className={`btn w-100 sfb-toggle-btn ${
                            form.userType === "agent" ? "active" : ""
                          }`}
                          onClick={() => setForm({ ...form, userType: "agent" })}
                        >
                          Travel Agent / TMC
                        </button>
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Company Name</label>
                        <input
                          type="text"
                          name="company"
                          className="form-control"
                          placeholder="Acme Pvt Ltd"
                          value={form.company}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          placeholder="Tiruvannamalai"
                          value={form.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="+91 ..."
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Work Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn sfb-btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                      Send Me the Rate Card <i className="bi bi-arrow-right" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}