import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CallComponent from "../components/Call"; // Updated import to CallComponent
const backendUrl = import.meta.env.VITE_BACKENDURL;

const TopAstrologer = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    birthPlace: "",
  });
  const isUserLoggedIn = () => {
    // Replace with actual login check logic
    return localStorage.getItem("authToken") !== null;
  };
  const navigate = useNavigate();

  const handleViewProfile = (astrologerId) => {
    navigate(`/about-astrologer/${astrologerId}`);
  };

  // Update userDetails state and persist data if user logs in again
  const fetchUserDetails = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!userId || !authToken) {
        toast.error("User not logged in");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/api/user/user/${userId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.status === 200) {
        setUserDetails(response.data); // Assume response.data contains user details
        console.log(userDetails);
        localStorage.setItem("userDetails", JSON.stringify(response.data));
      } else {
        toast.error("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("An error occurred while fetching user details.");
    }
  };
  useEffect(() => {
    if (isUserLoggedIn()) {
      const storedDetails = localStorage.getItem("userDetails");
      if (storedDetails) {
        setUserDetails(JSON.parse(storedDetails));
      } else {
        fetchUserDetails();
      }
    }
  }, []);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log("Popup toggled:", isPopupOpen); // Debugging line
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Save user details and update database
  const handleSubmit = async () => {
    setIsPopupOpen(false);
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("User not logged in");
        return;
      }

      const response = await axios.put(
        `${backendUrl}/api/user/updateProfile/${userId}`,
        userDetails,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.status === 200) {
        toast.success("Details updated successfully!");
        localStorage.setItem("userDetails", JSON.stringify(userDetails)); // Save to localStorage
        setIsPopupOpen(false);
      } else {
        toast.error("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/astrologer/`)
      .then((response) => {
        setAstrologers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching astrologers: ", error);
      });
  }, []);

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <FaArrowLeft
        className={className}
        style={{
          ...style,
          display: "block",
          left: "10px",
          zIndex: 1,
          color: "black",
          fontSize: "24px",
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <FaArrowRight
        className={className}
        style={{
          ...style,
          display: "block",
          right: "10px",
          zIndex: 1,
          color: "black",
          fontSize: "24px",
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleButtonClick = (astrologerId) => {
    handleSubmit(); // Call handleSubmit first
    handleCallClick(astrologerId); // Then call handleCallClick with the astrologer ID
  };
  const handleCallClick = async (astrologerId) => {
    const requiredFields = ["gender", "dateOfBirth", "timeOfBirth", "birthPlace"];
    const isUserDetailsComplete = requiredFields.every((field) => userDetails[field]);
  
    if (!isUserDetailsComplete) {
      setIsPopupOpen(true);
      toast.warning("Please complete your birth details before placing a call.");
      return; // Stop further execution
    }
  
    if (!isUserLoggedIn()) {
      toast.warning("Please log in to place a call.");
      return; // Stop execution if user is not logged in
    }
  
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
  
    if (!userId || !astrologerId) {
      toast.error("User or astrologer ID missing.");
      return; // Stop execution if IDs are missing
    }
  
    const callDetails = {
      user_id: userId,
      astrologer_id: astrologerId,
      date_of_call: new Date().toISOString(),
      call_duration: 0,
      flag_free_paid_call: "free",
    };
  
    try {
      await axios.post(`${backendUrl}/api/calls`, callDetails, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      // Open the dialer for the call
      const supportPhoneNumber = "+918800774985"; // Update number as needed
      window.location.href = `tel:${supportPhoneNumber}`;
    } catch (error) {
      console.error("Error logging the call:", error);
      toast.error("Error logging the call.");
    }
  };
  
  

  const isUserDetailsComplete = Object.values(userDetails).every(
    (detail) => detail !== ""
  );

  return (
   <div className="w-full my-8 p-5">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-3xl font-bold">Expert Astrologers</h2>
    <button
      onClick={() => navigate("/astrology-consultation")}
      className="bg-green-500 text-white py-2 px-4 rounded"
    >
      View all Astrologer
    </button>
  </div>
  <ToastContainer />
  {isPopupOpen && (
    <Popup userDetails={userDetails} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
  )}
  {astrologers.length > 0 ? (
    <Slider {...settings}>
      {astrologers.map((astrologer) => (
        <div key={astrologer._id} className="pz-4">
          <div className="border rounded-lg p-4 text-center shadow-md">
            <img
              src={astrologer.imgLink}
              alt={astrologer.name}
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">
              {astrologer.name}
            </h3>
            <div className="flex items-center justify-center mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>
                  {index < astrologer.rating ? "★" : "☆"}
                </span>
              ))}
              <span className="ml-2">({astrologer.rating})</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {astrologer.experience} years of experience
            </p>
            <button
              onClick={() => handleViewProfile(astrologer._id)}
              className="mt-4 align-left mr-3 bg-green-500 text-white py-2 px-4 rounded"
            >
              View Profile
            </button>
            <CallComponent astrologerId={astrologer._id} backendUrl={backendUrl} />
          </div>
        </div>
      ))}
    </Slider>
  ) : (
    <p>Loading astrologers...</p>
  )}
</div>

  );
};
const Popup = ({ userDetails, handleInputChange, handleSubmit }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: 1000,
  }}>
    <div style={{
      width: "400px", padding: "20px", backgroundColor: "white", borderRadius: "8px",
      textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    }}>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        
        <label style={{ textAlign: "left" }}>
          Gender:
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={userDetails.gender}
            onChange={handleInputChange}
            style={{ marginTop: "5px", padding: "8px", width: "100%" }}
          />
        </label>

        <label style={{ textAlign: "left" }}>
          Date of Birth in dd/mm/yyyy:
          <input
            type="date"
            name="dateOfBirth"
            value={userDetails.dateOfBirth}
            onChange={handleInputChange}
            style={{ marginTop: "5px", padding: "8px", width: "100%" }}
          />
        </label>

        <label style={{ textAlign: "left" }}>
          Time of Birth:
          <input
            type="time"
            name="timeOfBirth"
            value={userDetails.timeOfBirth}
            onChange={handleInputChange}
            style={{ marginTop: "5px", padding: "8px", width: "100%" }}
          />
        </label>

        <label style={{ textAlign: "left" }}>
          Birth Place:
          <input
            type="text"
            name="birthPlace"
            placeholder="Birth Place"
            value={userDetails.birthPlace}
            onChange={handleInputChange}
            style={{ marginTop: "5px", padding: "8px", width: "100%" }}
          />
        </label>

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Save 
        </button>
      </form>
    </div>
  </div>
);

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

export default TopAstrologer;
