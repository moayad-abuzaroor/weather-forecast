import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: "orange" }}>
      <div className="container">
        <a className="navbar-brand" href="/">
          Weather Forecast
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
