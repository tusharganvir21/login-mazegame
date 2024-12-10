import { Link } from "react-router-dom";
import Logo from "../assets/school-logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-[#1e293b] text-white p-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        {/* About Section */}
        <div className="mb-4 lg:mb-0">
          <h2 className="font-bold text-lg">About Us</h2>
          <p>
            Our school is dedicated to creating a dynamic learning environment
            where students can excel academically and engage in educational
            games for fun and learning.
          </p>
        </div>
        
        {/* Contact Section */}
        <div className="mb-4 lg:mb-0">
          <h2 className="font-bold text-lg">Contact</h2>
          <p>Email: info@school.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Learning St, Edutown</p>
        </div>
        
        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-4 lg:mb-0">
          <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
            <img src={Logo} alt="School Logo" className="w-10 h-12" />
            <span>Learn & Play</span>
          </Link>
        </div>
      </div>
      
      {/* Footer Bottom Text */}
      <p className="text-center mt-4 text-sm">© 2024 School Learn & Play. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
