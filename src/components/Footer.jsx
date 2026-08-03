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
          <div className="col-lg-5 col-md-12 mb-3">
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
                maxWidth: "520px",
              }}
            >
              Hrify Technologies private limited provides smart hotel
              technology solutions including a powerful booking engine,
              channel management, and revenue optimization tools to help hotels
              increase direct bookings and maximize revenue.
            </div>

            {/* PARTNER LOGOS */}
            {/* <div
              className="d-flex flex-wrap align-items-center"
              style={{
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "110px",
                  height: "50px",
                  background: "#fff",
                  borderRadius: "2px",
                }}
              />

              <div
                style={{
                  width: "110px",
                  height: "50px",
                  background: "#fff",
                  borderRadius: "2px",
                }}
              />

              <div
                style={{
                  width: "80px",
                  height: "50px",
                  background: "#fff",
                  borderRadius: "2px",
                }}
              />

              <div
                style={{
                  width: "120px",
                  height: "50px",
                  background: "#fff",
                  borderRadius: "2px",
                }}
              />
            </div> */}

            {/* BIG LOGO */}
            {/* <img
              src={img1}
              alt="Footer Logo"
              style={{
                width: "220px",
                background: "#fff",
                padding: "5px",
              }}
            /> */}
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
              Hrify Technologies private limited
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
                href="mailto:sonachaloffical@gmail.com"
                style={linkStyle}
              >
                sonachaloffical@gmail.com
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
                href="mailto:sonachalahelp@gmail.com"
                style={linkStyle}
              >
                sonachalahelp@gmail.com
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
              <a href="mailto:info@sonachala.com" style={linkStyle}>
                info@sonachala.com
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
                href="https://www.linkedin.com/company/jk-kanakku/"
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

          {/* RIGHT SECTION */}
          <div className="col-lg-4 col-md-6 mb-3">
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

            {/* PAYMENT IMAGES */}
            {/* <div
              className="d-flex flex-wrap justify-content-end"
              style={{
                gap: "6px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "40px",
                  background: "#fff",
                }}
              />

              <div
                style={{
                  width: "70px",
                  height: "40px",
                  background: "#fff",
                }}
              />

              <div
                style={{
                  width: "90px",
                  height: "40px",
                  background: "#fff",
                }}
              />

              <div
                style={{
                  width: "80px",
                  height: "40px",
                  background: "#fff",
                }}
              />

              <div
                style={{
                  width: "90px",
                  height: "40px",
                  background: "#fff",
                }}
              />
            </div> */}




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
          Hrify Technologies private limited
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