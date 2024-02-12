import React, {  useRef, useEffect } from "react";
import { useLocation } from "react-router";
import "./admit-card.styles.css";

const ADMITCARD_DETAILS = [{ copy: null }, { copy: "OFFICE COPY" }];

const AdmitCard = () => {
  const location = useLocation();
  const { state } = location;
  const { testDetails } = state || {};

  const admitCardDetails = ADMITCARD_DETAILS;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const container = useRef(null);
  useEffect(() => {
    if (container) {
        window.print();
    }
  }, []);

  return admitCardDetails.map((admitcard, index) => (
    <div ref={container} key={index} className={`admit-card-container ${index!==0?'page-break':''}`}>
      {admitcard?.copy ? (
        <h3 className="admit-card-heading-3">{admitcard?.copy}</h3>
      ) : null}
      <div>
        <div className="admit-card-header admit-card-border">
          <img
            className="admit-card-logo"
            src="https://tuningfork-live.s3.amazonaws.com/unacademy/files/logos/logo.jpg"
            alt="logo"
          />
          <div>
            <h5 className="admit-card-heading-5">UNACADEMY</h5>
            <h5 className="admit-card-heading-5">
              ENTRANCE EXAMINATION HALL TICKET - 2022
            </h5>
          </div>
        </div>
        <div className="admit-card-body">
          <div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                HallTicket Number
              </div>
              <div className="admit-card-border admit-card-content">
                {testDetails?.AdmitCardNumber}
              </div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Name of the Candidate
              </div>
              <div className="admit-card-border admit-card-content">
                {user?.username}
              </div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Date Of Birth
              </div>
              <div className="admit-card-border admit-card-content">{}</div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Gender
              </div>
              <div className="admit-card-border admit-card-content">{}</div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Parent/ Guardian Name
              </div>
              <div className="admit-card-border admit-card-content">{}</div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Exam Center Address
              </div>
              <div className="admit-card-border admit-card-content">{testDetails.Venue}</div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Exam Date and Time
              </div>
              <div className="admit-card-border admit-card-content">{`${testDetails?.TestDate} & ${testDetails?.TestTime}`}</div>
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Mobile & Email Id
              </div>
              <div className="admit-card-border admit-card-content">{`${user?.mobileNumber} & ${user?.emailId}`}</div>
            </div>
          </div>
          <div className="admit-card-border admit-card-img-wrapper">
            <img
              className="admit-card-user-img"
              src="https://tuningfork-live.s3.amazonaws.com/nttf2/files/blankAvatar.PNG"
              alt="user img"
            />
          </div>
        </div>
        <div className="admit-card-body">
          <div>
            <div className="center-text admit-card-border admit-card-content">
              For Office Use Only
            </div>
            <div className="admit-card-details">
              <div className="admit-card-border admit-card-heading-7">
                Issuing Authority Name, Designation & Office Seal
              </div>
              <div className="admit-card-border admit-card-content"></div>
            </div>
          </div>
          <div className="admit-card-border admit-card-padd-l">
            <div className="admit-card-bold">Examiner</div>
            <div>Name:</div>
            <div>Sign:</div>
            <div>Date:</div>
          </div>
        </div>
      </div>
      <div className="admit-card-instruction">
        <span className="admit-card-bold">
          Instruction to the Candidate – For Entrance Exam
        </span>
        <ol>
          <li>
            Report to the Examination Centre at least 1 hour before the Exam
            Time.
          </li>
          <li>
            You are permitted to appear for the Entrance exam only once even if
            you are issued more than one Hall Ticket (Please show all Hall
            Tickets to Examination counter if you are issued).
          </li>
          <li>
            Use of calculator, mobile phone or any electronics gadgets are not
            allowed inside the Examination hall.
          </li>
        </ol>
      </div>
    </div>
  ));
};

export default AdmitCard;
