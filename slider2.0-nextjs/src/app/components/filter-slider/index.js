"use client";
import React from "react";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { courses } from "@/app/data/courses";

export default function FilterSilder() {
  const [activeTab, setActiveTab] = useState(0); // Change activeTab to be the index of the tab instead of its name

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const hybrid = courses.filter((course) => course.category === "Hybrid");
  const online = courses.filter((course) => course.category === "Online");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <div className="row">
            {courses.map((course, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div>
                  <img
                    src={course.image}
                    alt={course.name}
                    className="img-fluid"
                  />
                  <h4>{course.name}</h4>
                  <div>
                    <img
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                    />
                    <p>{course.experience}</p>
                  </div>
                  <p>
                    {course.description1} <br />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="row">
            {hybrid.map((course, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div>
                  <img
                    src={course.image}
                    alt={course.name}
                    className="img-fluid"
                  />
                  <h4>{course.name}</h4>
                  <div>
                    <img
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                    />
                    <p>{course.experience}</p>
                  </div>
                  <p>
                    {course.description1} <br />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="row">
            {online.map((course, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div>
                  <img
                    src={course.image}
                    alt={course.name}
                    className="img-fluid"
                  />
                  <h4>{course.name}</h4>
                  <div>
                    <img
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                    />
                    <p>{course.experience}</p>
                  </div>
                  <p>
                    {course.description1} <br />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slider>
    </div>
  );
}
