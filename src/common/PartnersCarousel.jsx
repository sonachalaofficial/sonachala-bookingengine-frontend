// Import partner images directly
// import airbnbImg from '../assets/image/OurPartners/airbnb-3384008_1280.png';
// import appleImg from '../assets/image/OurPartners/apple-3383931_1280.png';
// import linkedinImg from '../assets/image/OurPartners/linked-in-2668692_1280.png';
// import techcorpImg from '../assets/image/OurPartners/logo-7462411_1280.png';
// import microsoftImg from '../assets/image/OurPartners/microsoft-5977659_1280.png';
// import paypalImg from '../assets/image/OurPartners/paypal-3383998_1280.png';
// import yahooImg from '../assets/image/OurPartners/yahoo-76684_1280.png';


import lg1 from "../assets/assets/image/OurPartners/lg1.png";
import lg2 from "../assets/assets/image/OurPartners/lg2.png";
import lg3 from "../assets/assets/image/OurPartners/lg3.png";
import lg4 from "../assets/assets/image/OurPartners/lg4.png";
import lg5 from "../assets/assets/image/OurPartners/lg5.png";
// import lg6 from "../assets/assets/image/OurPartners/lg6.png";
// import lg7 from "../assets/assets/image/OurPartners/lg7.png";
// import lg8 from "../assets/assets/image/OurPartners/lg8.png";
// import lg9 from "../assets/assets/image/OurPartners/lg9.png";
import lg10 from "../assets/assets/image/OurPartners/lg10.png";
import lg11 from "../assets/assets/image/OurPartners/lg11.png";
import lg12 from "../assets/assets/image/OurPartners/lg12.png";
import lg13 from "../assets/assets/image/OurPartners/lg13.png";
import lg14 from "../assets/assets/image/OurPartners/lg14.png";
import lg15 from "../assets/assets/image/OurPartners/lg15.png";
import lg16 from "../assets/assets/image/OurPartners/lg16.png";
import lg17 from "../assets/assets/image/OurPartners/lg17.png";
import lg18 from "../assets/assets/image/OurPartners/lg18.png";
import lg19 from "../assets/assets/image/OurPartners/lg19.png";
import lg20 from "../assets/assets/image/OurPartners/lg20.png";
import lg21 from "../assets/assets/image/OurPartners/lg21.png";
import lg22 from "../assets/assets/image/OurPartners/lg22.png";
import lg23 from "../assets/assets/image/OurPartners/lg23.png";
import lg24 from "../assets/assets/image/OurPartners/lg24.png";
import lg25 from "../assets/assets/image/OurPartners/lg25.png";
import lg26 from "../assets/assets/image/OurPartners/lg26.png";
import lg27 from "../assets/assets/image/OurPartners/lg27.png";
import lg28 from "../assets/assets/image/OurPartners/lg28.png";
import lg29 from "../assets/assets/image/OurPartners/lg29.png";
import lg30 from "../assets/assets/image/OurPartners/lg30.png";
import lg31 from "../assets/assets/image/OurPartners/lg31.png";
import lg32 from "../assets/assets/image/OurPartners/lg32.png";
import lg33 from "../assets/assets/image/OurPartners/lg33.png";
import lg34 from "../assets/assets/image/OurPartners/lg34.png";
import lg35 from "../assets/assets/image/OurPartners/lg35.png";
import lg36 from "../assets/assets/image/OurPartners/lg36.png";
import lg37 from "../assets/assets/image/OurPartners/lg37.png";
import lg38 from "../assets/assets/image/OurPartners/lg38.png";
import lg39 from "../assets/assets/image/OurPartners/lg39.png";
import lg40 from "../assets/assets/image/OurPartners/lg40.png";
import lg41 from "../assets/assets/image/OurPartners/lg41.png";
import lg42 from "../assets/assets/image/OurPartners/lg42.png";
import lg43 from "../assets/assets/image/OurPartners/lg43.png";
import lg44 from "../assets/assets/image/OurPartners/lg44.png";
import lg45 from "../assets/assets/image/OurPartners/lg45.png";
import lg46 from "../assets/assets/image/OurPartners/lg46.png";
import lg47 from "../assets/assets/image/OurPartners/lg47.png";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnersCarousel = () => {

  const partners = [
    
    lg1, lg2, lg3, lg4, lg5,
    lg10, lg11, lg12, lg13, lg14, lg15, lg16, lg17,
    lg18, lg19, lg20, lg21, lg22, lg23, lg24, lg25,
    lg26, lg27, lg28, lg29, lg30, lg31, lg32, lg33,
    lg34, lg35, lg36, lg37, lg38, lg39, lg40, lg41,
    lg42, lg43, lg44, lg45, lg46, lg47
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    speed: 800,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, arrows: false } }
    ]
  };

  return (
    <div className="container-fluid py-5 mt-5">
      
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 style={{
          fontSize: "3rem",
          color: "#de0000c9",
          textTransform: "uppercase",
          letterSpacing: "3px",
          fontWeight: "bold",
          textShadow: "3px 3px 6px rgba(0,0,0,0.2)"
        }}>
          ✨ Our Clients
        </h2>

        <p style={{
          fontSize: "1.2rem",
          color: "#7f8c8d",
          fontStyle: "italic"
        }}>
          Trusted by Industry Leaders Worldwide
        </p>

        <div style={{
          width: "100px",
          height: "3px",
          background: "linear-gradient(to right, #e74c3c, #f39c12)",
          margin: "20px auto",
          borderRadius: "2px"
        }} />
      </div>

      {/* Slider */}
      <div className="bg-light rounded-4 shadow-lg p-4">
        <Slider {...settings}>
          {partners.map((logo, index) => (
            <div key={index} className="px-3">
              <div
                className="mt-2 mb-2 bg-white rounded-4 d-flex align-items-center justify-content-center"
                style={{
                  height: "160px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: "transform 0.4s ease"
                }}
              >
                <img
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  style={{
                    maxWidth: "auto",
                    maxHeight: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Bottom Text */}
      <div className="mt-4 text-center">
        <span style={{
          fontSize: "1rem",
          color: "#7f8c8d",
          fontWeight: "500"
        }}>
          Powered by Excellence ⭐⭐⭐⭐⭐
        </span>
      </div>

    </div>
  );
};

export default PartnersCarousel;