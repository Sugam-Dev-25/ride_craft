import React from "react";

const SidebarFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
  selectedGender,
  setSelectedGender,
  priceRange,
  setPriceRange,
  resetFilters,
}) => {
  const categories = ["road-cycle", "mountain-cycle", "city-cycle", "shoes", "freeroll", "helmets", "shirts", "pants", "gloves"];
  const brands = ["Nike", "Adidas", "Rebook"];
  const colors = ["White", "Black", "Gray", "Blue", "Orange", "Green"];
  const genders = ["gents", "ladies"];

  return (
    <div className="p-3 border-end border-gray-200">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h5 mb-0" style={{fontWeight: "bold"}}>Filters</h2>
        <button
          onClick={resetFilters}
          className="btn btn-danger text px-4 m-0"
          style={{ fontSize: "0.8rem", fontWeight: "bold", borderRadius: "20px" }}
        >
          Reset All
        </button>
      </div>

      {/* Price Range Filter */}
      <h3 className="h6 mt-4" style={{fontWeight:800}}>Price Range</h3>
      <input
        type="range"
        min={0}
        max={1000}
        step={10}
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        className="form-range"
      />
      <p className="small text-muted mt-2">
        ${priceRange[0]} - ${priceRange[1]}
      </p>
      <hr />
      

      {/* Category Filter */}
      <h3 className="h6" style={{fontWeight:800}}>Category</h3>
      {categories.map((cat) => (
        <div key={cat} className="form-check py-1">
          <input
            type="radio"
            className="form-check-input"
            id={cat}
            name="category"
            checked={selectedCategory === cat}
            onChange={() => setSelectedCategory(cat)}
          />
          <label className="form-check-label" htmlFor={cat} style={{textTransform: 'capitalize', }}>
            {cat}
          </label>
        </div>
      ))}

      {/* Brand Filter */}
      <h3 className="h6 mt-4" style={{fontWeight:800}}>Brand</h3>
      {brands.map((brand) => (
        <div key={brand} className="form-check py-1">
          <input
            type="radio"
            className="form-check-input"
            id={brand}
            name="brand"
            checked={selectedBrand === brand}
            onChange={() => setSelectedBrand(brand)}
          />
          <label className="form-check-label" htmlFor={brand}>
            {brand}
          </label>
        </div>
      ))}
      <hr />



      {/* Gender Filter */}
      <h3 className="h6 mt-4" style={{fontWeight:800}} >Gender</h3>
      {genders.map((g) => (
        <div key={g} className="form-check py-1">
          <input
            type="radio"
            className="form-check-input"
            id={g}
            name="gender"
            checked={selectedGender === g}
            onChange={() => setSelectedGender(g)}
          />
          <label className="form-check-label" htmlFor={g} style={{textTransform: 'capitalize',  }}>
            {g}
          </label>
        </div>
      ))}

      {/* Color Filter */}
      <h3 className="h6 mt-4" style={{fontWeight:800}}>Color</h3>
      <div className="d-flex flex-wrap gap-2 justify-content-start">
        {colors.map((clr) => (
          <button
            key={clr}
            onClick={() => setSelectedColor(clr)}
            className={`btn btn-sm rounded-circle border-2 ${
              selectedColor === clr ? "border-dark" : "border-muted"
            }`}
            style={{ backgroundColor: clr.toLowerCase(), width: "20px", height: "20px", boxShadow: "0 0 3px rgba(0,0,0,0.5)" }}
          ></button>
        ))}
      </div>
      
    </div>
  );
};

export default SidebarFilters;
