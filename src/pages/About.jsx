import React, { useState } from 'react'
import banner from '../assets/assets/image/homeimg/about-banner.jpg'
import SonachalaRewards from '../common/SonachalaRewards'
import heroImg from '../assets/assets/image/homeimg/hero-bedroom.jpg'

/* ================= INQUIRY FORM ================= */
const InquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    travelType: "",
    service: "",
    date: "",
    destination: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleReset = () =>
    setForm({
      name: "",
      phone: "",
      email: "",
      category: "",
      travelType: "",
      service: "",
      date: "",
      destination: "",
      message: "",
      agree: false,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this to Firestore -> collection "aboutPageInquiries"
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="sona-card text-center py-5">
        <i className="bi bi-check-circle-fill" style={{ fontSize: "2.5rem", color: "#0F8B5F" }} />
        <h5 className="fw-bold mt-3">Thanks, {form.name.split(" ")[0] || "there"}!</h5>
        <p style={{ color: "#64748B" }} className="mb-0">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="sona-card p-4 p-md-5">
      <div className="row g-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Full Name</label>
          <input type="text" name="name" className="form-control sona-input" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Phone Number</label>
          <input type="tel" name="phone" className="form-control sona-input" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Email Address</label>
          <input type="email" name="email" className="form-control sona-input" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Category</label>
          <select name="category" className="form-select sona-input" value={form.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="Hotels">Hotels</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Holiday Packages">Holiday Packages</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        {form.category === "Travel" && (
          <div className="col-md-6">
            <label className="form-label fw-semibold">Travel Type</label>
            <select name="travelType" className="form-select sona-input" value={form.travelType} onChange={handleChange} required>
              <option value="">Select travel type</option>
              <option value="Flights">Flights</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Car Rental">Car Rental</option>
            </select>
          </div>
        )}

        <div className="col-md-6">
          <label className="form-label fw-semibold">Service Required</label>
          <input type="text" name="service" className="form-control sona-input" value={form.service} onChange={handleChange} placeholder="e.g. Deluxe Room, Airport Pickup" />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Travel Date</label>
          <input type="date" name="date" className="form-control sona-input" value={form.date} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Destination</label>
          <input type="text" name="destination" className="form-control sona-input" value={form.destination} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label fw-semibold">Message</label>
          <textarea name="message" rows={3} className="form-control sona-input" value={form.message} onChange={handleChange} placeholder="Tell us more about your requirements..." />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="agree" checked={form.agree} onChange={handleChange} id="agreeCheck" required />
            <label className="form-check-label small" htmlFor="agreeCheck" style={{ color: "#64748B" }}>
              I agree to the Terms & Privacy Policy.
            </label>
          </div>
        </div>
        <div className="col-12 d-flex gap-3">
          <button type="submit" className="btn sona-btn-primary flex-grow-1">
            Submit Inquiry
          </button>
          <button type="button" className="btn sona-btn-outline" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

/* ================= MAIN PAGE ================= */
const About = () => {
  const stats = [
    { icon: "bi-building", value: "40+", label: "Hotel Partners" },
    { icon: "bi-people", value: "10,000+", label: "Happy Customers" },
    { icon: "bi-calendar-check", value: "25,000+", label: "Bookings" },
    { icon: "bi-star-fill", value: "4.8/5", label: "Customer Rating" },
  ];

  const coreValues = [
    {
      icon: "bi-person-heart",
      title: "Customer First",
      desc: "Our users are at the heart of everything we do. We strive to exceed expectations and provide exceptional service.",
    },
    {
      icon: "bi-gem",
      title: "Quality",
      desc: "We partner with reputable establishments to ensure the highest quality standards.",
    },
    {
      icon: "bi-lightbulb",
      title: "Innovation",
      desc: "We continuously improve our platform with the latest technology to offer the best user experience.",
    },
    {
      icon: "bi-shield-check",
      title: "Trust",
      desc: "We partner with reputable establishments to ensure the highest quality standards, so you can book with confidence.",
    },
  ];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sona-about">

      {/* ================= HERO ================= */}
      <section
        className="sona-hero d-flex align-items-center justify-content-center text-center text-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="sona-hero-overlay" />
        <div className="container position-relative sona-fade-up">
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.75rem" }}>About Us</h1>
          <p className="mb-4" style={{ fontSize: "1.15rem", maxWidth: "640px", margin: "0 auto" }}>
            From Comfortable Stays to Complete Travel Solutions,{" "}
            <span style={{ color: "#10B981", fontWeight: 600 }}>We've Got You Covered.</span>
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn sona-btn-primary" onClick={() => scrollTo("sona-services")}>
              Explore Services
            </button>
            <button className="btn sona-btn-outline-light" onClick={() => scrollTo("sona-inquiry")}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <div className="container py-5">

        {/* ================= COMPANY OVERVIEW ================= */}
        <div className="row align-items-center g-5 mb-5 sona-fade-up">
          <div className="col-lg-6">
            <img
              src={heroImg}
              alt="Sonachala property"
              className="img-fluid sona-rounded shadow-sm w-100"
              style={{ height: "420px", objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-6">
            <span className="sona-label">ABOUT SONACHALA</span>
            <h2 className="fw-bold mt-2 mb-3" style={{ color: "#1E293B" }}>Company Overview</h2>
            <p style={{ color: "#64748B" }}>
              <span style={{ color: "#0F8B5F", fontWeight: 600 }}>Sonachala</span> is your
              all-in-one platform designed to enhance your travel and dining experiences,
              whether you're planning a vacation, booking a stay, or finding the perfect
              restaurant. With our comprehensive suite of services, including stays &
              hotels, restaurant reservations, and holiday packages, we aim to make your
              journey seamless and memorable.
            </p>

            <div className="row g-3 mt-3">
              {stats.map((s) => (
                <div className="col-6" key={s.label}>
                  <div className="sona-stat-card">
                    <i className={`bi ${s.icon}`} />
                    <div className="fw-bold" style={{ fontSize: "1.3rem", color: "#1E293B" }}>{s.value}</div>
                    <div className="small" style={{ color: "#64748B" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MISSION STATEMENT ================= */}
        <div className="sona-mission-card mb-5 sona-fade-up">
          <i className="bi bi-bullseye sona-mission-icon" />
          <span className="sona-mission-label">MISSION</span>
          <h3 className="fw-bold text-white mt-2 mb-3">Mission Statement</h3>
          <p className="text-white-50 mb-0" style={{ maxWidth: "780px" }}>
            At Sonachala our mission is to simplify travel and dining for everyone,
            offering a user-friendly platform that provides unparalleled convenience,
            value, and quality. We are dedicated to connecting our users with the best
            experiences, ensuring every trip and meal is extraordinary.
          </p>
        </div>

        {/* ================= OUR SERVICES ================= */}
        <div id="sona-services" className="mb-5">
          <h2 className="fw-bold text-center mb-2 sona-fade-up" style={{ color: "#1E293B" }}>Our Services</h2>
          <p className="text-center mb-4" style={{ color: "#64748B" }}>Everything you need for a seamless journey, in one place.</p>

          <div className="row g-4">
            <div className="col-md-6 sona-fade-up">
              <div className="sona-service-card">
                <i className="bi bi-building sona-service-icon" />
                <h5 className="fw-bold mb-2">Stays & Hotels</h5>
                <p className="small mb-3" style={{ color: "#64748B" }}>
                  Discover and book accommodations that suit your style and budget. From
                  luxury hotels to cozy bed-and-breakfasts, Sonachala offers a wide range
                  of options to ensure you find the perfect place to stay.
                </p>
                <ul className="sona-feature-list">
                  <li><i className="bi bi-check-circle-fill" /> Verified Hotels</li>
                  <li><i className="bi bi-check-circle-fill" /> Instant Booking</li>
                  <li><i className="bi bi-check-circle-fill" /> Detailed Listings</li>
                  <li><i className="bi bi-check-circle-fill" /> Secure Payments</li>
                  <li><i className="bi bi-check-circle-fill" /> Customer Reviews</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 sona-fade-up">
              <div className="sona-service-card">
                <i className="bi bi-cup-hot sona-service-icon" />
                <h5 className="fw-bold mb-2">Restaurants</h5>
                <p className="small mb-3" style={{ color: "#64748B" }}>
                  Find and reserve tables at top restaurants, whether you're looking for
                  a casual dining experience or a gourmet meal.
                </p>
                <ul className="sona-feature-list">
                  <li><i className="bi bi-check-circle-fill" /> Table Reservation</li>
                  <li><i className="bi bi-check-circle-fill" /> Verified Reviews</li>
                  <li><i className="bi bi-check-circle-fill" /> Popular Restaurants</li>
                  <li><i className="bi bi-check-circle-fill" /> Family Dining</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 sona-fade-up">
  <div className="sona-service-card">
    <i className="bi bi-map sona-service-icon" />
    <h5 className="fw-bold mb-2">Holiday Packages</h5>
    <p className="small mb-3" style={{ color: "#64748B" }}>
      Plan your perfect getaway with curated holiday packages that combine
      accommodations, activities, and dining across Tiruvannamalai and beyond.
    </p>

    <div className="row g-2 mb-3">
      <div className="col-6">
        <div className="sona-travel-chip">
          <i className="bi bi-flower2" /> Spiritual Tours
          <div className="sona-travel-chip-desc">Temple visits and pilgrimage packages around Arunachala.</div>
        </div>
      </div>
      <div className="col-6">
        <div className="sona-travel-chip">
          <i className="bi bi-sun" /> Weekend Getaways
          <div className="sona-travel-chip-desc">Short escapes combining stay, sightseeing, and dining.</div>
        </div>
      </div>
      <div className="col-6">
        <div className="sona-travel-chip">
          <i className="bi bi-people" /> Group Packages
          <div className="sona-travel-chip-desc">Special rates for family and group bookings.</div>
        </div>
      </div>
      <div className="col-6">
        <div className="sona-travel-chip">
          <i className="bi bi-heart" /> Honeymoon Specials
          <div className="sona-travel-chip-desc">Curated romantic stays with premium add-ons.</div>
        </div>
      </div>
    </div>

    <ul className="sona-feature-list">
      <li><i className="bi bi-check-circle-fill" /> Curated Packages</li>
      <li><i className="bi bi-check-circle-fill" /> Affordable Pricing</li>
      <li><i className="bi bi-check-circle-fill" /> Exclusive Deals</li>
      <li><i className="bi bi-check-circle-fill" /> Custom Packages</li>
    </ul>
  </div>
</div>

            <div className="col-md-6 sona-fade-up">
              <div className="sona-service-card">
                <i className="bi bi-signpost-split sona-service-icon" />
                <h5 className="fw-bold mb-2">Travel Services</h5>
                <p className="small mb-3" style={{ color: "#64748B" }}>
                  Travel with confidence using Sonachala's complete transportation
                  booking services. Whether you're planning a business trip, family
                  vacation, pilgrimage, or weekend getaway, Sonachala helps you book
                  reliable travel options quickly and securely from one platform.
                </p>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="sona-travel-chip">
                      <i className="bi bi-airplane" /> Flights
                      <div className="sona-travel-chip-desc">Book domestic and international flights with competitive pricing and instant confirmation.</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="sona-travel-chip">
                      <i className="bi bi-bus-front" /> Bus
                      <div className="sona-travel-chip-desc">Choose from trusted bus operators with multiple routes and schedules.</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="sona-travel-chip">
                      <i className="bi bi-train-front" /> Train
                      <div className="sona-travel-chip-desc">Search train availability and reserve railway tickets with ease.</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="sona-travel-chip">
                      <i className="bi bi-car-front" /> Car Rental
                      <div className="sona-travel-chip-desc">Rent self-drive or chauffeur-driven cars for local travel, sightseeing, airport pickup, and outstation trips.</div>
                    </div>
                  </div>
                </div>

                <ul className="sona-feature-list">
                  <li><i className="bi bi-check-circle-fill" /> Real-Time Availability</li>
                  <li><i className="bi bi-check-circle-fill" /> Best Fare Comparison</li>
                  <li><i className="bi bi-check-circle-fill" /> Trusted Partners</li>
                  <li><i className="bi bi-check-circle-fill" /> Secure Booking</li>
                  <li><i className="bi bi-check-circle-fill" /> Instant Confirmation</li>
                  <li><i className="bi bi-check-circle-fill" /> Easy Cancellation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CORE VALUES ================= */}
        <div className="mb-5">
          <h2 className="fw-bold text-center mb-4 sona-fade-up" style={{ color: "#1E293B" }}>Core Values</h2>
          <div className="row g-4">
            {coreValues.map((v) => (
              <div className="col-md-3 col-6 sona-fade-up" key={v.title}>
                <div className="sona-value-card">
                  <i className={`bi ${v.icon}`} />
                  <h6 className="fw-bold mt-3 mb-2">{v.title}</h6>
                  <p className="small mb-0" style={{ color: "#64748B" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= OUR TEAM ================= */}
        <div className="mb-5 sona-fade-up">
          <h2 className="fw-bold text-center mb-4" style={{ color: "#1E293B" }}>Our Team</h2>
          <div className="sona-service-card mx-auto" style={{ maxWidth: "760px", textAlign: "center" }}>
            <i className="bi bi-people-fill sona-service-icon mx-auto" />
            <h5 className="fw-bold mb-2">Travel & Hospitality Experts</h5>
            <p className="small mb-0" style={{ color: "#64748B" }}>
              Our dedicated team of travel and hospitality experts works tirelessly to
              bring you the best options and support your needs. From our experienced
              leadership to our passionate support staff, every team member is committed
              to making Sonachala your preferred travel and dining companion.
            </p>
          </div>
        </div>

        {/* ================= COMMUNITY & SUSTAINABILITY ================= */}
        <div className="sona-mission-card mb-5 sona-fade-up">
          <i className="bi bi-flower1 sona-mission-icon" />
          <h3 className="fw-bold text-white mt-2 mb-3">Community and Sustainability</h3>
          <p className="text-white-50 mb-0" style={{ maxWidth: "780px" }}>
            Sonachala believes in giving back to the community and promoting
            sustainable travel practices. We partner with local businesses and support
            eco-friendly initiatives to ensure a positive impact on the environment and
            local economies.
          </p>
        </div>

        {/* ================= VISION ================= */}
        <div className="text-center mb-5 sona-fade-up">
          <h2 className="fw-bold mb-3" style={{ color: "#1E293B", letterSpacing: "0.05em" }}>
            VISION FOR THE FUTURE
          </h2>
          <p className="mx-auto mb-4" style={{ color: "#64748B", maxWidth: "700px" }}>
            We envision Sonachala as the go-to platform for all travel and dining
            needs, continuously expanding our services and reaching new markets. Our
            goal is to keep innovating and providing our users with unparalleled
            convenience and unforgettable experiences.
          </p>
          <button className="btn sona-btn-primary" onClick={() => scrollTo("sona-services")}>
            Explore Sonachala
          </button>
        </div>
      </div>

      {/* ================= REWARDS ================= */}
      <SonachalaRewards />

      {/* ================= INQUIRY FORM ================= */}
      <section id="sona-inquiry" className="py-5" style={{ background: "#F0FDF4" }}>
        <div className="container">
          <div className="text-center mb-5 sona-fade-up">
            <h2 className="fw-bold mb-2" style={{ color: "#1E293B" }}>
              Need Help Planning Your Journey?
            </h2>
            <p className="mx-auto" style={{ color: "#64748B", maxWidth: "620px" }}>
              Have questions about hotels, restaurants, holiday packages, or travel
              bookings? Send us your inquiry and our team will contact you shortly.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-5 text-center text-white" style={{ background: "#0F8B5F" }}>
        <div className="container sona-fade-up">
          <h2 className="fw-bold mb-3">Ready to Experience Sonachala?</h2>
          <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: "620px" }}>
            Explore comfortable stays, reliable travel services, delicious dining
            experiences, and unforgettable holiday packages — all in one place.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn sona-btn-white">Book Now</button>
            <button className="btn sona-btn-outline-light" onClick={() => scrollTo("sona-services")}>
              Explore Services
            </button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .sona-about {
          font-family: 'Inter', sans-serif;
          color: #1E293B;
        }
        .sona-about h1, .sona-about h2, .sona-about h3, .sona-about h4, .sona-about h5, .sona-about h6 {
          font-family: 'Poppins', sans-serif;
        }

        /* HERO */
        .sona-hero {
          position: relative;
          min-height: 420px;
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }
        .sona-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,139,95,0.55), rgba(0,0,0,0.55));
        }

        /* BUTTONS */
        .sona-btn-primary {
          background: #0F8B5F;
          color: #fff;
          border: none;
          padding: 0.7rem 1.6rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .sona-btn-primary:hover {
          background: #0c6f4c;
          color: #fff;
          transform: translateY(-2px);
        }
        .sona-btn-outline-light {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.7);
          padding: 0.7rem 1.6rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .sona-btn-outline-light:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
          transform: translateY(-2px);
        }
        .sona-btn-outline {
          background: transparent;
          color: #0F8B5F;
          border: 1.5px solid #0F8B5F;
          padding: 0.7rem 1.6rem;
          border-radius: 12px;
          font-weight: 600;
        }
        .sona-btn-outline:hover {
          background: #F0FDF4;
          color: #0F8B5F;
        }
        .sona-btn-white {
          background: #fff;
          color: #0F8B5F;
          border: none;
          padding: 0.7rem 1.6rem;
          border-radius: 12px;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .sona-btn-white:hover {
          transform: translateY(-2px);
          color: #0c6f4c;
        }

        /* LABEL */
        .sona-label {
          display: inline-block;
          background: #F0FDF4;
          color: #0F8B5F;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
        }

        /* CARDS */
        .sona-rounded {
          border-radius: 16px;
        }
        .sona-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(15,23,42,0.06);
        }

        /* STAT CARD */
        .sona-stat-card {
          background: #F8FAFC;
          border-radius: 16px;
          padding: 1rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .sona-stat-card i {
          font-size: 1.5rem;
          color: #0F8B5F;
          margin-bottom: 0.4rem;
          display: block;
        }
        .sona-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(15,23,42,0.1);
        }

        /* MISSION / COMMUNITY CARD */
        .sona-mission-card {
          background: linear-gradient(135deg, #0F8B5F, #10B981);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
        }
        .sona-mission-icon {
          font-size: 2rem;
          color: rgba(255,255,255,0.8);
        }
        .sona-mission-label {
          display: inline-block;
          margin-left: 0.5rem;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.85);
        }

        /* SERVICE CARD */
        .sona-service-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(15,23,42,0.06);
          padding: 2rem;
          height: 100%;
          transition: all 0.3s ease;
        }
        .sona-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(15,23,42,0.12);
        }
        .sona-service-icon {
          font-size: 1.8rem;
          color: #0F8B5F;
          margin-bottom: 0.75rem;
          display: block;
        }
        .sona-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem 0.5rem;
        }
        .sona-feature-list li {
          font-size: 0.85rem;
          color: #64748B;
        }
        .sona-feature-list li i {
          color: #10B981;
          margin-right: 0.35rem;
        }

        /* TRAVEL CHIP */
        .sona-travel-chip {
          background: #F8FAFC;
          border-radius: 12px;
          padding: 0.75rem;
          font-weight: 600;
          font-size: 0.85rem;
          color: #1E293B;
        }
        .sona-travel-chip i {
          color: #0F8B5F;
          margin-right: 0.4rem;
        }
        .sona-travel-chip-desc {
          font-weight: 400;
          font-size: 0.75rem;
          color: #64748B;
          margin-top: 0.25rem;
        }

        /* VALUE CARD */
        .sona-value-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(15,23,42,0.06);
          padding: 1.5rem;
          text-align: center;
          height: 100%;
          transition: all 0.3s ease;
        }
        .sona-value-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 32px rgba(15,23,42,0.12);
        }
        .sona-value-card i {
          font-size: 1.8rem;
          color: #0F8B5F;
        }

        /* FORM INPUTS */
        .sona-input {
          border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          padding: 0.6rem 0.9rem;
        }
        .sona-input:focus {
          border-color: #0F8B5F;
          box-shadow: 0 0 0 3px rgba(15,139,95,0.1);
        }

        /* ANIMATIONS */
        .sona-fade-up {
          animation: sonaFadeUp 0.6s ease-out both;
        }
        @keyframes sonaFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .sona-feature-list {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  )
}

export default About