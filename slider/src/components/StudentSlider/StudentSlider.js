import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Left from "../../assets/images/arrow-left.png";
import Right from "../../assets/images/arrow-right.png";

import "./StudentSlider.css";

export default function StudentSlider() {
  const options = {
    items: 3,
    nav: true,
    navText: [`<img src=${Left}>`, `<img src=${Right}>`],
    rewind: true,
    autoplay: true,
    slideBy: 1,
    dots: false,
    dotsEach: false,
    dotData: false,

    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
        stagePadding: 140,
      },
      992: {
        items: 2,
        stagePadding: 140,
      },
      1440: {
        items: 3,
        stagePadding: 140,
      },
    },
  };
  return (
    <div className="left-padding student-slider">
      <div className="sub-header">Student Testimonials</div>
      <div className="header">True Words By Top Rankers</div>
      <OwlCarousel className="owl-theme" {...options} loop margin={10} nav>
        {/* ITEM 1 */}
        <div class="item">
          <img
            style={{ width: "80px" }}
            src={require("../../assets/images/soyeb-aftab.png")}
          />
          <div class="box">
            <div class="description">
              “I can never forget how rapidly the faculties of ALLEN switched to
              the online medium (during COVID-19 pandemic) and helped me stay
              calm & focused.”
            </div>
            <hr />
            <div class="name">
              <b>Soyeb Aftab</b> <br /> (AIR 1,NEET UG 2020){" "}
            </div>
          </div>
        </div>
        {/* ITEM 2 */}
        <div class="item">
          <img
            style={{ width: "80px" }}
            src={require("../../assets/images/soyeb-aftab.png")}
          />
          <div class="box">
            <div class="description">
              “I can never forget how rapidly the faculties of ALLEN switched to
              the online medium (during COVID-19 pandemic) and helped me stay
              calm & focused.”
            </div>
            <hr />
            <div class="name">
              <b>Soyeb Aftab</b> <br /> (AIR 1,NEET UG 2020){" "}
            </div>
          </div>
        </div>
        {/* ITEM 3 */}
        <div class="item">
          <img
            style={{ width: "80px" }}
            src={require("../../assets/images/soyeb-aftab.png")}
          />
          <div class="box">
            <div class="description">
              “I can never forget how rapidly the faculties of ALLEN switched to
              the online medium (during COVID-19 pandemic) and helped me stay
              calm & focused.”
            </div>
            <hr />
            <div class="name">
              <b>Soyeb Aftab</b> <br /> (AIR 1,NEET UG 2020){" "}
            </div>
          </div>
        </div>
        {/* ITEM 4 */}
        <div class="item">
          <img
            style={{ width: "80px" }}
            src={require("../../assets/images/soyeb-aftab.png")}
          />
          <div class="box">
            <div class="description">
              “I can never forget how rapidly the faculties of ALLEN switched to
              the online medium (during COVID-19 pandemic) and helped me stay
              calm & focused.”
            </div>
            <hr />
            <div class="name">
              <b>Soyeb Aftab</b> <br /> (AIR 1,NEET UG 2020){" "}
            </div>
          </div>
        </div>
        {/* ITEM 5 */}
        <div class="item">
          <img
            style={{ width: "80px" }}
            src={require("../../assets/images/soyeb-aftab.png")}
          />
          <div class="box">
            <div class="description">
              “I can never forget how rapidly the faculties of ALLEN switched to
              the online medium (during COVID-19 pandemic) and helped me stay
              calm & focused.”
            </div>
            <hr />
            <div class="name">
              <b>Soyeb Aftab</b> <br /> (AIR 1,NEET UG 2020){" "}
            </div>
          </div>
        </div>
        {/* ITEM 6 */}
        <div class="item">
          <img
            style={{ width: "80px" }}
            src={require("../../assets/images/soyeb-aftab.png")}
          />
          <div class="box">
            <div class="description">
              “I can never forget how rapidly the faculties of ALLEN switched to
              the online medium (during COVID-19 pandemic) and helped me stay
              calm & focused.”
            </div>
            <hr />
            <div class="name">
              <b>Soyeb Aftab</b> <br /> (AIR 1,NEET UG 2020){" "}
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
}
