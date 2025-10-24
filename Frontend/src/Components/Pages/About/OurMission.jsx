import React from "react";
import missionImg from "../../../../public/our-mission.jpg"; 

const OurMission = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f5f8f7" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column: Text and Progress */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold text-dark mb-4" style={{lineHeight:"2", fontSize:"35px", fontWeight:"bold", textTransform:"capitalize"}}>Our mission</h2>
            <p className="text-muted mb-4">
              We’re a bike shop, a family and a team of riders, helping folks in New York
              explore their passion for cycling. Biking is more than transportation or
              exercise, it’s a lifestyle. Whether you need help with where to ride or are
              in need.
            </p>

            {/* Progress Bar 1 */}
            <div className="mb-4">
              <div className="d-flex justify-content-between fw-bold text-dark">
                <span>Reduced anxiety and depression</span>
                <span>80%</span>
              </div>
              <div className="progress" style={{ height: "18px", borderRadius: "50px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "80%", borderRadius: "50px" }}
                ></div>
              </div>
            </div>

            {/* Progress Bar 2 */}
            <div className="mb-4">
              <div className="d-flex justify-content-between fw-bold text-dark">
                <span>Decreased body fat levels</span>
                <span>96%</span>
              </div>
              <div className="progress" style={{ height: "18px", borderRadius: "50px"}}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "96%", borderRadius: "50px" }}
                ></div>
              </div>
            </div>

            {/* Progress Bar 3 */}
            <div>
              <div className="d-flex justify-content-between fw-bold text-dark">
                <span>Increased cardiovascular fitness</span>
                <span>92%</span>
              </div>
              <div className="progress" style={{ height: "18px", borderRadius: "50px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "92%", borderRadius: "50px" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="col-md-6">
            <img
              src={missionImg}
              alt="Mission"
              className="img-fluid rounded"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
