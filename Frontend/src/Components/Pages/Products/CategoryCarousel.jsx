import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../../service/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { name: "Shoes", image: "/1.png" },
  { name: "Mountain Cycle", image: "/7.png" },
  { name: "Pants", image: "/3.png" },
  { name: "Shirts", image: "/4.png" },
  { name: "City Cycle", image: "/9.png" },
  { name: "Helmets", image: "/6.png" },
  { name: "Gloves", image: "/2.png" },
  { name: "Road Cycle", image: "/8.png" },
  { name: "Freeroll", image: "/5.png" },
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
