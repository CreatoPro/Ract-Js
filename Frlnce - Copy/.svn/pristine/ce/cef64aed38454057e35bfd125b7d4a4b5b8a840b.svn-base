import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Analysis from "./images/analysis.png";
import "./dossier.styles.css";
import { ILoader } from "../../_components/iloader/iloader";
import ApiService from "../../_services/ApiService";

class Dossier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enquiryDetails: {},
      renderingData: [],
      templateIndex: 0,
      courseIndex: 0,
      onScreen: "courses",
      showLoading: true,
      showNoData:false
    };
  }

  componentDidMount() {
    ApiService.dossierSection()
    .then(
      (res) =>{
        console.log(res);
        this.setState({ enquiryDetails: res.data }, () => {
          this.setState({
            renderingData: this.state.enquiryDetails?.courses || [],
          });
        })
      }
      )
      .catch((err)=> 
        this.setState({
          showNoData: true,
        })
      )
  }

  displayNextStep = (index) => {
    if (this.state.onScreen === "courses") {
      this.setState({
        renderingData: this.state.enquiryDetails.courses[index].templates,
        onScreen: "templates",
        courseIndex: index,
      });
    }
    if (this.state.onScreen === "templates") {
      this.setState({ templateIndex: index, onScreen: "dossier" });
    }
  };

  checkData = () => {
    if (this.state.onScreen === "courses") {
      if (this.state.renderingData.length === 1) {
        this.displayNextStep(0);
      }
    }
    if (this.state.onScreen === "templates") {
      if (this.state.renderingData.length === 1) {
        console.log("callled");
        this.displayNextStep(0);
      }
    }
  };

  componentDidUpdate() {
    if (this.state.onScreen !== "dossier") {
      this.checkData();
    }
  }

  removeLoading = () => {
    this.setState({ showLoading: false });
  };

  render() {
    console.log("props--->", this.props);
    console.log("state-->", this.state.onScreen);
    // this will be used in future
    if (this.state.onScreen === "dossier") {
      console.log("here");
      return (
        <div className="content">
          <ILoader
            loadingText={"Please wait..."}
            isShow={this.state.showLoading}
          />
          <iframe
            onLoad={this.removeLoading}
            className="dossier-frame"
            src={
              this.state.enquiryDetails.courses[this.state.courseIndex]
                .templates[this.state.templateIndex].targetUrl
            }
            title="dossier"
            frameBorder="0"
            border="0"
          ></iframe>
        </div>
      );
    }

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
              <img src={Analysis} alt={this.props.match.params.type} />
            </div>
            <div className="arrow-set">
              {this.state.onScreen === "courses" ? (
                <h4>Student Dossier</h4>
              ) : (
                <>
                  <h4>
                    {
                      this.state.enquiryDetails.courses[this.state.courseIndex]
                        .courseName
                    }
                  </h4>
                  <h6>{`${
                    this.state.enquiryDetails.courses[this.state.courseIndex]
                      .enrollmentStatusName
                  } [${
                    this.state.enquiryDetails.courses[this.state.courseIndex]
                      .yearName
                  }]`}</h6>
                </>
              )}
            </div>
          </div>
          {(!this.state.enquiryDetails.courses && this.state.showNoData) || this.state.renderingData.length ===0 ? (
            <h1 className="no-record">No records found</h1>
          ) : null}
          {this.state.renderingData.map((data, index) => (
            <Card
              key={index}
              onClick={() => {
                this.displayNextStep(index);
              }}
            >
              <Card.Body>
                <div className="cardbody">
                  {this.state.onScreen === "courses" ? (
                    <>
                      <h4 className="course-details">{data.courseName}</h4>
                      <h4 className="course-details">{`${data.enrollmentStatusName} [${data.yearName}]`}</h4>
                    </>
                  ) : (
                    <h4 className="course-details">{data.templateName}</h4>
                  )}
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

export default Dossier;
