import React from "react";
import "./TeacherButton.css";
import soyeb from "../../assets/images/soyeb-aftab.png";
import plus from "../../assets/images/plus.jpg";

export default function TeacherButton() {
  return (
    <div className="teacher-button">
      <div className="header">Faculty</div>
      <div className="img-box">
        <img src={soyeb} />
        <img src={soyeb} />
        <img src={soyeb} />
        <img src={soyeb} />
        <img src={plus} />
        <div className="plus">
          60+ <br />
          <span>Faculties</span>
        </div>
      </div>
    </div>
  );
}
