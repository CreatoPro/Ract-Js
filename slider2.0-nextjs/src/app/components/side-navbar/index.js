"use client";
import "../../../../public/css/sidenav.css"; // Import CSS file for styling

import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the sidebar when a link is clicked
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"} Sidebar
      </button>
      <ul>
        <li>
          <a href="#" onClick={handleLinkClick}>
            Home
          </a>
        </li>
        <li>
          <a href="#" onClick={handleLinkClick}>
            About
          </a>
        </li>
        <li>
          <a href="#" onClick={handleLinkClick}>
            Services
          </a>
        </li>
        <li>
          <a href="#" onClick={handleLinkClick}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
