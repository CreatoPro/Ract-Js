import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const TestSlider = () => {
  // Define items for each tab
  const tabs = [
    [<div>dass</div>, 2, 3], // First tab with 3 items
    [4, 5, 6, 7], // Second tab with 4 items
    [8, 9, 10, 11, 12], // Third tab with 5 items
    [13, 14], // Fourth tab with 2 items
  ];

  // Render carousel items for each tab
  const renderItems = () => {
    return tabs.map((tab, index) => (
      <div key={index} className="item">
        {tab}
      </div>
    ));
  };

  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      nav
      items={1} // Set the number of tabs to 4
    >
      {renderItems()}
    </OwlCarousel>
  );
};

export default TestSlider;
