import React from "react";
import { useParams } from "react-router-dom";
import { facultydata } from "../../assets/data/data";
import { Container, Row, Col, Image } from "react-bootstrap";

const ProfilePage1 = () => {
  const { id } = useParams();

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="text-center d-flex flex-column flex-md-row align-items-center">
          <Image
            src={facultydata[0].prof4[id - 1].image}
            rounded
            fluid
            style={{ height: "320px", width: "400px" }}
          />
          <div className="d-flex flex-column justify-content-center">
            <h3>{facultydata[0].prof4[id - 1].name}</h3>
            <p>{facultydata[0].prof4[id - 1].description1}</p>
            <p>{facultydata[0].prof4[id - 1].description2}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage1;
