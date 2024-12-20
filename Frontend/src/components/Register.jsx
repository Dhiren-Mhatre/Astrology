import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
const backendUrl = import.meta.env.VITE_BACKENDURL;
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = `${e.target.name.value} ${e.target.lastname.value}`;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (name && email && password && confirmPassword && phone) {
      if (password === confirmPassword) {
        const formData = {
          name,
          email,
          phoneNumber: phone, // Use "phoneNumber" to match backend schema
          password,
        };
        try {
          const response = await axios.post(
            `${backendUrl}/api/user/register`,
            formData
          );
          alert("Registration successful");
          navigate("/login");
        } catch (err) {
         alert(err.response?.data?.error || "Registration failed");
        }
      } else {
        alert("Passwords don't match");
      }
    } else {
      alert("Please fill all inputs");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col justify-center items-center bg-white p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome!</h2>
        <p className="text-lg mb-8 text-center">Please enter your details</p>
        <form className="w-full max-w-md" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Lastname"
            name="lastname"
            required
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <div className="mb-4">
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{
                width: "100%",
                padding: "20px",
                paddingLeft: "40px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              dropdownStyle={{
                zIndex: 10,
              }}
            />
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            )}
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-xl cursor-pointer"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
