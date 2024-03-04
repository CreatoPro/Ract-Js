"use client";

import { Container, Form, Button } from "react-bootstrap";
import "../../../../public/css/detailsform.css";

export default function DetailsForm() {
  return (
    <div className="details-form">
      <Container>
        <div className="header">
          <h1>Fill in your personal details</h1>
          <p>
            This will help us provide you a personalized learning experience
          </p>
        </div>
        <Form
          className="row"
          style={{
            maxWidth: "1000px",
            margin: "auto",
            marginTop: "50px",
            justifyContent: "end",
          }}
        >
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Full Name <span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              style={{ height: "50px" }}
              placeholder="Full Name"
            />
          </Form.Group>

          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Country Of Study<span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Select style={{ height: "50px" }}>
              placeholder={<div>Type to search</div>}
              <option aria-required>Country Of Study</option>
              <option value="das">India</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Medical College<span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Select style={{ height: "50px" }}>
              <option>Select Medical College</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Year of Study<span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Select style={{ height: "50px" }}>
              <option>Year of Study</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Select Stream<span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Select style={{ height: "50px" }}>
              <option> Select Stream</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Select Course(for 7 days trail)
              <span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Select style={{ height: "50px" }}>
              <option>Select Course</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Select Batch<span style={{ color: "red" }}>*</span>{" "}
            </Form.Label>
            <Form.Select style={{ height: "50px" }}>
              <option>Select Batch</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            style={{ marginBottom: "32px" }}
            className=" col-md-6"
            controlId=""
          >
            <Form.Label style={{ fontSize: "16px", fontWeight: "400" }}>
              Referral Code v(Optional)
            </Form.Label>
            <Form.Control
              type="text"
              style={{ height: "50px" }}
              placeholder="Enter Referral Code"
            />
          </Form.Group>
          <Button
            style={{
              display: "flex",
              padding: "15px 15px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              color: "black",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
              borderRadius: "10px",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            type="submit"
            className="col-lg-2 col-md-4 col-4"
          >
            Cancel
          </Button>
          <Button
            style={{
              display: "flex",
              padding: "15px 15px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              color: "#FFF",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
              borderRadius: "10px",
              marginRight: "12px",
              backgroundColor: "#4385F5",
            }}
            type="submit"
            className=" col-lg-2 col-md-4 col-6"
          >
            Login/Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}
