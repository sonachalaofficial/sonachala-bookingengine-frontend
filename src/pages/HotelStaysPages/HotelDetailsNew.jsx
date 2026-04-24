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
  FaVideo,
  FaTshirt,
  FaBell,
  FaUsers,
  FaGlassMartini,
  FaSnowflake,
  FaBuilding,
  FaSmokingBan,
  FaSwimmer,
  FaClock,
  FaChild,
  FaBaby,
  FaMoneyBillWave,
  FaTv,
  FaBath,
  FaPhone,
  FaCoffee,
  FaWater,
  FaWifi as FaWifiIcon,
  FaFireExtinguisher,
  FaFirstAid,
  FaKey,
  FaConciergeBell,
  FaInfoCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaBed,
  FaRulerCombined,
} from "react-icons/fa";
import {
  GiHeatHaze,
  GiCoffeePot,
  GiTowel,
} from "react-icons/gi";
import {
  MdRoomService,
  MdOutlineAir,
  MdLocalLaundryService,
  MdBalcony,
  MdTerrain,
} from "react-icons/md";
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
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PaymentModal from "../../common/PaymentModal";
import { fetchAdminCharges, DEFAULT_ADMIN_CHARGES, calculateRoomPriceBreakdown } from "../../utils/bookingUtils";

// Helper function to calculate total price - uses centralized pricing logic
// Note: Admin charges are fetched separately and passed to the centralized function
const calculateTotalPriceForRoom = (
  roomDetails,
  totalNights,
  totalAdults,
  totalChildren,
  totalRooms,
  adminCharges
) => {
  // Use centralized pricing calculation
  const breakdown = calculateRoomPriceBreakdown(
    {
      roomPrice: roomDetails.perNightPrice,
      maxGuestAllowed: roomDetails.maxGuestAllowed || 2,
      perAdultPrice: roomDetails.perAdultPrice,
      perChildPrice: roomDetails.perChildPrice,
      discount: roomDetails.discountValue
    },
    totalNights,
    totalAdults,
    totalChildren,
    totalRooms,
    adminCharges
  );
  
  return breakdown.grandTotal;
};

// Calculate complete price breakdown for a room - returns full breakdown object
const calculateRoomBreakdown = (
  roomDetails,
  totalNights,
  totalAdults,
  totalChildren,
  totalRooms,
  adminCharges
) => {
  return calculateRoomPriceBreakdown(
    {
      roomPrice: roomDetails.perNightPrice,
      maxGuestAllowed: roomDetails.maxGuestAllowed || 2,
      perAdultPrice: roomDetails.perAdultPrice,
      perChildPrice: roomDetails.perChildPrice,
      discount: roomDetails.discountValue
    },
    totalNights,
    totalAdults,
    totalChildren,
    totalRooms,
    adminCharges
  );
};

