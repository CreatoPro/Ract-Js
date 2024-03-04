"use client";

import { useState } from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
// import icon from "../../../images/vector.png";
import Image from "next/image";
import "../../../../public/css/modalbutton.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ModalButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [phone, setPhone] = useState("");
  const handleOnChange = (value, country) => {
    setPhone(value);
  };

  return (
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <Button variant="primary" onClick={handleShow}>
          Open Modal
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <Row>
            <Col md={6} style={{ display: "flex", flexDirection: "column" }}>
              <a href="#" onClick={handleClose}>
                <Image
                  src="/images/close.png"
                  width={24}
                  height={24}
                  alt="close"
                  style={{ marginBottom: "30px" }}
                />
              </a>
              <div style={{ marginBottom: "50px" }}>
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "500",
                  }}
                >
                  Secure your Dream with Dedicated Mentorship by
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#4385F5",
                    }}
                  >
                    {" "}
                    India's Top Specialists
                  </span>
                </h2>
                <p style={{ color: "18px", fontWeight: "600" }}>
                  Trusted by 1 Lakh+ Winners & Rankers!
                </p>
              </div>
              <Image
                src="/images/vector.png"
                width={325}
                height={300}
                alt="vector"
                style={{ marginBottom: "-30px", marginTop: "50px" }}
                className="bottom-img"
              />
            </Col>
            <Col md={6}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  boxShadow: "0px 0px 10px 8px rgba(67, 133, 245, 0.10)",
                  borderRadius: "15px",
                  height: "100%",
                }}
              >
                <div style={{ marginBottom: "30px" }}>
                  <h2 style={{ fontWeight: "700", fontSize: "36px" }}>Login</h2>
                  <p
                    style={{
                      color: "#4F4F55",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    Enter your phone number to proceed
                  </p>
                </div>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(value, country) => handleOnChange(value, country)}
                  containerStyle={{ marginBottom: "20px" }}
                  inputStyle={{ fontSize: "" }}
                />
                <Button variant="primary" style={{ width: "100%" }}>
                  Join For Free
                </Button>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "15px",
                    marginBottom: "30px",
                  }}
                >
                  6 Digit OTP will be sent to verify your mobile number.
                </p>
                <p style={{ fontSize: "15px", fontWeight: "600" }}>
                  Do not have an account?{" "}
                  <a
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#4385F5",
                    }}
                  >
                    {" "}
                    Create an account
                  </a>
                </p>
                <p
                  style={{
                    marginTop: "150px",
                    fontSize: "14px",
                  }}
                >
                  Having trouble? Write us on{" "}
                  <a style={{ fontWeight: "600" }}>support@allennext.com</a>
                </p>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ModalButton;
