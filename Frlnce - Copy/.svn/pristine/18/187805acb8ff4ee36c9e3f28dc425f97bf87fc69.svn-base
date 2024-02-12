import React from "react";
import ApiService from "../../_services/ApiService";
import { ILoader } from "../../_components/iloader/iloader";
import {
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

class StudentFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      studentFeedbackData: {},
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let employeeId = this.props.match.params.instructorId || 0;
    let courseId = this.props.match.params.courseId || 0;
    this.setState({ showLoading: true });
    const apiData = await ApiService.getFeedbackForm(
      this.props.match.params.id,
      0,
      employeeId,
      courseId
    );

    console.log(
      "FeedbackForm -> init(); res : " +
    JSON.stringify(apiData.data.data)
    );

    this.setState({ studentFeedbackData: apiData.data }, () => {
      this.setState({ showLoading: false });
    });

   
  };

  giveFeedback(feedbackFormId, studentData, courseId) {
    let instructorId = 0
    let instructorName = ''
    let userId=studentData?.userId
    let _path = '/feedback/form/'+feedbackFormId+'/instructor/'+instructorId+'/course/'+courseId;
    let data = {'instructorName': instructorName, 'userId': userId};
    data.studyResource = {id:feedbackFormId, name:'Feedback1'};
    this.props.history.push({pathname: _path, state: data});
  }

  render() {
    let CURRENT_PORTLET = JSON.parse(localStorage["portlet"]);
    console.log(this.state.studentFeedbackData.data?.userBeans);
    return (
      <div>
        <ILoader
          loadingText={"Please wait..."}
          isShow={this.state.showLoading}
        ></ILoader>

        <div className={`ilearn-plain-header ${CURRENT_PORTLET.class}`}>
          <div className="back">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={this.props.history.goBack}
            />
          </div>
          {<h4>{this.state.studentFeedbackData.data?.name}</h4>}
        </div>

        <ListGroup className="list-group-flush">
          {this.state.studentFeedbackData.data?.userBeans?.map((studentData, index) => {
            
            return (
              <ListGroupItem key={index}>
                {studentData.studentName}
                <div>
                  {studentData.receivedFeedback === "TRUE" && (
                    <>
                      <Badge
                        variant="success"
                        className="instructor_feedback_button"
                        onClick={()=>this.giveFeedback(this.props.match.params.id,studentData, 0)}
                      >
                        Feedback Given
                      </Badge>{" "}
                    </>
                  )}
                  {studentData.receivedFeedback === "FALSE" && (
                    <>
                      <Badge
                        variant="warning"
                        className="instructor_feedback_button"
                        onClick={()=>this.giveFeedback(this.props.match.params.id,studentData, 0)}
                      >
                        Give Feedback
                      </Badge>{" "}
                    </>
                  )}
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default StudentFeedback;
