import React from "react";
import { Link } from "react-router-dom";
import BrandDetailSections from "../../components/BrandDetailSections";
import sonachalaPremiumLogo from "../../assets/assets/image/homeimg/sonachala-premium-logo.png";

const SonachalaPremiumBrand = () => {
  const stats = [
    { icon: "bi-star-fill", value: "4.8", label: "Guest Rating" },
    { icon: "bi-wifi", value: "Free", label: "Wi-Fi" },
    { icon: "bi-shield-check", value: "Safe &", label: "Secure Stay" },
    { icon: "bi-headset", value: "24x7", label: "Support" },
  ];

  const whyChoose = [
    { icon: "bi-house-heart-fill", title: "Elevated Comfort", desc: "Upgraded interiors and bigger rooms for a more refined stay." },
    { icon: "bi-gem", title: "Premium Amenities", desc: "Better bedding, toiletries, and thoughtful in-room touches." },
    { icon: "bi-geo-alt-fill", title: "Prime Location", desc: "Conveniently close to Arunachala and key attractions." },
    { icon: "bi-emoji-smile-fill", title: "Flawless Service", desc: "Attentive staff dedicated to a smooth, memorable stay." },
  ];

  return (
    <>
    <div className="container" style={{ marginTop: "80px", paddingTop: "20px", paddingBottom: "50px" }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Sonachala Premium</li>
        </ol>
      </nav>

      {/* Title (logo removed from here, now overlays the image below) */}
      <div className="row align-items-start mb-4">
        <div className="col-md-6 mb-4">
          <h1 className="fw-bold mb-1" style={{ color: "#0F8B5F" }}>Sonachala Premium</h1>
          <p className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            Elevated comfort, closer to the divine
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
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
              alt="Sonachala Premium"
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
              src={sonachalaPremiumLogo}
              alt="Sonachala Premium Logo"
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
            Inviting decor with added comfort — perfect for travellers who want a little
            more space and a flawless stay. Sonachala Premium properties offer upgraded
            amenities, bigger rooms, and a more refined experience for discerning guests.
            Every stay is thoughtfully curated to bring you closer to comfort, calm, and
            the spiritual charm of Tiruvannamalai.
          </p>

          <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
            <Link
              to="/hotels"
              className="btn btn-lg px-4 d-flex align-items-center gap-2"
              style={{ background: "#0F8B5F", color: "#fff", borderRadius: "12px", fontWeight: 600, border: "none" }}
            >
              <i className="bi bi-calendar-check"></i> Book Your Stay
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

      {/* Why Choose Section */}
      <div
        className="mb-5"
        style={{
          background: "#F8FAFC",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        <h2 className="fw-bold text-center mb-4" style={{ color: "#0F8B5F" }}>
          Why Choose Sonachala Premium?
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
          <h6 className="fw-bold">Spacious Rooms</h6>
          <p className="text-muted small">Larger rooms with premium furnishings for extra comfort.</p>
        </div>
        <div className="col-md-3">
          <h6 className="fw-bold">Upgraded Amenities</h6>
          <p className="text-muted small">Enhanced facilities including better bedding, toiletries, and services.</p>
        </div>
        <div className="col-md-3">
          <h6 className="fw-bold">Flawless Service</h6>
          <p className="text-muted small">Attentive staff trained to deliver a smooth, memorable stay.</p>
        </div>
        <div className="col-md-3">
          <h6 className="fw-bold">Prime Location</h6>
          <p className="text-muted small">Conveniently situated close to Arunachala and key attractions.</p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/hotels" className="btn btn-success btn-lg px-5">
          Browse Sonachala Premium Stays
        </Link>
      </div>
    </div>
    <BrandDetailSections
  brandName="Sonachala Premium"
  images={[
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
    "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=600",
  ]}
  rooms={[
    { name: "Premium Room", desc: "Upgraded furnishings with added comfort and a scenic view, perfect for a flawless stay.", price: 2199 },
    { name: "Premium Twin", desc: "Two comfortable single beds, ideal for friends or colleagues travelling together.", price: 2399 },
    { name: "Premium Suite", desc: "Spacious suite with a separate living area, ideal for extended stays.", price: 2999 },
  ]}
  testimonials={[
    { quote: "Beautiful decor and very comfortable beds. Felt genuinely premium for the price we paid.", name: "Anitha V." },
    { quote: "Loved the extra space in the Premium Suite — perfect for our family trip to the temple.", name: "Suresh K." },
    { quote: "Closer to the temple than we expected, and the staff were extremely attentive to every request.", name: "Divya R." },
  ]}
  faqs={[
    { q: "What time is check-in and check-out?", a: "Check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged on request, subject to availability." },
    { q: "What is the cancellation policy?", a: "Free cancellation up to 24 hours before check-in. Cancellations within 24 hours are subject to a one-night charge." },
    { q: "Is breakfast included?", a: "Complimentary breakfast is included with all Premium room types." },
    { q: "Can I upgrade to a Premium Suite after booking?", a: "Yes, subject to availability. Contact our support team and we'll arrange the upgrade for a small difference in rate." },
    { q: "Do you allow pets?", a: "Pets are not permitted at this property, with the exception of registered service animals." },
  ]}
/>
    </>
  );
};



export default SonachalaPremiumBrand;