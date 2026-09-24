// import img1 from "../assets/image/componetimsges/logo.png";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div
//       style={{
//         backgroundColor: "#1f3d34",
//         color: "#ffffff",
//         paddingTop: "60px",
//       }}
//     >
//       <div className="container">
//         <div className="row align-items-start">

//           {/* LEFT SIDE */}
//           <div className="col-md-6 mb-4">
//             <img
//               src={img1}
//               alt="Sonachala Logo"
//               style={{
//                 width: "200px",
//                 marginBottom: "20px"
//               }}
//             />

//             <p style={{ fontSize: "14px", maxWidth: "420px" }}>
//               Sonachala Technologies private limited provides smart hotel technology
//               solutions including a powerful booking engine, channel
//               management, and revenue optimization tools to help hotels
//               increase direct bookings and maximize revenue.
//             </p>
//             <p style={{ fontSize: "14px", maxWidth: "420px" }}>
//               <a href="https://sonachala-live.web.app" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>
//                 Become a Host 
//               </a>
//             </p>

//           </div>

//           {/* RIGHT SIDE */}
//           <div className="col-md-6">
//             <h6 style={{ fontWeight: "600", marginBottom: "10px" }}>
//               Contact Us
//             </h6>

//             <div
//               style={{
//                 width: "50px",
//                 borderBottom: "2px dashed #fff",
//                 marginBottom: "15px",
//               }}
//             ></div>

//             <p style={{ fontSize: "14px", marginBottom: "8px" }}>
//               Sonachala Technologies private limited
//             </p>

//             <p style={{ fontSize: "14px", marginBottom: "8px" }}>
//               Annai Parvathi Nagar, Opposite to Collectorate Office,
//               Vengikkal, Tiruvannamalai - 606604
//             </p>

//             {/* Booking Engine
//             // <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//             //   <a
//             //     href="https://sonachala-live.web.app/"
//             //     style={{ color: "#fff", textDecoration: "none" }}
//             //   >
//             //     Booking Engine
//             //   </a>
//             // </p> */}

//             {/* Admin Login */}


//             {/* Phones */}
//             <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//               📞 <a href="tel:8608601049" style={{ color: "#fff", textDecoration: "none" }}>8608601049</a>
//             </p>

//             <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//               📞 <a href="tel:8608600778" style={{ color: "#fff", textDecoration: "none" }}>8608600778</a>
//             </p>

//             <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//               📞 <a href="tel:8608600772" style={{ color: "#fff", textDecoration: "none" }}>8608600772</a>
//             </p>

//             {/* Emails */}
//             <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//               ✉ <a href="mailto:sonachaloffical@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>
//                 sonachaloffical@gmail.com
//               </a>
//             </p>

//             <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//               ✉ <a href="mailto:sonachalahelp@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>
//                 sonachalahelp@gmail.com
//               </a>
//             </p>

//             <p style={{ fontSize: "14px", marginBottom: "6px" }}>
//               ✉ <a href="mailto:info@sonachala.com" style={{ color: "#fff", textDecoration: "none" }}>
//                 info@sonachala.com
//               </a>
//             </p>
//           </div>
//         </div>

//         {/* SOCIAL */}
//         <div className="row align-items-center mt-4">
//           <div className="col-md-12">
//             <div style={{ display: "flex", gap: "10px" }}>
//               <a
//                 href="https://www.facebook.com/share/1D87eESrPY/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={socialStyle}
//               >
//                 f
//               </a>

//               <a
//                 href="https://youtube.com/@sonachalarm"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={socialStyle}
//               >
//                 ▶
//               </a>

//               <a
//                 href="https://www.linkedin.com/company/jk-kanakku/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={socialStyle}
//               >
//                 in
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM */}
//       <div
//         style={{
//           marginTop: "40px",
//           padding: "15px 0",
//           borderTop: "1px solid #ffffff55",
//           textAlign: "center",
//           fontSize: "13px",
//         }}
//       >
//         <div style={{ marginBottom: "8px", fontWeight: "500" }}>
//           Sonachala Technologies private limited
//         </div>

//         Copyright 2026 |
//         <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
//           {" "}www.sonachala.com{" "}
//         </Link>
//         | All rights reserved.
//       </div>
//     </div>
//   );
// };

// const socialStyle = {
//   width: "36px",
//   height: "36px",
//   borderRadius: "50%",
//   backgroundColor: "#ffffff",
//   color: "#1f3d34",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontWeight: "bold",
//   textDecoration: "none",
// };

