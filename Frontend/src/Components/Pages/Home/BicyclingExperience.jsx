import React from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link
import img1 from '../../../../public/grid.webp';

const BicyclingExperience = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Column */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <p className="text-uppercase fw-bold small mb-2" style={{ letterSpacing: '2px', color: '#ff4c00' }}>
            Self Care
          </p>
          <h1 className="fw-bold mb-4" style={{ fontSize: '2.75rem' }}>
            The best bicycling<br />experience
          </h1>
          <p className="text-muted mb-4">
            Welcome to Yokoo! We are one of the biggest bicycle-families in the world. Our services include all types of repair, search of a perfect bike for every customer, sport events organization and much more.
            <br /><br />
            Join our community and become a part of the bike-family.
          </p>

          {/* ✅ Link to About Us */}
          <Link to="/about" className="btn btn-outline-dark rounded-5 px-4 py-2">
            Read More
          </Link>
        </div>

        {/* Right Column - Image */}
        <div className="col-lg-6">
          <img
            src={img1}
            alt="Bicycling"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default BicyclingExperience;
