import React from "react";

const teamMembers = [
  {
    name: "Bianca Wood",
    role: "Sale Manager",
    image:
      "public/team1.jpg",
  },
  {
    name: "Molly Bachman",
    role: "Sale Manager",
    image:
      "public/team2.jpg",
  },
  {
    name: "Victoria Jordan",
    role: "Sale Manager",
    image:
      "public/team3.jpg",
  },
  {
    name: "Frank Gordon",
    role: "Marketing Manager",
    image:
      "public/team4.jpg",
  },
  {
    name: "Pepper Harlton",
    role: "Sale Manager",
    image:
      "public/team5.jpg",
  },
  {
    name: "Daniel Lond",
    role: "Mechanic",
    image:
      "public/team6.jpg",
  },
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
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "#111",
          }}
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
                  style={{
                    width: "80%",
                    height: "auto",
                    objectFit: "cover",
                  }}
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
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
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
