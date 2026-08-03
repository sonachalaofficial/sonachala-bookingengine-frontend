import React from "react";
import { Link } from "react-router-dom";
import BrandDetailSections from "../../components/BrandDetailSections";
import sonachalaHotelLogo from "../../assets/assets/image/homeimg/sonachala-hotel-logo.png";

const SonachalaEliteBrand = () => {
  const stats = [
    { icon: "bi-star-fill", value: "4.9", label: "Guest Rating" },
    { icon: "bi-cup-hot-fill", value: "Curated", label: "Breakfast" },
    { icon: "bi-person-badge-fill", value: "Private", label: "Concierge" },
    { icon: "bi-car-front-fill", value: "Free", label: "Pickup" },
  ];

  const whyChoose = [
    { icon: "bi-gem", title: "Premium Suites", desc: "Elegantly designed suites with top-of-the-line furnishings." },
    { icon: "bi-stars", title: "Curated Experiences", desc: "Personalized services and exclusive experiences tailored to you." },
    { icon: "bi-person-check-fill", title: "Top-Tier Service", desc: "Dedicated concierge and staff ensuring a seamless luxury stay." },
    { icon: "bi-geo-alt-fill", title: "Prime Locations", desc: "Handpicked properties in the best locations for a truly luxurious stay." },
  ];

  return (
    <>
      <div className="container" style={{ marginTop: "80px", paddingTop: "20px", paddingBottom: "50px" }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Sonachala Hotels</li>
          </ol>
        </nav>

        {/* Title (logo removed from here, now overlays the image below) */}
        <div className="row align-items-start mb-4">
          <div className="col-md-6 mb-4">
            <h1 className="fw-bold mb-1" style={{ color: "#0F8B5F" }}>Sonachala Hotels</h1>
            <p className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
              Luxury redefined
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
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
                alt="Sonachala Hotels"
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
                src={sonachalaHotelLogo}
                alt="Sonachala Hotels Logo"
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  background: "#fff",
                  padding: "8px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>

          {/* Right: Description + Buttons + Stats */}
          <div className="col-md-6">
            <p>
              Premium suites, curated experiences, and top-tier service for guests who
              expect nothing but the best. Sonachala Hotels properties are hand-picked for
              their exceptional design, location, and hospitality standards. From
              breathtaking views to personalized concierge service, every detail is
              crafted to deliver an unforgettable luxury experience.
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

        {/* Why Choose Section - luxury-specific content, not copied from Sonachala/Premium */}
        <div
          className="mb-5"
          style={{
            background: "#F8FAFC",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          <h2 className="fw-bold text-center mb-4" style={{ color: "#0F8B5F" }}>
            Why Choose Sonachala Hotels?
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
            <h6 className="fw-bold">Premium Suites</h6>
            <p className="text-muted small">Elegantly designed suites with top-of-the-line furnishings.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Curated Experiences</h6>
            <p className="text-muted small">Personalized services and exclusive experiences tailored to you.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Top-Tier Service</h6>
            <p className="text-muted small">Dedicated concierge and staff ensuring a seamless luxury stay.</p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Prime Locations</h6>
            <p className="text-muted small">Handpicked properties in the best locations for a truly luxurious stay.</p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/hotels" className="btn btn-success btn-lg px-5">
            Browse Sonachala Hotels
          </Link>
        </div>
      </div>

      <BrandDetailSections
        brandName="Sonachala Hotel"
        images={[
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
          "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=600",
        ]}
        rooms={[
          { name: "Executive Room", desc: "Elegantly designed room with premium furnishings and a private balcony.", price: 3499 },
          { name: "Luxury Suite", desc: "Expansive suite with curated interiors, a lounge area, and premium bath amenities.", price: 4499 },
          { name: "Presidential Suite", desc: "Our finest suite, with dedicated butler service and panoramic views of Arunachala.", price: 6999 },
        ]}
        testimonials={[
          { quote: "Absolutely stunning property. The pool and the reflection at night were breathtaking.", name: "Rahul N." },
          { quote: "Top-tier service from check-in to check-out. The concierge arranged everything for our anniversary.", name: "Meera J." },
          { quote: "Worth every rupee. The Presidential Suite made our trip genuinely unforgettable.", name: "Vikram T." },
        ]}
        faqs={[
          { q: "What time is check-in and check-out?", a: "Check-in is from 2:00 PM and check-out is by 12:00 PM. Early check-in and late check-out are complimentary for Luxury Suite and above, subject to availability." },
          { q: "What is the cancellation policy?", a: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge." },
          { q: "Is breakfast included?", a: "A curated breakfast experience is included with every room type at this property." },
          { q: "Do you offer airport or station pickup?", a: "Yes, complimentary pickup is arranged for Luxury Suite and Presidential Suite guests. Standard pickup can be arranged for a nominal fee." },
          { q: "Is there a dedicated concierge service?", a: "Yes, every guest at Sonachala Hotel has access to our concierge desk for reservations, local experiences, and special requests." },
        ]}
      />
    </>
  );
};

export default SonachalaEliteBrand;