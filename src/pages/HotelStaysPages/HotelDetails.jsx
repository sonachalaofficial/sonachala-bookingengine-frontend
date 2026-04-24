import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaHeart,
  FaWifi,
  FaDumbbell,
  FaUtensils,
  FaHotel,
  FaMapMarkerAlt,
  FaCheck,
  FaShareAlt,
  FaParking,
  FaSpa,
  FaWheelchair,
  FaStar,
  FaEdit,
  FaTrash,
  FaVideo,
  FaTshirt,
  FaBell,
  FaUsers,
  FaGlassMartini,
  FaSnowflake,
  FaBuilding,
  FaSmokingBan,
  FaSwimmer,
} from "react-icons/fa";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../core/firebase/config.user";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MapCard from "../../common/MapCard";
import PaymentModal from "../../common/PaymentModal";
import { calculateRoomPrice, fetchAdminCharges, calculateNights, DEFAULT_ADMIN_CHARGES } from "../../utils/priceCalculator";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const datePickerRef = useRef(null);
  const guestsDropdownRef = useRef(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewCategories, setReviewCategories] = useState([]);
  const [canSubmitReview, setCanSubmitReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    staffReview: 0,
    luxury: 0,
    amenities: 0,
    price: 0,
    comments: "",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomsList, setRoomsList] = useState([]);
  const [adminCharges, setAdminCharges] = useState(DEFAULT_ADMIN_CHARGES);
  const [pricingBreakdown, setPricingBreakdown] = useState(null);

  const fetchPropertyDetails = useCallback(async () => {
    if (!hotelId) {
      setError("No property ID provided");
      setLoading(false);
      return;
    }

    try {
      let propertyDoc;
      let propertyType;

      // Try to fetch from Hotels collection
      propertyDoc = await getDoc(doc(db, "Hotels", hotelId));
      if (propertyDoc.exists()) {
        propertyType = "Hotel";
      } else {
        // If not found in Hotels, try Homestays collection
        propertyDoc = await getDoc(doc(db, "Homestays", hotelId));
        if (propertyDoc.exists()) {
          propertyType = "Homestay";
        }
      }

      if (propertyDoc && propertyDoc.exists()) {
        const propertyData = {
          id: propertyDoc.id,
          ...propertyDoc.data(),
          type: propertyType,
        };

        // Fetch reviews to calculate overall rating
        const reviewsSnapshot = await getDocs(
          collection(db, propertyType + "s", hotelId, "Reviews")
        );
        let totalRating = 0;
        let totalStaffReview = 0;
        let totalLuxury = 0;
        let totalAmenities = 0;
        let totalPrice = 0;
        const reviewCount = reviewsSnapshot.size;

        reviewsSnapshot.forEach((doc) => {
          const review = doc.data();
          totalRating += review.overallRating || 0;
          totalStaffReview += review.staffReview || 0;
          totalLuxury += review.luxury || 0;
          totalAmenities += review.amenities || 0;
          totalPrice += review.price || 0;
        });

        const overallRating =
          reviewCount > 0
            ? (totalStaffReview + totalLuxury + totalAmenities + totalPrice) /
            (reviewCount * 4)
            : 0;
        const averageStaffReview =
          reviewCount > 0 ? totalStaffReview / reviewCount : 0;
        const averageLuxury = reviewCount > 0 ? totalLuxury / reviewCount : 0;
        const averageAmenities =
          reviewCount > 0 ? totalAmenities / reviewCount : 0;
        const averagePrice = reviewCount > 0 ? totalPrice / reviewCount : 0;

        // Fetch room details
        const roomSnapshot = await getDocs(
          collection(db, propertyType + "s", hotelId, "Rooms")
        );
        let roomDetails = {};
        const roomsData = [];
        if (roomSnapshot.docs.length > 0) {
          roomSnapshot.docs.forEach((doc) => {
            const roomData = doc.data();
            roomsData.push({
              id: doc.id,
              roomType: roomData.roomType || "Standard Room",
              roomPrice: Number.parseFloat(roomData.roomPrice) || 0,
              perAdultPrice: Number.parseFloat(roomData.perAdultPrice) || 0,
              perChildPrice: Number.parseFloat(roomData.perChildPrice) || 0,
              discountValue: Number.parseFloat(roomData.discountValue) || 0,
              discount: Number.parseFloat(roomData.discount) || 0,
              bedType: roomData.bedType || "Standard Bed",
              maxGuestAllowed: Number.parseInt(roomData.maxGuestAllowed) || 2,
              description: roomData.description || "",
              facilities: roomData.facilities || [],
              roomImages: roomData.roomImages || [],
            });
          });
          const firstRoom = roomSnapshot.docs[0].data();
          roomDetails = {
            roomPrice: Number.parseFloat(firstRoom.roomPrice) || 0,
            perAdultPrice: Number.parseFloat(firstRoom.perAdultPrice) || 0,
            perChildPrice: Number.parseFloat(firstRoom.perChildPrice) || 0,
            discountValue: Number.parseFloat(firstRoom.discountValue) || 0,
            discount: Number.parseFloat(firstRoom.discount) || 0,
            maxGuestAllowed: Number.parseInt(firstRoom.maxGuestAllowed || firstRoom.maxGuests) || 2,
          };
        }
        setRoomsList(roomsData);

        setProperty({
          ...propertyData,
          overallRating,
          averageStaffReview,
          averageLuxury,
          averageAmenities,
          averagePrice,
          reviewCount,
          roomDetails,
        });
        setSearchLocation(propertyData["Property Address"] || "");
        await fetchReviewCategories(hotelId, propertyType);
        await checkBookingStatus(hotelId);
        await fetchReviews(hotelId, propertyType);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      console.error("Error fetching property data:", err);
      setError("Error fetching property data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  const getTotalNights = () => {
    if (!dates) return 1;
    const [start, end] = dates.split(" - ").map((date) => new Date(date));
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const fetchReviewCategories = async (propertyId, propertyType) => {
    try {
      const reviewsSnapshot = await getDocs(
        collection(db, propertyType + "s", propertyId, "Reviews")
      );
      let totalStaffReview = 0;
      let totalLuxury = 0;
      let totalAmenities = 0;
      let totalPrice = 0;
      const count = reviewsSnapshot.size;

      reviewsSnapshot.forEach((doc) => {
        const review = doc.data();
        totalStaffReview += review.staffReview || 0;
        totalLuxury += review.luxury || 0;
        totalAmenities += review.amenities || 0;
        totalPrice += review.price || 0;
      });

      const categories = [
        {
          name: "Staff Members",
          rating: count > 0 ? totalStaffReview / count : 0,
        },
        { name: "Luxury", rating: count > 0 ? totalLuxury / count : 0 },
        { name: "Fair Price", rating: count > 0 ? totalPrice / count : 0 },
        { name: "Amenities", rating: count > 0 ? totalAmenities / count : 0 },
      ];

      setReviewCategories(categories);
    } catch (err) {
      console.error("Error fetching review categories:", err);
    }
  };

  const checkBookingStatus = async (propertyId) => {
    if (!auth.currentUser) return;

    try {
      const bookingsRef = collection(
        db,
        "Users",
        auth.currentUser.uid,
        "Bookings"
      );
      const q = query(
        bookingsRef,
        where("propertyId", "==", propertyId),
        where("Status", "==", "Booked")
      );
      const bookingSnapshot = await getDocs(q);

      if (!bookingSnapshot.empty) {
        const booking = bookingSnapshot.docs[0].data();
        const checkOutDate = booking["Check-Out Date"]?.toDate();
        if (checkOutDate && new Date() > checkOutDate) {
          setCanSubmitReview(true);
        }
      }
    } catch (err) {
      console.error("Error checking booking status:", err);
    }
  };

  const fetchReviews = async (propertyId, propertyType) => {
    try {
      const reviewsSnapshot = await getDocs(
        collection(db, propertyType + "s", propertyId, "Reviews")
      );
      const reviewsData = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Fetch property details only when hotelId changes
  useEffect(() => {
    fetchPropertyDetails();
  }, [hotelId]);

  // Fetch admin charges on component mount
  useEffect(() => {
    const loadAdminCharges = async () => {
      const charges = await fetchAdminCharges();
      setAdminCharges(charges);
    };
    loadAdminCharges();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam =
      searchParams.get("location") || localStorage.getItem("location") || "";
    const checkInParam =
      searchParams.get("checkIn") || localStorage.getItem("checkIn");
    const checkOutParam =
      searchParams.get("checkOut") || localStorage.getItem("checkOut");
    const adultsParam = Number.parseInt(
      searchParams.get("adults") || localStorage.getItem("adults") || "1"
    );
    const childrenParam = Number.parseInt(
      searchParams.get("children") || localStorage.getItem("children") || "0"
    );
    const roomsParam = Number.parseInt(
      searchParams.get("rooms") || localStorage.getItem("rooms") || "1"
    );

    setSearchLocation(locationParam);
    setDates(`${checkInParam} - ${checkOutParam}`);
    setAdults(adultsParam);
    setChildren(childrenParam);
    setRooms(roomsParam);
    updateGuests(adultsParam, childrenParam, roomsParam);

    if (datePickerRef.current) {
      const fp = flatpickr(datePickerRef.current, {
        mode: "range",
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date(Date.now() + 420 * 24 * 60 * 60 * 1000),
        defaultDate: [checkInParam, checkOutParam],
        onChange: (selectedDates) => {
          if (selectedDates.length === 2) {
            const [checkin, checkout] = selectedDates.map(
              (date) => date.toISOString().split("T")[0]
            );
            setDates(`${checkin} - ${checkout}`);
            updateURL({ checkIn: checkin, checkOut: checkout });
          }
        },
      });

      return () => fp.destroy(); // Cleanup flatpickr instance
    }
  }, [location.search]);

  const handleGuestsClick = () => {
    setShowGuestsDropdown(!showGuestsDropdown);
  };

  const updateGuests = (a, c, r) => {
    setGuests(`${a} Adults, ${c} Children, ${r} Rooms`);
  };

  const incrementValue = (setter, value, maxValue, param) => {
    if (value < maxValue) {
      const newValue = value + 1;
      setter(newValue);
      updateURL({ [param]: newValue });
      updatePrice(
        param === "rooms" ? newValue : rooms,
        param === "adults" ? newValue : adults,
        param === "children" ? newValue : children
      );
    }
  };

  const decrementValue = (setter, value, minValue, param) => {
    if (value > minValue) {
      const newValue = value - 1;
      setter(newValue);
      updateURL({ [param]: newValue });
      updatePrice(
        param === "rooms" ? newValue : rooms,
        param === "adults" ? newValue : adults,
        param === "children" ? newValue : children
      );
    }
  };

  const updatePrice = (newRooms, newAdults, newChildren) => {
    if (property && property.roomDetails) {
      // Use centralized pricing calculator
      const pricing = calculateRoomPrice(
        property.roomDetails,
        getTotalNights(),
        newAdults,
        newChildren,
        newRooms,
        adminCharges
      );
      setPricingBreakdown(pricing);
      setProperty((prev) => ({ ...prev, price: pricing.total }));
    }
  };

  const handleDone = () => {
    setShowGuestsDropdown(false);
    updateGuests(adults, children, rooms);
    updateURL({ adults, children, rooms });
  };

  const updateURL = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSearchLocation(newLocation);
    updateURL({ location: newLocation });
  };

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      toast.info("Please login to add favorites");
      return;
    }

    if (!property) {
      console.error("Property data is not available");
      return;
    }

    const userId = auth.currentUser.uid;
    const favoriteRef = doc(db, "Users", userId, "Favorites", hotelId);

    try {
      if (isFavorite) {
        await deleteDoc(favoriteRef);
        toast.success("Removed from favorites");
      } else {
        await setDoc(favoriteRef, {
          propertyId: hotelId,
          "Property Addresss": property["Property Address"] || "",
          "Property Facility": property["Accommodation Facilities"] || [],
          "Property Image": property["Property Images"] || [],
          "Property Name": property["Property Name"] || "",
          "Property Price": property.price || 0,
          "Property Type": property.type || "Hotel",
          collectionName: property.type === "Hotel" ? "Hotels" : "Homestays",
          createdAt: new Date(),
        });
        toast.success("Added to favorites");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.error("Error updating favorites");
    }
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (auth.currentUser) {
        const favoritesRef = doc(
          db,
          "Users",
          auth.currentUser.uid,
          "Favorites",
          hotelId
        );
        const docSnap = await getDoc(favoritesRef);
        setIsFavorite(docSnap.exists());
      }
    };

    fetchFavoriteStatus();
  }, [hotelId]);

  useEffect(() => {
    if (property && property.roomDetails) {
      // Use centralized pricing calculator
      const pricing = calculateRoomPrice(
        property.roomDetails,
        getTotalNights(),
        adults,
        children,
        rooms,
        adminCharges
      );
      setPricingBreakdown(pricing);
      if (pricing.total !== property.price) {
        setProperty((prev) => ({ ...prev, price: pricing.total }));
      }
    }
  }, [property, dates, adults, children, rooms, adminCharges]);

  const handleReviewChange = (field, value) => {
    setNewReview((prev) => ({ ...prev, [field]: value }));
  };

  const submitReview = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    try {
      const reviewData = {
        ...newReview,
        userId: auth.currentUser.uid,
        username: auth.currentUser.displayName || "Anonymous",
        userProfilePicture: auth.currentUser.photoURL || "",
        timestamp: new Date(),
        date: format(new Date(), "dd-MM-yyyy"),
        overallRating:
          (newReview.staffReview +
            newReview.luxury +
            newReview.amenities +
            newReview.price) /
          4,
      };

      await addDoc(
        collection(db, property.type + "s", hotelId, "Reviews"),
        reviewData
      );

      toast.success("Review submitted successfully!");
      setNewReview({
        staffReview: 0,
        luxury: 0,
        amenities: 0,
        price: 0,
        comments: "",
      });
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const editReview = async (reviewId, updatedReview) => {
    try {
      await updateDoc(
        doc(db, property.type + "s", hotelId, "Reviews", reviewId),
        updatedReview
      );
      toast.success("Review updated successfully!");
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await deleteDoc(
        doc(db, property.type + "s", hotelId, "Reviews", reviewId)
      );
      toast.success("Review deleted successfully!");
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  const getFacilityIcon = (facilityName) => {
    switch (facilityName.toLowerCase()) {
      case "facility for disabled guests":
        return FaWheelchair;
      case "parking":
        return FaParking;
      case "gym":
        return FaDumbbell;
      case "spa":
        return FaSpa;
      case "pool":
        return FaSwimmer;
      case "wi-fi":
        return FaWifi;
      case "restaurant":
        return FaUtensils;
      case "cctv":
        return FaVideo;
      case "laundry":
        return FaTshirt;
      case "room service":
        return FaBell;
      case "family room":
        return FaUsers;
      case "bar":
        return FaGlassMartini;
      case "air conditioning":
        return FaSnowflake;
      case "lift":
      case "elevator":
        return FaBuilding;
      case "non-smoking area":
      case "smoke free area":
        return FaSmokingBan;
      default:
        return FaCheck;
    }
  };

  const handleReserveNow = () => {
    const [checkIn, checkOut] = dates.split(" - ");
    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      price: property.price,
    }).toString();

    // window.location.href = `/create-plan/${hotelId}?${queryParams}`
    navigate(`/create-plan/${hotelId}?${queryParams}`);
  };

  const handleBookRoom = (room) => {
    if (!auth.currentUser) {
      toast.info("Please login to book a room");
      // Optionally redirect to login
      return;
    }
    setSelectedRoom(room);
    setShowPaymentModal(true);
  };

  if (loading)
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <div className="mb-4">
            <FaHotel
              className=""
              style={{
                fontSize: "4rem",
                animation: "pulse 1.5s infinite",
                color: "#038A5E",
              }}
            />
          </div>
          <h2 className="mb-3">Loading your perfect stay...</h2>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <h2>Error: {error}</h2>
      </div>
    );
  if (!property)
    return (
      <div className="container mt-5">
        <h2>No property data available</h2>
      </div>
    );

  return (
    <div className="ota-page-wrapper" style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="container py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-3">
            <li className="breadcrumb-item"><Link to="/" className="text-secondary">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/tamil-nadu" className="text-secondary">Tamil Nadu</Link></li>
            <li className="breadcrumb-item active">{property["Property Name"]}</li>
          </ol>
        </nav>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge" style={{ backgroundColor: "var(--brand-accent)", color: "#333" }}>Top Rated</span>
              <span className="text-secondary small fw-bold">{property.type}</span>
            </div>
            <h1 className="h2 fw-800 mb-2">{property["Property Name"]}</h1>
            <p className="text-secondary d-flex align-items-center gap-2">
              <i className="fas fa-map-marker-alt text-success"></i>
              {property["Property Address"]}
              <span className="text-success fw-bold cursor-pointer small">Show on map</span>
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-white shadow-sm border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }} onClick={toggleFavorite}>
              <i className={`fas fa-heart ${isFavorite ? 'text-danger' : 'text-secondary'}`}></i>
            </button>
            <button className="btn btn-white shadow-sm border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="fas fa-share-alt text-secondary"></i>
            </button>
            <button className="ota-btn-primary ms-2" onClick={handleReserveNow}>Reserve Now</button>
          </div>
        </div>

        <div className="property-gallery-grid mb-5">
          <div className="gallery-main">
            <img
              src={
                (property.exteriorPhotos && property.exteriorPhotos.length > 0 ? property.exteriorPhotos[0] : null) ||
                (property.hotelImages && property.hotelImages.length > 0 ? property.hotelImages[0] : null) ||
                (property.images && property.images.length > 0 ? property.images[0] : null) ||
                property["Property Images"]?.[0] ||
                "/placeholder.svg"
              }
              alt=""
              className="gallery-img-large"
            />
          </div>
          <div className="gallery-secondary">
            {(
              (property.exteriorPhotos && property.exteriorPhotos.length > 0 ? property.exteriorPhotos.slice(1, 5) : []) ||
              (property.hotelImages && property.hotelImages.length > 0 ? property.hotelImages.slice(1, 5) : []) ||
              (property.images && property.images.length > 0 ? property.images.slice(1, 5) : []) ||
              property["Property Images"]?.slice(1, 5)
            )?.map((img, idx) => (
              <img key={idx} src={img || "/placeholder.svg"} alt="" className="gallery-img-small" />
            ))}
            {property["Property Images"]?.length > 5 && (
              <div className="gallery-more-overlay">
                <span>+{property["Property Images"].length - 5} photos</span>
              </div>
            )}
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2">About this property</h4>
              <p className="text-secondary lh-lg">{property.description || property.About}</p>

              <div className="row mt-4">
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fas fa-clock text-success"></i>
                    <div>
                      <small className="text-secondary d-block">Check-in</small>
                      <strong>{property.checkInTime || "12:00 PM"}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fas fa-clock text-danger"></i>
                    <div>
                      <small className="text-secondary d-block">Check-out</small>
                      <strong>{property.checkOutTime || "11:00 AM"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Popular Facilities</h4>
              <div className="d-flex flex-wrap gap-4 py-2">
                {/* Support for new amenities object format { wifi: true, ac: true } */}
                {property.amenities && typeof property.amenities === 'object' && !Array.isArray(property.amenities) ? (
                  Object.entries(property.amenities)
                    .filter(([key, value]) => value === true)
                    .map(([key, value], i) => {
                      // Simple mapping for common keys to display names
                      const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                      // Try to match icon
                      let iconName = key;
                      if (key.toLowerCase().includes('wifi')) iconName = 'wi-fi';
                      if (key.toLowerCase().includes('ac') || key.toLowerCase().includes('air')) iconName = 'air conditioning';

                      const Icon = getFacilityIcon(iconName);
                      return (
                        <div key={i} className="d-flex align-items-center gap-2">
                          <Icon className="text-success" style={{ fontSize: "1.2rem" }} />
                          <span className="fw-500">{displayName}</span>
                        </div>
                      );
                    })
                ) : (
                  /* Fallback to old array format */
                  property["Accommodation Facilities"]?.map((f, i) => {
                    const Icon = getFacilityIcon(f.name);
                    return (
                      <div key={i} className="d-flex align-items-center gap-2">
                        <Icon className="text-success" style={{ fontSize: "1.2rem" }} />
                        <span className="fw-500">{f.name}</span>
                      </div>
                    );
                  })
                )}

                {/* Also display any top-level flags like wifi, ac if they exist */}
                {property.wifi && (
                  <div className="d-flex align-items-center gap-2">
                    <FaWifi className="text-success" style={{ fontSize: "1.2rem" }} />
                    <span className="fw-500">Free Wi-Fi</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rooms Section */}
            {roomsList.length > 0 && (
              <div className="ota-card mb-4">
                <h4 className="fw-bold mb-3 border-bottom pb-2">Available Rooms</h4>
                <div className="rooms-list">
                  {roomsList.map((room, index) => {
                    // Use centralized pricing calculator for room price
                    const roomPricing = calculateRoomPrice(
                      { 
                        roomPrice: room.roomPrice, 
                        perAdultPrice: room.perAdultPrice, 
                        perChildPrice: room.perChildPrice, 
                        discount: room.discount || room.discountValue,
                        maxGuestAllowed: room.maxGuestAllowed
                      },
                      getTotalNights(),
                      adults,
                      children,
                      1,
                      adminCharges
                    );
                    return (
                      <div key={room.id || index} className="room-card border rounded p-3 mb-3">
                        <div className="row">
                          <div className="col-md-8">
                            <h5 className="fw-bold text-success mb-2">{room.roomType}</h5>
                            <div className="d-flex flex-wrap gap-2 mb-2">
                              <span className="badge bg-light text-dark border">
                                <FaUsers className="me-1" /> {room.maxGuestAllowed} Guests
                              </span>
                              <span className="badge bg-light text-dark border">
                                <i className="fas fa-bed me-1"></i> {room.bedType}
                              </span>
                            </div>
                            {room.description && (
                              <p className="text-secondary small mb-2">{room.description}</p>
                            )}
                            {room.facilities && room.facilities.length > 0 && (
                              <div className="d-flex flex-wrap gap-2">
                                {room.facilities.slice(0, 4).map((facility, idx) => {
                                  const FacilityIcon = getFacilityIcon(facility.name || facility);
                                  return (
                                    <span key={idx} className="d-flex align-items-center gap-1 small text-secondary">
                                      <FacilityIcon size={12} className="text-success" />
                                      {facility.name || facility}
                                    </span>
                                  );
                                })}
                                {room.facilities.length > 4 && (
                                  <span className="small text-muted">+{room.facilities.length - 4} more</span>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="col-md-4 text-md-end">
                            <div className="mb-2">
                              {room.discount > 0 && (
                                <span className="text-decoration-line-through text-muted small me-2">
                                  ₹{((room.roomPrice * getTotalNights()) * (1 + room.discount / 100)).toFixed(0)}
                                </span>
                              )}
                              <span className="h4 fw-bold text-success mb-0">₹{roomPricing.total.toFixed(0)}</span>
                            </div>
                            <p className="text-muted small mb-2">for {getTotalNights()} night(s)</p>
                            <button 
                              className="btn btn-success px-4 py-2 fw-bold"
                              onClick={() => handleReserveNow()}
                            >
                              Reserve
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map Preview */}
            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Location</h4>
              <MapCard
                location={property["Property Address"]}
                onOpenMap={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property["Property Address"])}`, '_blank')}
                latitude={property.latitude}
                longitude={property.longitude}
              />
            </div>

            <div className="ota-card mb-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Guest Reviews</h4>
              <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={(property.overallRating || 0) * 20}
                    text={`${(property.overallRating || 0).toFixed(1)}`}
                    styles={buildStyles({
                      textSize: "28px",
                      pathColor: "#038A5E",
                      textColor: "#038A5E",
                      trailColor: "#e6e6e6",
                    })}
                  />
                </div>
                <div className="ms-4">
                  <h5 className="fw-bold mb-1">{property.overallRating >= 4 ? "Excellent" : property.overallRating >= 3 ? "Very Good" : "Good"}</h5>
                  <p className="mb-0 text-secondary">Based on {property.reviewCount || 0} reviews</p>
                </div>
              </div>

              <div className="row g-4 mb-4">
                {reviewCategories.map((cat, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="small fw-600 offset-text">{cat.name}</span>
                      <span className="small fw-bold">{cat.rating.toFixed(1)}</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${cat.rating * 20}%` }}
                        aria-valuenow={cat.rating * 20}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviews List */}
              <div className="reviews-list">
                {reviews.slice(0, showAllReviews ? undefined : 3).map((review) => (
                  <div key={review.id} className="review-item border-bottom py-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="review-avatar">
                          {review.userProfilePicture ? (
                            <img src={review.userProfilePicture} alt={review.username} className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                          ) : (
                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" style={{ width: 40, height: 40 }}>
                              {review.username?.charAt(0) || 'A'}
                            </div>
                          )}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">{review.username}</h6>
                          <small className="text-secondary">{review.date}</small>
                        </div>
                      </div>
                      <div className="badge bg-light text-dark border d-flex align-items-center gap-1">
                        <FaStar className="text-warning" size={12} />
                        {review.overallRating?.toFixed(1)}
                      </div>
                    </div>
                    <p className="mb-1 text-secondary">{review.comments}</p>

                    {auth.currentUser && auth.currentUser.uid === review.userId && (
                      <div className="d-flex justify-content-end gap-2 mt-2">
                        <button className="btn btn-sm btn-link text-secondary p-0" onClick={() => deleteReview(review.id)}>
                          <FaTrash size={12} className="me-1" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {reviews.length > 3 && (
                  <button className="btn btn-link text-success fw-bold p-0 mt-3 text-decoration-none" onClick={() => setShowAllReviews(!showAllReviews)}>
                    {showAllReviews ? "Show Less" : `Read All ${reviews.length} Reviews`}
                  </button>
                )}
              </div>

              {/* Write Review Section - Only if booked */}
              {canSubmitReview && (
                <div className="mt-5 p-4 bg-light rounded-3">
                  <h5 className="fw-bold mb-3">Write a Review</h5>
                  <div className="row g-3 mb-3">
                    {[
                      { label: "Staff", key: "staffReview" },
                      { label: "Luxury", key: "luxury" },
                      { label: "Amenities", key: "amenities" },
                      { label: "Value", key: "price" }
                    ].map(rating => (
                      <div className="col-md-3" key={rating.key}>
                        <label className="form-label small fw-bold">{rating.label}</label>
                        <select
                          className="form-select form-select-sm"
                          value={newReview[rating.key]}
                          onChange={(e) => handleReviewChange(rating.key, Number(e.target.value))}
                        >
                          <option value="0">Select</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small">Your Experience</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newReview.comments}
                      onChange={(e) => handleReviewChange("comments", e.target.value)}
                      placeholder="Tell us about your stay..."
                    ></textarea>
                  </div>
                  <button className="btn btn-success px-4" onClick={submitReview}>Submit Review</button>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="ota-card position-sticky" style={{ top: "120px" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="text-secondary text-decoration-line-through small me-2">₹{(property.price * 1.2).toFixed(0)}</span>
                  <span className="h3 fw-bold text-success mb-0">₹{property.price?.toFixed(0)}</span>
                </div>
                <span className="badge bg-danger">20% OFF</span>
              </div>
              <p className="text-secondary small mb-4">Total price for {rooms} room(s), {getTotalNights()} night(s)</p>

              <div className="d-flex flex-column gap-2 mb-4">
                <div className="border rounded p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary d-block">Check-in</small>
                    <span className="fw-bold">{dates.split(' - ')[0] || 'Select Date'}</span>
                  </div>
                  <i className="fas fa-calendar-alt text-secondary"></i>
                </div>
                <div className="border rounded p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary d-block">Check-out</small>
                    <span className="fw-bold">{dates.split(' - ')[1] || 'Select Date'}</span>
                  </div>
                  <i className="fas fa-calendar-alt text-secondary"></i>
                </div>
                <div className="border rounded p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary d-block">Guests</small>
                    <span className="fw-bold">{guests || 'Select Guests'}</span>
                  </div>
                  <i className="fas fa-user-friends text-secondary"></i>
                </div>
              </div>

              <button className="btn btn-success w-100 py-3 fw-bold text-uppercase mb-3 shadow-sm" onClick={handleReserveNow}>
                Reserve Now
              </button>
              <p className="text-center text-secondary small mb-0">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedRoom && (
        <PaymentModal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          room={selectedRoom}
          property={property}
          bookingDetails={{
            checkIn: dates.split(' - ')[0],
            checkOut: dates.split(' - ')[1],
            adults,
            children,
            rooms
          }}
        />
      )}
    </div>
  );
};

export default HotelDetails;
