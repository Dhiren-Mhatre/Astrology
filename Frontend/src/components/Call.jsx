import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom";

const BirthDetailsPopup = ({
  userDetails,
  handleInputChange,
  handleSubmit,
  onClose,
}) => {
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
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: {
            namePrefix: searchTerm,
            types: "CITY",
            countryIds: "IN",
            limit: 5, // Reduce limit to minimize requests
          },
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      const cities = response.data.data.map((city) => ({
        name: `${city.city}, ${city.region}, ${city.country}`,
        fullName: `${city.city}, ${city.region}, ${city.country}`,
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
          { name: "Visakhapatnam, Andhra Pradesh, India" },
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
        value: value,
      },
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
        value: city.name,
      },
    });
    setCitySuggestions([]); // Clear suggestions
    setShowSuggestions(false);
  };
  const popupContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Birth Details
        </h2>
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
        value={userDetails.dateOfBirth ? userDetails.dateOfBirth.split('/').reverse().join('-') : ''}
        onChange={(e) => {
            const date = new Date(e.target.value);
            const formattedDate = date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            handleInputChange({
                target: {
                    name: "dateOfBirth",
                    value: formattedDate
                },
            });
        }}
        max={new Date().toISOString().split('T')[0]}
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
              Confirm
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
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const [showBirthDetailsPopup, setShowBirthDetailsPopup] = useState(false);
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) {
      console.log("Missing credentials:", { token: !!token, userId: !!userId });
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkUserDetailsFromBackend = async () => {
    try {
      if (!isUserLoggedIn()) {
        toast.error("Please log in to continue");
        return false;
      }

      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      console.log("Making API call with:", { userId, authToken: !!authToken });

      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return false;
      }

      const response = await axios.get(
        `${backendUrl}/api/user/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const user = response.data.user;
      
      if (!user) {
        toast.error("User details not found");
        return false;
      }

      const requiredFields = ["gender", "dateOfBirth", "timeOfBirth", "birthPlace"];
      const missingFields = requiredFields.filter(
        field => !user[field] || user[field].toString().trim() === ""
      );

      if (missingFields.length > 0) {
        console.log("Missing fields:", missingFields);
        setUserDetails(prevDetails => ({
          ...prevDetails,
          ...Object.fromEntries(
            requiredFields.map(field => [field, user[field] || ""])
          )
        }));
        return false;
      }

      setUserDetails({
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        timeOfBirth: user.timeOfBirth,
        birthPlace: user.birthPlace,
      });

      return true;
    } catch (error) {
      console.error("Error fetching user details:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        // Optional: Clear localStorage and redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch user details");
      }
      
      return false;
    }
  };
  const updateUserDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!authToken || !userId) {
      toast.error("Authentication required. Please log in again.");
      return false;
    }

    try {
      const formattedDate = new Date(userDetails.dateOfBirth.split('/').reverse().join('-'));
      
      const updateData = {
        gender: userDetails.gender,
        dateOfBirth: formattedDate.toISOString(),
        timeOfBirth: userDetails.timeOfBirth,
        birthPlace: userDetails.birthPlace,
      };

      const response = await axios.put(
        `${backendUrl}/api/user/updateProfile/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        onClose(); // Close the popup
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      return false;
    }
  };
  const formatPhoneNumber = (phoneNumber) => {
    // Remove any spaces, hyphens, or plus signs
    let cleaned = phoneNumber.replace(/[\s\-\+]/g, '');
    
    // Ensure number starts with 91
    if (!cleaned.startsWith('91')) {
      cleaned = '91' + cleaned;
    }
    
    return cleaned;
  };


  const handleCallInitiation = async () => {
    if (!isUserLoggedIn()) {
      toast.warning("Please log in to place a call.");
      return;
    }

    const isUserDetailsComplete = await checkUserDetailsFromBackend();

    if (!isUserDetailsComplete) {
      setShowBirthDetailsPopup(true);
      return;
    }

    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !authToken) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    await initiateCall(userId, authToken);
  };
  const hitApiWithoutRedirect = (url) => {
    // Create temporary iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  
    // Remove iframe after load
    iframe.onload = () => {
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  
    // Load URL
    iframe.src = url;
  };
  const initiateCall = async (userId, authToken) => {
    setIsLoading(true);
    setDebugInfo(null);
    
    try {
      // 1. Get astrologer and user details
      const astrologerResponse = await axios.get(
        `${backendUrl}/api/astrologer/${astrologerId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      
      const userResponse = await axios.get(
        `${backendUrl}/api/user/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      let astrologerPhone = astrologerResponse.data.contactNumber?.toString();
      let userPhone = userResponse.data.user.phoneNumber;

      // Format both phone numbers
      astrologerPhone = formatPhoneNumber(astrologerPhone);
      userPhone = formatPhoneNumber(userPhone);

      // Log the formatted phone numbers
      console.log('Formatted phone numbers:', {
        astrologer: astrologerPhone,
        user: userPhone
      });

      if (!astrologerPhone || !userPhone) {
        throw new Error(`Missing phone numbers. Astrologer: ${!!astrologerPhone}, User: ${!!userPhone}`);
      }

      // 2. Make the click2call API request
      const response = await axios.post(
        `${backendUrl}/api/click2call/initiate`,
        {
          customerNumber: userPhone,
          astrologerNumber: astrologerPhone
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      // Store debug info
      setDebugInfo({
        astrologerPhone,
        userPhone,
        apiResponse: response.data
      });

      // 3. Check the response
      if (response.data.success) {
        if (response.data.data?.error) {
          throw new Error(`Click2Call API Error: ${response.data.data.error}`);
        }
        
        if (response.data.data?.type === 'success') {
          toast.success("Call initiated successfully! Please wait for the call.");
        } else {
          toast.warning("Call initiated but status unclear. Please wait for the call.");
        }
          // Redirect to the call URL
          if (response.data.redirectUrl) {
            console.log("Redirect URL:", response.data.redirectUrl);
            // hitApiWithoutRedirect(response.data.redirectUrl);
          }
      } else {
        throw new Error("Failed to initiate call - API returned success: false");
      }

    } catch (error) {
      console.error("Detailed call error:", error);
      
      let errorMessage = "Error initiating call. ";
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      }
      
      toast.error(errorMessage);
      
      setDebugInfo({
        error: error.message,
        response: error.response?.data,
        stack: error.stack
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
       <button
        onClick={() => handleCallInitiation()}
        disabled={isLoading}
        className={className || "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"}
      >
        {isLoading ? 'Initiating Call...' : 'Call'}
      </button>

      {/* Debug info panel - can be removed in production */}
      {debugInfo && (
        console.log(debugInfo)
      )}
      {showBirthDetailsPopup && (
        <BirthDetailsPopup
          userDetails={userDetails}
          handleInputChange={handleInputChange}
          handleSubmit={updateUserDetails}
          onClose={() => setShowBirthDetailsPopup(false)}
        />
      )}
    </>
  );
}