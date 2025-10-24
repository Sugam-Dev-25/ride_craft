import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../../../service/api";
import SidebarFilters from "./SidebarFilters";
import ProductGrid from "./ProductGrid";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedColor("");
    setSelectedGender("");
    setPriceRange([0, 1000]);
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      "products",
      selectedCategory,
      selectedBrand,
      selectedColor,
      selectedGender,
      priceRange,
    ],
    queryFn: () =>
      getFilteredProducts({
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedBrand && { brand: selectedBrand }),
        ...(selectedColor && { color: selectedColor }),
        ...(selectedGender && { gender: selectedGender }),
        priceMin: priceRange[0],
        priceMax: priceRange[1],
      }),
  });

  // Inline style to hide scrollbar
  const hideScrollbarStyle = {
    overflowY: "scroll",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
    WebkitOverflowScrolling: "touch", // smooth scrolling on iOS
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
        width: "1280px",        // max width of container
        margin: "0 auto",       // center horizontally
        padding: "20px 0",
        boxSizing: "border-box",
        height: "calc(100vh - 40px)", // full viewport height minus padding
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          flex: "0 0 250px",              // fixed width
          position: "sticky",
          top: "20px",
          alignSelf: "flex-start",
          height: "calc(100vh - 60px)",   // sidebar full height minus top/bottom padding
          ...hideScrollbarStyle,
        }}
      >
        <SidebarFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          resetFilters={resetFilters}
        />
      </div>

      {/* Product Grid */}
      <div
        style={{
          flex: 1,               // take remaining space
          height: "100%",
          ...hideScrollbarStyle,
        }}
      >
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Shop;