// export default Footer;
import img1 from "../assets/image/componetimsges/logo1.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        background: "#228766",
        padding: "30px 10px 0px",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#fff",

      }}
    >
      <div className="container-fluid">
        <div
          className="row"
          style={{
            alignItems: "flex-start",
          }}
        >
          {/* LEFT SECTION */}
          <div className="col-lg-4 col-md-6 mb-3">
            {/* LOGO */}
            <img
              src={img1}
              alt="Sonachala Logo"
              style={{
                width: "170px",
                marginBottom: "8px",
              }}
            />

            {/* DESCRIPTION */}
            <div
              style={{
                fontSize: "13px",
                marginBottom: "18px",
                lineHeight: "22px",
                maxWidth: "420px",
              }}
            >
              Sonachala Hospitality private limited provides smart hotel
              technology solutions including a powerful booking engine,
              channel management, and revenue optimization tools to help hotels
              increase direct bookings and maximize revenue.
            </div>
          </div>

          {/* CENTER SECTION */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h1
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                fontWeight: "400",
              }}
            >
              Contact Info
            </h1>

            <div
              style={{
                fontSize: "14px",
                lineHeight: "24px",
              }}
            >
              Sonachala Hospitality Private Limited
            </div>

            <div
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                marginBottom: "8px",
              }}
            >
              Annai Parvathi Nagar, Opposite to Collectorate Office,
              Vengikkal, Tiruvannamalai - 606604
            </div>

            {/* EMAIL */}
            <div
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                wordBreak: "break-word",
              }}
            >
              Email:
              <a
                href="mailto:support@sonachala.com"
                style={linkStyle}
              >
                Support@sonachala.com
              </a>
            </div>

            <div
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                wordBreak: "break-word",
              }}
            >
              <a
                href="mailto:jayakrishnan@sonachala.com"
                style={linkStyle}
              >
                jayakrishnan@sonachala.com
              </a>
            </div>

            <div
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                wordBreak: "break-word",
                marginBottom: "8px",
              }}
            >
              <a href="mailto:ramakrishnan@sonachala.com" style={linkStyle}>
                ramakrishnan@sonachala.com
              </a>
            </div>

            {/* PHONES */}
            <div
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                marginBottom: "12px",
              }}
            >
              +91 8608601049, 8608600778, 8608600772
            </div>

            {/* SOCIAL ICONS */}
            <div
              className="d-flex align-items-center"
              style={{
                gap: "10px",
              }}
            >
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
                X
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
                href="https://www.instagram.com/sonachala_official?stkn=dnRsc2c1MXNib2t5"
                target="_blank"
                rel="noopener noreferrer"
                style={socialStyle}
              >
                ◎
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

          {/* SONACHALA.COM LINKS SECTION */}
          <div className="col-lg-2 col-md-6 mb-3">
            <h1
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                fontWeight: "400",
              }}
            >
              Sonachala.Com
            </h1>

            <div
              style={{
                lineHeight: "26px",
              }}
            >
              <p style={{ margin: "0" }}>
                <Link to="/about" style={menuStyle}>
                  About Us
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/" style={menuStyle}>
                  FAQ
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/Support-form" style={menuStyle}>
                  Customer Support
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/Agreement-form" style={menuStyle}>
                  Terms & Conditions
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/" style={menuStyle}>
                  Privacy Policy
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <a
                  href="https://sonachala-live.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={menuStyle}
                >
                  Become a Partner
                </a>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/contact" style={menuStyle}>
                  Feedback
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/" style={menuStyle}>
                  Job Opening
                </Link>
              </p>

              <p style={{ margin: "0" }}>
                <Link to="/contact" style={menuStyle}>
                  Contact Us
                </Link>
              </p>
            </div>
          </div>

          {/* MOBILE APP SHOWCASE (WHERE MARKED) */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h1
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                fontWeight: "400",
              }}
            >
              Mobile App
            </h1>

            {/* Phone Container */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                padding: "16px",
                textAlign: "center",
                maxWidth: "240px",
              }}
            >
              {/* Phone Graphic */}
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "130px",
                  background: "linear-gradient(145deg, #1e3a30, #132720)",
                  borderRadius: "20px",
                  padding: "8px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  border: "2px solid #ffffff44",
                  textAlign: "center",
                  marginBottom: "12px",
                }}
              >
                {/* Notch */}
                <div
                  style={{
                    width: "30px",
                    height: "4px",
                    background: "#ffffff44",
                    borderRadius: "2px",
                    margin: "0 auto 6px",
                  }}
                />

                {/* Inner Screen */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    borderRadius: "12px",
                    padding: "14px 6px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <i className="bi bi-phone-vibrate" style={{ fontSize: "28px", color: "#6ee7b7" }}></i>
                  <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "4px", color: "#fff" }}>
                    Sonachala App
                  </div>
                  <div style={{ fontSize: "10px", color: "#a7f3d0", marginTop: "2px" }}>
                    Stays & Bookings
                  </div>
                </div>

                {/* Home bar */}
                <div
                  style={{
                    width: "26px",
                    height: "3px",
                    background: "#ffffff44",
                    borderRadius: "2px",
                    margin: "6px auto 0",
                  }}
                />
              </div>

              {/* Coming Soon Badge */}
              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#0f172a",
                    fontSize: "12px",
                    padding: "5px 14px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      backgroundColor: "#0f172a",
                      borderRadius: "50%",
                    }}
                  />
                  Coming Soon
                </span>
              </div>

              {/* App Store / Play Store Preview Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    textAlign: "left",
                  }}
                >
                  <i className="bi bi-google-play" style={{ fontSize: "16px", color: "#6ee7b7" }}></i>
                  <div>
                    <div style={{ fontSize: "8px", color: "#cbd5e1" }}>GET IT ON</div>
                    <div style={{ fontWeight: "bold", lineHeight: "1" }}>Google Play</div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    textAlign: "left",
                  }}
                >
                  <i className="bi bi-apple" style={{ fontSize: "18px", color: "#fff" }}></i>
                  <div>
                    <div style={{ fontSize: "8px", color: "#cbd5e1" }}>DOWNLOAD ON THE</div>
                    <div style={{ fontWeight: "bold", lineHeight: "1" }}>App Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          Sonachala Hospitality private limited
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
  backgroundColor: "#228766",
  border: "2px solid #fff",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  marginLeft: "4px",
  fontSize: "13px",
};

const menuStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

export default Footer;