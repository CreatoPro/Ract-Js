import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./AchieversSection.css";

export default function AchieversSection() {
  return (
    <Container fluid className="achievers-section">
      <Container>
        <Row className="flex-md-row  flex-column">
          <Col
            xl={6}
            className="d-flex flex-column justify-content-xl-end justify-content-center text-center text-xl-left pb-xl-0 pb-md-4 pb-sm-2"
          >
            <h2>Not Dreamers, But Achievers</h2>
            <h3>Meet Our Top Scorers in NEET PG | INI-CET | FMGE</h3>
          </Col>
          <Col xl={6}>
            <Row>
              {/* Item 1 */}
              <Col md={4} sm={6} className="pt-md-0 pt-4">
                <Row className="d-flex flex-column ">
                  <Col className="student-img">
                    <Image
                      src={require("../../assets/images/demo-student-img.png")}
                      className="img-fluid"
                    />
                  </Col>
                  <Col>
                    <Row className="flex-column details-box ">
                      <Col className="rank">Rank 1</Col>
                      <Col className="name ">Ketan Suman</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              {/* Item 2 */}
              <Col md={4} sm={6} className="pt-md-0 pt-4">
                <Row className="d-flex flex-column ">
                  <Col className="student-img">
                    <Image
                      src={require("../../assets/images/demo-student-img.png")}
                      className="img-fluid"
                    />
                  </Col>
                  <Col>
                    <Row className="flex-column details-box ">
                      <Col className="rank">Rank 1</Col>
                      <Col className="name ">Ketan Suman</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              {/* Item 3 */}
              <Col md={4} sm={6} className="pt-md-0 pt-4">
                <Row className="d-flex flex-column ">
                  <Col className="student-img">
                    <Image
                      src={require("../../assets/images/demo-student-img.png")}
                      className="img-fluid"
                    />
                  </Col>
                  <Col>
                    <Row className="flex-column details-box ">
                      <Col className="rank">Rank 1</Col>
                      <Col className="name ">Ketan Suman</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
