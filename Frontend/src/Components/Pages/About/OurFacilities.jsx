import React from "react";
import { PiBicycleDuotone } from "react-icons/pi";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { PiClipboardTextDuotone } from "react-icons/pi";
import { PiMapPinAreaDuotone } from "react-icons/pi";

// ✅ JSON data array
const facilitiesData = [
  {
    id: 1,
    icon: <PiBicycleDuotone size={60} color="#f44336" />,
    title: "End-of-trip Servicing",
    description:
      "We’ve created the perfect citybike to give you the best experience.",
    link: "#!",
  },
  {
    id: 2,
    icon: <PiClipboardTextDuotone size={60} color="#f44336" />,
    title: "Free Costs Estimation",
    description:
      "We’ll calculate the expenses needed to improve or repair your bike.",
    link: "#!",
  },
  {
    id: 3,
    icon: <PiMoneyWavyDuotone size={60} color="#f44336" />,
    title: "Quick Bicycle Rentals",
    description:
      "Come and choose the model for rent in just a few minutes. No deposit.",
    link: "#!",
  },
  {
    id: 4,
    icon: <PiMapPinAreaDuotone size={60} color="#f44336" />,
    title: "Individual Route Selection",
    description:
      "Our experienced travellers will help you to create a perfect route.",
    link: "#!",
  },
];

const OurFacilities = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4" style={{lineHeight:"4", fontSize:"35px", fontWeight:"bold", textTransform:"capitalize"}}>Our facilities</h2>

        <div className="row">
          {facilitiesData.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="d-flex flex-column align-items-center h-100 px-3">
                {item.icon}
                <h5 className="mt-3 text-dark" style={{fontSize:"20px", fontWeight:"700", lineHeight:"2"}}>{item.title}</h5>
                <p className="text-muted">{item.description}</p>
                <a href={item.link} className="text-danger fw-bold text-decoration-none">
                  More info <span>&#8594;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFacilities;