// Amenity Icon Mapping
const getAmenityIcon = (amenityName) => {
  const name = amenityName?.toLowerCase() || "";
  
  if (name.includes("wifi") || name.includes("wi-fi")) return FaWifi;
  if (name.includes("tv") || name.includes("television")) return FaTv;
  if (name.includes("ac") || name.includes("air condition")) return FaSnowflake;
  if (name.includes("room service") || name.includes("24-hour")) return MdRoomService;
  if (name.includes("geyser") || name.includes("hot water") || name.includes("heat")) return GiHeatHaze;
  if (name.includes("parking")) return FaParking;
  if (name.includes("gym") || name.includes("fitness")) return FaDumbbell;
  if (name.includes("spa")) return FaSpa;
  if (name.includes("pool") || name.includes("swim")) return FaSwimmer;
  if (name.includes("restaurant") || name.includes("food")) return FaUtensils;
  if (name.includes("laundry")) return MdLocalLaundryService;
  if (name.includes("lift") || name.includes("elevator")) return FaBuilding;
  if (name.includes("bar")) return FaGlassMartini;
  if (name.includes("coffee") || name.includes("cafe")) return GiCoffeePot;
  if (name.includes("balcony")) return MdBalcony;
  if (name.includes("mountain view") || name.includes("view")) return MdTerrain;
  if (name.includes("bathroom") || name.includes("bath")) return FaBath;
  if (name.includes("towel") || name.includes("linen")) return GiTowel;
  if (name.includes("safe") || name.includes("locker")) return FaKey;
  if (name.includes("fire") || name.includes("safety")) return FaFireExtinguisher;
  if (name.includes("first aid") || name.includes("medical")) return FaFirstAid;
  if (name.includes("kettle")) return GiCoffeePot;
  if (name.includes("fridge") || name.includes("mini bar")) return FaSnowflake;
  if (name.includes("desk") || name.includes("work")) return FaBuilding;
  if (name.includes("sofa") || name.includes("seating")) return FaUsers;
  if (name.includes("disabled") || name.includes("wheelchair")) return FaWheelchair;
  if (name.includes("smoking")) return FaSmokingBan;
  if (name.includes("power") || name.includes("backup")) return FaBath;
  if (name.includes("intercom") || name.includes("phone")) return FaPhone;
  if (name.includes("cctv") || name.includes("camera")) return FaVideo;
  if (name.includes("concierge")) return FaConciergeBell;
  
  return FaCheck;
};

// Star Rating Component
const StarRating = ({ rating = 0, maxRating = 5 }) => {
  return (
    <div className="hotel-star-rating">
      {[...Array(maxRating)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "star-filled" : "star-empty"}
        />
      ))}
    </div>
  );
};

