"use client";
import { Form, Button } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../public/css/account-details.css";
import Link from "next/link";

import Image from "next/image";

const tabs = [
  { id: 1, title: "Tab 1", content: "Content of Tab 1" },
  { id: 2, title: "Tab 2", content: "Content of Tab 2" },
  { id: 3, title: "Tab 3", content: "Content of Tab 3" },
  { id: 4, title: "Tab 4", content: "Content of Tab 4" },
  { id: 5, title: "Tab 5", content: "Content of Tab 5" },
  { id: 6, title: "Tab 6", content: "Content of Tab 6" },
];

const AccoutDetails = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs container-xxl vertical-tabs mt-5">
      <div className="row">
        <ul className="tabs-nav col-md-3">
          <li
            key={tabs[0].id}
            className={activeTab === tabs[0].id ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "10px" }}
            >
              <g clip-path="url(#clip0_125_1458)">
                <path d="M18.0242 18.75C17.6342 18.75 17.3278 18.4848 17.2999 18.1136C16.9657 14.5606 13.8181 11.7765 10.002 11.7765C6.18593 11.7765 3.06622 14.5606 2.70411 18.1136C2.67626 18.4848 2.36986 18.75 1.9799 18.75C1.56207 18.75 1.19997 18.4053 1.25569 18.0076C1.64564 13.7386 5.43387 10.3977 10.002 10.3977C14.5702 10.3977 18.3584 13.7386 18.7484 18.0076C18.7762 18.4053 18.442 18.75 18.0242 18.75Z" />
                <path d="M10.0021 9.6288C7.5787 9.6288 5.60103 7.74623 5.60103 5.43941C5.60103 3.13259 7.5787 1.25 10.0021 1.25C12.4254 1.25 14.4031 3.13257 14.4031 5.43939C14.4031 7.74621 12.4254 9.6288 10.0021 9.6288ZM10.0021 2.65531C8.38649 2.65531 7.07733 3.90151 7.07733 5.43939C7.07733 6.97727 8.38649 8.22347 10.0021 8.22347C11.6176 8.22347 12.9268 6.97727 12.9268 5.43939C12.9268 3.90151 11.6176 2.65531 10.0021 2.65531Z" />
              </g>
              <defs>
                <clipPath id="clip0_125_1458">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button onClick={() => handleClick(tabs[0].id)}>
              Personal Details
            </button>
          </li>
          <li
            key={tabs[1].id}
            className={activeTab === tabs[1].id ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "10px" }}
            >
              <g clip-path="url(#clip0_124_551)">
                <path d="M13.8026 19.0061H2.09921C1.27297 19.0061 0.600586 18.3339 0.600586 17.5077V5.80428C0.600586 4.97804 1.27297 4.30566 2.09921 4.30566H13.8026C14.6289 4.30566 15.301 4.97804 15.301 5.80428V17.5077C15.301 18.3339 14.6289 19.0061 13.8026 19.0061ZM2.09921 5.26492C1.80179 5.26492 1.55985 5.50684 1.55985 5.80428V17.5077C1.55985 17.8049 1.80177 18.0468 2.09921 18.0468H13.8026C14.0998 18.0468 14.3417 17.8049 14.3417 17.5077V5.80428C14.3417 5.50686 14.0998 5.26492 13.8026 5.26492H2.09921Z" />
                <path d="M17.9017 15.6958H14.8223V14.7365H17.9017C18.1992 14.7365 18.4413 14.4943 18.4413 14.1969V2.49396C18.4413 2.19654 18.1992 1.95438 17.9017 1.95438H6.19855C5.90113 1.95438 5.65897 2.19654 5.65897 2.49396V4.78416H4.69971V2.49396C4.69971 1.66748 5.37209 0.995117 6.19855 0.995117H17.9017C18.7282 0.995117 19.4006 1.6675 19.4006 2.49396V14.1969C19.4006 15.0234 18.7282 15.6958 17.9017 15.6958Z" />
                <path d="M12.7296 8.04004H3.17261V8.9993H12.7296V8.04004Z" />
                <path d="M12.7296 10.1309H3.17261V11.0901H12.7296V10.1309Z" />
                <path d="M12.7296 12.2227H3.17261V13.1819H12.7296V12.2227Z" />
                <path d="M8.39071 14.3135H3.17261V15.2727H8.39071V14.3135Z" />
              </g>
              <defs>
                <clipPath id="clip0_124_551">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button onClick={() => handleClick(tabs[1].id)}>
              Order Details
            </button>
          </li>
          <li
            key={tabs[2].id}
            className={activeTab === tabs[2].id ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "10px" }}
            >
              <g clip-path="url(#clip0_124_546)">
                <path d="M15.178 12.0446H13.474L12.948 13.0966H14.55L17.4 18.3486H2.60198L5.44798 13.0966H7.978L9.99998 17.1386L12.546 12.0446L14.572 7.99661C15.37 6.40059 15.284 4.54061 14.348 3.02261C13.41 1.50459 11.786 0.600586 9.99998 0.600586C8.216 0.600586 6.59198 1.50459 5.65398 3.02261C4.71398 4.54061 4.63198 6.40059 5.42998 7.99661L7.45198 12.0446H4.822L0.833984 19.4006H19.168L15.178 12.0446ZM6.372 7.52461C5.738 6.25858 5.80398 4.78261 6.54798 3.57861C7.29199 2.37061 8.584 1.65259 9.99998 1.65259C11.418 1.65259 12.71 2.37061 13.454 3.57861C14.198 4.78261 14.264 6.25858 13.63 7.52461L11.37 12.0446L10.844 13.0966L9.99998 14.7866L9.15598 13.0966L8.628 12.0446L6.372 7.52461Z" />
                <path d="M9.99962 2.94238C8.50268 2.94238 7.28198 4.1631 7.28198 5.66266C7.28198 7.15962 8.5027 8.38034 9.99962 8.38034C11.4992 8.38034 12.7199 7.15962 12.7199 5.66266C12.7199 4.1631 11.4992 2.94238 9.99962 2.94238ZM9.99962 7.32802C9.08146 7.32802 8.33432 6.58084 8.33432 5.66268C8.33432 4.74188 9.08146 3.99474 9.99962 3.99474C10.9204 3.99474 11.6676 4.74188 11.6676 5.66268C11.6676 6.58084 10.9204 7.32802 9.99962 7.32802Z" />
              </g>
              <defs>
                <clipPath id="clip0_124_546">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button onClick={() => handleClick(tabs[2].id)}>
              Manage Address
            </button>
          </li>
          <li
            key={tabs[3].id}
            className={activeTab === tabs[3].id ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "10px" }}
            >
              <g clip-path="url(#clip0_124_531)">
                <path d="M1.28679 3.74902H11.2196V5.12094H1.28679C0.90721 5.12094 0.60083 4.81452 0.60083 4.43498C0.60083 4.05772 0.90721 3.74902 1.28679 3.74902Z" />
                <path d="M19.4004 4.43498C19.4004 4.81452 19.0917 5.12094 18.7144 5.12094H14.5986V3.74902H18.7144C19.0917 3.74902 19.4004 4.05772 19.4004 4.43498Z" />
                <path d="M13.8582 2.56836H12.8751C12.7187 2.56836 12.5918 2.69521 12.5918 2.8517V6.01972C12.5918 6.1762 12.7187 6.30306 12.8751 6.30306H13.8582C14.0147 6.30306 14.1416 6.1762 14.1416 6.01972V2.8517C14.1416 2.69521 14.0147 2.56836 13.8582 2.56836Z" />
                <path d="M1.28679 9.31543H3.57333V10.6873H1.28679C0.90721 10.6873 0.60083 10.3787 0.60083 10.0014C0.60083 9.62179 0.90721 9.31543 1.28679 9.31543Z" />
                <path d="M19.4003 10.0014C19.4003 10.3787 19.0916 10.6873 18.7144 10.6873H6.72144V9.31543H18.7144C19.0916 9.31543 19.4003 9.62179 19.4003 10.0014Z" />
                <path d="M4.83871 8.13184H3.85561C3.69912 8.13184 3.57227 8.25869 3.57227 8.41518V11.5832C3.57227 11.7397 3.69912 11.8665 3.85561 11.8665H4.83871C4.99519 11.8665 5.12205 11.7397 5.12205 11.5832V8.41518C5.12205 8.25869 4.99519 8.13184 4.83871 8.13184Z" />
                <path d="M1.28679 14.8779H8.31107V16.2499H1.28679C0.90721 16.2499 0.60083 15.9434 0.60083 15.5639C0.60083 15.1844 0.90721 14.8779 1.28679 14.8779Z" />
                <path d="M19.4012 15.5639C19.4012 15.9434 19.0925 16.2499 18.7152 16.2499H11.6909V14.8779H18.7152C19.0925 14.8779 19.4012 15.1843 19.4012 15.5639Z" />
                <path d="M10.4915 13.6963H9.50844C9.35195 13.6963 9.2251 13.8231 9.2251 13.9796V17.1476C9.2251 17.3041 9.35195 17.431 9.50844 17.431H10.4915C10.648 17.431 10.7749 17.3041 10.7749 17.1476V13.9796C10.7749 13.8231 10.648 13.6963 10.4915 13.6963Z" />
              </g>
              <defs>
                <clipPath id="clip0_124_531">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button onClick={() => handleClick(tabs[3].id)}>Settings</button>
          </li>
          <li
            key={tabs[4].id}
            className={activeTab === tabs[4].id ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "10px" }}
            >
              <g clip-path="url(#clip0_124_527)">
                <path d="M16.8718 9.53115H16.7423C16.6403 9.53115 16.5403 9.54487 16.4461 9.57431V9.38205C16.4461 5.82725 13.5544 2.93555 9.99961 2.93555C6.44481 2.93555 3.55313 5.82725 3.55313 9.38205V9.57431C3.45897 9.54487 3.35891 9.53115 3.25689 9.53115H3.12743C1.73453 9.53115 0.600586 10.6651 0.600586 12.0579C0.600586 13.4528 1.73451 14.5867 3.12743 14.5867H4.33785V9.38205C4.33785 6.25885 6.87837 3.72029 9.99961 3.72029C13.1228 3.72029 15.6614 6.25885 15.6614 9.38205V13.7235C15.6614 14.8241 14.7648 15.7206 13.6643 15.7206H10.3076C10.1565 15.391 9.82499 15.1615 9.44049 15.1615H7.34723C6.82341 15.1615 6.39575 15.5892 6.39575 16.113C6.39575 16.6388 6.82341 17.0644 7.34723 17.0644H9.44049C9.82499 17.0644 10.1565 16.8349 10.3076 16.5054H13.6643C14.8963 16.5054 15.9439 15.699 16.3088 14.5867H16.8718C18.2647 14.5867 19.4006 13.4528 19.4006 12.0579C19.4006 10.665 18.2647 9.53115 16.8718 9.53115ZM3.55313 13.802H3.12743C2.16611 13.802 1.38533 13.0212 1.38533 12.058C1.38533 11.0967 2.16613 10.3159 3.12743 10.3159H3.25689C3.41973 10.3159 3.55313 10.4473 3.55313 10.6121V13.802ZM9.44051 16.2797H7.34725C7.25505 16.2797 7.18051 16.2052 7.18051 16.113C7.18051 16.0208 7.25505 15.9462 7.34725 15.9462H9.44051C9.53271 15.9462 9.60725 16.0208 9.60725 16.113C9.60725 16.2053 9.53271 16.2797 9.44051 16.2797ZM16.8718 13.802H16.4461V10.6121C16.4461 10.4473 16.5795 10.3159 16.7423 10.3159H16.8718C17.8331 10.3159 18.6159 11.0967 18.6159 12.0579C18.6159 13.0212 17.8331 13.802 16.8718 13.802Z" />
                <path d="M9.37037 11.2039L9.34673 9.81153L9.85805 9.78009C10.1571 9.76955 10.4036 9.68439 10.5977 9.52423C10.7916 9.36447 10.8887 9.13751 10.8887 8.84377C10.8887 8.58167 10.7983 8.36663 10.6172 8.19865C10.4364 8.03087 10.2016 7.94689 9.91313 7.94689C9.70863 7.94689 9.53031 7.99689 9.37817 8.09649C9.22603 8.19609 9.12113 8.31935 9.06353 8.46621L8.25317 8.23007C8.35805 7.90507 8.55609 7.64277 8.84711 7.44335C9.13833 7.24413 9.49359 7.14453 9.91313 7.14453C10.2698 7.14453 10.5858 7.21661 10.8612 7.36093C11.1366 7.50507 11.3528 7.70449 11.5102 7.95879C11.6676 8.21329 11.7461 8.50821 11.7461 8.84375C11.7461 9.12695 11.6832 9.38145 11.5575 9.60683C11.4315 9.83241 11.2545 10.0135 11.0264 10.1498C10.7983 10.2861 10.5346 10.3701 10.2358 10.4016L10.22 11.2039L9.37037 11.2039ZM9.79517 12.8561C9.63795 12.8561 9.50533 12.8022 9.39791 12.6947C9.29029 12.5873 9.23659 12.4574 9.23659 12.3053C9.23659 12.1481 9.29031 12.0156 9.39791 11.908C9.50533 11.8006 9.63795 11.7467 9.79517 11.7467C9.94731 11.7467 10.077 11.8006 10.1846 11.908C10.2921 12.0156 10.346 12.1481 10.346 12.3053C10.346 12.4574 10.2921 12.5873 10.1846 12.6947C10.077 12.8022 9.94733 12.8561 9.79517 12.8561Z" />
              </g>
              <defs>
                <clipPath id="clip0_124_527">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button onClick={() => handleClick(tabs[4].id)}>
              Help & Support
            </button>
          </li>
        </ul>
        <div className="tabs-content col-md-9">
          <div
            key={tabs[0].id}
            className={activeTab === tabs[0].id ? "active" : "hidden"}
          >
            <div className="personal-details">
              <h2>Personal Details</h2>
              <Form
                className="row"
                style={{
                  padding: "30px 0px",
                }}
              >
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" style={{ height: "50px" }} />
                </Form.Group>
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Parents Name</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="number" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control type="number" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Alternate Mobile No.</Form.Label>
                  <Form.Control type="number" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Email
                    <div
                      style={{
                        display: "flex",
                        width: "130px",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <a style={{ color: "#4385F5" }}>Verify</a>
                      <a style={{ color: "#3AB446" }}>Verified</a>
                    </div>
                  </Form.Label>
                  <Form.Control type="email" style={{ height: "50px" }} />
                </Form.Group>
              </Form>
            </div>
            <div className="personal-details">
              <h2>Additional Details</h2>
              <Form
                className="row"
                style={{
                  padding: "30px 0px",
                }}
              >
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Country of Study</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Medical Collage</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Year of Study</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Stream</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>{" "}
                <Form.Group
                  style={{ marginBottom: "20px" }}
                  className=" col-md-6"
                  controlId=""
                >
                  <Form.Label>Batch</Form.Label>
                  <Form.Control type="text" style={{ height: "50px" }} />
                </Form.Group>{" "}
              </Form>
            </div>
          </div>
          <div
            key={tabs[1].id}
            className={activeTab === tabs[1].id ? "active" : "hidden"}
          >
            <div className="order-details">
              <h2>Order Details</h2>
              <div className="outer-box" style={{ marginTop: "30px" }}>
                <div>
                  <div className="blue-box"></div>
                </div>
                <div className="name-box row">
                  <div className="col-md-12 d-flex">
                    <div className="name col-md-6">
                      CONQUER NEET PG 2024 CONQUER NEET PG 2024
                    </div>
                    <div className="price col-md-3 d-flex justify-content-center">
                      ₹11,474
                    </div>
                    <div className="button col-md-3 ">
                      <button>Renew Plan</button>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex ">
                    <div
                      className="col-md-4 d-flex"
                      style={{ paddingLeft: "30px" }}
                    >
                      <Image height={24} width={24} src="/images/bag.png" />
                      <div className="name"> Purchase on: 24/02/24</div>
                    </div>
                  </div>
                </div>
                <div> </div>
              </div>
            </div>
          </div>
          <div
            key={tabs[2].id}
            className={activeTab === tabs[2].id ? "active" : "hidden"}
          >
            <div className="manage-address">
              <h2>Manage Address</h2>
            </div>
          </div>
          <div
            key={tabs[3].id}
            className={activeTab === tabs[3].id ? "active" : "hidden"}
          >
            <div className="settings">
              <h2 style={{ display: "flex", justifyContent: "space-between" }}>
                Settings <a>Edit</a>
              </h2>
              <div className="button-box">
                <Button className="logout">Logout of all devices</Button>
                <Button className="delete">Delete Account</Button>
              </div>
            </div>
          </div>
          <div
            key={tabs[4].id}
            className={activeTab === tabs[4].id ? "active" : "hidden"}
          >
            <div className="help-support">
              <h2>Help & Support</h2>

              <div>
                <ul>
                  <li>
                    <Link
                      href={{
                        pathname: "/vertical-tabs",
                        query: { id: "1" },
                      }}
                    >
                      {" "}
                      Account Basics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/vertical-tabs",
                        query: { id: "2" },
                      }}
                    >
                      {" "}
                      Orders & Payments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/vertical-tabs",
                        query: { id: "3" },
                      }}
                    >
                      {" "}
                      Course & Enrolments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/vertical-tabs",
                        query: { id: "4" },
                      }}
                    >
                      {" "}
                      Live Class
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccoutDetails;
