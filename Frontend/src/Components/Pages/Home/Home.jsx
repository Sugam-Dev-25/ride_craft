import React from "react";
import BannerSlider from "./BannerSlider";
import ProductsGrid from "../Products/ProductsGrid";
import ProductCarousel from "../Products/ProductCarousel";
import CategoryCarousel from "../Products/CategoryCarousel";
import BikeFeatureSection from "./BikeFeatureSection";
import BicyclingExperience from "./BicyclingExperience";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <CategoryCarousel />
      <ProductCarousel category="road-cycle" title="Road Cycle" />
      {/* <ProductCarousel category="mountain-cycle" title="Mountain Cycle" />
      <ProductCarousel category="city-cycle" title="Mountain Cycle" /> */}
      <ProductCarousel category="shoes" title="Mountain Cycle" />
      <ProductCarousel category="freeroll" title="Mountain Cycle" />
      <ProductCarousel category="helmets" title="Mountain Cycle" />
      <ProductCarousel category="shirts" title="Mountain Cycle" />
      <ProductCarousel category="pants" title="Mountain Cycle" />
      <ProductCarousel category="gloves" title="Mountain Cycle" />
      <BikeFeatureSection />
      <ProductsGrid />
      <BicyclingExperience/>
    </>
  );
};

export default Home;

