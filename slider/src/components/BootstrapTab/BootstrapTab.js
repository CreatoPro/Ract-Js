import React, { useState } from "react";
import "./BootstrapTab.css";
import { Container, Tab, Nav, Modal, Button } from "react-bootstrap";
import icon from "../../assets/images/teacher-carousel-icon.png";
import "../ResponsiveCarousel/ResponsiveCarousel.css";
import { facultydata } from "../../assets/data/data";

import { Link } from "react-router-dom";

export default function BootstrapTab() {
  return (
    <Container className="responsive-carousel">
      <Tab.Container id="nav-tabs" defaultActiveKey="#nav-home">
        <Nav variant="tabs" className="nav">
          <Nav.Item>
            <Nav.Link eventKey="#nav-home">PROF 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#nav-profile">PROF 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#nav-contact">PROF 3</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#nav-contact-demo">PROF 4(Allied)</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="#nav-home">
            <div className="row">
              {facultydata[0].prof1.map((prof, i) => (
                <div className="outer-box col-lg-4 col-md-6" key={i}>
                  <div className="teacher-box">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <Link to={`/prof1/${prof.url}`}>Know More</Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="#nav-profile">
            <div className="row">
              {facultydata[0].prof2.map((prof, i) => (
                <div className="outer-box col-lg-4 col-md-6" key={i}>
                  <div className="teacher-box">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <Link to={`/prof2/${prof.id}`}>Know More</Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="#nav-contact">
            <div className="row">
              {facultydata[0].prof3.map((prof, i) => (
                <div className="outer-box col-lg-4 col-md-6" key={i}>
                  <div className="teacher-box">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <Link to={`/prof3/${prof.id}`}>Know More</Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="#nav-contact-demo">
            <div className="row">
              {facultydata[0].prof4.map((prof, i) => (
                <div className="outer-box col-lg-4 col-md-6" key={i}>
                  <div className="teacher-box">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <Link to={`/prof4(Allied)/${prof.id}`}>Know More</Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
