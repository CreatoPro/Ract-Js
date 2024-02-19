"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tabs.css";
import { facultydata } from "../../data/data";
// import icon from "@/images/teacher-carousel-icon.png";
import Image from "next/image";
import Link from "next/link";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container responsive-carousel">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab1" && "active"}`}
            onClick={() => handleTabChange("tab1")}
          >
            PROF 1
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab2" && "active"}`}
            onClick={() => handleTabChange("tab2")}
          >
            PROF 2
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab3" && "active"}`}
            onClick={() => handleTabChange("tab3")}
          >
            PROF 3
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab4" && "active"}`}
            onClick={() => handleTabChange("tab4")}
          >
            PROF 4(Allied)
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div
          className={`tab-pane fade ${activeTab === "tab1" && "show active"}`}
          id="tab1"
        >
          <div className="row">
            {facultydata[0].prof1.map((prof, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div className="teacher-box">
                  <img src={prof.image} alt={prof.name} className="img-fluid" />
                  <h4>{prof.name}</h4>
                  <div className="experience">
                    <Image
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                      className="img-fluid icon"
                    />
                    <p>{prof.experience}</p>
                  </div>
                  <p>
                    {prof.description} <br />
                    <Link
                      href={{
                        pathname: "/prof1",
                        query: { teacher: `${prof.name}` },
                      }}
                    >
                      Know More
                    </Link>
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
            {facultydata[0].prof2.map((prof, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div className="teacher-box">
                  <img src={prof.image} alt={prof.name} className="img-fluid" />
                  <h4>{prof.name}</h4>
                  <div className="experience">
                    <Image
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                      className="img-fluid icon"
                    />
                    <p>{prof.experience}</p>
                  </div>
                  <p>
                    {prof.description} <br />
                    <Link
                      href={{
                        pathname: "/prof2",
                        query: { teacher: `${prof.name}` },
                      }}
                    >
                      Know More
                    </Link>
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
            {facultydata[0].prof3.map((prof, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div className="teacher-box">
                  <img src={prof.image} alt={prof.name} className="img-fluid" />
                  <h4>{prof.name}</h4>
                  <div className="experience">
                    <Image
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                      className="img-fluid icon"
                    />
                    <p>{prof.experience}</p>
                  </div>
                  <p>
                    {prof.description} <br />
                    <Link
                      href={{
                        pathname: "/prof3",
                        query: { teacher: `${prof.name}` },
                      }}
                    >
                      Know More
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`tab-pane fade ${activeTab === "tab4" && "show active"}`}
          id="tab4"
        >
          <div className="row">
            {facultydata[0].prof4.map((prof, i) => (
              <div className="outer-box col-lg-4 col-md-6" key={i}>
                <div className="teacher-box">
                  <img src={prof.image} alt={prof.name} className="img-fluid" />
                  <h4>{prof.name}</h4>
                  <div className="experience">
                    <Image
                      width={24}
                      height={24}
                      src="/teacher-carousel-icon.png"
                      alt="icon"
                      className="img-fluid icon"
                    />
                    <p>{prof.experience}</p>
                  </div>
                  <p>
                    {prof.description} <br />
                    <Link
                      href={{
                        pathname: "/prof4(Allied)",
                        query: { teacher: `${prof.name}` },
                      }}
                    >
                      Know More
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
