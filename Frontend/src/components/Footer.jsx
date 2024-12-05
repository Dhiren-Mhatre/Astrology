import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <footer className="bg-orange-200 py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1 - Description */}
        <div>
          <h3 className="text-2xl font-bold text-red-600 mb-3">
            Why Start Pandit?
          </h3>
          <p className="text-gray-700">
            Start Pandit is an Astrology and Religious portal that brings with
            it an array of solutions for your everyday life issues.
            {showMore && (
              <span>
                {" "}
                It offers detailed astrological consultations, rituals, and
                religious services to help guide users in their personal and
                professional lives.
              </span>
            )}
            <button
              onClick={toggleReadMore}
              className="text-red-600 font-semibold ml-1"
            >
              {showMore ? "Read Less" : "Read more"}
            </button>
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <button className="ml-2 mt-3 px-4 py-2 bg-red-600 text-white rounded">
              Subscribe
            </button>
          </div>
        </div>

        {/* Section 2 - Contact Info */}
        <div className="text-gray-700 md:ml-6">
          <h4 className="font-bold text-lg">Contact Info</h4>
          <p>
            Address:  laxmi nagar new delhi
          </p>
          <p>Phone: 8800774985</p>
          <p>Email: contact@starpandit.com</p>
        </div>

        {/* Section 3 - Links */}
        <div className="text-gray-700">
          <h4 className="font-bold text-lg">Our Services</h4>
          <ul>
            <li>
              <a href="/about-us" className="hover:text-red-600">
                About Us
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-red-600">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-red-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-red-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/astrologers-registration" className="hover:text-red-600">
                Astrologers Registration
              </a>
            </li>
            <li>
              <a href="/vendor-registration" className="hover:text-red-600">
                Vendor Registration
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center mt-8">
        <div className="text-sm text-gray-700">
          &copy; {new Date().getFullYear()} Start Pandit. All Rights Reserved.
        </div>
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-4 lg:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl text-blue-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-blue-700" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-2xl text-red-500" />
            </a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