// Image Gallery Modal Component
const GalleryModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <button className="gallery-close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <button className="gallery-nav-btn prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <FaChevronLeft />
      </button>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} />
      </div>
      <button className="gallery-nav-btn next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <FaChevronRight />
      </button>
      <div className="position-absolute bottom-0 start-50 translate-middle-x text-white mb-4">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="hotel-details-page">
    <div className="container py-4">
      {/* Header Skeleton */}
      <div className="skeleton mb-3" style={{ height: 30, width: "60%" }}></div>
      <div className="skeleton mb-4" style={{ height: 20, width: "40%" }}></div>
      
      {/* Gallery Skeleton */}
      <div className="property-gallery-grid mb-4">
        <div className="skeleton" style={{ height: 400 }}></div>
        <div className="gallery-secondary">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: 192 }}></div>
          ))}
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="ota-card mb-4">
            <div className="skeleton mb-3" style={{ height: 24, width: "30%" }}></div>
            <div className="skeleton mb-2" style={{ height: 16 }}></div>
            <div className="skeleton mb-2" style={{ height: 16, width: "80%" }}></div>
            <div className="skeleton" style={{ height: 16, width: "60%" }}></div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="ota-card">
            <div className="skeleton mb-3" style={{ height: 40 }}></div>
            <div className="skeleton mb-3" style={{ height: 50 }}></div>
            <div className="skeleton" style={{ height: 45 }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Hotel Details Component
const HotelDetailsNew = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State Management
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
  
  // Gallery Modal State
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Admin Charges State
  const [adminCharges, setAdminCharges] = useState(DEFAULT_ADMIN_CHARGES);

  // Fetch Property Details
  const fetchPropertyDetails = useCallback(async () => {
    if (!hotelId) {
      setError("No property ID provided");
      setLoading(false);
      return;
    }

    try {
      let propertyDoc;
      let propertyType;

      // Try Hotels collection first
      propertyDoc = await getDoc(doc(db, "Hotels", hotelId));
      if (propertyDoc.exists()) {
        propertyType = "Hotel";
      } else {
        // Try Homestays collection
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

        // Fetch reviews for rating calculation
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
            ? (totalStaffReview + totalLuxury + totalAmenities + totalPrice) / (reviewCount * 4)
            : 0;
        const averageStaffReview = reviewCount > 0 ? totalStaffReview / reviewCount : 0;
        const averageLuxury = reviewCount > 0 ? totalLuxury / reviewCount : 0;
        const averageAmenities = reviewCount > 0 ? totalAmenities / reviewCount : 0;
        const averagePrice = reviewCount > 0 ? totalPrice / reviewCount : 0;

        // Fetch room details from subcollection
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
              roomType: roomData.roomType || roomData.name || "Standard Room",
              customName: roomData.customName || "",
              roomPrice: Number.parseFloat(roomData.roomPrice || roomData.price) || 0,
              perAdultPrice: Number.parseFloat(roomData.perAdultPrice) || 0,
              perChildPrice: Number.parseFloat(roomData.perChildPrice) || 0,
              discountValue: Number.parseFloat(roomData.discount) || 0,
              bedType: roomData.bedType || "Standard Bed",
              maxGuestAllowed: Number.parseInt(roomData.maxguestAllowed || roomData.maxGuests) || 2,
              roomSize: roomData.roomSize || "",
              description: roomData.description || "",
              facilities: roomData.facilities || [],
              roomImages: roomData.photos || roomData.roomImages || [],
              totalRooms: roomData.totalRooms || 1,
              availability: roomData.availability || "Yes",
            });
          });
          
          const firstRoom = roomSnapshot.docs[0].data();
          roomDetails = {
            perNightPrice: Number.parseFloat(firstRoom.roomPrice || firstRoom.price) || 0,
            perAdultPrice: Number.parseFloat(firstRoom.perAdultPrice) || 0,
            perChildPrice: Number.parseFloat(firstRoom.perChildPrice) || 0,
            discountValue: Number.parseFloat(firstRoom.discount) || 0,
          };
        }
        
        // Also check roomTypes array from parent document (for backward compatibility)
        if (propertyData.roomTypes && propertyData.roomTypes.length > 0 && roomsData.length === 0) {
          propertyData.roomTypes.forEach((rt, index) => {
            roomsData.push({
              id: rt.id || `room-${index}`,
              roomType: rt.name || "Standard Room",
              customName: rt.customName || "",
              roomPrice: Number.parseFloat(rt.price) || 0,
              perAdultPrice: Number.parseFloat(rt.perAdultPrice) || 0,
              perChildPrice: Number.parseFloat(rt.perChildPrice) || 0,
              discountValue: Number.parseFloat(rt.discount) || 0,
              bedType: rt.bedType || "Standard Bed",
              maxGuestAllowed: Number.parseInt(rt.maxguestAllowed || rt.maxGuests) || 2,
              roomSize: rt.roomSize || "",
              description: rt.description || "",
              facilities: rt.facilities || [],
              roomImages: rt.photos || [],
              totalRooms: rt.count || 1,
              availability: rt.availability || "Yes",
            });
          });
        }
        
        setRoomsList(roomsData);

        // Calculate price
        const initialPrice = roomDetails.perNightPrice || 0;

        setProperty({
          ...propertyData,
          overallRating,
          averageStaffReview,
          averageLuxury,
          averageAmenities,
          averagePrice,
          reviewCount,
          roomDetails,
          price: initialPrice,
        });
        
        setSearchLocation(propertyData["Property Address"] || propertyData.address || "");
        
        // Prepare gallery images
        const images = [
          ...(propertyData.exteriorPhotos || []),
          ...(propertyData.hotelImages || []),
          ...(propertyData["Property Images"] || []),
          ...(propertyData.images || []),
        ].filter(Boolean);
        setGalleryImages(images);
        
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
    if (isNaN(start) || isNaN(end)) return 1;
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
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
        { name: "Staff Members", rating: count > 0 ? totalStaffReview / count : 0 },
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
      const bookingsRef = collection(db, "Users", auth.currentUser.uid, "Bookings");
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

  useEffect(() => {
    fetchPropertyDetails();
  }, [hotelId]);

  // Fetch admin charges on mount
  useEffect(() => {
    const loadAdminCharges = async () => {
      const charges = await fetchAdminCharges();
      setAdminCharges(charges);
    };
    loadAdminCharges();
  }, []);

  // Initialize from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get("location") || localStorage.getItem("location") || "";
    const checkInParam = searchParams.get("checkIn") || localStorage.getItem("checkIn");
    const checkOutParam = searchParams.get("checkOut") || localStorage.getItem("checkOut");
    const adultsParam = Number.parseInt(searchParams.get("adults") || localStorage.getItem("adults") || "1");
    const childrenParam = Number.parseInt(searchParams.get("children") || localStorage.getItem("children") || "0");
    const roomsParam = Number.parseInt(searchParams.get("rooms") || localStorage.getItem("rooms") || "1");

    setSearchLocation(locationParam);
    
    if (checkInParam && checkOutParam) {
      setDates(`${checkInParam} - ${checkOutParam}`);
    }
    
    setAdults(adultsParam);
    setChildren(childrenParam);
    setRooms(roomsParam);
    updateGuests(adultsParam, childrenParam, roomsParam);

    if (datePickerRef.current && checkInParam && checkOutParam) {
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
      return () => fp.destroy();
    }
  }, [location.search]);

  const updateGuests = (a, c, r) => {
    setGuests(`${a} Adults, ${c} Children, ${r} Rooms`);
  };

  const updateURL = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      toast.info("Please login to add favorites");
      return;
    }

    if (!property) return;

    const userId = auth.currentUser.uid;
    const favoriteRef = doc(db, "Users", userId, "Favorites", hotelId);

    try {
      if (isFavorite) {
        await deleteDoc(favoriteRef);
        toast.success("Removed from favorites");
      } else {
        await setDoc(favoriteRef, {
          propertyId: hotelId,
          "Property Addresss": property["Property Address"] || property.address || "",
          "Property Facility": property["Accommodation Facilities"] || [],
          "Property Image": property["Property Images"] || property.exteriorPhotos || [],
          "Property Name": property["Property Name"] || property.hotelName || "",
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
        const favoritesRef = doc(db, "Users", auth.currentUser.uid, "Favorites", hotelId);
        const docSnap = await getDoc(favoritesRef);
        setIsFavorite(docSnap.exists());
      }
    };
    fetchFavoriteStatus();
  }, [hotelId]);

  useEffect(() => {
    if (property && property.roomDetails) {
      const newPrice = calculateTotalPriceForRoom(
        property.roomDetails,
        getTotalNights(),
        adults,
        children,
        rooms,
        adminCharges
      );
      if (newPrice !== property.price) {
        setProperty((prev) => ({ ...prev, price: newPrice }));
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
          (newReview.staffReview + newReview.luxury + newReview.amenities + newReview.price) / 4,
      };

      await addDoc(collection(db, property.type + "s", hotelId, "Reviews"), reviewData);

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

  const deleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, property.type + "s", hotelId, "Reviews", reviewId));
      toast.success("Review deleted successfully!");
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review. Please try again.");
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
    navigate(`/create-plan/${hotelId}?${queryParams}`);
  };

  const handleBookRoom = (room) => {
    if (!auth.currentUser) {
      toast.info("Please login to book a room");
      return;
    }
    
    // Calculate the complete price breakdown for this room using centralized function
    const roomPriceBreakdown = calculateRoomBreakdown(
      { 
        perNightPrice: room.roomPrice, 
        perAdultPrice: room.perAdultPrice, 
        perChildPrice: room.perChildPrice, 
        discountValue: room.discount || room.discountValue || 0,
        maxGuestAllowed: room.maxGuestAllowed || 2
      },
      totalNights,
      adults,
      children,
      1,
      adminCharges
    );
    
    // Pass the room with calculated price and full breakdown
    setSelectedRoom({
      ...room,
      perNightPrice: room.roomPrice,
      discount: room.discount || room.discountValue || 0,
      calculatedPrice: roomPriceBreakdown.grandTotal,
      priceBreakdown: roomPriceBreakdown
    });
    setShowPaymentModal(true);
  };

  // Gallery handlers
  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setShowGalleryModal(true);
  };

  const closeGallery = () => setShowGalleryModal(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Get star rating from property
  const getStarRating = () => {
    return property?.starRating || property?.rating || 
           (property?.overallRating >= 4.5 ? 5 :
            property?.overallRating >= 3.5 ? 4 :
            property?.overallRating >= 2.5 ? 3 :
            property?.overallRating >= 1.5 ? 2 : 1);
  };

  // Get amenities list
  const getAmenitiesList = () => {
    if (property?.amenities && typeof property.amenities === "object" && !Array.isArray(property.amenities)) {
      // Object format: { wifi: true, ac: true, ... }
      return Object.entries(property.amenities)
        .filter(([key, value]) => value === true)
        .map(([key]) => ({
          name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          key: key
        }));
    } else if (property?.["Accommodation Facilities"] && Array.isArray(property["Accommodation Facilities"])) {
      // Array format from admin
      return property["Accommodation Facilities"].map(f => ({
        name: f.name || f,
        key: f.name || f
      }));
    } else if (property?.facilities && Array.isArray(property.facilities)) {
      return property.facilities.map(f => ({
        name: f.name || f,
        key: f.name || f
      }));
    }
    return [];
  };

  // Get starting price
  const getStartingPrice = () => {
    if (roomsList.length > 0) {
      const prices = roomsList.map(r => r.roomPrice).filter(p => p > 0);
      return prices.length > 0 ? Math.min(...prices) : 0;
    }
    return property?.roomDetails?.perNightPrice || property?.price || 0;
  };

  // Loading state
  if (loading) return <LoadingSkeleton />;
  
  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Error: {error}</h4>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container mt-5">
        <h2>No property data available</h2>
      </div>
    );
  }

  const amenities = getAmenitiesList();
  const starRating = getStarRating();
  const startingPrice = getStartingPrice();
  const totalNights = getTotalNights();

  return (
    <div className="hotel-details-page">
      {/* Breadcrumb */}
      <div className="container py-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-custom mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/stay">Hotels</Link></li>
            <li className="breadcrumb-item active" aria-current="page">
              {property["Property Name"] || property.hotelName || "Hotel Details"}
            </li>
          </ol>
        </nav>
      </div>

      {/* Header Section */}
      <section className="hotel-header-section">
        <div className="container">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4">
            {/* Left: Hotel Info */}
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                  {property.type || "Hotel"}
                </span>
                <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
                  Top Rated
                </span>
              </div>
              
              <h1 className="h2 fw-bold mb-2" style={{ color: "#1a1a2e" }}>
                {property["Property Name"] || property.hotelName || "Hotel Name"}
              </h1>
              
              <StarRating rating={starRating} />
              
              <p className="text-secondary d-flex align-items-center gap-2 mt-3 mb-0">
                <FaMapMarkerAlt className="text-success" />
                <span>{property["Property Address"] || property.address || "Address not available"}</span>
                <button 
                  className="btn btn-link text-success p-0 text-decoration-none small"
                  onClick={() => document.getElementById('location-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  Show on map
                </button>
              </p>
            </div>
            
            {/* Right: Price & Action */}
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
              <div className="text-center text-sm-end">
                <p className="text-secondary small mb-1">Starting from</p>
                <div className="price-tag">
                  <span className="price-amount">₹{startingPrice.toLocaleString()}</span>
                  <span className="price-period">/night</span>
                </div>
              </div>
              
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-white shadow-sm border rounded-circle p-2"
                  style={{ width: "44px", height: "44px" }}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? (
                    <FaHeart className="text-danger" />
                  ) : (
                    <FaRegHeart className="text-secondary" />
                  )}
                </button>
                <button 
                  className="btn btn-white shadow-sm border rounded-circle p-2"
                  style={{ width: "44px", height: "44px" }}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: property["Property Name"] || property.hotelName,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                >
                  <FaShareAlt className="text-secondary" />
                </button>
              </div>
              
              <button className="select-room-btn btn-lg" onClick={handleReserveNow}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <div className="container py-4">
        <div className="property-gallery-grid" style={{ cursor: "pointer" }}>
          <div className="gallery-main" onClick={() => openGallery(0)}>
            <img
              src={
                galleryImages[0] ||
                property.exteriorPhotos?.[0] ||
                property.hotelImages?.[0] ||
                property["Property Images"]?.[0] ||
                "/placeholder.svg"
              }
              alt="Hotel Main"
              className="gallery-img-large"
            />
          </div>
          <div className="gallery-secondary">
            {galleryImages.slice(1, 5).map((img, idx) => (
              <div 
                key={idx} 
                className="position-relative"
                onClick={() => openGallery(idx + 1)}
                style={{ cursor: "pointer" }}
              >
                <img src={img || "/placeholder.svg"} alt={`Hotel ${idx + 2}`} className="gallery-img-small" />
                {idx === 3 && galleryImages.length > 5 && (
                  <div className="gallery-more-overlay">
                    <span>+{galleryImages.length - 5} photos</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-12 col-lg-8">
            
            {/* About Section */}
            <div className="ota-card mb-4 animate-fade-in-up">
              <h4 className="section-header">About this property</h4>
              <p className="text-secondary lh-lg">
                {property.description || property.About || "Welcome to our property. We offer comfortable accommodations with modern amenities to make your stay memorable."}
              </p>
              
              <div className="row mt-4">
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="rule-icon">
                      <FaClock />
                    </div>
                    <div>
                      <small className="text-secondary d-block">Check-in</small>
                      <strong>{property["Check-in Time"] || property.checkInTime || "12:00 PM"}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="rule-icon">
                      <FaClock />
                    </div>
                    <div>
                      <small className="text-secondary d-block">Check-out</small>
                      <strong>{property["Check-out Time"] || property.checkOutTime || "11:00 AM"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            {amenities.length > 0 && (
              <div className="ota-card mb-4 animate-fade-in-up">
                <h4 className="section-header">Amenities</h4>
                <div className="row g-3">
                  {amenities.map((amenity, index) => {
                    const Icon = getAmenityIcon(amenity.name);
                    return (
                      <div className="col-6 col-md-4 col-lg-3" key={index}>
                        <div className="amenity-badge w-100">
                          <Icon className="amenity-icon" />
                          <span className="amenity-name">{amenity.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rooms Section */}
            {roomsList.length > 0 && (
              <div className="mb-4 animate-fade-in-up">
                <h4 className="section-header">Available Rooms</h4>
                <div className="row g-4">
                  {roomsList.map((room, index) => {
                    // Calculate room price with admin charges
                    const roomPriceBreakdown = calculateRoomBreakdown(
                      { 
                        perNightPrice: room.roomPrice, 
                        perAdultPrice: room.perAdultPrice, 
                        perChildPrice: room.perChildPrice, 
                        discountValue: room.discount || room.discountValue || 0,
                        maxGuestAllowed: room.maxGuestAllowed || 2
                      },
                      totalNights,
                      adults,
                      children,
                      1,
                      adminCharges
                    );
                    const roomTotalPrice = roomPriceBreakdown.grandTotal;
                    
                    const originalPrice = room.roomPrice * totalNights;
                    const hasDiscount = room.discount > 0;
                    
                    return (
                      <div className="col-12 col-md-6" key={room.id || index}>
                        <div className="room-card-enhanced">
                          <div className="room-image-container">
                            <img
                              src={room.roomImages?.[0] || galleryImages[0] || "/placeholder.svg"}
                              alt={room.customName || room.roomType}
                            />
                            {hasDiscount && (
                              <span className="room-discount-badge">{room.discount}% OFF</span>
                            )}
                            <span className="room-type-badge">{room.roomType}</span>
                          </div>
                          
                          <div className="room-content">
                            <h5 className="fw-bold text-dark mb-2">
                              {room.customName || room.roomType}
                            </h5>
                            
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                                <FaBed size={12} /> {room.bedType}
                              </span>
                              <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                                <FaUsers size={12} /> {room.maxGuestAllowed} Guests
                              </span>
                              {room.roomSize && (
                                <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                                  <FaRulerCombined size={12} /> {room.roomSize} sq ft
                                </span>
                              )}
                            </div>
                            
                            {room.description && (
                              <p className="text-secondary small mb-3">{room.description}</p>
                            )}
                            
                            {/* Room Facilities */}
                            {room.facilities && room.facilities.length > 0 && (
                              <div className="room-amenities">
                                {room.facilities.slice(0, 4).map((facility, idx) => {
                                  const FacilityIcon = getAmenityIcon(facility.name || facility);
                                  return (
                                    <span key={idx} className="room-amenity-tag">
                                      <FacilityIcon size={12} />
                                      {facility.name || facility}
                                    </span>
                                  );
                                })}
                                {room.facilities.length > 4 && (
                                  <span className="text-muted small">+{room.facilities.length - 4} more</span>
                                )}
                              </div>
                            )}
                            
                            <div className="room-price-section">
                              <div>
                                {hasDiscount && (
                                  <p className="room-original-price mb-0">₹{originalPrice.toLocaleString()}</p>
                                )}
                                <p className="room-final-price mb-0">
                                  ₹{roomTotalPrice.toFixed(0)}
                                  <small className="text-muted fw-normal ms-1">/ {totalNights} night{totalNights > 1 ? 's' : ''}</small>
                                </p>
                              </div>
                              <button 
                                className="select-room-btn"
                                onClick={() => handleBookRoom(room)}
                              >
                                Select Room
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Location Section */}
            <div id="location-section" className="location-section mb-4 animate-fade-in-up">
              <div className="p-3 border-bottom">
                <h4 className="section-header mb-0">Location</h4>
              </div>
              
              <div className="location-map-container">
                {(property.latitude && property.longitude) ? (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAba8Pvzm4uXVQs3VKdlqW-JqavRU1yIEs&q=${property.latitude},${property.longitude}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAba8Pvzm4uXVQs3VKdlqW-JqavRU1yIEs&q=${encodeURIComponent(property["Property Address"] || property.address || "")}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
              </div>
              
              <div className="location-info">
                <FaMapMarkerAlt className="text-success fs-4" />
                <div>
                  <p className="mb-0 fw-semibold">{property["Property Address"] || property.address}</p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${property.latitude || ''},${property.longitude || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-success text-decoration-none small"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Hotel Rules Section */}
            <div className="hotel-rules-section mb-4 animate-fade-in-up">
              <h4 className="section-header">Hotel Rules & Policies</h4>
              
              <div className="rule-item">
                <div className="rule-icon">
                  <FaClock />
                </div>
                <div className="rule-content">
                  <p className="rule-label">Check-in Time</p>
                  <p className="rule-value">{property["Check-in Time"] || property.checkInTime || "12:00 PM"}</p>
                </div>
              </div>
              
              <div className="rule-item">
                <div className="rule-icon">
                  <FaClock />
                </div>
                <div className="rule-content">
                  <p className="rule-label">Check-out Time</p>
                  <p className="rule-value">{property["Check-out Time"] || property.checkOutTime || "11:00 AM"}</p>
                </div>
              </div>
              
              <div className="rule-item">
                <div className="rule-icon">
                  <FaClock />
                </div>
                <div className="rule-content">
                  <p className="rule-label">24 Hours Check-in</p>
                  <p className="rule-value">{property.is24HoursCheckIn ? "Yes" : "No"}</p>
                </div>
              </div>
              
              <div className="rule-item">
                <div className="rule-icon">
                  <FaBaby />
                </div>
                <div className="rule-content">
                  <p className="rule-label">Infant Maximum Age</p>
                  <p className="rule-value">{property.infantMaxAge || 2} years</p>
                </div>
              </div>
              
              <div className="rule-item">
                <div className="rule-icon">
                  <FaChild />
                </div>
                <div className="rule-content">
                  <p className="rule-label">Child Maximum Age</p>
                  <p className="rule-value">{property.childMaxAge || 12} years</p>
                </div>
              </div>
              
              <div className="rule-item">
                <div className="rule-icon">
                  <FaMoneyBillWave />
                </div>
                <div className="rule-content">
                  <p className="rule-label">Refund Policy</p>
                  <p className="rule-value">{property.refundPolicy || property.cancellationPolicy || "As per hotel policy"}</p>
                </div>
              </div>
            </div>

            {/* Guest Reviews Section */}
            <div className="ota-card mb-4 animate-fade-in-up">
              <h4 className="section-header">Guest Reviews</h4>
              
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
                  <h5 className="fw-bold mb-1">
                    {property.overallRating >= 4 ? "Excellent" : 
                     property.overallRating >= 3 ? "Very Good" : 
                     property.overallRating >= 2 ? "Good" : "Average"}
                  </h5>
                  <p className="mb-0 text-secondary">Based on {property.reviewCount || 0} reviews</p>
                </div>
              </div>

              <div className="row g-4 mb-4">
                {reviewCategories.map((cat, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="small fw-600">{cat.name}</span>
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
                            <img 
                              src={review.userProfilePicture} 
                              alt={review.username} 
                              className="rounded-circle" 
                              style={{ width: 40, height: 40, objectFit: 'cover' }} 
                            />
                          ) : (
                            <div 
                              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" 
                              style={{ width: 40, height: 40 }}
                            >
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
                        <button 
                          className="btn btn-sm btn-link text-secondary p-0" 
                          onClick={() => deleteReview(review.id)}
                        >
                          <FaTrash size={12} className="me-1" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {reviews.length > 3 && (
                  <button 
                    className="btn btn-link text-success fw-bold p-0 mt-3 text-decoration-none" 
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? "Show Less" : `Read All ${reviews.length} Reviews`}
                  </button>
                )}
              </div>

              {/* Write Review Section */}
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

          {/* Right Column - Sticky Booking Card */}
          <div className="col-12 col-lg-4">
            <div className="ota-card position-sticky" style={{ top: "20px" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="text-secondary text-decoration-line-through small me-2">
                    ₹{(property.price * 1.2).toFixed(0)}
                  </span>
                  <span className="h3 fw-bold text-success mb-0">₹{property.price?.toFixed(0)}</span>
                </div>
                <span className="badge bg-danger">20% OFF</span>
              </div>
              <p className="text-secondary small mb-4">
                Total for {rooms} room{rooms > 1 ? 's' : ''}, {totalNights} night{totalNights > 1 ? 's' : ''}
              </p>

              <div className="d-flex flex-column gap-2 mb-4">
                <div className="border rounded p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary d-block">Check-in</small>
                    <span className="fw-bold">{dates.split(' - ')[0] || 'Select Date'}</span>
                  </div>
                  <FaClock className="text-secondary" />
                </div>
                <div className="border rounded p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary d-block">Check-out</small>
                    <span className="fw-bold">{dates.split(' - ')[1] || 'Select Date'}</span>
                  </div>
                  <FaClock className="text-secondary" />
                </div>
                <div className="border rounded p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary d-block">Guests</small>
                    <span className="fw-bold">{guests || 'Select Guests'}</span>
                  </div>
                  <FaUsers className="text-secondary" />
                </div>
              </div>

              <button 
                className="btn btn-success w-100 py-3 fw-bold text-uppercase mb-3 shadow-sm" 
                onClick={handleReserveNow}
              >
                Reserve Now
              </button>
              <p className="text-center text-secondary small mb-0">You won't be charged yet</p>
              
              <hr className="my-4" />
              
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Property Type</span>
                <span className="fw-bold">{property.type || "Hotel"}</span>
              </div>
              
              {property.phone && (
                <div className="d-flex justify-content-between mt-2">
                  <span className="text-secondary">Contact</span>
                  <span className="fw-bold">{property.phone || property["Property contact"]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGalleryModal && (
        <GalleryModal
          images={galleryImages}
          currentIndex={currentImageIndex}
          onClose={closeGallery}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

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

export default HotelDetailsNew;