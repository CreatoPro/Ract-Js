import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import ApiService from "../../_services/ApiService";
import "./mentor-transcripts.styles.css";

class MentorTranscript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentees: {},
      renderingData: [],
      onScreen: "courses",
      courseIndex: 0,
      showNoData: false,
    };
  }

  componentDidMount() {
    ApiService.mentorTranscripts()
    .then(
      (res) =>{
        this.setState({ mentees: res.data }, () => {
          this.setState({
            renderingData: this.state.mentees?.courses || []
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
        renderingData: this.state.mentees.courses[index].mentorTranscripts,
        onScreen: "mentorTranscripts",
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
              <h4>Mentor Transcripts</h4>
            ) : (
              <h4>
                {this.state.mentees.courses[this.state.courseIndex].courseName}
              </h4>
            )}
            </div>
          </div>
          {!this.state.mentees.courses && this.state.showNoData ? (
            <h1 className="no-record">No mentor records found in the system</h1>
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
                      <h4>{data.instructorName}</h4>
                      <p>
                        <span className="mentor-topic">Students Comment: </span>{" "}
                        <span>{data.studentsComment}</span>
                      </p>
                      <p>
                        <span className="mentor-topic">Teacher Comment: </span>{" "}
                        <span> {data.teacherComments}</span>
                      </p>
                      <p>
                        <span className="mentor-topic">Date:</span>{" "}
                        <span> {data.raisedDate}</span>
                      </p>
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

export default MentorTranscript;
