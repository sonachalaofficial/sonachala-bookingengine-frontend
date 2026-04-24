import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; // Changed from HomePage
import Stay from "./pages/Stay"; // New integrated Stay page
import LoginPage from "./pages/LoginPage";
import HotelDetails from "./pages/HotelStaysPages/HotelDetails";
import HotelDetailsNew from "./pages/HotelStaysPages/HotelDetailsNew";
import MapScreen from "./pages/MapScreen";
import "./styles/global.css";
import CreatePlan from "./pages/HotelStaysPages/CreatePlan";
import Reservation from "./pages/HotelStaysPages/Reservation";
import YourBooking from "./pages/HotelStaysPages/YourBooking";
import Profile from "./pages/UserProfile/Profile";
import MyBookings from "./pages/UserProfile/MyBookings";
import HelpAndSupport from "./pages/HelpAndSupport";
import About from "./pages/About";
import HourlyStay from "./pages/HourlyStayPages/HourlyStay";
import HourlyStayRoomDetails from "./pages/HourlyStayPages/HourlyStayRoomDetails";
import HourlyStayReservation from "./pages/HourlyStayPages/HourlyStayReservation";
import HourlyStayBookingSuccessfull from "./pages/HourlyStayPages/HourlyStayBookingSuccessfull";

// --------------------------------------------------------------------------------------------------

// new pages


// import Home from "./pages/Home";
import Agent from "./pages/newpages/Agent";
import Hotelpatner from "./pages/newpages/Hotelpatner";
import Listyourhotel from "./pages/newpages/Listyourhotel";
import Agreementform from "./pages/newpages/Agreementform";
import Flightform from "./pages/newpages/FlightForm";
import BusForm from "./pages/newpages/BusForm";
import EventForm from "./pages/newpages/EventForm";
import CabForm from "./pages/newpages/CabForm";
import HolidayForm from "./pages/newpages/HolidayForm";
import ForexForm from "./pages/newpages/ForexForm";

import SupportForm from "./pages/newpages/SupportForm";
import Searchbookings from "./pages/newpages/Searchbookings";
import CustomerSignin from "./pages/newpages/CustomerSignin";
import SignupForm from "./pages/newpages/SignupForm";
import Centralreseve from "./pages/newpages/Centralreseve";
import PmsConnect from "./pages/newpages/PmsConnect";
import ReserveBackend from "./pages/newpages/ReserveBackend";
import Revenuemanage from "./pages/newpages/Revenuemanage";

// import PaymentPage from "./pages/paymentgateway/PaymentPage";

import PaymentPage from "./pages/paymentpage/PaymentPage";
import Upi from "./pages/paymentpage/Upi/Upi";
import Cards from "./pages/paymentpage/Cards/Cards";
import BookingPopup from "./pages/paymentpage/Bookingpopup";
import ScrollToTop from "./common/ScrollToTop";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Only Route (redirects logged-in users to home)
const PublicOnlyRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/hotels" element={<Stay />} />
              <Route path="/homestays" element={<Stay />} />
              <Route path="/login" element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              } />
              <Route path="/hourly-stay" element={<HourlyStay />} />
              <Route path="/hotel-details/:hotelId" element={<HotelDetails />} />
              <Route path="/hotel-details-new/:hotelId" element={<HotelDetailsNew />} />
              <Route path="/about" element={<About />} />
              <Route path="/map" element={<MapScreen />} />

              {/* Protected Routes - Require Authentication */}
              <Route path="/create-plan/:hotelId" element={
                <ProtectedRoute>
                  <CreatePlan />
                </ProtectedRoute>
              } />
              <Route path="/reservation/:hotelId" element={
                <ProtectedRoute>
                  <Reservation />
                </ProtectedRoute>
              } />
              <Route path="/Your-booking/:bookingId" element={
                <ProtectedRoute>
                  <YourBooking />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/my-bookings" element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } />
              <Route path="/help-And-Support" element={<HelpAndSupport />} />
              <Route path="hourly-stay-room-details" element={<HourlyStayRoomDetails />} />
              <Route path="hourly-reservation" element={<HourlyStayReservation />} />
              <Route path="/hourly-successful" element={<HourlyStayBookingSuccessfull />} />

              {/* Static/Info Pages */}
              <Route path="/Agent" element={<Agent />} />
              <Route path="/Hotel-patner" element={<Hotelpatner />} />
              <Route path="/List-your-hotel" element={<Listyourhotel />} />
              <Route path="/Agreement-form" element={<Agreementform />} />
              <Route path="/flight-form" element={<Flightform />} />
              <Route path="/Bus-form" element={<BusForm />} />
              <Route path="/Event-form" element={<EventForm />} />
              <Route path="/Cab-form" element={<CabForm />} />
              <Route path="/Holiday-form" element={<HolidayForm />} />
              <Route path="/Forex-form" element={<ForexForm />} />
              <Route path="/Support-form" element={<SupportForm />} />
              <Route path="/Searchbookings" element={<Searchbookings />} />
              <Route path="/CustomerSignin" element={<CustomerSignin />} />
              <Route path="/SignupForm" element={<SignupForm />} />
              <Route path="/Centralreseve" element={<Centralreseve />} />
              <Route path="/PmsConnect" element={<PmsConnect />} />
              <Route path="/ReserveBackend" element={<ReserveBackend />} />
              <Route path="/Revenuemanage" element={<Revenuemanage />} />

              {/* Payment Routes */}
              <Route path="/PaymentPage" element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
              <Route path="/upi" element={
                <ProtectedRoute>
                  <Upi />
                </ProtectedRoute>
              } />
              <Route path="/cards" element={
                <ProtectedRoute>
                  <Cards />
                </ProtectedRoute>
              } />
              <Route path="/BookingPopup" element={<BookingPopup />} />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
