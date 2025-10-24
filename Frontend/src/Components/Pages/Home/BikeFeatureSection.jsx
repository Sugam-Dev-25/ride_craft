import React from "react";
import { FaLeaf, FaShieldAlt, FaBoxOpen } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from '../../../../public/image-1.webp';
import image2 from '../../../../public/image-2.webp';
import image3 from '../../../../public/image-3.webp';

const BikeFeatureSection = () => {
  return (
    <section
      className="py-5 text-white"
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
      }}
    >
      <div className="container">
        {/* === Top Feature Icons === */}
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div>
              <FaLeaf size={40} color="#d9d9d9ff" className="mb-3" />
              <h5 className="fw-bold">Eco Friendly</h5>
              <p className="text-secondary mb-0" style={{color: '#d9d9d9ff'}}>
                Elit tortor ut tristique eu purus venenatis id amet in
                pellentesque aliquet lacus.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div>
              <FaShieldAlt size={40} color="#d9d9d9ff" className="mb-3" />
              <h5 className="fw-bold">3 Years Warranty</h5>
              <p className="text-secondary mb-0" style={{color: '#d9d9d9ff'}}>
                Vitae consectetur pulvinar malesuada elit tellus facilisi
                suspendisse tomtorut.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div>
              <FaBoxOpen size={40} color="#d9d9d9ff" className="mb-3" />
              <h5 className="fw-bold">Fast Delivery</h5>
              <p className="text-secondary mb-0" style={{color: '#d9d9d9ff'}}>
                Malesuada faucibus quis auctor integer rhoncus nulla pharetra
                consequat.
              </p>
            </div>
          </div>
        </div>

        {/* === Bike Collection Cards === */}
        <div className="row g-4 justify-content-center">
          {/* City Bikes */}
          <div className="col-md-4">
            <div
              className="rounded-4 text-white position-relative overflow-hidden"
              style={{
                backgroundImage: `url(${image2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
              }}
            >
              <div
                className="position-absolute bottom-0 start-0 p-4 w-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <h5 className="fw-bold">Mountain Cycle</h5>
                <p className="mb-0 text-white">
                  Quam vulputate dignissim suspendisse in est ante in adipiscing
                  vitae.
                </p>
              </div>
            </div>
          </div>

          {/* Road Bikes */}
          <div className="col-md-4">
            <div
              className="rounded-4 text-white position-relative overflow-hidden"
              style={{
                backgroundImage: `url(${image1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
              }}
            >
              <div
                className="position-absolute bottom-0 start-0 p-4 w-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <h5 className="fw-bold">Road Cycle</h5>
                <p className="mb-0 text-white">
                  Condimentum mattis pellentesque id nibh tortor id aliquet
                  lectus.
                </p>
              </div>
            </div>
          </div>

          {/* Mountain Bikes */}
          <div className="col-md-4">
            <div
              className="rounded-4 text-white position-relative overflow-hidden"
              style={{
                backgroundImage:  `url(${image3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
              }}
            >
              <div
                className="position-absolute bottom-0 start-0 p-4 w-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <h5 className="fw-bold">City Cycle</h5>
                <p className="mb-0 text-white">
                  Malesuada fames ac turpis egestas maecenas convallis posuere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BikeFeatureSection;
