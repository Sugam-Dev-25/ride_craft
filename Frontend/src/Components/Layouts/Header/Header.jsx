import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { PiUserCircleCheckLight } from "react-icons/pi";
import { PiHeartStraightLight } from "react-icons/pi";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ To access cart & wishlist counts
import img from "../../../../public/logo.png";
import SearchBar from "./SearchBar";

const Header = () => {
  // ✅ Get item counts from Redux
  const cartCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const { user } = useSelector((state) => state.auth); // Access the user from redux store

  return (
    <div className="w-100">
      {/* Top Bar */}
      <div className="bg-black text-white py-1">
        <div className="container d-flex justify-content-between align-items-center flex-wrap px-2 py-1">
          {/* Left side */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <FaEnvelope size={14} />
              <span className="small">email@business.com</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaPhoneAlt size={14} />
              <span className="small">578-393-4937</span>
            </div>
          </div>

          {/* Right side */}
          <div className="d-flex align-items-center gap-2">
            <FaMapMarkerAlt size={14} />
            <span className="small">29 W. Pawnee, Bloomfield, NJ 07003</span>
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-none py-2 px-2 px-sm-5">
        <div className="container w-100 d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img
              src={img}
              alt="Bike Logo"
              className="img-fluid"
              style={{ width: "150px", height: "auto" }}
            />
          </Link>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex flex-wrap gap-4">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-4 position-relative">
            {/* User Profile */}
            <Link to="/profile" className="btn btn-link text-dark p-0 position-relative">
              {/* Display the user profile picture */}
              {user?.profilePic ? (
                <img
                  src={`https://ridecraft-backend.onrender.com${user.profilePic}`}
                  alt="User Profile"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
              ) : (
                <PiUserCircleCheckLight size={23} />
              )}
            </Link>

            <SearchBar/>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="btn btn-link text-dark p-0 position-relative"
              style={{ textDecoration: "none" }}
            >
              <PiHeartStraightLight size={21} />
              {wishlistCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white"
                  style={{ fontSize: "10px", padding: "3px 6px" }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-link text-dark p-0 position-relative"
              style={{ textDecoration: "none" }}
            >
              <CiShoppingCart size={22} />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white"
                  style={{ fontSize: "10px", padding: "3px 6px" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
