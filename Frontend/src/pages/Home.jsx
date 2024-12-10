// Home.jsx
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
     
<div className="container mx-auto px-2 sm:px-4">
  <div className="grid grid-cols-2 gap-1 sm:gap-4">
    <YouTubeMiniPlayer videoId="dQw4w9WgXcQ" thumbnail={thumbnail} />
    <YouTubeMiniPlayer videoId="dQw4w9WgXcQ" thumbnail={thumbnail} />
  </div>
</div>
      <TopAstrologer />
    </>
  );
};  



export default Home;
