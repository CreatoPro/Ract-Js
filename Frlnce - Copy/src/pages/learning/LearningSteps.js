import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Config from '../../_config/config'
import "./Learning.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight,faThLarge,faThList, faDesktop, faBook, faTimesCircle  } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import Accordion from 'react-bootstrap/Accordion'
import ico_text_format from "./images/ico_text-format.svg";
import ico_test from "./images/ico_test.svg";
import swal from 'sweetalert';
import Notes from "./components/Notes";
import NotesForwarding from "./components/notes-forwarding.component";
import { StudyResourceType } from "../../_constants/studyResourceTypes";

class LearningSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      view: "grid",
      title:"",
      notes:false,
      lock:false
    };
    this.reloadLearningStepsList = this.reloadLearningStepsList.bind(this);
    this.resumeLearningActivity = this.resumeLearningActivity.bind(this);
  }

  componentDidMount() {
    
    this.setState({
      learnId: this.props?.match?.params?.id || this.props.learnId ,
      lock: this.props?.lock
    });
    this.reloadLearningStepsList();
  }

  changeView(view) {
    this.setState({view: view});    
  }

  reloadLearningStepsList() {
    let that = this;
    this.setState({ loading: true }, () => {
      ApiService.fetchLearningStepsDesktop(this.state.learnId)
      .then((res) => {
          this.setState({
            loading: false,
            list: res.data.groups,
            title: res.data.name
          });
          let visit = localStorage.getItem('firstVisit') || false;
          if(visit=="true" && that.state.lock != true){
            setTimeout(function() {
              that.resumeLearningActivity();
            }, 500);
          }
      });
    });	
  }

  resumeLearningActivity(){
      ApiService.resumeStudyResourcesLearningActivity(this.state.learnId)
      .then((res) => {
        if(res.data.id){
          swal({
            title: "Resume Confirmation",
            text: "Would you like to resume from where you last left ?",
            dangerMode: true,
            buttons: true,
            className: 'blue-card'
          })
          .then((willResume) => {
            if (willResume) {
              let stepid = this.state.list[res.data.groupIndex].steps[res.data.stepIndex].id;
              this.props.history.push({
                pathname: '/lesson/steps/attachments/'+stepid+'/details/'+res.data.id,
                state: { groupIndex: res.data.groupIndex,stepIndex: res.data.stepIndex, lessonPlanId:this.state.learnId }
              });
            }
          });
        }
      });	
  }

  routeChange(path,groupIndex,stepIndex) {
    var learnId = this.state.learnId;
    this.props.history.push({
      pathname: path,
      state: { groupIndex: groupIndex,stepIndex: stepIndex, lessonPlanId: learnId }
    });
  }

  showNotes(status){
    this.setState({
      notes: status
    });
  }


  downloadTest(testid) {
      window.open('/TestInstructions/'+testid+'?lms='+this.state.learnId, "Start Test", 'height=' + window.screen.height + ',width=' + window.screen.width);    
  }

  toggleActive(id) {
    this.setState({activeId: id});
  }

  render() {
    const { loading } = this.state;
    let portlet = JSON.parse(localStorage.getItem('portlet'));
    var deafult_cover_img = "https://tuningfork-testing.s3.amazonaws.com/triangles%5Cuploads/study_resource/lessonPlan/photos%5C242.jpg";
    var courseImg = this.props?.location?.state ? this.props.location.state.card.icon : "";
    return (
      <div className="LearningSteps">
        {
          <Container fluid>
               { 
               this.state.lock != true ?
              <div className="module-header courseView">
                <div className={`module-header-step2`}>
                <div className="back">  
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/lessonPlan/15/'+portlet.params.resourceSubTypeId+'/Learning Modules') } />
                </div>
                <h4>{this.state.title && this.state.title}</h4> 
                <FontAwesomeIcon className={this.state.view === 'grid' ? "active list_grid_view": "list_grid_view"} icon={ faThLarge } onClick={() => this.changeView('grid')} />
                <FontAwesomeIcon className={this.state.view === 'list' ? "active list_grid_view": "list_grid_view"} icon={ faThList }  onClick={() => this.changeView('list')} /> 
                {/*<FontAwesomeIcon className={this.state.view === 'desktop' ? "active list_grid_view": "list_grid_view"} icon={ faDesktop }  onClick={() => this.changeView('desktop')} />*/}
                </div>
              </div> : ""
              }
              <figure className="mobile_course_image" 
                style={{ background: ' linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 59%, rgba(255, 255, 255, 0.65) 100%), url('+courseImg+') center center repeat, url('+deafult_cover_img+') center center repeat' }} id="sticky_img" 
            />
            {  
                loading ? <Loader />: 
                <Container>
                <div class="mobile_course">
                    <div className="headTitle">
                      <h1>{this.state.title && this.state.title}</h1> 
                      {  
                        this.state.lock != true ?
                        this.state.notes ? 
                        <FontAwesomeIcon className="MynotesClose" icon={ faTimesCircle } onClick={() => this.showNotes(false) }  /> : <FontAwesomeIcon className="Mynotes" icon={ faBook } onClick={() => this.showNotes(true) } /> 
                        : ""
                      }
                    </div>
                    {  
                        this.state.notes ? 
                         <NotesForwarding id={this.state.learnId} /> 
                         : this.state.view === 'list'? this.renderList() 
                         : this.renderGrid() 
                    }
                </div> 
                </Container>
                /*: : this.state.view === 'grid'? 
                <Container>
                  <div class="mobile_course">
                    <div className="headTitle">
                      <h1>{this.state.title && this.state.title}</h1> 
                      {  
                        this.state.notes ? 
                        <FontAwesomeIcon className="MynotesClose" icon={ faTimesCircle } onClick={() => this.showNotes(false) }  /> : <FontAwesomeIcon className="Mynotes" icon={ faBook } onClick={() => this.showNotes(true) } /> 
                      }
                    </div>
                    {this.state.notes ? <Notes id={this.state.learnId} /> : this.renderGrid() }                    
                  </div> 
                </Container>
                
                <>
                  <Container>
                    <div class="mobile_course">  
                      <div className="headTitle">
                        <h1>{this.state.title && this.state.title}</h1> 
                        {  
                          this.state.notes ? 
                          <FontAwesomeIcon className="MynotesClose" icon={ faTimesCircle } onClick={() => this.showNotes(false) }  /> : <FontAwesomeIcon className="Mynotes" icon={ faBook } onClick={() => this.showNotes(true) } /> 
                        }
                      </div>
                    </div>
                    {this.state.notes ? <Notes id={this.state.learnId} /> : '' }  
                  </Container>
                  { this.state.notes ? '' : this.renderDesktop()}
                </>*/
            }
          </Container>
        }
      </div>
    );
  }

  renderList() {
		return  <div className="list card_list"> 
		{
      this.state.list.sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item, index) => {
		    if(item.groupTitle =="nogroup"){
				  item.groupTitle ="";
			  }
        return (
          <div key={index}>  
              <h4 class="text_blue">{item.name}</h4>
              <Card className="no_border_lrt"> 
                  <Card.Body>
                    <div className="cardbody">
                      { 
                        item.steps.sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((s, i) =>
                        {
                          var status = 1;
                          if(s.startDate){
                             status = this.checkDateStatus(s.startDate,s.endDate);     
                          }                                                                          
                          return ( 
                                status == 1 ?
                                   <p className="option" data-group={index} data-step={i} onClick={() => this.routeChange('/lesson/steps/attachments/' + s.id + '/'+ s.name.replace(/\//g, " "),index,i)}>
                                  {s.name} <FontAwesomeIcon icon={ faArrowRight }  />
                                   </p>
                                :
                                <p className="option" data-group={index} data-step={i} onClick={() => this.showAlert(status, s.startDate, s.endDate)}>
                                  {s.name} <FontAwesomeIcon icon={ faArrowRight }  />
                                </p>

                          )
                        }
                        )
                      }
                    </div>
                  </Card.Body>
              </Card>
          </div> 	
        )
      })
    }
    </div>
  }

  renderGrid() {
    
		return  <Accordion className="grid accordion" defaultActiveKey="0">
		{
      this.state.list.sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item, index) => {
		    if(item.groupTitle =="nogroup"){
				    item.groupTitle ="";
			  }
			  return (
              <li className="card">
                  <div className="card-header">
                      <div className="row">
                          <div className="col-10 col-sm-10 border-right">
                              <span className="head-title">{item.name} </span> 
                          </div> 
                          <div className="col-2 col-sm-2">
                            {
                              this.state.lock === true ?
                              <Accordion.Toggle as={Button} variant="link" className='lock float-right'></Accordion.Toggle>
                             :
                             <Accordion.Toggle as={Button} onClick={() => this.toggleActive(index)} variant="link" eventKey={index+1} className={this.state.activeId == index ? 'arrow float-right' : 'arrow collapsed float-right'}>
                             </Accordion.Toggle>
                            }
                          </div>
                      </div>
                  </div>
                  {this.renderSubsections(item, index+1)}
              </li>) 	
      })
    }
    </Accordion>
  }

  /*renderDesktop() { 
    let user = JSON.parse(localStorage.getItem('user')) || [];
    var url = Config.siteUrl+ 'studentportal/studentPortal.do?reqCode=fetchLessonPlanSteps&lessonPlan='+this.state.learnId+'&token='+ user.token;
    return <iframe  class="iframe100" width="100%" title="My Programs" src={url}></iframe>;
  }*/

  renderSubsections(section, groupIndex) {

    return (
        <>
        <Accordion.Collapse eventKey={groupIndex} className={this.state.list.length==1 ? 'show' : '' }>
            <div className="card-body">
                <ul className="step3">
                    {
                    section.steps.sort((a, b) => a.sortOrder - b.sortOrder).map((s, stepIndex) => {
                        
                        var status = 1;
                        if(s.startDate){
                          status = this.checkDateStatus(s.startDate,s.endDate);     
                        }

                        return ( 
                              <>
                                <h5 className="text_blue">{s.name}</h5>
                                 { this.renderResources(s.id,s.resources,groupIndex, stepIndex, status, s.startDate, s.endDate) }
                              </>
                        )
                    })
                    }
                </ul>
            </div>
        </Accordion.Collapse>
        </>
    );
  }

  renderResources(sid, resources, groupIndex, stepIndex, status, startDate, endDate) {
    return (
        <>
            {
            resources.sort((a, b) => a.sortOrder - b.sortOrder).map((r, index) => {
              if(r.type=="test"){				
                var button;
                if(r.status=="Launch"){
                  var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
                  if (oldTests.filter(test=> test.id == r.id).length == 0){
                    button =  <button onClick={() => this.downloadTest(r.id)} className="download blue-card launch">Launch</button>
                  }else{
                    button =  <button onClick={() => this.downloadTest(r.id)} className="download blue-card launch">Launch</button>
                  }
                }else if(r.status == "Time Out"){
                  button= <button className="download blue-light-card">{r.status}</button>
                }else if(r.status == "View Result"){
                  button= <button onClick={() => this.routeChange('/test-result/'+this.state.learnId+'/'+r.id)} className="download green-card">{r.status}</button>
                }else{
                  var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
                  if (oldTests.filter(test=> test.id == r.id).length == 0){
                    button =  <button onClick={() => this.downloadTest(r.id)} className="download blue-card launch">Launch</button>
                  }else{
                    button =  <button onClick={() => this.downloadTest(r.id)} className="download blue-card launch">Launch</button>
                  }
                }

                return (
                  <li key={index}>
                      <img src={ico_test} className="icon" alt="text" /> 
                      {r.name}
                      {button}
                  </li>
                )
                
                
              }else{
                return ( 
                      status == 1 ?
                      <li key={index}  onClick={() => this.displayStudyResource(r, '/lesson/steps/attachments/'+ sid + '/details/' + r.id, groupIndex-1, stepIndex, index)} >
                        <img src={ico_text_format} className="icon" alt="text" />
                        {r.name}
                      </li> 
                      :
                      <li key={index}  onClick={() => this.showAlert(status, startDate, endDate)} >
                        <img src={ico_text_format} className="icon" alt="text" />
                        {r.name}
                      </li>
                )
              }
            })
            }
        </>
    );
  }

  displayStudyResource(studyResource, path, groupIndex, stepIndex, resourceIndex) {
    let _path = '';
    let data = {studyResource: studyResource};
    if(parseInt(studyResource.studyResourceType)===StudyResourceType.FEEDBACK_FORM) {		
      _path = '/feedback/form/'+studyResource.id;
      this.props.history.push({pathname: _path, state: data});
    }
    else {
      this.props.history.push({
        pathname: path,
        state: { groupIndex: groupIndex,stepIndex: stepIndex, resourceIndex: resourceIndex, lessonPlanId: this.state.learnId}
      });  
    }  
  }

  checkDateStatus(startDate,endDate){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;

      if(startDate && endDate){
          var startdatearray = startDate.split("/");
          var startDate = startdatearray[1] + '/' + startdatearray[0] + '/' + '20' + startdatearray[2];
          var enddatearray = endDate.split("/");
          var endDate = enddatearray[1] + '/' + enddatearray[0] + '/' + '20' + enddatearray[2];
          return this.dateCheck(startDate,endDate,today);
      }else if(startDate){
          var startdatearray =startDate.split("/");
          var startDate = startdatearray[1] + '/' + startdatearray[0] + '/' + '20' + startdatearray[2];
          return this.dateCompare(startDate,today);
      }
  }

  dateCheck(from,to,today) {
      var fDate,lDate,cDate;
      fDate = Date.parse(from);
      lDate = Date.parse(to);
      cDate = Date.parse(today);
      if((cDate <= lDate && cDate >= fDate)) {
          return 1;
      }else{
          return this.dateCompare(from,today);
      } 
  }

  dateCompare(d1, d2){
      const date1 = new Date(d1);
      const date2 = new Date(d2);
      if(date1 > date2){
          return 2;
      } else if(date1 < date2){
          return 0;
      } else{
          return 1;
      }
  }

  showAlert(status, startDate, endDate){
    swal({
      title: "Alert",
      text:  status ? "This content is not yet Activated for you. You can access it on "+ startDate  : "This content is no longer available for you. Your access to it has expired on "+endDate,
      dangerMode: true,
      buttons: true,
      className: 'blue-card'
    })
    .then((willResume) => {
      if (willResume) {
        
      }
    });
  }


}

export default LearningSteps;
