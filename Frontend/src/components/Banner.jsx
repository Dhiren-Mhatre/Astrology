import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const backendUrl = import.meta.env.VITE_BACKENDURL;

const Banner = () => {
  const navigate = useNavigate(); // Add navigation hook

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
  };

  const [banners, setBanners] = useState(null);

  // Function to handle banner click and redirect
  const handleBannerClick = (bannerName) => {
    // Special handling for Astrology Consultation
    if (bannerName.toLowerCase() === 'astrology-consultation') {
      navigate('/astrology-consultation');
      return;
    }

    // Convert banner name to Shopify collection slug
    const formattedBannerName = bannerName
      .toLowerCase()
      .replace(/\s+/g, "-"); // Converts the banner name to a slug format
    
    const url = `https://6aaccc-e0.myshopify.com/collections/${formattedBannerName}`;
    window.open(url, "_blank"); // Opens the URL in a new tab
  };

  const getAllBanners = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/banner/`);
      if (response?.status === 200) {
        const activeBanners = response.data
          .filter((banner) => banner.active)
          .sort((a, b) => a.sequenceNo - b.sequenceNo);
        setBanners(activeBanners);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBanners();
  }, []);

  return (
    <div className="w-full p-4 h-[120px] sm:h-[200px] md:h-[300px] lg:h-[440px] my-2">
      <Slider {...settings}>
        {banners?.map((banner) => (
          <div 
            className="relative w-full h-full cursor-pointer" 
            key={banner._id}
            onClick={() => handleBannerClick(banner.name)}
          >
            <img
              src={banner.imgLink}
              alt={banner.name}
              title={banner.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;