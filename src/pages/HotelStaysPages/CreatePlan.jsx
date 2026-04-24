import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth, db } from "../../firebase/config";
import Preloader from "./Preloader";
import {
  FaWifi,
  FaUtensils,
  FaBed,
  FaInfoCircle,
  FaUsers,
  FaRupeeSign,
  FaWheelchair,
  FaParking,
  FaDumbbell,
  FaSpa,
  FaSwimmer,
  FaVideo,
  FaTshirt,
  FaBell,
  FaGlassMartini,
  FaSnowflake,
  FaBuilding,
  FaSmokingBan,
  FaCheck,
  FaArrowUp,
  FaTrash,
  FaArrowDown,
} from "react-icons/fa";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { collection, doc, getDoc, getDocs, addDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fetchAdminCharges, DEFAULT_ADMIN_CHARGES, calculateRoomPriceBreakdown } from "../../utils/bookingUtils";

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
`;

const RoomInfo = styled.div`
  padding: 1rem;
`;

const RoomTitle = styled.h2`
  font-size: 1.5rem;
  color: #038A5E;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const RoomFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #555;
    background-color: #f8f9fa;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e9ecef;
    }

    svg {
      color: #038A5E;
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  background-color: #f8f9fa;
  padding: 0.5rem;
  border-radius: 8px;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CounterButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : props.increment ? "#038A5E" : "#e9ecef")};
  color: ${(props) => (props.disabled ? "#999" : "white")};
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f0f0f0" : props.increment ? "#002d70" : "#ced4da")};
  }
`;

const CounterValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
`;

const PriceDetails = styled.div`
  margin-top: 1rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;

  &.total {
    font-weight: bold;
    font-size: 1rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #dee2e6;
  }
`;

const CreatePlanButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#038A5E")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0aaa75ff")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) => (props.disabled ? "none" : "0 4px 8px rgba(0, 59, 148, 0.2)")};
  }
`;

const CreatedRoomsSection = styled.div`
  margin-top: 1rem;
  @media (max-width: 991px) {
    display: none;
  }
`;

const CreatedRoomCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DeleteButton = styled.button`
  background-color: #038A5E;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 0.875rem;

  &:hover {
    background-color: #038A5E ;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 59, 148, 0.2);
  }
`;

const ReserveButton = styled(CreatePlanButton)`
  margin-top: 1rem;
`;

const RoomInfoButton = styled.button`
  background: none;
  border: none;
  color: #038A5E;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    transform: translateX(3px);
  }
`;

const NoRoomsMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const MobileCreatedRoomsPopup = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;
  transform: ${(props) => (props.$isOpen ? "translateY(0)" : "translateY(calc(100% - 40px))")};
  z-index: 1000;

  @media (min-width: 992px) {
    display: none;
  }
`;

const MobileCreatedRoomsContent = styled.div`
  padding: 1rem;
`;

const ScrollArea = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 200px);
`;

const ToggleButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #038A5E;
  color: white;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const InfoIcon = styled.div`
  color: #038A5E;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6f0ff;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(15deg);
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  color: #666;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: 600;
`;

const FacilitiesSection = styled.div`
  margin-top: 1rem;
`;

const FacilitiesTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

const FacilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const FacilityItem = styled.div`
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FacilityIcon = styled.div`
  color: #038A5E;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const FacilityName = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #333;
`;

const CancelButton = styled.button`
  background-color: #e9ecef;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 0.875rem;

  &:hover {
    background-color: #dee2e6;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ConfirmButton = styled.button`
  background-color: #038A5E;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 0.875rem;

  &:hover {
    background-color: #002d70;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 59, 148, 0.2);
  }
`;

const RoomCardWrapper = styled.div`
  margin-bottom: 1rem;
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #038A5E;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};

  &:hover {
    background-color: #002d70;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 59, 148, 0.2);
  }
