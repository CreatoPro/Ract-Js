import React from "react";
import { useParams } from "react-router-dom";
import { facultydata } from "../../assets/data/data";
import { Container, Row, Col, Image } from "react-bootstrap";

const ProfilePage1 = () => {
  const { url } = useParams();
  const facultyMember = facultydata[0].prof1.find(
    (member) => member.url === url
  );
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="text-center d-flex flex-column flex-md-row align-items-center">
          <Image
            src={facultyMember.image}
            rounded
            fluid
            style={{ height: "320px", width: "400px" }}
          />
          <div className="d-flex flex-column justify-content-center">
            <h3>{facultyMember.name}</h3>
            <p>{facultyMember.description1}</p>
            <p>{facultyMember.description2}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage1;
