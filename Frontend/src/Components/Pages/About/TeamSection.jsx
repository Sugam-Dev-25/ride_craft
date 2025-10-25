import React from "react";

// Import images
import team1 from "../../../../public/team1.jpg";
import team2 from "../../../../public/team2.jpg";
import team3 from "../../../../public/team3.jpg";
import team4 from "../../../../public/team4.jpg";
import team5 from "../../../../public/team5.jpg";
import team6 from "../../../../public/team6.jpg";

const teamMembers = [
  { name: "Bianca Wood", role: "Sale Manager", image: team1 },
  { name: "Molly Bachman", role: "Sale Manager", image: team2 },
  { name: "Victoria Jordan", role: "Sale Manager", image: team3 },
  { name: "Frank Gordon", role: "Marketing Manager", image: team4 },
  { name: "Pepper Harlton", role: "Sale Manager", image: team5 },
  { name: "Daniel Lond", role: "Mechanic", image: team6 },
];

const TeamSection = () => {
  return (
    <section className="py-5 bg-white text-center">
      <div className="container">
        <h6
          className="text-uppercase fw-bold mb-2"
          style={{ color: "#f44336", letterSpacing: "1px" }}
        >
          The Team
        </h6>
        <h2
          className="fw-bold mb-5"
          style={{ fontFamily: "Poppins, sans-serif", color: "#111" }}
        >
          Meet Our Team
        </h2>

        <div className="row gy-5">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="img-fluid rounded"
                  style={{ width: "80%", height: "auto", objectFit: "cover" }}
                />
                <div className="mt-3">
                  <small
                    className="d-block text-start ms-5"
                    style={{
                      color: "#f44336",
                      fontWeight: "500",
                      borderLeft: "2px solid #f44336",
                      paddingLeft: "5px",
                    }}
                  >
                    {member.role}
                  </small>
                  <h5
                    className="fw-bold text-start ms-5 mt-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {member.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
