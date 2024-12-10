import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, TextField, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/FaceSharp";
import Logo from "../assets/school-logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu"; // Add MenuIcon for mobile hamburger

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref to detect clicks outside the menu
  const hamburgerRef = useRef(null); // Ref for the hamburger menu button

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInEmail");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("loggedInEmail");

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the menu and not on the hamburger button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false); // Close the menu if the click is outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside); // Clean up the event listener
    };
  }, []);

  return (
    <div className="sticky top-0 bg-opacity-80 bg-gray-900 backdrop-blur-md shadow-lg border-b border-white/20 z-50 p-3">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo and Title */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white text-2xl font-bold"
        >
          <img src={Logo} alt="School Logo" className="w-10 h-12" />
          <span>Learn & Play</span>
        </Link>

        {/* Main Navbar Links (Mobile) */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Search Bar */}
          {!searchActive ? (
            <IconButton
              onClick={() => setSearchActive(true)}
              className="text-white"
            >
              <SearchIcon className="text-white" />
            </IconButton>
          ) : (
            <TextField
              autoFocus
              size="small"
              placeholder="Search..."
              variant="standard"
              onBlur={() => setSearchActive(false)}
              className="w-full sm:w-56 md:w-72 border-b-2 border-white focus:border-blue-500"
              InputProps={{
                style: { color: 'white' }, // Input text color
                disableUnderline: false,
              }}
              InputLabelProps={{
                style: { color: 'white' }, // Placeholder color
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white', // Ensures input text is white
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Underline before focus
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white', // Underline on hover
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#3b82f6', // Underline on focus (blue)
                },
              }}
            />
          )}
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <button
          ref={hamburgerRef} // Attach the ref to the hamburger button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon />
        </button>

        {/* Main Navbar Links (Desktop) */}
        <div
          ref={menuRef}
          className={`lg:flex gap-4 items-center ${menuOpen ? "block absolute top-16 left-0 right-0 bg-[#1f2642] bg-opacity-90 p-4 z-50" : "hidden"} lg:block`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-2">
            {/* Courses Menu */}
            <button
              onClick={handleMenuOpen}
              className="text-white font-semibold text-lg flex items-center hover:text-yellow-500"
            >
              Courses
              <ArrowDropDownIcon className="ml-1" />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Math</MenuItem>
              <MenuItem onClick={handleMenuClose}>Science</MenuItem>
              <MenuItem onClick={handleMenuClose}>History</MenuItem>
            </Menu>

            {/* Regular Desktop Navbar Links */}
            <Link
              to="/contacts"
              className="text-white text-lg font-semibold hover:text-yellow-500"
            >
              Contacts
            </Link>
            <Link
              to="/admissions"
              className="text-white text-lg font-semibold hover:text-yellow-500"
            >
              Admissions
            </Link>

            {/* Conditionally render Login or Logout */}
            {isLoggedIn ? (
              <IconButton
                onClick={handleLogout}
                className="text-white hover:text-yellow-500"
              >
                <Logout className="text-white" />
              </IconButton>
            ) : (
              <Link to="/login">
                <IconButton className="hover:text-yellow-500">
                  <LoginIcon className="text-white" />
                </IconButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
