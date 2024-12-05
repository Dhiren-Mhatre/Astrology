import { useState, useEffect } from "react";
import axios from "axios";
import CallComponent from "../components/Call"; // Updated import to CallComponent
const backendUrl = import.meta.env.VITE_BACKENDURL;
import { useNavigate } from "react-router-dom"; 
const AstrologerList = () => {
  const [astrologers, setAstrologers] = useState([]); // Full list of astrologers
  const [filteredAstrologers, setFilteredAstrologers] = useState([]); // Filtered list
  const [expertiseOptions, setExpertiseOptions] = useState([]); // Expertise filter options
  const [languageOptions, setLanguageOptions] = useState([]); // Language filter options
  const [filters, setFilters] = useState({ languages: [], expertise: [] }); // Active filters
  const navigate = useNavigate();
  const handleViewProfile = (astrologerId) => {
    navigate(`/about-astrologer/${astrologerId}`);
  };

  // Fetch all astrologers and filter options from the backend
  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const astrologerResponse = await axios.get(
          `${backendUrl}/api/astrologer/`
        );
        setAstrologers(astrologerResponse.data);
        setFilteredAstrologers(astrologerResponse.data); // Display all astrologers initially

        // Extracting unique expertise and language options from astrologer data
        const uniqueExpertise = [
          ...new Set(astrologerResponse.data.flatMap((ast) => 
            ast.expertise.map(exp => exp.value)
          ))
        ];
        const uniqueLanguages = [
          ...new Set(astrologerResponse.data.flatMap((ast) => 
            ast.language.map(lang => lang.value)
          ))
        ];
        setExpertiseOptions(uniqueExpertise);
        setLanguageOptions(uniqueLanguages);
      } catch (error) {
        console.error("Error fetching astrologers:", error);
      }
    };
    fetchAstrologers();
  }, []);

  // Handle Filter Checkbox Change
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedValues = checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value);
      return { ...prevFilters, [name]: updatedValues };
    });
  };

  // Apply filters if filters are selected; otherwise, show all astrologers
  useEffect(() => {
    const applyFilters = async () => {
      if (filters.languages.length === 0 && filters.expertise.length === 0) {
        setFilteredAstrologers(astrologers);
        return;
      }

      try {
        const filteredResponse = await axios.post(
          `${backendUrl}/api/astrologer/filter`,
          { 
            languages: filters.languages, 
            expertise: filters.expertise 
          }
        );

        console.log('Raw filtered response:', filteredResponse.data);

        if (filteredResponse.data.length === 0) {
          console.warn('No astrologers match the current filters');
          console.log('Current full astrologer list:', astrologers);
        }

        setFilteredAstrologers(filteredResponse.data);
      } catch (error) {
        console.error("Detailed filter error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      }
    };

    applyFilters();
  }, [filters, astrologers]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Filter Section */}
      <div className="md:w-1/4 p-4 border-r bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Filter</h3>

        {/* Expertise Filter */}
        <div>
          <h4 className="font-semibold mb-1">Expertise</h4>
          {expertiseOptions.map((exp) => (
            <div key={exp} className="flex items-center">
              <input
                type="checkbox"
                id={exp}
                value={exp}
                name="expertise"
                onChange={handleFilterChange}
                className="mr-2"
              />
              <label htmlFor={exp}>{exp}</label>
            </div>
          ))}
        </div>

        {/* Language Filter */}
        <div className="mt-4">
          <h4 className="font-semibold mb-1">Languages</h4>
          {languageOptions.map((lang) => (
            <div key={lang} className="flex items-center">
              <input
                type="checkbox"
                id={lang}
                value={lang}
                name="languages"
                onChange={handleFilterChange}
                className="mr-2"
              />
              <label htmlFor={lang}>{lang}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Astrologer Card Grid */}
      <div className="md:w-3/4 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAstrologers.map((astrologer) => (
          <div key={astrologer._id} className="border p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                {astrologer.experience} Yrs
              </span>
              {astrologer.discountedRate ? (
                <span className="text-yellow-500 font-semibold">Offer</span>
              ) : (
                <span className="text-gray-500">Normal</span>
              )}
            </div>
            <img
              src={astrologer.imgLink}
              alt={astrologer.name}
              className="w-24 h-24 rounded-full mx-auto my-4"
            />
            <h3 className="text-center text-lg font-semibold">
              {astrologer.name}
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {astrologer.language.map(lang => lang.value).join(", ")}
            </p>
            <p className="text-sm text-gray-500 text-center">
              <span className="font-bold text-md">Expertise: </span>
              {astrologer.expertise.map(exp => exp.value).join(", ")}
            </p>
            <div className="text-center mt-2">
              <span className="font-semibold">₹{astrologer.minRate}/min</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              {/* Pass astrologerId and backendUrl to the CallComponent */}
              <CallComponent astrologerId={astrologer._id} backendUrl={backendUrl} />
              <button
                onClick={() => handleViewProfile(astrologer._id)}
                className="align-left mr-3 bg-green-500 text-white py-2 px-4 rounded"
              >
                Profile
              </button>
              <span className="text-sm text-gray-400">
                Followers: {astrologer.followers}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstrologerList;
