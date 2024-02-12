import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import ApiService from "../../_services/ApiService";
import ModalBox from "./component/modal-box.component";
import "./convocation.styles.css";

class Convocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      convocationData: {},
      showNoData: false,
      courseIndex: 0,
      onScreen: "courses",
      attestattionType: 1,
      message: null,
      showModal: false,
      remarks: "",
      header: null,
      modalType: null,
      noOfGuests: 1,
    };
  }
  componentDidMount() {
    // this.setState({ convocationData: testData });
    ApiService.convocationDetails()
      .then((res) => {
        console.log(res);
        this.setState({ convocationData: res.data }, () => {
          console.log(this.state.convocationData);
        });
      })
      .catch((err) =>
        this.setState({
          showNoData: true,
        })
      );
  }

  displayNextStep = (index) => {
    this.setState({ courseIndex: index, onScreen: "convocation" });
  };

  componentDidUpdate() {
    if (
      this.state.convocationData.convocations.length === 1 &&
      this.state.onScreen === "courses"
    ) {
      this.displayNextStep(0);
    }
  }

  attestationRemark = () => {
    const data = {
      enrollmentId:
        this.state.convocationData.convocations[this.state.courseIndex]
          .enrollmentId,
      convocationId:
        this.state.convocationData.convocations[this.state.courseIndex]
          .convocationId,
      attestationType: this.state.attestattionType,
      remarks: this.state.remarks,
    };
    console.log(data);
    this.closeModal();

    ApiService.submitConvocationDetails(data)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          if (res.data.message === "error") {
            this.submitError();
          } else {
            this.submitSuccess();
          }
        } else {
          this.submitSuccess();
        }
      })
      .catch((err) => {
        this.submitError();
      });
  };

  submitStudentRegistration = () => {
    let data = {
      enrollmentId:
        this.state.convocationData.convocations[this.state.courseIndex]
          .enrollmentId,
      convocationId:
        this.state.convocationData.convocations[this.state.courseIndex]
          .convocationId,
      numberOfGuests: this.state.noOfGuests,
    };
    console.log(data);
    this.closeModal();

    ApiService.convocationStudentRegistration(data)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          if (res.data.message === "error") {
            this.submitError();
          } else {
            this.submitSuccess();
          }
        } else {
          this.submitSuccess();
        }
      })
      .catch((err) => {
        this.submitError();
      });
  };

  submitModal = () => {
    // console.log("here----")
    if (this.state.modalType === "correctAttestation") {
      this.attestationRemark();
    } else if (this.state.modalType === "success") {
      window.location.reload();
    } else if (this.state.modalType === "rejectAttestation") {
      this.attestationRemark();
    } else if (this.state.modalType === "registration") {
      this.submitStudentRegistration();
    }
  };

  submitSuccess = () => {
    this.setState({
      showModal: true,
      message: "Data saved successfully",
      modalType: "success",
    });
  };

  submitError = () => {
    this.setState({
      showModal: true,
      message: "An error occurred while saving data",
      modalType: "error",
    });
  };

  correctDetails = () => {
    this.setState({
      showModal: true,
      message: "I here by declare that the above information is correct",
      header: "Self Attestation",
      modalType: "correctAttestation",
    });
  };

  reportDetails = () => {
    this.setState({
      showModal: true,
      header: "Reason For Rejection",
      modalType: "rejectAttestation",
      attestattionType: 2,
    });
  };

  submitGuest = () => {
    console.log("here");
    this.setState({
      showModal: true,
      header: "Register No Of Guest",
      modalType: "registration",
    });
  };

  modalInput = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    this.setState({ [name]: value }, () =>
      console.log(this.state.remarks, this.state.noOfGuests)
    );
  };

  closeModal = () => {
    this.setState({
      attestattionType: 1,
      message: null,
      showModal: false,
      remarks: "",
      header: null,
      modalType: null,
      noOfGuests: 1,
    });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <div className="module-header">
            <div
              className={`module-header-inner ${
                this.props.location.state
                  ? this.props.location.state.portlet.class
                  : "orange-card"
              }`}
            >
              <div className="back">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={this.props.history.goBack}
                />
              </div>
              <img src="" alt={this.props.match.params.type} />
            </div>
            <div className="arrow-set">
              {this.state.onScreen === "courses" ? (
                <h4>Convocation</h4>
              ) : (
                <h4>
                  {
                    this.state.convocationData.convocations[
                      this.state.courseIndex
                    ].courseName
                  }
                </h4>
              )}
            </div>
          </div>
          {(!this.state.convocationData.convocations &&
            this.state.showNoData) ||
          this.state.convocationData.convocations?.length === 0 ? (
            <h1 className="no-record">No records found</h1>
          ) : null}
          {this.state.convocationData.convocations &&
            this.state.onScreen === "courses" &&
            this.state.convocationData.convocations.map((data, index) => (
              <Card
                key={index}
                onClick={() => {
                  this.displayNextStep(index);
                }}
              >
                <Card.Body>
                  <div className="cardbody">
                    <h4 className="course-details">{data.courseName}</h4>
                    {/* <h4 className="course-details">{`${data.enrollmentStatusName} [${data.yearName}]`}</h4> */}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </Card.Body>
              </Card>
            ))}

          {this.state.onScreen === "convocation" && (
            <div className="convocation-area">
              <div className="convocation-data-row-1">
                <img
                  src={this.state.convocationData.photoPath}
                  alt="profile-pic"
                />
                <div className="convocation-topics">
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">Name:</div>
                    <div className="convocation-topic-value">
                      {this.state.convocationData.studentName}
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">Student code:</div>
                    <div className="convocation-topic-value">
                      {
                        this.state.convocationData.convocations[
                          this.state.courseIndex
                        ].studentcode
                      }
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">
                      Date of Birth(dd/mm/yy):
                    </div>
                    <div className="convocation-topic-value">
                      {this.state.convocationData.dateOfBirth}
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">Gender:</div>
                    <div className="convocation-topic-value">
                      {this.state.convocationData.gender}
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">Aadhar Number:</div>
                    <div className="convocation-topic-value">
                      {this.state.convocationData.aadharNumber}
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">Email:</div>
                    <div className="convocation-topic-value">
                      {this.state.convocationData.email}
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">Mobile:</div>
                    <div className="convocation-topic-value">
                      {this.state.convocationData.mobile}
                    </div>
                  </div>
                  <div className="convocation-topic-box">
                    <div className="convocation-topic">School Name:</div>
                    <div className="convocation-topic-value">
                      {
                        this.state.convocationData.convocations[
                          this.state.courseIndex
                        ].schoolName
                      }
                    </div>
                  </div>
                </div>
              </div>
              {this.state.convocationData.convocations[this.state.courseIndex]
                .attestationType === 1 ? (
                <h5>
                  You <span className="text-success">Attested</span> these
                  details on{" "}
                  <span className="font-weight-bold">
                    {
                      this.state.convocationData.convocations[
                        this.state.courseIndex
                      ].studentAttestationDate
                    }
                  </span>
                </h5>
              ) : this.state.convocationData.convocations[
                  this.state.courseIndex
                ].attestationType === 2 ? (
                <div>
                  <h5>
                    You Reported a <span className="text-danger">PROBLEM</span>{" "}
                    on{" "}
                    <span className="font-weight-bold">
                      {
                        this.state.convocationData.convocations[
                          this.state.courseIndex
                        ].rejectedDate
                      }
                    </span>
                  </h5>
                  <h5>
                    Reason:{" "}
                    {
                      this.state.convocationData.convocations[
                        this.state.courseIndex
                      ].attestationRejectRemarks
                    }
                  </h5>
                </div>
              ) : (
                <div className="convocation-button-box">
                  <button
                    onClick={this.correctDetails}
                    className="btn btn-success convocation-btn"
                  >
                    I attest that these details are correct
                  </button>
                  <button
                    onClick={this.reportDetails}
                    className="btn btn-danger convocation-btn"
                  >
                    Report a problem in these details
                  </button>
                  {!this.state.convocationData.convocations[
                    this.state.courseIndex
                  ].registrationStatus && (
                    <button
                      onClick={this.submitGuest}
                      className="btn btn-success convocation-btn"
                    >
                      Register for Convocations
                    </button>
                  )}
                </div>
              )}
              {this.state.convocationData.convocations[this.state.courseIndex]
                .registrationStatus &&
                this.state.convocationData.convocations[this.state.courseIndex]
                  .attestationType === 0 && (
                  <div>
                    <h5>
                      *Registered for convocation and no of guests:{" "}
                      {
                        this.state.convocationData.convocations[
                          this.state.courseIndex
                        ].numberOfGuests
                      }{" "}
                      -{" "}
                      <button className="btn btn-success">
                        Print convocation Receipt
                      </button>
                    </h5>
                  </div>
                )}
            </div>
          )}

          <ModalBox
            showModal={this.state.showModal}
            header={this.state.header}
            message={this.state.message}
            value={
              this.state.modalType === "registration"
                ? this.state.noOfGuests
                : this.state.remarks
            }
            name={
              this.state.modalType === "registration" ? "noOfGuests" : "remarks"
            }
            handleClose={this.closeModal}
            handleSubmit={this.submitModal}
            modalType={this.state.modalType}
            handleChange={this.modalInput}
          />
        </Container>
      </div>
    );
  }
}

export default Convocation;
