"use client";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { courses } from "@/app/data/courses";
import "./filtertab.css";

export default function FilterCarousel() {
  const [activeTab, setActiveTab] = useState("all");
  const sliderRef = useRef(null);
  const [data, setData] = useState([]);

  const handleFilterChange = (filter) => {
    setActiveTab(filter);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  useEffect(() => {
    const url = "https://dummyjson.com/products";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.products);
        console.log(data, "data");
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // console.log(data);

  const filteredCourses =
    activeTab === "hybrid"
      ? courses.filter((course) => course.category === "Hybrid")
      : activeTab === "online"
      ? courses.filter((course) => course.category === "Online")
      : courses;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container">
      {/* <div>
        {data.map((product) => (
          <div>
            <div>{product.title}</div>
            <div key={product.id}>
              <h1>{product.id}</h1>
              {cart.product[cart.id].map((dataItem) => {
                return <span key={dataItem.id}>{dataItem.title}</span>;
              })}
              <div>{cartproduct[cart.id].title}</div>
            </div>
          </div>
        ))}
      </div> */}

      <div
        className="filter-buttons"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className={`${activeTab === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "0",
            margin: "20px",
            borderRadius: "25px",
            padding: "10px 20px",
          }}
        >
          All Courses
        </button>
        <button
          className={`${activeTab === "hybrid" ? "active" : ""}`}
          onClick={() => handleFilterChange("hybrid")}
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "0",
            margin: "20px",
            borderRadius: "25px",
            padding: "10px 20px",
          }}
        >
          Hybrid
        </button>
        <button
          className={`${activeTab === "online" ? "active" : ""}`}
          onClick={() => handleFilterChange("online")}
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "0",
            margin: "20px",
            borderRadius: "25px",
            padding: "10px 20px",
          }}
        >
          Online
        </button>
      </div>
      {/* <Slider ref={sliderRef} {...settings}>
        {filteredCourses.map((course, i) => (
          <div className="row">
            <div className="outer-box col-lg-12 col-md-12" key={i}>
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
          </div>
        ))}
      </Slider> */}
      <Slider ref={sliderRef} {...settings}>
        {data.map((product, i) => (
          <div className="row">
            <div className="outer-box col-lg-12 col-md-12" key={i}>
              <div>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="img-fluid"
                />
                <h4>{product.title}</h4>
                <div>
                  <img
                    width={24}
                    height={24}
                    src={product.thumbnail}
                    alt="icon"
                  />
                  <p>{product.total}</p>
                </div>
                <p>
                  {product.discountPercentage} <br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
