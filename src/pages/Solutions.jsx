import "./Solutions.css";

const technologyFeatures = [
  {
    icon: "bi-cpu",
    title: "Booking Engine",
    desc: "A fast, mobile-friendly booking engine that drives direct bookings and reduces OTA dependency.",
  },
  {
    icon: "bi-diagram-3",
    title: "Channel Management",
    desc: "Real-time inventory, rates and availability — synced automatically across every channel you sell on.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Revenue Optimization",
    desc: "Dynamic pricing, occupancy insights and analytics that help hotels maximise revenue per available room.",
  },
  {
    icon: "bi-plug",
    title: "PMS & Operations Connect",
    desc: "Seamless connection between reservations, central reserve, front desk and your property management system.",
  },
];

const hospitalityFeatures = [
  {
    icon: "bi-bell",
    title: "Guest-First Service",
    desc: "Every stay begins and ends with warm, attentive service across our properties.",
  },
  {
    icon: "bi-buildings",
    title: "Curated Properties",
    desc: "Heritage villas, premium suites and homestays — each one chosen for comfort and character.",
  },
  {
    icon: "bi-heart",
    title: "Local Experiences",
    desc: "Spiritual circuits, local cuisine and cultural immersion — not just a room, a journey.",
  },
  {
    icon: "bi-hand-thumbs-up",
    title: "Consistent Quality",
    desc: "Clean rooms, transparent billing and dependable hospitality — every single time.",
  },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Solutions() {
return (
    <div className="sol-page">
      {/* HERO */}
      <section className="sol-hero py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-white">
              <span className="sol-eyebrow sol-eyebrow-dark">
                SOLUTIONS BY SONACHALA
              </span>
              <h1 className="fw-bold display-5 mb-3">
                Smart Technology.{" "}
                <span className="sol-gold">Genuine Hospitality.</span>
              </h1>
              <p className="mb-4 text-white-50">
                From a powerful booking engine to warm, guest-first
                hospitality — explore the solutions we build for hotels,
                homestays and the travellers who love them.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn sol-btn-light"
                  onClick={() => scrollTo("sol-technology")}
                >
                  <i className="bi bi-cpu me-2"></i>Technology Solutions
                </button>
                <button
                  className="btn sol-btn-outline"
                  onClick={() => scrollTo("sol-hospitality")}
                >
                  <i className="bi bi-bell me-2"></i>Hospitality
                </button>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="sol-hero-card text-white">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="sol-stat-badge">4+</div>
                  <div>
                    <h5 className="mb-0 fw-bold">Technology Pillars</h5>
                    <span className="text-white-50 small">
                      Powering modern hotel operations
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="sol-stat-badge">40+</div>
                  <div>
                    <h5 className="mb-0 fw-bold">Hospitality Properties</h5>
                    <span className="text-white-50 small">
                      Across Tamil Nadu's spiritual circuit
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="sol-stat-badge">100%</div>
                  <div>
                    <h5 className="mb-0 fw-bold">Guest-First Commitment</h5>
                    <span className="text-white-50 small">
                      Warmth and consistency at every stay
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* TECHNOLOGY */}
      <section id="sol-technology" className="py-5 sol-light-bg">
        <div className="container">
          <div className="text-center mb-4">
            <span className="sol-eyebrow">TECHNOLOGY</span>
            <h2 className="fw-bold">
              Technology That Powers{" "}
              <span className="sol-green-text">Modern Hospitality</span>
            </h2>
            <p className="text-muted mb-0">
              Smart hotel technology solutions — from a powerful booking
              engine to channel management and revenue optimization tools.
            </p>
          </div>
          <div className="row g-4">
            {technologyFeatures.map((f) => (
              <div className="col-md-6 col-lg-3" key={f.title}>
                <div className="card border-0 shadow-sm p-4 h-100 sol-card">
                  <div className="sol-card-icon sol-card-icon-light mb-3">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p className="text-muted mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a
              href="https://www.sonachala.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn sol-btn-primary"
            >
              Explore Technology on sonachala.in
              <i className="bi bi-box-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>
{/* HOSPITALITY */}
      <section id="sol-hospitality" className="py-5 sol-dark-bg">
        <div className="container">
          <div className="text-center mb-4">
            <span className="sol-eyebrow sol-eyebrow-dark">HOSPITALITY</span>
            <h2 className="fw-bold text-white">
              Hospitality That{" "}
              <span className="sol-gold">Feels Like Home</span>
            </h2>
            <p className="text-white-50 mb-0">
              Heritage villas, premium suites and homestays — curated around
              guest comfort and the warmth of Tamil Nadu.
            </p>
          </div>
          <div className="row g-4">
            {hospitalityFeatures.map((f) => (
              <div className="col-md-6 col-lg-3" key={f.title}>
                <div
                  className="card border-0 h-100 sol-card sol-card-dark"
                  style={{ backgroundColor: "#0d2b1e" }}
                >
                  <div className="sol-card-icon mb-3">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h5 className="fw-bold mb-2 text-white">{f.title}</h5>
                  <p className="text-white-50 mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a
              href="https://hospitality.sonachala.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn sol-btn-gold"
            >
              Explore Hospitality
              <i className="bi bi-box-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">
            Ready to Grow with <span className="sol-green-text">Sonachala?</span>
          </h2>
          <p className="text-muted mb-4">
            Explore our technology platform or partner with us on a
            hospitality journey.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a
              href="https://www.sonachala.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn sol-btn-primary"
            >
              <i className="bi bi-cpu me-2"></i>Technology Solutions
            </a>
            <a
              href="https://hospitality.sonachala.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn sol-btn-outline"
            >
              <i className="bi bi-bell me-2"></i>Hospitality
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}