`;

// Helper Function for Facility Icons
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

// Price Calculation Function - Uses centralized bookingUtils
// This wrapper maps the result to match the expected structure in this component
const calculateRoomPrice = (room, adults, children, nights, roomsCount = 1, adminCharges = DEFAULT_ADMIN_CHARGES) => {
  // Use the centralized pricing calculation
  const breakdown = calculateRoomPriceBreakdown(room, nights, adults, children, roomsCount, adminCharges);
  
  // Map the result to the expected structure for backward compatibility
  return {
    originalPrice: breakdown.roomSubtotal,
    subtotal: breakdown.roomSubtotal,
    discountedPrice: breakdown.amountAfterDiscount,
    subtotalAfterDiscount: breakdown.amountAfterDiscount,
    grandTotal: breakdown.grandTotal,
    // Breakdown
    roomTotal: breakdown.baseRoomAmount,
    extraAdultTotal: breakdown.extraAdultTotal,
    extraChildTotal: breakdown.extraChildTotal,
    extraGuests: breakdown.extraGuests,
    extraAdults: breakdown.extraAdults,
    allowedAdults: breakdown.totalAllowedGuests,
    childCharges: breakdown.extraChildTotal,
    discountAmount: breakdown.discountAmount,
    gstAmount: breakdown.gstAmount,
    taxAmount: breakdown.taxAmount,
    commissionAmount: breakdown.platformFee,
    gstPercentage: breakdown.gstPercentage,
    taxPercentage: breakdown.taxPercentage,
    commissionPercentage: breakdown.commissionPercentage
  };
};

// RoomCard Component (Moved here for full code inclusion)
const RoomCard = ({
  room,
  adults,
  children,
  maxGuestAllowed,
  onIncrementAdults,
  onDecrementAdults,
  onIncrementChildren,
  onDecrementChildren,
  onCreatePlan,
  onShowInfo,
  totalNights,
  availableRooms,
  adminCharges,
}) => {
  // Calculate price with admin charges
  const priceBreakdown = calculateRoomPrice(room, adults, children, totalNights, 1, adminCharges || DEFAULT_ADMIN_CHARGES);

  return (
    <Card>
      <RoomInfo>
        <RoomTitle>{room.roomType}</RoomTitle>
        <RoomInfoButton onClick={onShowInfo}>
          <FaInfoCircle />
          Room Information
        </RoomInfoButton>
        <RoomFeatures>
          <span>
            <FaBed /> {room.bedType}
          </span>
          <span>
            <FaUsers /> Max Guests: {maxGuestAllowed}
          </span>
          {room.facilities?.slice(0, 3).map((facility, index) => {
            const FacilityIcon = getFacilityIcon(facility.name);
            return (
              <span key={index}>
                <FacilityIcon /> {facility.name}
              </span>
            );
          })}
        </RoomFeatures>

        <InputGroup>
          <span>Adults:</span>
          <Counter>
            <CounterButton onClick={onDecrementAdults} disabled={adults <= 1}>
              -
            </CounterButton>
            <CounterValue>{adults}</CounterValue>
            <CounterButton onClick={onIncrementAdults} increment disabled={adults + children >= maxGuestAllowed}>
              +
            </CounterButton>
          </Counter>
        </InputGroup>

        <InputGroup>
          <span>Children:</span>
          <Counter>
            <CounterButton onClick={onDecrementChildren} disabled={children <= 0}>
              -
            </CounterButton>
            <CounterValue>{children}</CounterValue>
            <CounterButton
              onClick={onIncrementChildren}
              increment
              disabled={adults + children >= maxGuestAllowed || adults === 1}
            >
              +
            </CounterButton>
          </Counter>
        </InputGroup>

        <PriceDetails>
          <PriceRow>
            <span>Room Price ({totalNights} night{totalNights > 1 ? 's' : ''}):</span>
            <span>₹{priceBreakdown.roomTotal.toFixed(2)}</span>
          </PriceRow>
          {priceBreakdown.extraAdults > 0 && (
            <PriceRow>
              <span>Extra Adult ({priceBreakdown.extraAdults} x {totalNights} nights):</span>
              <span>₹{priceBreakdown.extraAdultTotal.toFixed(2)}</span>
            </PriceRow>
          )}
          {children > 0 && (
            <PriceRow>
              <span>Child Charges ({children} x {totalNights} nights):</span>
              <span>₹{priceBreakdown.childCharges.toFixed(2)}</span>
            </PriceRow>
          )}
          <PriceRow>
            <span>Subtotal:</span>
            <span>₹{priceBreakdown.subtotal.toFixed(2)}</span>
          </PriceRow>
          {room.discount > 0 && (
            <PriceRow>
              <span>Discount ({room.discount}%):</span>
              <span style={{ color: '#28a745' }}>-₹{priceBreakdown.discountAmount.toFixed(2)}</span>
            </PriceRow>
          )}
          <hr style={{ margin: '0.5rem 0' }} />
          <PriceRow>
            <span>GST ({priceBreakdown.gstPercentage}%):</span>
            <span>₹{priceBreakdown.gstAmount.toFixed(2)}</span>
          </PriceRow>
          <PriceRow>
            <span>Tax ({priceBreakdown.taxPercentage}%):</span>
            <span>₹{priceBreakdown.taxAmount.toFixed(2)}</span>
          </PriceRow>
          <PriceRow>
            <span>Platform Fee ({priceBreakdown.commissionPercentage}%):</span>
            <span>₹{priceBreakdown.commissionAmount.toFixed(2)}</span>
          </PriceRow>
          <PriceRow className="total">
            <span>Total Price:</span>
            <span>
              <strong style={{ color: "#038A5E" }}>₹{priceBreakdown.grandTotal.toFixed(2)}</strong>
            </span>
          </PriceRow>
          <PriceRow style={{ fontSize: '0.75rem', color: '#666' }}>
            <span>Incl. taxes & fees</span>
          </PriceRow>
        </PriceDetails>

        <CreatePlanButton onClick={() => onCreatePlan(room)} disabled={availableRooms <= 0}>
          {availableRooms > 0 ? "Create Plan" : "Unavailable"}
        </CreatePlanButton>
      </RoomInfo>
    </Card>
  );
};


// RoomInfoModal Component
const RoomInfoModal = ({ show, onClose, room }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{room?.roomType || "Room Information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InfoGrid>
          <InfoItem>
            <InfoIcon>
              <FaBed />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Bed Type</InfoLabel>
              <InfoValue>{room?.bedType}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FaUsers />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Max Guests</InfoLabel>
              <InfoValue>{room?.maxGuestAllowed}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FaRupeeSign />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Price per Night</InfoLabel>
              <InfoValue>₹{room?.roomPrice}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <FaInfoCircle />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Description</InfoLabel>
              <InfoValue>{room?.description}</InfoValue>
            </InfoContent>
          </InfoItem>
        </InfoGrid>
        <FacilitiesSection>
          <FacilitiesTitle>Facilities</FacilitiesTitle>
          <FacilitiesGrid>
            {room?.facilities?.map((facility) => (
              <FacilityItem key={facility.name}>
                <FacilityIcon>{getFacilityIcon(facility.name)()}</FacilityIcon>
                <FacilityName>{facility.name}</FacilityName>
              </FacilityItem>
            ))}
          </FacilitiesGrid>
        </FacilitiesSection>
      </Modal.Body>
    </Modal>
  );
};

// DeleteConfirmationModal Component
const DeleteConfirmationModal = ({ show, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this room?</Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};






const CreatePlan = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Get current user from auth context
  let currentUser = null;
  try {
    const authContext = useAuth();
    currentUser = authContext.currentUser;
  } catch (e) {
    currentUser = auth?.currentUser;
  }
  const [rooms, setRooms] = useState([]);
  const [createdRooms, setCreatedRooms] = useState(() => {
    const savedRooms = localStorage.getItem("createdRooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });
  const [adults, setAdults] = useState({});
  const [children, setChildren] = useState({});
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [showMobileCreatedRooms, setShowMobileCreatedRooms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableRooms, setAvailableRooms] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [collectionName, setCollectionName] = useState("Hotels");
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
  const [adminCharges, setAdminCharges] = useState(DEFAULT_ADMIN_CHARGES);

  const pageTopRef = useRef(null);
  const createdRoomsRef = useRef(createdRooms); // Ref to hold current createdRooms for callbacks

  // Update ref when createdRooms state changes
  useEffect(() => {
    createdRoomsRef.current = createdRooms;
  }, [createdRooms]);




  // const getTotalNights = useCallback(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const checkIn = searchParams.get("checkIn");
  //   const checkOut = searchParams.get("checkOut");
  //   if (!checkIn || !checkOut) return 1;
  //   const start = new Date(checkIn);
  //   const end = new Date(checkOut);
  //   return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  // }, [location.search]);



  const getTotalNights = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!checkIn || !checkOut) return 1;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start.toString() === "Invalid Date" || end.toString() === "Invalid Date") return 1;

    const diffTime = end.getTime() - start.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 1) return 1;

    return Math.ceil(diffDays);
  }, [location.search]);







  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);

      let hotelRef = doc(db, "Hotels", hotelId);
      let hotelDoc = await getDoc(hotelRef);
      let currentColl = "Hotels";

      if (!hotelDoc.exists()) {
        hotelRef = doc(db, "Homestays", hotelId);
        hotelDoc = await getDoc(hotelRef);
        currentColl = "Homestays";
      }

      if (!hotelDoc.exists()) {
        setError("Property not found");
        setLoading(false);
        return;
      }

      setCollectionName(currentColl);
      setPropertyData(hotelDoc.data());

      const roomsRef = collection(db, currentColl, hotelId, "Rooms");
      const roomsSnapshot = await getDocs(roomsRef);
      const roomsData = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRooms(roomsData);

      // Initialize adults and children state for each room
      const initialAdults = {};
      const initialChildren = {};
      roomsData.forEach((room) => {
        initialAdults[room.id] = 1; // Default 1 adult
        initialChildren[room.id] = 0; // Default 0 children
      });
      setAdults(initialAdults);
      setChildren(initialChildren);

      // Fetch availability (mock or real) - simplified here
      const availability = {};
      roomsData.forEach(room => availability[room.id] = 5); // Mock availability
      setAvailableRooms(availability);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load rooms");
      setLoading(false);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchRooms();
    // Fetch admin charges from Firestore
    const loadAdminCharges = async () => {
      const charges = await fetchAdminCharges();
      setAdminCharges(charges);
    };
    loadAdminCharges();
  }, [fetchRooms]);

  const handleIncrementAdults = (roomId) => {
    setAdults((prev) => {
      const room = rooms.find(r => r.id === roomId);
      if (prev[roomId] + children[roomId] < (room?.maxGuestAllowed || 4)) {
        return { ...prev, [roomId]: prev[roomId] + 1 };
      }
      return prev;
    });
  };

  const handleDecrementAdults = (roomId) => {
    setAdults((prev) => ({
      ...prev,
      [roomId]: Math.max(1, prev[roomId] - 1),
    }));
  };

  const handleIncrementChildren = (roomId) => {
    setChildren((prev) => {
      const room = rooms.find(r => r.id === roomId);
      if (adults[roomId] + prev[roomId] < (room?.maxGuestAllowed || 4)) {
        return { ...prev, [roomId]: prev[roomId] + 1 };
      }
      return prev;
    });
  };

  const handleDecrementChildren = (roomId) => {
    setChildren((prev) => ({
      ...prev,
      [roomId]: Math.max(0, prev[roomId] - 1),
    }));
  };

  const handleCreatePlan = (room) => {
    const adultsCount = adults[room.id];
    const childrenCount = children[room.id];
    const totalNights = getTotalNights();

    // Calculate price with admin charges (use fetched adminCharges)
    const priceBreakdown = calculateRoomPrice(room, adultsCount, childrenCount, totalNights, 1, adminCharges);

    const newPlan = {
      id: Date.now().toString(), // Helper ID
      roomId: room.id,
      roomType: room.roomType,
      adults: adultsCount,
      children: childrenCount,
      // Store the grand total with admin charges
      price: priceBreakdown.grandTotal,
      originalPrice: priceBreakdown.subtotal,
      subtotalAfterDiscount: priceBreakdown.discountedPrice,
      nights: totalNights,
      // Store breakdown for reference
      priceBreakdown: {
        roomTotal: priceBreakdown.roomTotal,
        extraAdultTotal: priceBreakdown.extraAdultTotal,
        extraAdults: priceBreakdown.extraAdults,
        childCharges: priceBreakdown.childCharges,
        discountAmount: priceBreakdown.discountAmount,
        gstAmount: priceBreakdown.gstAmount,
        taxAmount: priceBreakdown.taxAmount,
        commissionAmount: priceBreakdown.commissionAmount,
        gstPercentage: priceBreakdown.gstPercentage,
        taxPercentage: priceBreakdown.taxPercentage,
        commissionPercentage: priceBreakdown.commissionPercentage
      }
    };

    setCreatedRooms((prev) => {
      const updated = [...prev, newPlan];
      localStorage.setItem("createdRooms", JSON.stringify(updated));
      return updated;
    });

    toast.success("Room added to plan!");

    // Update availability locally
    setAvailableRooms(prev => ({
      ...prev,
      [room.id]: prev[room.id] - 1
    }));
  };

  const handleDeleteRoom = (index) => {
    setRoomToDelete(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteRoom = () => {
    if (roomToDelete !== null) {
      setCreatedRooms((prev) => {
        const updated = prev.filter((_, i) => i !== roomToDelete);
        localStorage.setItem("createdRooms", JSON.stringify(updated));

        // Restore availability locally
        const roomToRemove = createdRoomsRef.current[roomToDelete];
        setAvailableRooms(avail => ({
          ...avail,
          [roomToRemove.roomId]: (avail[roomToRemove.roomId] || 0) + 1
        }));

        return updated;
      });
      setShowDeleteConfirmation(false);
      setRoomToDelete(null);
      toast.info("Room removed from plan");
    }
  };

  const cancelDeleteRoom = () => {
    setShowDeleteConfirmation(false);
    setRoomToDelete(null);
  };

  const handleShowInfo = (room) => {
    setSelectedRoom(room);
    setShowRoomInfo(true);
  };

  const handleReserve = () => {
    if (createdRooms.length === 0) {
      toast.error("Please add at least one room to your plan.");
      return;
    }

    // If user not logged in, prompt or redirect (can be enhanced)
    if (!currentUser) {
      toast.warn("Please login to proceed with reservation");
      // navigate('/login'); // Optional
      // return;
    }

    // Navigate to Reservation page
    const searchParams = new URLSearchParams(location.search);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    const roomDetails = createdRooms.map(room => ({
      id: room.roomId,
      roomType: room.roomType,
      adults: room.adults,
      children: room.children,
      nights: room.nights,
      totalPrice: room.price,
      price: room.price,
      // Include price breakdown for proper display in Reservation
      priceBreakdown: room.priceBreakdown
    }));

    navigate(`/reservation/${hotelId}`, {
      state: {
        roomDetails,
        totalPrice: grandTotal,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        // Pass admin charges for reference
        adminCharges: adminCharges
      }
    });
  };

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate total price of all rooms in plan
  const grandTotal = createdRooms.reduce((sum, room) => sum + room.price, 0);


  if (loading) return <Preloader />;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer ref={pageTopRef}>
      <Container fluid>
        <MainContent>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Plan Your Stay at {propertyData?.["Property Name"]}</h1>
            <Link to="/" className="btn btn-outline-secondary btn-sm">Back to Home</Link>
          </div>

          <Row>
            <Col lg={8}>
              {rooms.map(room => (
                <RoomCardWrapper key={room.id}>
                  <RoomCard
                    room={room}
                    adults={adults[room.id] || 1}
                    children={children[room.id] || 0}
                    maxGuestAllowed={Number(room.maxGuestAllowed) || 4}
                    onIncrementAdults={() => handleIncrementAdults(room.id)}
                    onDecrementAdults={() => handleDecrementAdults(room.id)}
                    onIncrementChildren={() => handleIncrementChildren(room.id)}
                    onDecrementChildren={() => handleDecrementChildren(room.id)}
                    onCreatePlan={handleCreatePlan}
                    onShowInfo={() => handleShowInfo(room)}
                    totalNights={getTotalNights()}
                    availableRooms={availableRooms[room.id] || 0}
                    adminCharges={adminCharges}
                  />
                </RoomCardWrapper>
              ))}
            </Col>

            <Col lg={4}>
              <CreatedRoomsSection>
                <Card className="sticky-top" style={{ top: "100px" }}>
                  <Card.Header className="bg-white border-bottom">
                    <h5 className="mb-0">Your Plan</h5>
                  </Card.Header>
                  <Card.Body>
                    {createdRooms.length === 0 ? (
                      <NoRoomsMessage>
                        No rooms added yet. Select a room to add to your plan.
                      </NoRoomsMessage>
                    ) : (
                      createdRooms.map((room, index) => (
                        <CreatedRoomCard key={room.id || index}>
                          <div>
                            <h6 className="mb-1">{room.roomType}</h6>
                            <small className="text-muted d-block">{room.adults} Adults, {room.children} Children</small>
                            <div className="fw-bold mt-1">₹{Number(room.price || 0).toFixed(2)}</div>
                          </div>
                          <DeleteButton onClick={() => handleDeleteRoom(index)}>
                            <FaTrash />
                          </DeleteButton>
                        </CreatedRoomCard>
                      ))
                    )}

                    {createdRooms.length > 0 && (
                      <>
                        <div className="d-flex justify-content-between border-top pt-3 mt-3">
                          <span className="fw-bold">Total Amount:</span>
                          <span className="fw-bold text-success fs-5">₹{Number(grandTotal || 0).toFixed(2)}</span>
                        </div>
                        <ReserveButton onClick={handleReserve}>
                          Proceed to Pay
                        </ReserveButton>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </CreatedRoomsSection>
            </Col>
          </Row>
        </MainContent>

        {/* Mobile Popup for Created Rooms */}
        <MobileCreatedRoomsPopup $isOpen={showMobileCreatedRooms}>
          <ToggleButton onClick={() => setShowMobileCreatedRooms(!showMobileCreatedRooms)}>
            {showMobileCreatedRooms ? <FaArrowDown /> : <FaArrowUp />} {createdRooms.length} Rooms - ₹{Number(grandTotal || 0).toFixed(2)}
          </ToggleButton>
          <MobileCreatedRoomsContent>
            <ScrollArea>
              {createdRooms.map((room, index) => (
                <CreatedRoomCard key={room.id || `mobile-${index}`}>
                  <div>
                    <h6 className="mb-1">{room.roomType}</h6>
                    <small className="text-muted d-block">{room.adults} Adults, {room.children} Children</small>
                    <div className="fw-bold mt-1">₹{Number(room.price || 0).toFixed(2)}</div>
                  </div>
                  <DeleteButton onClick={() => handleDeleteRoom(index)}>
                    <FaTrash />
                  </DeleteButton>
                </CreatedRoomCard>
              ))}
            </ScrollArea>
            <ReserveButton onClick={handleReserve} className="mt-2">Proceed to Pay</ReserveButton>
          </MobileCreatedRoomsContent>
        </MobileCreatedRoomsPopup>

        <BackToTopButton $visible={showBackToTop} onClick={scrollToTop}>
          <FaArrowUp />
        </BackToTopButton>

        {selectedRoom && (
          <RoomInfoModal
            show={showRoomInfo}
            onClose={() => setShowRoomInfo(false)}
            room={selectedRoom}
          />
        )}

        <DeleteConfirmationModal
          show={showDeleteConfirmation}
          onConfirm={confirmDeleteRoom}
          onCancel={cancelDeleteRoom}
        />



      </Container>
    </PageContainer>
  );
};

export default CreatePlan;
