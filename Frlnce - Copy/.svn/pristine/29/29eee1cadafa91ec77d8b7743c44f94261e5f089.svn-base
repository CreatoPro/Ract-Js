import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import ApiService from "../../_services/ApiService";
import "./discipline.styles.css";

class Discipline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discipline: {},
      renderingData: [],
      onScreen: "courses",
      courseIndex: 0,
      showNoData: false,
    };
  }

  componentDidMount() {
    ApiService.discipline()
    .then(
      (res) =>{
        this.setState({ discipline: res.data }, () => {
          this.setState({
            renderingData: this.state.discipline?.courses || []
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
        renderingData: this.state.discipline.courses[index].disciplineDetails,
        onScreen: "discipline",
        courseIndex: index,
      });
    }
  };

  checkData = () => {
    if (this.state.onScreen === "courses") {
      if (this.state.renderingData.length === 1) {
        this.displayNextStep(0);
      }
    }
  };

  componentDidUpdate() {
    this.checkData();
  }

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
                <h4>Discipline</h4>
              ) : (
                <h4>
                  {
                    this.state.discipline.courses[this.state.courseIndex]
                      .courseName
                  }
                </h4>
              )}
            </div>
          </div>
          {(!this.state.discipline.courses && this.state.showNoData) || this.state.renderingData.length === 0 ? (
            <h1 className="no-record">
              <span className="blue-no-record">Yayyy!
              </span> All clear! No discipline issues!
            </h1>
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
                      <FontAwesomeIcon icon={faArrowRight} />
                    </>
                  ) : (
                    <div>
                      {data.attachmentUrl !== "" ? (
                        <a href={data.attachmentUrl}>
                          <FontAwesomeIcon
                            icon={faDownload}
                            onClick={this.props.history.goBack}
                          />
                        </a>
                      ) : null}
                      <h4>{data.reportedBy}</h4>
                      <div className="descipline-content">
                        <div>
                          <p>
                            <span className="decipline-topic">
                              Staff Comment:{" "}
                            </span>{" "}
                            <span> {data.staffComments}</span>
                          </p>

                          <p>
                            <span className="decipline-topic">
                              Violation Place:{" "}
                            </span>{" "}
                            <span>{data.violationPlace}</span>
                          </p>
                          <p>
                            <span className="decipline-topic">
                              Approved By:{" "}
                            </span>{" "}
                            <span>{data.approvedBy}</span>
                          </p>
                          <p>
                            <span className="decipline-topic">
                              Supporting Evidence:{" "}
                            </span>{" "}
                            <span>{data.supportingEvidence}</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="decipline-topic">
                              Violation Names:
                            </span>{" "}
                            <span>
                              {" "}
                              {data.violationNames.map(
                                (name, index) =>
                                  `${index !== 0 ? ", " : ""}${name}`
                              )}
                            </span>
                          </p>
                          <p>
                            <span className="decipline-topic">
                              Action Names:
                            </span>{" "}
                            <span>
                              {" "}
                              {data.actionNames.map(
                                (name, index) =>
                                  `${index !== 0 ? ", " : ""}${name}`
                              )}
                            </span>
                          </p>
                          <p>
                            <span className="decipline-topic">
                              Severity Name:
                            </span>{" "}
                            <span> {data.severityName}</span>
                          </p>
                          <p>
                            <span className="decipline-topic">Date:</span>{" "}
                            <span> {data.date}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

export default Discipline;
