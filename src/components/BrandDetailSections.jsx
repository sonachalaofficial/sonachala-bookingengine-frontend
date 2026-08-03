import { useState } from "react";

/**
 * Reusable set of sections for brand detail pages
 * (SonachalaBrand.jsx, SonachalaPremiumBrand.jsx, SonachalaEliteBrand.jsx, SonachalaNestBrand.jsx)
 *
 * Usage:
 *   import BrandDetailSections from "../../components/BrandDetailSections";
 *   <BrandDetailSections brandName="Sonachala" startingPrice={1499} />
 *
 * Place it after your existing "What to expect" section and before the footer.
 */

const defaultImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
  "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=600",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
  "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=600",
];

const defaultAmenities = [
  { icon: "bi-wifi", label: "Free WiFi" },
  { icon: "bi-tv", label: "TV" },
  { icon: "bi-snow", label: "AC" },
  { icon: "bi-camera-video", label: "24x7 Security" },
  { icon: "bi-bag-check", label: "Clean Towels" },
  { icon: "bi-droplet", label: "Hot Water" },
  { icon: "bi-basket2", label: "Toiletries" },
  { icon: "bi-person-badge", label: "Room Service" },
];

const defaultRooms = [
  {
    name: "Standard Room",
    desc: "Comfortable room with essential amenities, ideal for solo travellers or couples.",
    price: 1499,
  },
  {
    name: "Deluxe Room",
    desc: "Spacious room with upgraded furnishings and a scenic view, great for families.",
    price: 2299,
  },
];

const defaultTestimonials = [
  {
    quote:
      "Clean rooms and warm hospitality. A perfect base for our trip.",
    name: "Deepa R.",
  },
  {
    quote:
      "Great value for money, staff were very helpful throughout our stay.",
    name: "Karthik S.",
  },
  {
    quote: "Booking was smooth and the room matched exactly what was shown.",
    name: "Priya M.",
  },
];

const defaultFaqs = [
  {
    q: "What time is check-in and check-out?",
    a: "Check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged on request, subject to availability.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 24 hours before check-in. Cancellations within 24 hours are subject to a one-night charge.",
  },
  {
    q: "Is breakfast included?",
    a: "Complimentary breakfast is included with most room types. Please check your specific booking for details.",
  },
  {
    q: "Do you allow pets?",
    a: "Pets are not permitted at this property, with the exception of registered service animals.",
  },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-bottom py-3">
      <button
        className="btn w-100 d-flex justify-content-between align-items-center p-0 border-0 text-start fw-semibold"
        onClick={() => setOpen(!open)}
      >
        {faq.q}
        <i className={`bi ${open ? "bi-dash-lg" : "bi-plus-lg"}`} />
      </button>
      {open && <p className="text-muted mt-2 mb-0">{faq.a}</p>}
    </div>
  );
}

export default function BrandDetailSections({
  brandName = "Sonachala",
  images = defaultImages,
  amenities = defaultAmenities,
  rooms = defaultRooms,
  testimonials = defaultTestimonials,
  faqs = defaultFaqs,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this to Firestore -> collection "brandEnquiries"
    setSubmitted(true);
  };

  return (
    <>
      {/* PHOTO GALLERY */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold mb-4">Photo Gallery</h2>
          <div className="row g-3">
            {images.map((img, i) => (
              <div className="col-6 col-md-4" key={i}>
                <img
                  src={img}
                  alt={`${brandName} view ${i + 1}`}
                  className="img-fluid rounded-3 shadow-sm"
                  style={{ height: "180px", width: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-5" style={{ background: "#f4f8f6" }}>
        <div className="container">
          <h2 className="fw-bold mb-4">Amenities</h2>
          <div className="row row-cols-4 row-cols-md-8 g-4 text-center">
            {amenities.map((a) => (
              <div className="col" key={a.label}>
                <div
                  className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "999px",
                    background: "#e6f2ec",
                    color: "#0f7a4c",
                    fontSize: "1.3rem",
                  }}
                >
                  <i className={`bi ${a.icon}`} />
                </div>
                <div className="small">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOM TYPES / PRICING */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold mb-4">Room Types</h2>
          <div className="row g-4">
            {rooms.map((room) => (
              <div className="col-md-6" key={room.name}>
                <div className="card border-0 shadow-sm p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold mb-0">{room.name}</h5>
                    <span className="fw-bold" style={{ color: "#0f7a4c" }}>
                      ₹{room.price}
                      <span className="text-muted small fw-normal">
                        {" "}
                        / night
                      </span>
                    </span>
                  </div>
                  <p className="text-muted mb-0">{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold mb-4">What Our Guests Say</h2>
          <div className="row g-4">
            {testimonials.map((t) => (
              <div className="col-md-4" key={t.name}>
                <div className="card border-0 shadow-sm p-4 h-100">
                  <i
                    className="bi bi-quote mb-2"
                    style={{ color: "#d4a94c", fontSize: "1.5rem" }}
                  />
                  <p className="mb-3">{t.quote}</p>
                  <div className="fw-semibold small mt-auto">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5" style={{ background: "#f4f8f6" }}>
        <div className="container">
          <h2 className="fw-bold mb-4">Frequently Asked Questions</h2>
          <div className="card border-0 shadow-sm p-4">
            {faqs.map((faq, i) => (
              <FaqItem faq={faq} key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #0a5c3a, #0f7a4c)",
        }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to book your stay?</h2>
          <p className="mb-4 text-white-50">
            Enquire below and our team will confirm availability within a few
            hours.
          </p>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <h2 className="fw-bold mb-3">Have a question about this stay?</h2>
              <p className="text-muted mb-0">
                Fill in your details and our team will get back to you with
                room availability, pricing, and any special requests you
                have.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-sm p-4">
                {submitted ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle-fill text-success display-6 mb-3 d-block" />
                    <h5 className="fw-bold">
                      Thanks, {form.name.split(" ")[0] || "there"}!
                    </h5>
                    <p className="text-muted mb-0">
                      We'll reach out to you shortly with the details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          className="form-control"
                          value={form.checkIn}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">
                          Guests
                        </label>
                        <input
                          type="number"
                          name="guests"
                          min="1"
                          className="form-control"
                          value={form.guests}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Message (optional)
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          className="form-control"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Any special requests..."
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-success w-100 fw-semibold py-2"
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}