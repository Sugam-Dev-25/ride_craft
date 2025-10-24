import React from 'react';
import banner from "../../../../public/BannerImage5.png";

const AboutBanner = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        position: 'relative', // Set position relative for overlay positioning
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col">
            <h1 className="display-3 text-white fw-bold">
              About Us
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;

