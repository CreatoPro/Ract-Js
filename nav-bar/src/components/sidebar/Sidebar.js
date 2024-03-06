// Sidebar.js

import React from "react";
import "./sidebar.css";
import logo from "../../assets/images/allen-next-logo.webp";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li style={{ textAlign: "center" }}>
          <img src={logo} alt="Allen Logo" className="logo" />
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
