import React from "react";
import { Link } from "react-router-dom";
import BrandDetailSections from "../../components/BrandDetailSections";
import nammaStayLogo from "../../assets/assets/image/homeimg/y-spot-logo.png";

const SonachalaNestBrand = () => {
  const stats = [
    { icon: "bi-star-fill", value: "4.8", label: "Guest Rating" },
    { icon: "bi-wifi", value: "Free", label: "Wi-Fi" },
    { icon: "bi-shield-check", value: "Safe &", label: "Secure Stay" },
    { icon: "bi-headset", value: "24x7", label: "Support" },
  ];

  const whyChoose = [
    { icon: "bi-cash-coin", title: "Pocket-Friendly", desc: "Great rates without compromising on comfort or cleanliness." },
    { icon: "bi-people-fill", title: "Meet Fellow Travellers", desc: "Shared spaces designed to help you connect with other backpackers." },
    { icon: "bi-geo-alt-fill", title: "Prime Location", desc: "Close to key attractions and easy to reach." },
    { icon: "bi-lock-fill", title: "Secure Lockers", desc: "Personal lockers and 24x7 staff support for peace of mind." },
  ];

  return (
   <> 
    <div className="container" style={{ marginTop: "80px", paddingTop: "20px", paddingBottom: "50px" }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Namma Spot</li>
        </ol>
      </nav>

      {/* Title (logo removed from here, now overlays the image below) */}
      <div className="row align-items-start mb-4">
        <div className="col-md-6 mb-4">
          <h1 className="fw-bold mb-1" style={{ color: "#0F8B5F" }}>Namma Spot</h1>
          <p className="text-muted mb-2" style={{ fontSize: "1.1rem" }}>
            Budget-friendly, youth-focused stays
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
              src="https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800"
              alt="Namma Spot"
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
              src={nammaStayLogo}
              alt="Namma Stay Logo"
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
            Cozy, affordable homestays perfect for solo travellers, students, and
            backpackers. Namma Stay is designed for guests
            who want a comfortable place to rest without spending too much. Each
            stay is thoughtfully arranged to give you a warm, homely feel while
            keeping your budget in check.
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
          Why Choose Namma Spot?
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
          <h6 className="fw-bold">Budget-Friendly Rates</h6>
          <p className="text-muted small">Pocket-friendly pricing ideal for students and backpackers.</p>
        </div>
        <div className="col-md-3">
          <h6 className="fw-bold">Cozy Homestays</h6>
          <p className="text-muted small">Comfortable, homely accommodations with a personal touch.</p>
        </div>
        <div className="col-md-3">
          <h6 className="fw-bold">Social & Friendly</h6>
          <p className="text-muted small">Great for meeting fellow travellers and sharing experiences.</p>
        </div>
        <div className="col-md-3">
          <h6 className="fw-bold">Safe & Secure</h6>
          <p className="text-muted small">24/7 assistance and secure stays for solo and group travellers.</p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/hotels" className="btn btn-success btn-lg px-5">
          Browse Namma Spot Stays
        </Link>
      </div>
    </div>
   
   <BrandDetailSections
  brandName="Sonachala Nest"
  images={[
    "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=600",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
    "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=600",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
  ]}
  rooms={[
    { name: "Shared Dorm Bed", desc: "A bunk bed in a shared dorm room with lockers, ideal for solo backpackers.", price: 499 },
    { name: "Private Pod", desc: "A compact private sleeping pod with curtain privacy and personal charging point.", price: 899 },
    { name: "Twin Room", desc: "A private room with two single beds, perfect for friends travelling together.", price: 1299 },
  ]}
  testimonials={[
    { quote: "Best budget stay in the area! Met so many fellow travellers in the common area.", name: "Aravind M." },
    { quote: "Super affordable and clean. Loved the vibe, felt like a proper backpacker hostel.", name: "Sneha K." },
    { quote: "Lockers were secure and the staff gave great tips for exploring the area on a budget.", name: "Farhan A." },
  ]}
  faqs={[
    { q: "What time is check-in and check-out?", a: "Check-in is from 12:00 PM and check-out is by 10:00 AM. Luggage storage is available for early arrivals and late departures." },
    { q: "What is the cancellation policy?", a: "Free cancellation up to 24 hours before check-in. Cancellations within 24 hours are subject to a one-night charge." },
    { q: "Is breakfast included?", a: "A simple complimentary breakfast is included with dorm and pod bookings." },
    { q: "Are lockers provided in the dorm?", a: "Yes, every guest gets access to a personal locker. We recommend bringing your own padlock." },
    { q: "Is there a common area to meet other travellers?", a: "Yes, we have a shared lounge and rooftop area where guests can relax and connect with fellow travellers." },
  ]}
/>
    </>
  );
};

export default SonachalaNestBrand;