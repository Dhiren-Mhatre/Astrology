import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKENDURL;

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const handleCategoryClick = (categoryName) => {
    const formattedCategoryName = categoryName
      .toLowerCase()
      .replace(/\s+/g, "-"); // Converts the category name to a slug format
    const url = `https://6aaccc-e0.myshopify.com/collections/${formattedCategoryName}`;
    window.open(url, "_blank"); // Opens the URL in a new tab
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories/`);
      const data = await response.data;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="container ml-5 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Shop Our Collections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories?.map((category, index) =>
            index >= 13 ? (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="bg-gray-200 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={category.imgLink}
                    alt={category.name}
                    className="w-40 h-40 object-cover"
                  />
                </div>
                <h3 className="mt-2 text-l font-medium text-center">
                  {category.name}
                </h3>
              </div>
            ) : null
          )}
        </div>
        <div className="mt-8 text-center">
          <Link
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition duration-300"
            to={"/all-categories"}
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
