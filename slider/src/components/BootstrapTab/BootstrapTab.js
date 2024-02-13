import React, { useState } from "react";
import "./BootstrapTab.css";
import { Container, Tab, Nav, Modal, Button } from "react-bootstrap";
import icon from "../../assets/images/teacher-carousel-icon.png";
import "../ResponsiveCarousel/ResponsiveCarousel.css";
import { facultydata } from "../../assets/data/data";

export default function BootstrapTab() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleShowModal = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
    setShowModal(false);
  };
  return (
    <Container>
      <Tab.Container id="nav-tabs" defaultActiveKey="#nav-home">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="#nav-home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#nav-profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#nav-contact">Contact</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#nav-contact-demo">Demo</Nav.Link>
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
                      style={{ width: "auto", height: "300px" }}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <a href="#" onClick={() => handleShowModal(prof)}>
                        Know More
                      </a>
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
                      style={{ width: "auto", height: "300px" }}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <a href="#" onClick={() => handleShowModal(prof)}>
                        Know More
                      </a>
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
                      style={{ width: "auto", height: "300px" }}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <a href="#" onClick={() => handleShowModal(prof)}>
                        Know More
                      </a>
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
                      style={{ width: "auto", height: "300px" }}
                      className="img-fluid"
                    />
                    <h4>{prof.name}</h4>
                    <div className="experience">
                      <img src={icon} alt="icon" className="img-fluid icon" />
                      <p>{prof.experience}</p>
                    </div>
                    <p>
                      {prof.description} <br />
                      <a href="#" onClick={() => handleShowModal(prof)}>
                        Know More
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Modal component */}

      <Modal show={showModal} onHide={handleCloseModal} fullscreen>
        <Modal.Body className="row">
          <div className="col-md-6 ">
            <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
                <img
                  src={selectedProfile ? selectedProfile.image : ""}
                  alt={selectedProfile ? selectedProfile.name : ""}
                  style={{ width: "auto", height: "120px" }}
                  className="img-fluid"
                />
                <div>
                  <div> {selectedProfile ? selectedProfile.name : ""}</div>
                  <div style={{ padding: "30px 60px 0px 80px" }}>
                    {" "}
                    {selectedProfile ? selectedProfile.category : ""}
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <div>{selectedProfile ? selectedProfile.description1 : ""}</div>
            <div style={{ height: "10px" }}></div>
            <div>{selectedProfile ? selectedProfile.description2 : ""}</div>
            <div style={{ height: "10px" }}></div>
            <div>{selectedProfile ? selectedProfile.description3 : ""}</div>
            <div style={{ height: "10px" }}></div>
            <div>{selectedProfile ? selectedProfile.description4 : ""}</div>
            <div style={{ height: "10px" }}></div>
            <Button variant="primary" className="mt-3 mx-lg-0 mx-auto">
              Enroll Now
            </Button>
          </div>
          <div
            className="col-md-6"
            style={{ padding: "30px", backgroundColor: "#D9EAFA" }}
          >
            <iframe
              title={selectedProfile ? selectedProfile.name + "'s Video" : ""}
              style={{ borderRadius: "30px" }}
              allow="autoplay"
              width="100%"
              height="100%"
              src={selectedProfile ? selectedProfile.video : ""}
            />
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Container>
  );
}
