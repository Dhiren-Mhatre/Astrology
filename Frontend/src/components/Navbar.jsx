import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";

const backendUrl = import.meta.env.VITE_BACKENDURL;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    
    const navigate = useNavigate();

    // Authentication Modal Component
    const AuthModal = ({ isLogin, onClose }) => {
        const [showPassword, setShowPassword] = useState(false);
        const [phone, setPhone] = useState("");
        const [showOtpInput, setShowOtpInput] = useState(false);
        const [otp, setOtp] = useState("");
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [fullName, setFullName] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        useEffect(() => {
            return () => {
                // Reset state on unmount
                setShowPassword(false);
                setPhone("");
                setShowOtpInput(false);
                setOtp("");
                setPassword("");
                setEmail("");
                setFullName("");
                setConfirmPassword("");
            };
        }, []);

        const handleSendOTP = async (e) => {
            e?.preventDefault();
            
            if (isLogin && (!phone || !password)) {
                toast.warning("Please fill in all required fields");
                return;
            }

            if (!isLogin && (!phone || !password || !fullName || password !== confirmPassword)) {
                toast.warning("Please fill in all required fields and ensure passwords match");
                return;
            }

            try {
                const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
                
                await axios.post(`${backendUrl}/api/user/send-otp`, { 
                    phoneNumber: formattedPhone 
                });
                
                toast.success("OTP sent successfully! (Use 12345 for testing)");
                setShowOtpInput(true);
            } catch (err) {
                toast.error(err.response?.data?.error || "Failed to send OTP");
            }
        };

        const handleVerifyOTP = async () => {
            try {
                const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
                
                // Verify OTP
                await axios.post(`${backendUrl}/api/user/verify-otp`, {
                    phoneNumber: formattedPhone,
                    otp
                });

                // Handle login or registration based on mode
                if (isLogin) {
                    const response = await axios.post(
                        `${backendUrl}/api/user/login`,
                        { 
                            phoneNumber: formattedPhone,
                            password 
                        }
                    );

                    if (response.data.token) {
                        localStorage.setItem("authToken", response.data.token);
                        setIsLoggedIn(true);
                        onClose();
                        toast.success("Successfully logged in!");
                    }
                } else {
                    const response = await axios.post(
                        `${backendUrl}/api/user/register`,
                        {
                            name: fullName,
                            phoneNumber: formattedPhone,
                            email: email || '',
                            password
                        }
                    );

                    if (response.data.token) {
                        localStorage.setItem("authToken", response.data.token);
                        setIsLoggedIn(true);
                        onClose();
                        toast.success("Registration successful!");
                    }
                }
            } catch (err) {
                console.error("Verification error:", err.response?.data);
                toast.error(err.response?.data?.error || "Verification failed");
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">
                            {isLogin ? "Welcome Back!" : "Create Account"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        {!showOtpInput ? (
                            // Login/Register Form
                            <form onSubmit={handleSendOTP} className="space-y-4">
                                {!isLogin && (
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                                    />
                                )}
                                
                                <div className="mb-4">
                                    <PhoneInput
                                        country={"in"}
                                        value={phone}
                                        onChange={setPhone}
                                        inputStyle={{
                                            width: "100%",
                                            height: "40px",
                                            fontSize: "16px",
                                            borderBottom: "2px solid #e5e7eb",
                                            borderTop: "none",
                                            borderLeft: "none",
                                            borderRight: "none",
                                            borderRadius: "0",
                                        }}
                                        dropdownStyle={{ zIndex: 999 }}
                                        containerStyle={{ width: "100%" }}
                                        buttonStyle={{
                                            borderBottom: "2px solid #e5e7eb",
                                            borderTop: "none",
                                            borderLeft: "none",
                                            borderRight: "none",
                                            borderRadius: "0",
                                            backgroundColor: "transparent",
                                        }}
                                        enableSearch={true}
                                    />
                                </div>

                                {!isLogin && (
                                    <input
                                        type="email"
                                        placeholder="Email (Optional)"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                                    />
                                )}

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3 text-xl cursor-pointer"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {!isLogin && (
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Get OTP
                                </button>
                            </form>
                        ) : (
                            // OTP Verification Form
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={handleVerifyOTP}
                                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Verify & {isLogin ? "Login" : "Register"}
                                </button>
                                <button
                                    onClick={() => setShowOtpInput(false)}
                                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
                                >
                                    Back
                                </button>
                            </div>
                        )}

                        {!showOtpInput && (
                            <p className="mt-4 text-center">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => {
                                        if (isLogin) {
                                            setShowLoginModal(false);
                                            setShowRegisterModal(true);
                                        } else {
                                            setShowRegisterModal(false);
                                            setShowLoginModal(true);
                                        }
                                    }}
                                    className="text-indigo-600 font-semibold"
                                >
                                    {isLogin ? "Sign Up" : "Log In"}
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    };


    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(base64));
            return decodedPayload;
        } catch (error) {
            console.error("Failed to decode JWT", error);
            return null;
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("authToken");
            
            if (token) {
                await axios.post(
                    `${backendUrl}/api/user/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            localStorage.removeItem("authToken");
            setIsLoggedIn(false);
            navigate("/");
            toast.success("Successfully logged out!");
        } catch (error) {
            console.error("Logout failed:", error);
            localStorage.removeItem("authToken");
            setIsLoggedIn(false);
            navigate("/");
            toast.error("Logged out due to session error");
        }
    };

useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);

        const handleStorageChange = (e) => {
            if (e.key === "authToken") {
                setIsLoggedIn(!!e.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <>
            <nav className="bg-white z-10 shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div 
                        className="text-5xl font-['Dancing_Script'] font-bold text-orange-400 hover:text-purple-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        StarPandit
                    </div>

                    <div className="hidden md:flex space-x-6 items-center">
                        <button onClick={() => navigate("/")} className="text-gray-700 hover:text-purple-600 transition-colors">Home</button>
                        <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-purple-600 transition-colors">About</button>
                        <button onClick={() => navigate("/shopify")} className="text-gray-700 hover:text-purple-600 transition-colors">Shopify</button>
                        <button onClick={() => navigate("/astrology-consultation")} className="text-gray-700 hover:text-purple-600 transition-colors">Astrology Consultation</button>
                        
                        {isLoggedIn ? (
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <button 
                                onClick={() => setShowLoginModal(true)} 
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700 hover:text-purple-600">
                            {isOpen ? '✕' : '☰'}
                        </button>
                    </div>

                    {isOpen && (
                        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md">
                            <div className="flex flex-col items-center space-y-4 py-4">
                                <button onClick={() => { navigate("/"); setIsOpen(false); }} className="text-gray-700 hover:text-purple-600">Home</button>
                                <button onClick={() => { navigate("/about"); setIsOpen(false); }} className="text-gray-700 hover:text-purple-600">About</button>
                                <button onClick={() => { navigate("/shopify"); setIsOpen(false); }} className="text-gray-700 hover:text-purple-600">Shopify</button>
                                <button onClick={() => { navigate("/astrology-consultation"); setIsOpen(false); }} className="text-gray-700 hover:text-purple-600">Astrology Consultation</button>
                                
                                {isLoggedIn ? (
                                    <button 
                                        onClick={() => { handleLogout(); setIsOpen(false); }} 
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => { setShowLoginModal(true); setIsOpen(false); }} 
                                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {showLoginModal && (
                <AuthModal 
                    isLogin={true} 
                    onClose={() => setShowLoginModal(false)} 
                />
            )}
            
            {showRegisterModal && (
                <AuthModal 
                    isLogin={false} 
                    onClose={() => setShowRegisterModal(false)} 
                />
            )}
        </>
    );
};

export default Navbar;