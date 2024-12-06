import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        navigate("/login");
    };

    useEffect(() => {
        const updateLoginStatus = () => setIsLoggedIn(!!localStorage.getItem("authToken"));
        
        // Initial check
        updateLoginStatus();

        // Listen for storage changes to sync login state
        window.addEventListener("storage", updateLoginStatus);

        return () => window.removeEventListener("storage", updateLoginStatus);
    }, []);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* StarPandit Logo with Custom Styling */}
                <div 
                    className="text-5xl font-['Dancing_Script'] font-bold text-orange-400 hover:text-purple-800 transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    StarPandit
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
                    <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">About</Link>
                    <Link to="/shopify" className="text-gray-700 hover:text-purple-600 transition-colors">Shopify</Link>
                    <Link to="/consultation" className="text-gray-700 hover:text-purple-600 transition-colors">Astrology Consultation</Link>
                    
                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="text-gray-700 hover:text-purple-600"
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md">
                        <div className="flex flex-col items-center space-y-4 py-4">
                            <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
                            <Link to="/about" className="text-gray-700 hover:text-purple-600">About</Link>
                            <Link to="/shopify" className="text-gray-700 hover:text-purple-600">Shopify</Link>
                            <Link to="/consultation" className="text-gray-700 hover:text-purple-600">Astrology Consultation</Link>
                            
                            {isLoggedIn ? (
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;