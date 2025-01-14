import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form className="mt-3" onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn" style={{ backgroundColor: "orange", color: "white" }} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
