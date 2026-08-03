import React from "react";
import { Link } from "react-router-dom";
import sonachalaPremiumLogo from "../assets/assets/image/homeimg/sonachala-premium-logo.png";
import sonachalaHotelLogo from "../assets/assets/image/homeimg/sonachala-hotel-logo.png";
import ySpotLogo from "../assets/assets/image/homeimg/y-spot-logo.png";
import sonachalaLogo from "../assets/assets/image/homeimg/sonachala-logo.png";
const brands = [
  {
    name: "Sonachala",
    tagline: "Comfort you can count on",
    image: sonachalaLogo,
    description:
      "Affordable, dependable stays for every traveller. Clean rooms, warm hospitality, and honest pricing near Arunachala.",
    path: "/brands/sonachala",
  },
  {
    name: "Sonachala Premium",
    tagline: "Elevated comfort, closer to the divine",
    image: sonachalaPremiumLogo,
    description:
      "Inviting decor with added comfort — perfect for travellers who want a little more space and a flawless stay.",
    path: "/brands/sonachala-premium",
  },
  {
    name: "Sonachala Hotels",
    tagline: "Luxury redefined",
    image: sonachalaHotelLogo,
    description:
      "Premium suites, curated experiences, and top-tier service for guests who expect nothing but the best.",
    path: "/brands/sonachala-elite",
  },
  {
    name: "Namma Spot",
    tagline: "Budget-friendly, youth-focused stays",
    image: ySpotLogo,
    description:
      "Cozy, affordable homestays perfect for solo travellers, students, and backpackers.",
    path: "/brands/sonachala-nest",
  },
];

const BrandTiers = () => {
  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ fontSize: "2rem", color: "#1a1a1a" }}>
          Your Budget · Your Plan · Our Brand
        </h2>
        <p className="text-muted">
          Step into our world of distinct brands, each crafted to enhance your journey from start to finish.
        </p>
      </div>

      <div className="row g-4">
        {brands.map((brand, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <img
                src={brand.image}
                alt={brand.name}
                style={{ height: "180px", objectFit: "cover", width: "100%" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold mb-1">{brand.name}</h5>
                <p className="text-muted small mb-2">{brand.tagline}</p>
                <p className="text-muted small flex-grow-1">{brand.description}</p>
                <Link
                  to={brand.path}
                  className="btn btn-outline-success btn-sm mt-2"
                  style={{ borderRadius: "8px", alignSelf: "flex-start" }}
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandTiers;