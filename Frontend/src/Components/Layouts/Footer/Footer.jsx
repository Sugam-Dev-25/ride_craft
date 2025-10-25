import React from "react";
import {
  FaComments,
  FaPhoneAlt,
  FaEnvelopeOpenText,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaPaperPlane,
} from "react-icons/fa";

import bgImg from "../../../../public/footer-bg-2.png";

const Footer = () => {
  return (
    <footer
      className="text-light"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "50px",
      }}
    >
      {/* Top Section */}
      <div className="container text-center text-md-start">
        <div className="row mb-5 border-bottom border-secondary pb-4">
          {/* Need Help */}
          <div className="col-md-4 mb-4 text-center">
            <div className="mb-3">
              <FaComments style={{ fontSize: "2rem", color: "#ff4c00" }} />
            </div>
            <h5 className="fw-bold text-uppercase">Need Help?</h5>
            <p className="text-secondary">
              Our dedicated team are here to help.
            </p>
            <button
              className="btn btn-outline-light px-4 py-2"
              style={{
                borderColor: "#ff4c00",
                color: "#fff",
                borderRadius: "50px",
              }}
            >
              CHAT NOW
            </button>
          </div>

          {/* Call Us */}
          <div
            className="col-md-4 mb-4 text-center"
            style={{ borderLeft: "1px solid #555" }}
          >
            <div className="mb-3">
              <FaPhoneAlt style={{ fontSize: "2rem", color: "#ff4c00" }} />
            </div>
            <h5 className="fw-bold text-uppercase">Call Us</h5>
            <p className="text-secondary mb-1">
              Talk to our team 24/7 about your needs.
            </p>
            <h4 className="fw-bold" style={{ color: "#ff4c00" }}>
              666 - 880 - 33388
            </h4>
          </div>

          {/* Subscribe */}
          <div
            className="col-md-4 mb-4 text-center"
            style={{ borderLeft: "1px solid #555" }}
          >
            <div className="mb-3">
              <FaEnvelopeOpenText
                style={{ fontSize: "2rem", color: "#ff4c00" }}
              />
            </div>
            <h5 className="fw-bold text-uppercase">Subscribe Us</h5>
            <p className="text-secondary">
              And get the scoop on sales & new gear!
            </p>
            <div className="input-group w-75 mx-auto" style={{borderRadius:"50px", overflow:"hidden"}}>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email Address"
              />
              <button
                className="btn text-light"
                style={{ backgroundColor: "#ff4c00" }}
              >
                <FaPaperPlane size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row text-start text-md-left">
          {/* Useful Links */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">Useful Links</h6>
            <ul
              className="list-unstyled text-secondary"
              style={{ lineHeight: "2.3", fontSize: "13px" }}
            >
              <li>Legal & Privacy</li>
              <li>Contact</li>
              <li>Gift Card</li>
              <li>Customer Service</li>
              <li>My Account</li>
              <li>Find A Store</li>
            </ul>
          </div>

          {/* My Account */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">My Account</h6>
            <ul
              className="list-unstyled text-secondary"
              style={{ lineHeight: "2.3", fontSize: "13px" }}
            >
              <li>My Profile</li>
              <li>My Order History</li>
              <li>My Wish List</li>
              <li>Order Tracking</li>
              <li>Shopping Cart</li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">Company</h6>
            <ul
              className="list-unstyled text-secondary"
              style={{ lineHeight: "2.3", fontSize: "13px" }}
            >
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Affiliate</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Shop */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-bold text-uppercase mb-3">Shop</h6>
            <ul
              className="list-unstyled text-secondary"
              style={{ lineHeight: "2.3", fontSize: "13px" }}
            >
              <li>Televisions</li>
              <li>Fridges</li>
              <li>Washing Machines</li>
              <li>Fans</li>
              <li>Air Conditioners</li>
              <li>Laptops</li>
            </ul>
          </div>

          {/* Connect with us */}
          <div className="col-md-4 mb-4 text-center text-md-end">
            <h6 className="fw-bold text-uppercase mb-3 ">Connect with us</h6>
            <div className="d-flex justify-content-md-end justify-content-center gap-3 mb-5">
              <FaFacebookF className="fs-2" style={{border:"1px solid #989898ff", padding:7, borderRadius: 50}} />
              <FaTwitter className="fs-2" style={{border:"1px solid #989898ff", padding:7, borderRadius: 50}} />
              <FaInstagram className="fs-2" style={{border:"1px solid #989898ff", padding:7, borderRadius: 50}} />
              <FaPinterestP className="fs-2" style={{border:"1px solid #989898ff", padding:7, borderRadius: 50}} />
            </div>

            <h6 className="fw-bold text-uppercase mb-3">Payment Method</h6>
            <div className="d-flex justify-content-md-end justify-content-center gap-2 flex-wrap">
              <img
                src="/f5.png"
                alt="MasterCard"
                width="50"
                style={{borderRadius:"10px"}}
              />
              <img
                src="/f4.png"
                alt="PayPal"
                width="50"
                style={{borderRadius:"10px"}}
              />
              <img
                src="/f3.png"
                alt="Amex"
                width="50"
                style={{borderRadius:"10px"}}
              />
              <img
                src="/f2.png"
                alt="Bitcoin"
                width="50"
                style={{borderRadius:"10px"}}
              />
              <img
                src="/f1.png"
                alt="Visa"
                width="50"
                style={{borderRadius:"10px"}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className="text-center py-3 mt-4"
        style={{ borderTop: "1px solid #333", color: "#999" }}
      >
        © {new Date().getFullYear()} YourCompany. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
