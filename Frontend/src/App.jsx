 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import Astrologers from "./pages/AstrologerList";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import AboutAstrologer from "./pages/AboutAstrologer";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {/* Navbar at the top */}
        <Navbar />
        
        {/* Main content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/all-categories" element={<Categories />} />
            <Route path="/astrology-consultation" element={<Astrologers />} />
            <Route path="/about-astrologer/:astrologerId" element={<AboutAstrologer />} />          
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;

