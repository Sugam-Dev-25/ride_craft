import React from 'react';
import banner from "../../../../public/BannerImage4.png";

const ContactBanner = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center position-relative"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
      }}
    >
      {/* Overlay div */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
          zIndex: 1, // Ensure the overlay is under the content
        }}
      ></div>

      {/* Content */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col">
            <h1 className="display-3 text-white fw-bold">
              Contact Us
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
