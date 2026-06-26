import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../../service/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Img1 from "../../../assets/1.png";
import Img2 from "../../../assets/2.png";
import Img3 from "../../../assets/3.png";
import Img4 from "../../../assets/4.png";
import Img5 from "../../../assets/5.png";
import Img6 from "../../../assets/6.png";
import Img7 from "../../../assets/7.png";
import Img8 from "../../../assets/8.png";
import Img9 from "../../../assets/9.png";

const categories = [
  { name: "Shoes", image: Img1 },
  { name: "Mountain Cycle", image: Img7 },
  { name: "Pants", image: Img3 },
  { name: "Shirts", image: Img4 },
  { name: "City Cycle", image: Img9 },
  { name: "Helmets", image: Img6 },
  { name: "Gloves", image: Img2 },
  { name: "Road Cycle", image: Img8 },
  { name: "Freeroll", image: Img5 },
];

// ✅ Custom Arrows (Pure black + positioned outside)
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "-25px",
      transform: "translateY(-50%)",
      backgroundColor: "black",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 5,
    }}
  >
    <ChevronRight size={20} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-25px",
      transform: "translateY(-50%)",
      backgroundColor: "black",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 5,
    }}
  >
    <ChevronLeft size={20} />
  </div>
);

const CategoryCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = async (categoryName) => {
    try {
      const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
      const products = await getProductsByCategory(formattedCategory);

      // ✅ Navigate to dynamic URL
      navigate(`/category-products/${formattedCategory}`, {
        state: { categoryName, products },
      });
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="container my-5"
      style={{
        position: "relative",
        overflow: "visible",
      }}
    >
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div
            key={index}
            className="text-center p-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="rounded-circle mb-3"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                display: "block",
                margin: "0 auto",
                cursor: "pointer",
              }}
            />
            <h6 style={{ fontWeight: 800 }}>{category.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
