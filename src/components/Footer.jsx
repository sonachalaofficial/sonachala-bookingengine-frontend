import img1 from "../assets/image/componetimsges/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#1f3d34",
        color: "#ffffff",
        paddingTop: "60px",
      }}
    >
      <div className="container">
        <div className="row align-items-start">

          {/* LEFT SIDE */}
          <div className="col-md-6 mb-4">
            <img
              src={img1}
              alt="Sonachala Logo"
              style={{
                width: "200px",
                marginBottom: "20px"
              }}
            />

            <p style={{ fontSize: "14px", maxWidth: "420px" }}>
              Sonachala Technologies private limited provides smart hotel technology
              solutions including a powerful booking engine, channel
              management, and revenue optimization tools to help hotels
              increase direct bookings and maximize revenue.
            </p>
            <p style={{ fontSize: "14px", maxWidth: "420px" }}>
              <a href="https://sonachala-live.web.app" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>
                Become a Host 
              </a>
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6">
            <h6 style={{ fontWeight: "600", marginBottom: "10px" }}>
              Contact Us
            </h6>

            <div
              style={{
                width: "50px",
                borderBottom: "2px dashed #fff",
                marginBottom: "15px",
              }}
            ></div>

            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              Sonachala Technologies private limited
            </p>

            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              Annai Parvathi Nagar, Opposite to Collectorate Office,
              Vengikkal, Tiruvannamalai - 606604
            </p>

            {/* Booking Engine
            // <p style={{ fontSize: "14px", marginBottom: "6px" }}>
            //   <a
            //     href="https://sonachala-live.web.app/"
            //     style={{ color: "#fff", textDecoration: "none" }}
            //   >
            //     Booking Engine
            //   </a>
            // </p> */}

            {/* Admin Login */}
            

            {/* Phones */}
            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              📞 <a href="tel:8608601049" style={{ color: "#fff", textDecoration: "none" }}>8608601049</a>
            </p>

            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              📞 <a href="tel:8608600778" style={{ color: "#fff", textDecoration: "none" }}>8608600778</a>
            </p>

            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              📞 <a href="tel:8608600772" style={{ color: "#fff", textDecoration: "none" }}>8608600772</a>
            </p>

            {/* Emails */}
            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              ✉ <a href="mailto:sonachaloffical@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>
                sonachaloffical@gmail.com
              </a>
            </p>

            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              ✉ <a href="mailto:sonachalahelp@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>
                sonachalahelp@gmail.com
              </a>
            </p>

            <p style={{ fontSize: "14px", marginBottom: "6px" }}>
              ✉ <a href="mailto:info@sonachala.com" style={{ color: "#fff", textDecoration: "none" }}>
                info@sonachala.com
              </a>
            </p>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="row align-items-center mt-4">
          <div className="col-md-12">
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://www.facebook.com/share/1D87eESrPY/"
                target="_blank"
                rel="noopener noreferrer"
                style={socialStyle}
              >
                f
              </a>

              <a
                href="https://youtube.com/@sonachalarm"
                target="_blank"
                rel="noopener noreferrer"
                style={socialStyle}
              >
                ▶
              </a>

              <a
                href="https://www.linkedin.com/company/jk-kanakku/"
                target="_blank"
                rel="noopener noreferrer"
                style={socialStyle}
              >
                in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        style={{
          marginTop: "40px",
          padding: "15px 0",
          borderTop: "1px solid #ffffff55",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        <div style={{ marginBottom: "8px", fontWeight: "500" }}>
          Sonachala Technologies private limited
        </div>

        Copyright 2026 |
        <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
          {" "}www.sonachala.com{" "}
        </Link>
        | All rights reserved.
      </div>
    </div>
  );
};

const socialStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  color: "#1f3d34",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  textDecoration: "none",
};

export default Footer;