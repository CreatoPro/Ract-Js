import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Learning.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight,faBook,faFileSignature } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import swal from 'sweetalert';
import Utils from "../../_helpers/utils";
import { StudyResourceType } from "../../_constants/studyResourceTypes";

class LearningStepAttachments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
	  showMsg:false
    };
    this.reloadLearningStepAttachmentsList = this.reloadLearningStepAttachmentsList.bind(this);
  }

  componentDidMount() {
    this.reloadLearningStepAttachmentsList();
  }

  reloadLearningStepAttachmentsList() {
    this.setState({ loading: true }, () => {
      ApiService.fetchLearningStepAttachments(this.props.match.params.id)
      .then((res) => {
          this.setState({
            loading: false,
            list: res.data.attachments,
			showMsg:true,
          });
      });
    });	
  }

  routeChange(path, index) {
      //this.props.history.push(path);
	  this.props.history.push({
		pathname: path,
		state: { groupIndex: this.props.location.state.groupIndex,stepIndex: this.props.location.state.stepIndex, resourceIndex: index, lessonPlanId: this.props.location.state.lessonPlanId}
	  });
  }

  displayStudyResource(studyResource, path, index) {
    console.log(">>studyResource: "+JSON.stringify(studyResource))
	let _path = '';
    let data = {studyResource: studyResource};
    if(studyResource.typeId===StudyResourceType.FEEDBACK_FORM) {		
		_path = '/feedback/form/'+studyResource.id;
		this.props.history.push({pathname: _path, state: data});
    }
    else {
		this.props.history.push({
			pathname: path,
			state: { groupIndex: this.props.location.state.groupIndex,stepIndex: this.props.location.state.stepIndex, resourceIndex: index, lessonPlanId: this.props.location.state.lessonPlanId}
		});  
    }  
  }
    
  downloadTest(testid) {
	//|| Utils.isMobileDevice()===false
	/*if(Utils.isMobileDevice()===true){
      ApiService.fetchTest(testid)
      .then((res) => {
		if(res.data.status==1 && res.data.data.tests[0].testJSONFile!="TestJSONNotFound"){
			var studentPdfResponse = res.data.data.tests[0].studentPdfResponse;
			ApiService.fetchTestJson(res.data.data.tests[0].testJSONFile)
			.then((res) => {
				this.setState({tests: res.data});
				var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
				if (oldTests.filter(test=> test.id == testid).length == 0){
					res.data.resume=0;
					res.data.studentPdfResponse=studentPdfResponse;
					oldTests.push(res.data);  
					localStorage.setItem('tests', JSON.stringify(oldTests));		
					this.props.history.replace('/test-instructions/'+this.props.match.params.id+'/'+testid+'?lms=1&title='+this.props.match.params.title);
				}
			});
		}else{
		   let portlet = JSON.parse(localStorage.getItem('portlet'));
		   swal({
				title: "Alert",
				text: "Online test not available. Please contact administrator",
				dangerMode: true,
				className: portlet.class ? portlet.class : 'orange-card'
		   });
		}
	  });
	}else{*/
		//this.props.history.replace('/TestInstructions/'+testid+'?steps='+this.props.match.params.id,0,this.props.match.params.id);
	    window.open('/TestInstructions/'+testid+'?lms='+this.props.match.params.id, "Start Test", 'height=' + window.screen.height + ',width=' + window.screen.width);
	//}
  }

  render() {
    const { loading } = this.state;
	let paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
	let portlet = JSON.parse(localStorage.getItem('portlet'));
	localStorage.setItem('firstVisit', false);
    let bak =  params.get('back');
	let back_url;
	if(bak=="quiz"){
	  let portlet = JSON.parse(localStorage.getItem('portlet'));
	  let subcat = "/lessonPlan/15/"+portlet.params.resourceSubTypeId+"/"+portlet.params.name;
	  back_url = <a onClick={() =>this.routeChange(subcat)} className="text-white"><FontAwesomeIcon icon={ faArrowLeft } /></a>;
	}else if(this.props.match.params.title=="null"){
		let portlet = JSON.parse(localStorage.getItem('portlet'));
		let subcat = "/lessonPlan/15/"+portlet.params.resourceSubTypeId+"/Learning Modules";
		back_url = <a onClick={() =>this.routeChange(subcat)} className="text-white"><FontAwesomeIcon icon={ faArrowLeft } /></a>;
	}else{
	  back_url = <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
	}
    return (
      <div className="LearningAttachment">
        {
          <Container fluid>
              <div className="module-header">
               <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
                <div className="back">
                  {back_url}
                </div>
                <h4>{this.props.match.params.title}</h4>
                </div>
              </div>
              {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
  }

  renderCard() {
	  console.log(this.state.list);
	  let portlet = JSON.parse(localStorage.getItem('portlet'));
	  let paramsString = this.props.location.search;
	  const params = new URLSearchParams(paramsString);
	  let bak =  params.get('back');
	    if(this.state.showMsg){
			if(this.state.list ===undefined || this.state.list.length==0 ){
				if(bak=="quiz"){
					let subcat = "/lessonPlan/15/"+portlet.params.resourceSubTypeId+"/Learning Modules";
					this.props.history.replace(subcat);
				}else{
					swal({
						title: "Alert",
						text: "Content not Available",
						dangerMode: true,
						className: portlet.class ? portlet.class : 'orange-card'
					})
					  .then(exitExam => {
						 this.props.history.goBack();	
					});
				}
				
			}
		}
			  
	  return  <div className="card_list"> 
	  {
      this.state.list && this.state.list.sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item, index) => {
		      
	  
			  if(item.type=="test"){
				
				  var button;
				  if(item.status=="Launch"){
					var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
					if (oldTests.filter(test=> test.id == item.id).length == 0){
					  button =  <button onClick={() => this.downloadTest(item.id)} className="download blue-card">Launch</button>
					}else{
						/*if(Utils.isMobileDevice()===true){
					      button= <button onClick={() =>this.routeChange('/test-instructions/'+this.props.match.params.id+'/'+item.id+'?lms=1&title='+this.props.match.params.title)} className="download blue-card">Launch</button>
						}else{
						  button =  <button onClick={() => this.downloadTest(item.id)} className="download blue-card">Launch</button>
						}*/
						button =  <button onClick={() => this.downloadTest(item.id)} className="download blue-card">Launch</button>
					}
				  }else if(item.status == "Time Out"){
					button= <button className="download blue-light-card">{item.status}</button>
				  }else if(item.status == "View Result"){
					button= <button onClick={() => this.routeChange('/test-result/'+this.props.match.params.id+'/'+item.id)} className="download green-card">{item.status}</button>
				  }
				  
				return (
					<Card className="no_border_lrt" key={index}>
					<Card.Body>
						  <FontAwesomeIcon className="Book" icon={ faFileSignature } /> 
						  <p className="option"> {item.name}  {button}</p>  
					</Card.Body>
				  </Card>
				)
			  }else{
				  return (
					<Card className="no_border_lrt" key={index} onClick={() => this.displayStudyResource(item,'/lesson/steps/attachments/'+ this.props.match.params.id + '/details/' + item.id, index)}>
					<Card.Body>
						  <FontAwesomeIcon className="Book" icon={ faBook } /> 
						  <p className="option">
						   {item.name} <FontAwesomeIcon icon={ faArrowRight }  />
						  </p> 
					</Card.Body>
				  </Card>
				  )
			  }
		  })
		}
    </div>
  }

}

export default LearningStepAttachments;
