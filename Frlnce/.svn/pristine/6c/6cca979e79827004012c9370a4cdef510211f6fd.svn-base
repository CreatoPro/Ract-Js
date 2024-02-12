import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Learning.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ApiService from "../../_services/ApiService";
import Loader from "./../../_components/loader/loader";
import Model from "./components/Model";
import Resource from "./components/Resource";
import ico_notes from "./images/ico_notes.svg";
import ico_handouts from "./images/ico_discussion.svg";
import ico_interview from "./images/ico_interview.svg";
import CKEditor from "ckeditor4-react";
import XAPIUtils from "../xapi/xapiutils";

class LearningStepAttachmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      show: false,
      close: false,
      resourceIndex: 0,
      resourceId: 0,
      groupIndex: 0,
      stepIndex: 0,
      activeAttachemnt: null,
    };
    this.reloadLearningStepAttachmentDetailsList =
      this.reloadLearningStepAttachmentDetailsList.bind(this);
    this.trackStudyResourcesLearningActivity =
      this.trackStudyResourcesLearningActivity.bind(this);
    this.reloadLearningStepsList = this.reloadLearningStepsList.bind(this);
    //this.reloadLearningList = this.reloadLearningList.bind(this);
  }

  componentDidMount() {
    console.log("here");
    //console.log(this.props);
    this.reloadLearningStepAttachmentDetailsList();
    this.trackStudyResourcesLearningActivity();
    this.reloadLearningStepsList();
    //this.reloadLearningList();
    this.scrollTop();
  }

  modeShow = (show) => {
    this.setState({
      show: show,
    });
  };

  /*reloadLearningList() {
    this.setState({ loading: true }, () => {
      ApiService.fetchLearning(this.props.location.state.lessonPlanId,1)
      .then((res) => {
          this.setState({
            loading: false,
            groups: res.data
          });
      });
    });	
  }*/

  loadNext() {
    var groupIndex = 1;
    var groups = [];
    var stepIndex = 1;
    var resourceIndex = 1;

    if (groupIndex >= groups.length) {
      return this.endOfModules();
    }
    var group = groups[groupIndex];
    var stepId = group[stepIndex].id;
    if (group[stepIndex].resources.length > 0) {
      var resourceId = group[stepIndex].resources[resourceIndex];
      if (resourceId === undefined) {
        //groupIndex++;
        //stepIndex = 0;
        stepIndex++;
        resourceIndex = 0;
        if (groupIndex >= groups.length) {
          return this.endOfModules();
        }
        group = groups[groupIndex];
        if (group[stepIndex] === undefined) {
          groupIndex++;
          stepIndex = 0;
          group = groups[groupIndex];
        }
        if (group == undefined || group[stepIndex] === undefined) {
          return this.endOfModules();
        }
        stepId = group[stepIndex].id;
        resourceId = group[stepIndex].resources[resourceIndex];
      }

      //call api
      resourceIndex++;
    } else {
      alert("Oops! <br/>We could not find any Learning Material!");
    }
  }

  endOfModules() {
    alert(
      "Congratulations! <br/>You have reached the last step in the module!"
    );
    return;
  }

  reloadLearningStepAttachmentDetailsList() {
    this.setState({ loading: true }, () => {
      ApiService.fetchLearningStepAttachments(this.props.match.params.id)
        .then((res) => {
          let attachments = res.data.attachments;
          let _activeAttachment;
          attachments.map((_studyResource, index) => {
            if (_studyResource.id == this.props.match.params.resourceId) {
              _activeAttachment = _studyResource;
              this.setState({
                loading: false,
                list: res.data.attachments,
                activeAttachment: _activeAttachment,
                resourceId: this.props.match.params.resourceId,
                groupIndex: this.props.location.state.groupIndex,
                stepIndex: this.props.location.state.stepIndex,
                resourceIndex: this.props.location.state.resourceIndex,
              });
            }
          });
        })
        .catch((error) => console.log(error));
    });
  }

  reloadLearningStepsList() {
    this.setState({ loading: true }, () => {
      ApiService.fetchLearningStepsDesktop(
        this.props.location.state.lessonPlanId
      ).then((res) => {
        console.log(res.data.groups);
        this.setState({
          loading: false,
          groups: res.data.groups,
        });
      });
    });
  }

  trackStudyResourcesLearningActivity() {
    let data = {
      groupIndex: this.props.location.state.groupIndex,
      stepIndex: this.props.location.state.stepIndex,
      resourceIndex: this.props.location.state.resourceIndex,
      type: "resource",
      id: this.props.match.params.resourceId,
    };

    ApiService.trackStudyResourcesLearningActivity(
      this.props.location.state.lessonPlanId,
      data
    ).then((res) => {
      console.log(res);
    });
  }

  routeChange(path, resource) {
    //alert(JSON.stringify(resource))
    this.props.history.push({
      pathname: path,
      state: { resource: resource, stepId: this.props.match.params.id },
    });
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  loadCurrentResource(index) {
    this.scrollTop();

    if (this.state.groupIndex >= this.state.groups.length) {
      alert("Congratulations! You have reached the last step in the module!");
    }
    //alert("groupIndex:"+this.state.groupIndex+" stepIndex:"+ this.state.stepIndex+ " resourceIndex"+index);
    if (index >= 0 && this.state.list.length > index) {
      this.setState({
        resourceId: this.state.list[index].id,
        resourceIndex: index,
      });
    } else if (index > 0) {
      //alert("Congratulations! You have reached the last step in the module!");
      //this.props.history.goBack();
    }
  }

  render() {
    const { loading } = this.state;
    localStorage.setItem("firstVisit", false);
    return (
      <>
        <Container fluid>
          {this.renderHeader()}
          {loading ? <Loader /> : this.renderCard()}
        </Container>
        <Model
          show={this.state.show}
          title={this.state.title}
          type={this.state.type}
          close={this.state.close}
          modeShow={this.modeShow.bind(this)}
          resourceId={this.state.resourceId}
        />
      </>
      // <div className="LearningAttachment">
      //   {
      //     <Container fluid>
      //         {loading ?  <Loader />: this.renderCard()}
      //     </Container>
      //   }
      //   <Model
      //       show={this.state.show}
      //       title={this.state.title}
      //       type= {this.state.type}
      //       close={this.state.close}
      //       modeShow={this.modeShow.bind(this)}
      //       resourceId = {this.state.resourceId}
      //   />
      // </div>
    );
  }

  renderHeader() {
    console.log("LearningStepAttachmentDetails -> renderHeader()... ");
    const CURRENT_PORTLET = JSON.parse(localStorage.getItem("portlet"));
    return (
      <div className={`ilearn-plain-header ${CURRENT_PORTLET.class}`}>
        <div className="back">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={this.props.history.goBack}
          />
        </div>
        <h4>{this.state.activeAttachment?.name}</h4>
      </div>
    );
  }

  changeContent = (groupIndex, stepIndex, resourceIndex, lessonPlanId) => {
    this.setState({
      groupIndex:groupIndex,
      stepIndex: stepIndex,
      resourceIndex:resourceIndex
    })
    if(this.state.groups[groupIndex].steps[stepIndex].resources[resourceIndex].studyResourceType==="0"){
      window.open('/TestInstructions/'+this.state.groups[groupIndex].steps[stepIndex].resources[resourceIndex].id+'?lms='+lessonPlanId, "Start Test", 'height=' + window.screen.height + ',width=' + window.screen.width);
    }else{

      this.props.history.push({
        pathname: `/lesson/steps/attachments/${this.state.groups[groupIndex].steps[stepIndex].id}/details/${this.state.groups[groupIndex].steps[stepIndex].resources[resourceIndex].id}`,
        state: {
          lessonPlanId: lessonPlanId,
          groupIndex: groupIndex,
          stepIndex: stepIndex,
          resourceIndex: resourceIndex,
        },
      });
    }
  };

  loadNextResource = () => {
    if (
      this.state.resourceIndex ===
      this.state.groups[this.state.groupIndex].steps[this.state.stepIndex]
        .resources.length -
        1
    ) {
      if (
        this.state.stepIndex ===
        this.state.groups[this.state.groupIndex].steps.length - 1
      ) {
        this.changeContent(
          this.state.groupIndex + 1,
          0,
          0,
          this.props.location.state.lessonPlanId
        );
      } else {
        this.changeContent(
          this.state.groupIndex,
          this.state.stepIndex + 1,
          0,
          this.props.location.state.lessonPlanId
        );
      }
    } else {
      this.changeContent(
        this.state.groupIndex,
        this.state.stepIndex,
        this.state.resourceIndex + 1,
        this.props.location.state.lessonPlanId
      );
    }
  };

  loadPrevResource = () => {
    if (this.state.resourceIndex === 0) {
      if (this.state.stepIndex === 0) {
        console.log(this.state.groups[this.state.groupIndex].steps.length);
        let newStepIndex = this.state.groups[this.state.groupIndex-1].steps.length - 1;
        this.changeContent(
          this.state.groupIndex-1,
          newStepIndex,
          this.state.groups[this.state.groupIndex - 1].steps[newStepIndex]
            .resources.length - 1,
          this.props.location.state.lessonPlanId
        );
      } else {
        this.changeContent(
          this.state.groupIndex,
          this.state.stepIndex - 1,
          this.state.groups[this.state.groupIndex].steps[
            this.state.stepIndex - 1
          ].resources.length - 1,
          this.props.location.state.lessonPlanId
        );
      }
    } else {
      this.changeContent(
        this.state.groupIndex,
        this.state.stepIndex,
        this.state.resourceIndex - 1,
        this.props.location.state.lessonPlanId
      );
    }
  };

  renderCard() {
    let _studyResource = this.state.activeAttachment;
    return (
      <div className="card_details">
        {_studyResource && (
          <>
            <Resource
              data={_studyResource}
              history={this.props.history}
              stepId={this.props.match.params.id}
            />
            <div className="divhide">
              <CKEditor name="message" placeholder="Compose message" data="" />
            </div>
            {this.renderFooter(_studyResource)}
          </>
        )}
      </div>
    );
  }

  renderFooter(item) {
    const resourceIndex = this.state.resourceIndex;
    return (
      <>
        <div
          className="mobile_bootom_navbar container-fluid"
          id="bootom_navbar"
        >
          <div className="row">
            <div className="col-1"></div>
            <div className="col-2 col-sm-2 prev_div">
            {
              (this.state.groupIndex === 0 && this.state.stepIndex === 0 && this.state.resourceIndex ===0)?null
              :<button className="btn btn-primary" onClick={this.loadPrevResource}>Prev</button>
            }
              {/*<a onClick={() => this.loadCurrentResource(resourceIndex-1)} className="prev">&laquo; Prev</a>*/}
            </div>
            <div className="col-2 col-sm-2">
              <a
                onClick={() =>
                  this.setState({ show: true, title: "Notes", type: "note" })
                }
              >
                <img src={ico_notes} alt="Notes" />
                <span>Notes </span>
              </a>
            </div>
            <div className="col-2 col-sm-2">
              <a
                onClick={() =>
                  this.routeChange("/discussion/resource/" + item.id, item)
                }
              >
                <img src={ico_handouts} alt="Discuss" />
                <span>Discuss</span>
              </a>
            </div>
            <div className="col-2 col-sm-2">
              <a
                onClick={() =>
                  this.setState({ show: true, title: "Doubts", type: "doubt" })
                }
              >
                <img src={ico_interview} alt="Doubts" />
                <span>Doubts</span>
              </a>
            </div>

            <div className="col-2 col-sm-2 next_div">
            {
              (this.state.groupIndex === this.state.groups?.length-1 && 
              this.state.stepIndex === this.state.groups[this.state.groupIndex].steps.length-1 && 
              this.state.resourceIndex === this.state.groups[this.state.groupIndex].steps[this.state.stepIndex].resources.length -1
              )?null
              :<button className="btn btn-primary" onClick={this.loadNextResource}>Next</button>
            }
              {/*<a onClick={() => this.loadCurrentResource(resourceIndex+1)} className="next">Next &raquo;</a>*/}
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </>
    );
  }
}

export default LearningStepAttachmentDetails;
