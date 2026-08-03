import React from "react";
import { Link } from "react-router-dom";
import BrandDetailSections from "../../components/BrandDetailSections";
import sonachalaLogo from "../../assets/image/componetimsges/logo1.png";

const SonachalaBrand = () => {
  const stats = [
    { icon: "bi-star-fill", value: "4.5", label: "Guest Rating" },
    { icon: "bi-wifi", value: "Free", label: "Wi-Fi" },
    { icon: "bi-currency-rupee", value: "Best", label: "Price" },
    { icon: "bi-headset", value: "24x7", label: "Support" },
  ];

  const whyChoose = [
    { icon: "bi-house-check-fill", title: "Clean & Comfortable", desc: "Well-maintained rooms with essential amenities for a restful stay." },
    { icon: "bi-emoji-smile-fill", title: "Warm Hospitality", desc: "Friendly staff dedicated to making your stay pleasant and hassle-free." },
    { icon: "bi-cash-coin", title: "Honest Pricing", desc: "Transparent rates with no hidden charges, great value for money." },
    { icon: "bi-geo-alt-fill", title: "Convenient Location", desc: "Easy access to Arunachala and popular local attractions." },
  ];

  return (
    <>
      <div className="container" style={{ marginTop: "80px", paddingTop: "20px", paddingBottom: "50px" }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Sonachala</li>
          </ol>
        </nav>

        {/* Title (logo removed from here, now overlays the image below) */}
        <div className="row align-items-start mb-4">
          <div className="col-md-6 mb-4">
            <h1 className="fw-bold mb-1" style={{ color: "#0F8B5F" }}>Sonachala</h1>
            <p className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
              Comfort you can count on
            </p>
            <div
              style={{
                width: "70px",
                height: "4px",
                background: "#0F8B5F",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div className="row align-items-start mb-5">
          {/* Left: Image with logo badge on top-left corner */}
          <div className="col-md-6">
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="Sonachala"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  borderRadius: "24px",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.18)",
                  display: "block",
                }}
              />
              <img
                src={sonachalaLogo}
                alt="Sonachala Logo"
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  background: "#0F8B5F",
                  padding: "8px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>

          {/* Right: Description + Buttons + Stats */}
          <div className="col-md-6">
            <p>
              Affordable, dependable stays for every traveller. Clean rooms, warm hospitality,
              and honest pricing near Arunachala. Whether you're visiting for pilgrimage,
              business, or leisure, Sonachala gives you a comfortable base without stretching
              your budget. With every stay, we aim to make your journey simple, reliable,
              and worry-free.
            </p>

            <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
              <Link
                to="/hotels"
                className="btn btn-lg px-4 d-flex align-items-center gap-2"
                style={{ background: "#0F8B5F", color: "#fff", borderRadius: "12px", fontWeight: 600, border: "none" }}
              >
                <i className="bi bi-calendar-check"></i> Book Now
              </Link>
              <Link
                to="/hotels"
                className="btn btn-lg px-4 d-flex align-items-center gap-2"
                style={{ background: "transparent", color: "#0F8B5F", borderRadius: "12px", fontWeight: 600, border: "2px solid #0F8B5F" }}
              >
                <i className="bi bi-house-door"></i> Explore Rooms
              </Link>
            </div>

            <div className="row g-3 text-center">
              {stats.map((s) => (
                <div className="col-3" key={s.label}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "#E6F7EF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                    }}
                  >
                    <i className={`bi ${s.icon}`} style={{ fontSize: "1.4rem", color: "#0F8B5F" }} />
                  </div>
                  <div className="fw-bold small" style={{ color: "#1E293B" }}>{s.value}</div>
                  <div className="small text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Section - matches Premium layout */}
        <div
          className="mb-5"
          style={{
            background: "#F8FAFC",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          <h2 className="fw-bold text-center mb-4" style={{ color: "#0F8B5F" }}>
            Why Choose Sonachala?
          </h2>
          <div className="row g-4">
            {whyChoose.map((item) => (
              <div className="col-md-3 col-6 text-center" key={item.title}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <i className={`bi ${item.icon}`} style={{ fontSize: "1.4rem", color: "#0F8B5F" }} />
                </div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="fw-bold mb-3">What to expect</h3>
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <h6 className="fw-bold">Clean & Comfortable Rooms</h6>
            <p className="text-muted small">Well-maintained rooms with essential amenities for a restful stay.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Warm Hospitality</h6>
            <p className="text-muted small">Friendly staff dedicated to making your stay pleasant and hassle-free.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Honest Pricing</h6>
            <p className="text-muted small">Transparent rates with no hidden charges, great value for money.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Convenient Location</h6>
            <p className="text-muted small">Easy access to Arunachala and popular local attractions.</p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/hotels" className="btn btn-success btn-lg px-5">
            Browse Sonachala Stays
          </Link>
        </div>
      </div>

      <BrandDetailSections
        brandName="Sonachala"
        images={[
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
          "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=600",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
          "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=600",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
        ]}
        rooms={[
          { name: "Standard Room", desc: "Comfortable room with essential amenities, ideal for solo travellers or couples.", price: 1199 },
          { name: "Deluxe Room", desc: "Slightly larger room with upgraded bedding and a work desk.", price: 1499 },
          { name: "Family Room", desc: "Extra space for families, with an additional bed available on request.", price: 1799 },
        ]}
        testimonials={[
          { quote: "Very clean and simple, exactly what we needed for our Girivalam visit. Great value for money.", name: "Deepa R." },
          { quote: "Honest pricing, no hidden charges. Staff were friendly and helpful throughout our stay.", name: "Karthik S." },
          { quote: "Booked last minute and the room matched exactly what was shown on the site. Would stay again.", name: "Priya M." },
        ]}
        faqs={[
          { q: "What time is check-in and check-out?", a: "Check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged on request, subject to availability." },
          { q: "What is the cancellation policy?", a: "Free cancellation up to 24 hours before check-in. Cancellations within 24 hours are subject to a one-night charge." },
          { q: "Is breakfast included?", a: "Complimentary breakfast is included with most room types. Please check your specific booking for details." },
          { q: "Do you allow pets?", a: "Pets are not permitted at this property, with the exception of registered service animals." },
          { q: "Is this property good for budget travellers?", a: "Yes — Sonachala is our most affordable tier, designed for travellers who want clean, dependable rooms without extra frills." },
        ]}
      />
    </>
  );
};

export default SonachalaBrand;