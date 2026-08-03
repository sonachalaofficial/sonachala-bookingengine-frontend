import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TAMIL_NADU_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Pondicherry",
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar",
];

function BusForm() {
  return (
    <div className="container-fluid mt-5  mb-5">
      <form className="row justify-content-center ">
        <div className="col-md-3 mb-3">
          <label htmlFor="fromCity" className="form-label">From</label>
          <select className="form-select" id="fromCity">
            <option>Select City</option>
            {TAMIL_NADU_DISTRICTS.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3    ">
          <label htmlFor="toCity" className="form-label">To</label>
          <select className="form-select" id="toCity">
            <option>Select City</option>
            {TAMIL_NADU_DISTRICTS.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label htmlFor="departureDate" className="form-label">Departure</label>
          <input type="date" className="form-control" id="departureDate" />
        </div>

        <div className="col-12 d-flex justify-content-center mt-5   mb-lg-4">
          <button type="submit" className="btn btn-success px-4">
            Search Bus
          </button>
        </div>
      </form>
    </div>
  );
}

export default BusForm;