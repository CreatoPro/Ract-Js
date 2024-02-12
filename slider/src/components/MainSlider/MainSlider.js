import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Button from "react-bootstrap/Button";

import "./MainSlider.css";

function MainSlider() {
  const options = {
    items: 1,
    nav: false,
    rewind: true,
    autoplay: true,
    slideBy: 1,
    dots: true,
    dotsEach: true,
    dotData: true,
    arrows: false,
    // animateIn: "fadeIn",
    // animateOut: "fadeOut",
    // smartSpeed: 10000,
  };
  return (
    <div className="main-slider container">
      <OwlCarousel className="owl-theme" {...options} loop margin={10} nav>
        {/* Item 1 */}
        <div class="item row flex-column flex-md-row">
          <div class="description col-md-6 mx-md-0 mx-auto p-5 pb-md-5 py-0">
            <h3>Faculties - Gurus for guidance</h3>
            <p>
              India's Topmost Academicians and Specialists with decades of
              experience in shaping careers and mentoring young minds.
            </p>
            <Button class="btn">Explore More!</Button>
          </div>
          <div class="col-md-6 mx-md-0 mx-auto p-4">
            <img
              alt="display"
              class="img-fluid"
              src={require("../../assets/images/main-slider-img.png")}
            />
          </div>
        </div>
        {/* Item 2 */}
        <div class="item row flex-column flex-md-row">
          <div class="description col-md-6 mx-md-0 mx-auto p-5 pb-md-5 py-0">
            <h3>Faculties - Gurus for guidance1</h3>
            <p>
              India's Topmost Academicians and Specialists with decades of
              experience in shaping careers and mentoring young minds.
            </p>
            <Button class="btn">Explore More!</Button>
          </div>
          <div class="col-md-6 mx-md-0 mx-auto p-4">
            <img
              alt="display"
              class="img-fluid"
              src={require("../../assets/images/main-slider-img-demo-1.png")}
            />
          </div>
        </div>
        {/* Item 3 */}
        <div class="item row flex-column flex-md-row">
          <div class="description col-md-6 mx-md-0 mx-auto p-5 pb-md-5 py-0">
            <h3>Faculties - Gurus for guidance2</h3>
            <p>
              India's Topmost Academicians and Specialists with decades of
              experience in shaping careers and mentoring young minds.
            </p>
            <Button class="btn">Explore More!</Button>
          </div>
          <div class="col-md-6 mx-md-0 mx-auto p-4">
            <img
              alt="display"
              class="img-fluid"
              src={require("../../assets/images/main-slider-img-demo-2.png")}
            />
          </div>
        </div>
        {/* Item 4 */}
        <div class="item row flex-column flex-md-row">
          <div class="description col-md-6 mx-md-0 mx-auto p-5 pb-md-5 py-0">
            <h3>Faculties - Gurus for guidance3</h3>
            <p>
              India's Topmost Academicians and Specialists with decades of
              experience in shaping careers and mentoring young minds.
            </p>
            <Button class="btn">Explore More!</Button>
          </div>
          <div class="col-md-6 mx-md-0 mx-auto p-4">
            <img
              alt="display"
              class="img-fluid"
              src={require("../../assets/images/main-slider-img-demo-3.png")}
            />
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
}

export default MainSlider;
