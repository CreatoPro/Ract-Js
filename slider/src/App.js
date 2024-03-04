import React from "react";
import MainSlider from "./components/MainSlider/MainSlider";
import StudentSlider from "./components/StudentSlider/StudentSlider";
import AchieversSection from "./components/AchieversSection/AchieversSection";
import TeacherButton from "./components/TeacherButton/TeacherButton";
import ResponsiveCarousel from "./components/ResponsiveCarousel/ResponsiveCarousel";
import TestSlider from "./components/TestSlider/TestSlider";
import BootstrapTab from "./components/BootstrapTab/BootstrapTab";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfilePage1 from "./components/BootstrapTab/ProfileDetailsPage1";
import ProfilePage2 from "./components/BootstrapTab/ProfileDetailsPage2";
import ProfilePage3 from "./components/BootstrapTab/ProfileDetailsPage3";
import ProfilePage4 from "./components/BootstrapTab/ProfileDetailsPage4";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path="/" element={<BootstrapTab />} />{" "}
          <Route path="/prof1/:id" element={<ProfilePage1 />} />{" "}
          <Route path="/prof2/:id" element={<ProfilePage2 />} />{" "}
          <Route path="/prof3/:id" element={<ProfilePage3 />} />{" "}
          <Route path="/prof4(Allied)/:id" element={<ProfilePage4 />} />{" "}
        </Routes>
      </Router> */}
      <ResponsiveCarousel />
    </div>
  );
}

export default App;
