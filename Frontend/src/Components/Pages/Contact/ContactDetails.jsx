import React from "react";
import ContactForm from "./ContactForm";
import {
  BsQuestionCircle,
  BsEnvelope,
  BsGeoAlt,
} from "react-icons/bs";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiMessageFill } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";


const ContactDetails = () => {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Side - Contact Form */}
        <div className="col-md-6">
          <div className="card border-0 p-4">
            <h2 className="text-left" style={{fontWeight:"bolder"}}>Contact Us</h2>
      <p>If you have any questions, please fill out this contact form. Thank you!</p>
            <ContactForm />
          </div>
        </div>

        {/* Right Side - Contact Details */}
        <div className="col-md-6">
          <div className="card border-0 p-4">
            {/* Top Image */}
            <img
              src="public/BannerImage1.png"
              alt="Contact"
              className="img-fluid rounded mb-4 shadow-md"
              style={{ height: "300px", objectFit: "cover", width: "100%" }}
            />

            {/* Have Questions */}
            <div className="d-flex align-items-center mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded-circle me-3"
                style={{ width: "45px", height: "45px" }}
              >
                <BsFillQuestionCircleFill className="text-danger fs-5" />
              </div>
              <div>
                <small className="text-muted d-block">Have Questions?</small>
                <a
                  href="tel:+923076806860"
                  className="fw-bold text-dark text-decoration-none"
                >
                  +92 ( 307 ) 68 - 06860
                </a>
              </div>
            </div>

            <hr className="my-3" />

            {/* Write Email */}
            <div className="d-flex align-items-center mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded-circle me-3"
                style={{ width: "45px", height: "45px" }}
              >
                <RiMessageFill className="text-danger fs-5" />
              </div>
              <div>
                <small className="text-muted d-block">Write Email</small>
                <a
                  href="mailto:needhelp@company.com"
                  className="fw-bold text-dark text-decoration-none"
                >
                  needhelp@company.com
                </a>
              </div>
            </div>

            <hr className="my-3" />

            {/* Visit Office */}
            <div className="d-flex align-items-center mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded-circle me-3"
                style={{ width: "45px", height: "45px" }}
              >
                <FaMapMarkerAlt className="text-danger fs-5" />
              </div>
              <div>
                <small className="text-muted d-block">Visit Office</small>
                <p className="fw-bold text-dark mb-0">
                  24 Valentin, Street Road New York
                </p>
              </div>
            </div>

            <hr className="my-3" />

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">
              {[FaTwitter, FaFacebookF, FaPinterestP, FaInstagram].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <Icon className="text-danger" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
