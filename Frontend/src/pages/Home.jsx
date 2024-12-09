
import Banner from "../components/Banner";
import TopAstrologer from "../components/TopAstrologer";
import TopCategories from "../components/TopCategories";
import YouTubeMiniPlayer from "../components/Youtube";
import thumbnail from "../assets/thumbnail.png";


const Home = () => {
  return (
    <>
      <Banner />
      <TopCategories />
      <div className="container mx-auto p-4">
      {/* 16:9 Aspect Ratio (Default) */}
      <YouTubeMiniPlayer 
        videoId="dQw4w9WgXcQ"
        thumbnail={thumbnail}
      />
 
    </div>
      <TopAstrologer />
    </>
  );
};

export default Home;
