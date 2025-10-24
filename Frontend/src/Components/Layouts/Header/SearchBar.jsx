import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    // যদি search box already open থাকে এবং query থাকে → search করো
    if (isOpen && query.trim()) {
      navigate(`/search?q=${query}`);
      setIsOpen(false);
      return;
    }

    // না থাকলে open করো
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100); // open হলে auto focus
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{
        position: "relative",
        gap: "10px",
      }}
    >
      {/* 🔍 Search Icon */}
      <CiSearch
        size={22}
        color="#000"
        onClick={handleIconClick}
        style={{
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
      />

      {/* 🧠 Animated Search Input */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => {
          if (!query.trim()) setIsOpen(false); // blur হলে close
        }}
        style={{
          width: isOpen ? "250px" : "0px",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          border: isOpen ? "1px solid #ccc" : "none",
          borderRadius: "25px",
          padding: isOpen ? "8px 12px" : "0px",
          transition: "all 0.4s ease",
          outline: "none",
          height: "38px",
        }}
      />
    </div>
  );
};

export default SearchBar;
