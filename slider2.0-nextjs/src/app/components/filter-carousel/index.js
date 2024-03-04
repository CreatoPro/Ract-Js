"use client";
import React, { useState } from "react";

import { courses } from "@/app/data/courses";

import "bootstrap/dist/css/bootstrap.min.css";
export default function FilterCarousel() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const hybrid = courses.filter((course) => course.category === "Hybrid");
  const online = courses.filter((course) => course.category === "Online");

  console.log(hybrid);
  return (
    <div className="container ">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab1" && "active"}`}
            onClick={() => handleTabChange("tab1")}
          >
            All
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab2" && "active"}`}
            onClick={() => handleTabChange("tab2")}
          >
            Online
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab3" && "active"}`}
            onClick={() => handleTabChange("tab3")}
          >
            Hybrid
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className={`tab-pane fade ${activeTab === "tab1" && "show active"}`}
          id="tab1"
        >
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
        <div
          className={`tab-pane fade ${activeTab === "tab2" && "show active"}`}
          id="tab2"
        >
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
        <div
          className={`tab-pane fade ${activeTab === "tab3" && "show active"}`}
          id="tab3"
        >
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
      </div>
    </div>
  );
}
