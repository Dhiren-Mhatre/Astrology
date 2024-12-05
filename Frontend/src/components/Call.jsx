import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactDOM from 'react-dom';

const BirthDetailsPopup = ({ userDetails, handleInputChange, handleSubmit, onClose }) => {
  const [cityInput, setCityInput] = useState(userDetails.birthPlace || "");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cityInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both input and suggestions
      if (
        cityInputRef.current && 
        !cityInputRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setCitySuggestions([]);
        setShowSuggestions(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  // Fetch city recommendations
  const fetchCityRecommendations = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setCitySuggestions([]);
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        params: {
          namePrefix: searchTerm,
          types: 'CITY',
          countryIds: 'IN',
          limit: 5  // Reduce limit to minimize requests
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });
  
      const cities = response.data.data.map(city => ({
        name: `${city.city}, ${city.region}, ${city.country}`,
        fullName: `${city.city}, ${city.region}, ${city.country}`
      }));
  
      setCitySuggestions(cities);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Specific handling for rate limit
        
        setCitySuggestions([
          { name: "Agra, Uttar Pradesh, India" },
          { name: "Ahmedabad, Gujarat, India" },
          { name: "Allahabad, Uttar Pradesh, India" },
          { name: "Amritsar, Punjab, India" },
          { name: "Aurangabad, Maharashtra, India" },
          { name: "Bangalore, Karnataka, India" },
          { name: "Bhopal, Madhya Pradesh, India" },
          { name: "Bhubaneswar, Odisha, India" },
          { name: "Chandigarh, Chandigarh, India" },
          { name: "Chennai, Tamil Nadu, India" },
          { name: "Coimbatore, Tamil Nadu, India" },
          { name: "Cuttack, Odisha, India" },
          { name: "Dehradun, Uttarakhand, India" },
          { name: "Delhi, Delhi, India" },
          { name: "Dhanbad, Jharkhand, India" },
          { name: "Durgapur, West Bengal, India" },
          { name: "Faridabad, Haryana, India" },
          { name: "Ghaziabad, Uttar Pradesh, India" },
          { name: "Guwahati, Assam, India" },
          { name: "Gwalior, Madhya Pradesh, India" },
          { name: "Hubli, Karnataka, India" },
          { name: "Hyderabad, Telangana, India" },
          { name: "Indore, Madhya Pradesh, India" },
          { name: "Jabalpur, Madhya Pradesh, India" },
          { name: "Jaipur, Rajasthan, India" },
          { name: "Jalandhar, Punjab, India" },
          { name: "Jammu, Jammu and Kashmir, India" },
          { name: "Jodhpur, Rajasthan, India" },
          { name: "Kanpur, Uttar Pradesh, India" },
          { name: "Kochi, Kerala, India" },
          { name: "Kolkata, West Bengal, India" },
          { name: "Kota, Rajasthan, India" },
          { name: "Lucknow, Uttar Pradesh, India" },
          { name: "Ludhiana, Punjab, India" },
          { name: "Madurai, Tamil Nadu, India" },
          { name: "Mangalore, Karnataka, India" },
          { name: "Meerut, Uttar Pradesh, India" },
          { name: "Mumbai, Maharashtra, India" },
          { name: "Nagpur, Maharashtra, India" },
          { name: "Nashik, Maharashtra, India" },
          { name: "Noida, Uttar Pradesh, India" },
          { name: "Patna, Bihar, India" },
          { name: "Pune, Maharashtra, India" },
          { name: "Raipur, Chhattisgarh, India" },
          { name: "Ranchi, Jharkhand, India" },
          { name: "Rourkela, Odisha, India" },
          { name: "Salem, Tamil Nadu, India" },
          { name: "Shimla, Himachal Pradesh, India" },
          { name: "Srinagar, Jammu and Kashmir, India" },
          { name: "Surat, Gujarat, India" },
          { name: "Thiruvananthapuram, Kerala, India" },
          { name: "Tiruchirappalli, Tamil Nadu, India" },
          { name: "Udaipur, Rajasthan, India" },
          { name: "Vadodara, Gujarat, India" },
          { name: "Varanasi, Uttar Pradesh, India" },
          { name: "Vijayawada, Andhra Pradesh, India" },
          { name: "Visakhapatnam, Andhra Pradesh, India" }
        ]);
        
      } else {
        console.error("Error fetching city suggestions:", error);
         
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Debounced city search
  const debouncedFetchCities = debounce(fetchCityRecommendations, 300);

  // Handle city input changes
 // Modify handleCityInputChange
 const handleCityInputChange = (e) => {
  const value = e.target.value;
  setCityInput(value);
  setShowSuggestions(true);
  
  // Update parent component's state
  handleInputChange({
    target: {
      name: "birthPlace",
      value: value
    }
  });

  // Fetch suggestions
  debouncedFetchCities(value);
};

// Modify selectCity
const selectCity = (city) => {
  setCityInput(city.name);
  handleInputChange({
    target: {
      name: "birthPlace",
      value: city.name
    }
  });
  setCitySuggestions([]); // Clear suggestions
  setShowSuggestions(false);
};
  const popupContent = (    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-[90vh] overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Birth Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              value={userDetails.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={userDetails.dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Time of Birth </label>
            <input
              type="time"
              name="timeOfBirth"
              value={userDetails.timeOfBirth}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="relative">
      <label className="block mb-2">Birth Place</label>
      <input
        ref={cityInputRef}
        type="text"
        name="birthPlace"
        value={cityInput}
        onChange={handleCityInputChange}
        onFocus={() => {
          if (citySuggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        className="w-full p-2 border rounded"
        placeholder="Enter your birth place"
        required
      />
      
      {isLoading && (
        <div className="absolute right-2 top-2 text-gray-500">
          Loading...
        </div>
      )}

      {showSuggestions && citySuggestions.length > 0 && (
        <ul 
          ref={suggestionsRef}
          className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto shadow-lg"
        >
          {citySuggestions.map((city, index) => (
            <li 
              key={index} 
              onClick={() => selectCity(city)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(popupContent, document.body);
};


// Main component exported as default
export default function CallComponent({ astrologerId, backendUrl, className }) {
  const [userDetails, setUserDetails] = useState({
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    birthPlace: "",
  });
  const [showBirthDetailsPopup, setShowBirthDetailsPopup] = useState(false);

  const isUserLoggedIn = () => {
    return localStorage.getItem("authToken") !== null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkUserDetailsFromBackend = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    
    if (!authToken || !userId) {
      console.log("No auth token or user ID found");
      return false;
    }
  
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/user/${userId}`, 
        { 
          headers: { 
            Authorization: `Bearer ${authToken}` 
          } 
        }
      );
  
      const user = response.data.user;
      console.log("DETAILED User Details:", JSON.stringify(user, null, 2));
  
      const requiredFields = ["gender", "dateOfBirth", "timeOfBirth", "birthPlace"];
      
      const isDetailsComplete = requiredFields.every((field) => 
        user[field] !== undefined && 
        user[field] !== null && 
        user[field].toString().trim() !== ''
      );
  
      console.log("IS Details Complete?", isDetailsComplete);
  
      if (!isDetailsComplete) {
        console.log("User details incomplete", user);
        return false;
      }
  
      // Update local state
      setUserDetails({
        gender: user.gender,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        timeOfBirth: user.timeOfBirth,
        birthPlace: user.birthPlace
      });
  
      return true;
    } catch (error) {
      console.error("Error in fetching user details:", error);
      return false;
    }
  };

  const updateUserDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
     
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/updateProfile/${userId}`,
        {
          gender: userDetails.gender,
          dateOfBirth: userDetails.dateOfBirth,
          timeOfBirth: userDetails.timeOfBirth,
          birthPlace: userDetails.birthPlace
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      
      if (response.status === 200) {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        const user = response.data;
        console.log("updated user details:", user);
        setShowBirthDetailsPopup(false);
        console.log("Details updated successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error updating user details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update user details");
      return false;
    }
  };

  const handleCallInitiation = async () => {
    if (!isUserLoggedIn()) {
      alert("Please log in to place a call.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    const isUserDetailsComplete = await checkUserDetailsFromBackend();

    if (!isUserDetailsComplete) {
      setShowBirthDetailsPopup(true);
      return;
    }

    await initiateCall(userId, authToken);
  };

  const initiateCall = async (userId, authToken) => {
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

      const supportPhoneNumber = "+918800774985";
      window.location.href = `tel:${supportPhoneNumber}`;
    } catch (error) {
      console.error("Error logging the call:", error);
      toast.error("Error logging the call.");
    }
  };

  const handleBirthDetailsSubmit = async (e) => {
    e.preventDefault();
    console.log("User details before update:", userDetails);
    const updated = await updateUserDetails();
    
    if (updated) {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      await initiateCall(userId, authToken);
      setShowBirthDetailsPopup(false);

    }
  };
  
  return (
    <>
      <button
        onClick={handleCallInitiation}
        className={className || "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"}
      >
        Call 
      </button>

      {showBirthDetailsPopup && (
        <BirthDetailsPopup
          userDetails={userDetails}
          handleInputChange={handleInputChange}
          handleSubmit={handleBirthDetailsSubmit}
          onClose={() => setShowBirthDetailsPopup(false)}
        />
      )}
    </>
  );
}