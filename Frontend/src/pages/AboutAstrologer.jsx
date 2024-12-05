import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import CallComponent from "../components/Call"; // Updated import to CallComponent
const backendUrl = import.meta.env.VITE_BACKENDURL;


const AboutAstrologer = () => {
  const { astrologerId } = useParams();
  const [astrologer, setAstrologer] = useState(null);
  const [userDetails, setUserDetails] = useState({
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    birthPlace: "",
  });
  const isUserLoggedIn = () => {
    return localStorage.getItem("authToken") !== null;
  };

  useEffect(() => {
    const fetchAstrologer = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/astrologer/${astrologerId}`
        );
        setAstrologer(response.data);
      } catch (error) {
        console.error("Error fetching astrologer details:", error);
      }
    };

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
          setUserDetails(response.data);
        } else {
          toast.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("An error occurred while fetching user details.");
      }
    };

    fetchAstrologer();
    if (isUserLoggedIn()) {
      fetchUserDetails();
    }
  }, [astrologerId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "½"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const handleCallClick = async () => {
    const requiredFields = ["gender", "dateOfBirth", "timeOfBirth", "birthPlace"];
    const isUserDetailsComplete = requiredFields.every((field) => userDetails[field]);
    if (!userDetails.gender || !userDetails.dateOfBirth || !userDetails.timeOfBirth || !userDetails.birthPlace) {
      toast.warning("Please complete your birth details before placing a call.");
      return;
    }
    
    if (!isUserDetailsComplete) {
      toast.warning("Please complete your birth details before placing a call.");
      return;
    }

    if (!isUserLoggedIn()) {
      toast.warning("Please log in to place a call.");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!userId || !astrologerId) {
      toast.error("User or astrologer ID missing.");
      return;
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

      const supportPhoneNumber = "+918800774985"; // Update number as needed
      console.log("Calling:", supportPhoneNumber);
      window.location.href = `tel:${supportPhoneNumber}`;
    } catch (error) {
      console.error("Error logging the call:", error);
      toast.error("Error logging the call.");
    }
  };

  if (!astrologer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          src={astrologer.imgLink}
          alt={astrologer.name}
          className="w-32 h-32 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
        />
        <div>
          <h1 className="text-2xl font-bold">{astrologer.name}</h1>
          <p className="mt-2">
            <strong>Experience:</strong> {astrologer.experience} years
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {astrologer.language.map((lang) => lang.value).join(", ")}
          </p>
          <p>
            <strong>Expertise:</strong>{" "}
            {astrologer.expertise.map((exp) => exp.value).join(", ")}
          </p>
          <p>
            <strong>Followers:</strong> {astrologer.followers} Members
          </p>
          <p>
            <strong>Rating:</strong> {renderStars(astrologer.rating)} ({astrologer.rating}/5)
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">About Astrologer</h2>
        <p className="text-gray-700 leading-relaxed">{astrologer.about}</p>
      </div>

      <div className="mt-6 flex justify-center">
      <CallComponent astrologerId={astrologer._id} backendUrl={backendUrl} />
      </div>
    </div>
  );
};

export default AboutAstrologer;
