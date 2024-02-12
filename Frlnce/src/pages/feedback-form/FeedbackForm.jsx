import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Config from '../../_config/config'
import './FeedbackForm.css';
import swal from 'sweetalert';
import Iframe from "../../_components/iframe/iframe";
class FeedbackForm extends Component { 

	constructor(props) {
        super(props);
        //console.log("FeedbackForm -> constructor()... ");
        this.state = {
            message: null,
            showLoading: false,           
        };       
    }
    
    componentDidMount() {
        //console.log("FeedbackForm -> componentDidMount()... ");
        this.init();
    }
    
    init() {
        let employeeId = this.props.match.params.instructorId || 0;
        let courseId = this.props.match.params.courseId || 0;  
        const userId = this.props.location.state.userId || 0;

        this.setState({ showLoading: true }, () => {
            ApiService.getFeedbackForm(this.props.match.params.id, 0, employeeId, courseId, userId)
            .then((res) => {
               
                const temp = res.data.data;
                console.log(temp.userBeans,'<----Temp');
                if(temp.userBeans){
                this.props.history.replace({pathname:`/studentfeedback/form/${this.props.match.params.id}`,state:{employeeId, courseId}});
                // this.props.history.replace('/');
                }  
                
              console.log("FeedbackForm -> init(); res : "+ JSON.parse( JSON.stringify(res.data.data)));
              this.setState({
                showLoading: false,
                feedbackFormBean : res.data.data
              });
            });
        });
    }
    
    render() {
        //console.log("DiscussionBoardTopic -> render()... ");        
        return (  
            <>                
                <Container fluid >
                    <>
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderFooter()}
                    </>
                    {this.renderLoader()}                    
                </Container>
            </>           
              
        );
    }

    renderHeader() {
        //console.log("FeedbackForm -> renderHeader()... ");
        let CURRENT_PORTLET = JSON.parse(localStorage['portlet']);
        let studyResource = this.props.location.state.studyResource;
        return (
            <div className={`ilearn-plain-header ${CURRENT_PORTLET.class}`}>
                <div className="back">
                    <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                {
                   <h4>{studyResource.name}</h4>  
                }
            </div>
        )
    }

    renderBody() {
        //console.log("FeedbackForm -> renderBody()... ");
        const feedbackFormBean = this.state?.feedbackFormBean;
        return (
            <>
            {
                (feedbackFormBean && feedbackFormBean.readFromStaff) ? (
                    this.renderReadFromStaffFeedbackForm()
                ) : (
                    this.renderStudentFeedbackForm()
                )
            }
            </>
        );
    }

    renderRating() {
        let employeeId = this.props.match.params.instructorId || 0;
        let instructorName = this.props.location.state.instructorName;
        const feedbackMode = this.state?.feedbackFormBean?.mode;
        if(employeeId>0) {
            return (
                <>
                    <div className="alert alert-primary" role="alert">
                        <div className="alert-heading"><b>{instructorName}</b>
                        {
                            feedbackMode==='view'?                      
                                <span className="rating pull-right" >{this.state?.feedbackFormBean?.score}</span>
                                : ""
                        }
                        </div>
                    </div>
                </>
            )
        }
    }

    renderStudentFeedbackForm() {
        const feedbackQuestionBeans = this.state?.feedbackFormBean?.feedbackQuestionBeans;        
        return (
            <>
            {this.renderRating()}
            {
                feedbackQuestionBeans &&  
                    <div className="ilearn-padding-top ilearn-padding-both-sides">
                        {this.renderFeedbackFormQuestions(feedbackQuestionBeans)}
                    </div>
            }
            <br/><br/>
            </>
        );    
    }

    renderReadFromStaffFeedbackForm() {
        let enquiryId = localStorage.getItem('enquiryId'); 
        let feedbackFormId = this.state.feedbackFormBean.id;       
        const feedbackFormURL = Config.siteUrl+"popup/studentportal/studentPortal.do?reqCode=viewStudentFeedbackFormInMobile&enquiryId="+enquiryId+"&feedBackFormId="+feedbackFormId;
		return (
            <>
                <Iframe url={feedbackFormURL} />
            </>
        );    
    }
    
    renderFeedbackFormQuestions(feedbackQuestionBeans) {
        return  (
            <>             
                {
                    feedbackQuestionBeans.map((question, index) => {
                        return (
                            <>
                                {this._renderFeedbackQuestion(question, index)}
                            </>
                        );
                    })
                }
            </>
        );
    }

    _renderFeedbackQuestion(question, index) {
        const feedbackMode = this.state?.feedbackFormBean?.mode;
        if(question.questionTypeId===1 || question.questionTypeId===2 || 
            question.questionTypeId===3 || question.questionTypeId===5 || 
            question.questionTypeId===6 || question.questionTypeId===8 || 
            question.questionTypeId===9 || question.questionTypeId===10) {
            return  (
                <>
                    <div key={index} className="ilearn-padding-top">
                        <div className="card">
                            <div className="card-body feedback-question-card">
                                {feedbackMode==='view'? this.renderReadOnlyFeedbackQuestion(question) : 
                                    this.renderFeedbackQuestion(question)}
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        return (<></>);
    }

    renderFeedbackQuestion(question) {
        const feedbackMode = this.state?.feedbackFormBean?.mode;
        if(question.questionTypeId===1) {//Text
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="text" className="form-control" id={'fb_question_'+question.id} 
                            onChange={e => question.feedbackResponse=e.target.value || ''} >
                        </input>
                    </div>
                    {
                        question.errorMessage && question.errorMessage.length>0 && 
                        <span className="error-msg">{question.errorMessage}</span>
                    }
                    
                </>
            );
        }
        else if(question.questionTypeId===2) {//Text Area
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <textarea className="form-control" id={'fb_question_'+question.id} rows="3" 
                            onChange={e => question.feedbackResponse=e.target.value || ''} > 
                            {question.feedbackResponse}                           
                        </textarea>
                    </div>
                    {
                        question.errorMessage && question.errorMessage.length>0 && 
                        <span className="error-msg">{question.errorMessage}</span>
                    }
                </>
            );
        }
        else if(question.questionTypeId===3) { //3=Select Dropdown ; 
            return (
                <>
                <div className="form-group feedback-form-group">
                    <label for={'fb_question_'+question.id}>{question.name}</label>
                    <select className="form-control" id={'fb_question_'+question.id} 
                        placeholder="--Select--" 
                        onChange={e => this.handleSingleChoices(e, question)} >
                        { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                              <option key={'option_'+i} value={option.id} 
                                selected={option.selected===true}>{option.name}</option>
                        )}
                    </select>
                </div>
                {
                    question.errorMessage && question.errorMessage.length>0 && 
                    <span className="error-msg">{question.errorMessage}</span>
                }
                </>
            );
        }
        else if(question.questionTypeId===5) { //5=Radio Button
            return (
                <>
                <div className="form-group feedback-form-group">
                    <label for={'fb_question_'+question.id}>{question.name}</label>                    
                    { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                            <div class="form-check feedback-question">
                                <input class="form-check-input" type="radio" name={'q_radio_'+question.id} 
                                    id={'q_radio_option_'+option.id} value={option.id} 
                                    onChange={e => this.handleSingleChoices(e, question)} />
                                <label class="form-check-label" for={'q_radio_option_'+option.id}>
                                    {option.name}
                                </label>
                            </div>
                    )}
                </div>
                {
                    question.errorMessage && question.errorMessage.length>0 && 
                    <span className="error-msg">{question.errorMessage}</span>
                }
                </>
            );
        }
        else if(question.questionTypeId===6) { //Multiple Choice
            return (
                <>
                <div className="form-group feedback-form-group">
                    <label for={'fb_question_'+question.id}>{question.name}</label>
                    { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                        <div class="form-check feedback-question">
                            <input class="form-check-input" type="checkbox" value={option.id} 
                            id={'fb_question_choice'+option.id} 
                            onChange={e => this.handleMultipleChoices(e, question)} />
                            <label class="form-check-label" for={'fb_question_choice'+option.id}>
                               { option.name}
                            </label>
                        </div>
                    )}
                </div>
                {
                    question.errorMessage && question.errorMessage.length>0 && 
                    <span className="error-msg">{question.errorMessage}</span>
                }
                </>
            );
        }
        if(question.questionTypeId===8) {//Date
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="text" className="form-control" id={'fb_question_'+question.id} 
                            onChange={e => question.feedbackResponse=e.target.value || ''} >
                        </input>
                    </div>
                    {
                        question.errorMessage && question.errorMessage.length>0 && 
                        <span className="error-msg">{question.errorMessage}</span>
                    }
                    
                </>
            );
        }
        else if(question.questionTypeId===9) {//Email
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="email" className="form-control" id={'fb_question_'+question.id} 
                            onChange={e => question.feedbackResponse=e.target.value || ''} >
                        </input>
                    </div>
                    {
                        question.errorMessage && question.errorMessage.length>0 && 
                        <span className="error-msg">{question.errorMessage}</span>
                    }
                    
                </>
            );
        }
        else if(question.questionTypeId===10) {//Mobile Number
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="text" className="form-control" id={'fb_question_'+question.id} 
                            onChange={e => question.feedbackResponse=e.target.value || ''} >
                        </input>
                    </div>
                    {
                        question.errorMessage && question.errorMessage.length>0 && 
                        <span className="error-msg">{question.errorMessage}</span>
                    }
                    
                </>
            );
        }
        return (
            <>
            </>
        );
    }

    renderReadOnlyFeedbackQuestion(question) {
        if(question.questionTypeId===1) {//Text
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="text" className="form-control" id={'fb_question_'+question.id} 
                            value={question.feedbackResponse} 
                            disabled>
                        </input>
                    </div>
                </>
            );
        }
        else if(question.questionTypeId===2) {//Text Area
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <textarea className="form-control" id={'fb_question_'+question.id} rows="3" 
                            disabled> 
                            {question.feedbackResponse}                           
                        </textarea>
                    </div>
                </>
            );
        }
        else if(question.questionTypeId===3) { //3=Select Dropdown ; 
            return (
                <>
                <div className="form-group feedback-form-group">
                    <label for={'fb_question_'+question.id}>{question.name}</label>
                    <select className="form-control" id={'fb_question_'+question.id} 
                        placeholder="--Select--" 
                        onChange={e => question.feedbackResponse=e.target.value || ''} 
                        disabled>
                        { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                              <option key={'option_'+i} value={option.id} 
                                selected={option.selected===true}>{option.name}</option>
                        )}
                    </select>
                </div>
                </>
            );
        }
        else if(question.questionTypeId===5) { //5=Radio Button
            let employeeId = this.props.match.params.instructorId || 0;
            let instructorName = this.props.location.state.instructorName;
            if(employeeId>0) {
                return (
                    <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>                    
                        { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                                <>
                                {option.selected && 
                                    <>
                                    <div className="alert-heading"><b>{option.name}</b>                        
                                        <span className="rating pull-right" >{question.rating}</span>
                                    </div>
                                    </>
                                }
                                </>                                
                        )}
                    </div>
                    </>
                );    
            }
            else {
                return (
                    <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>                    
                        { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                                <div class="form-check feedback-question">
                                    <input class="form-check-input" type="radio" name={'q_radio_'+question.id} 
                                        id={'q_radio_option_'+option.id} value={option.id} 
                                        checked={option.selected===true} 
                                        disabled/>
                                    <label class="form-check-label" for={'q_radio_option_'+option.id}>
                                        {option.name}
                                    </label>
                                </div>
                        )}
                    </div>
                    </>
                );
            }
        }
        else if(question.questionTypeId===6) { //Multiple Choice
            return (
                <>
                <div className="form-group feedback-form-group">
                    <label for={'fb_question_'+question.id}>{question.name}</label>
                    { question.feedbackFormQuestionChoiceBeans.map((option, i) =>
                        <div class="form-check feedback-question">
                            <input class="form-check-input" type="checkbox" value={option.id} 
                            id={'fb_question_choice'+option.id} 
                            checked={option.selected===true} 
                            disabled/>
                            <label class="form-check-label" for={'fb_question_choice'+option.id}>
                               { option.name}
                            </label>
                        </div>
                    )}
                </div>
                </>
            );
        }
        if(question.questionTypeId===8) {//Date
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="text" className="form-control" id={'fb_question_'+question.id} 
                            value={question.feedbackResponse} 
                            disabled>
                        </input>
                    </div>
                </>
            );
        }
        else if(question.questionTypeId===9) {//Email
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="email" className="form-control" id={'fb_question_'+question.id} 
                            value={question.feedbackResponse} 
                            disabled>
                        </input>
                    </div>
                </>
            );
        }
        else if(question.questionTypeId===10) {//Mobile Number
            return (
                <>
                    <div className="form-group feedback-form-group">
                        <label for={'fb_question_'+question.id}>{question.name}</label>
                        <input type="text" className="form-control" id={'fb_question_'+question.id} 
                            value={question.feedbackResponse} 
                            disabled>
                        </input>
                    </div>
                </>
            );
        }
        return (
            <>
            </>
        );
    }


    renderFooter() {
        //console.log("FeedbackForm -> renderFooter()... ");
        const feedbackQuestionBeans = this.state?.feedbackFormBean?.feedbackQuestionBeans;
        const feedbackMode = this.state?.feedbackFormBean?.mode;
        return ( 
            <>
            {
            feedbackQuestionBeans && feedbackMode!=='view' && 
            <div className="ilearn-footer">                    
                <Row>
                    <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.submit()}>
                        <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block text-uppercase" > 
                            <b className="color-white">Submit</b>&nbsp;
                            <FontAwesomeIcon icon={ faPaperPlane }  size = 'lg' color='#fff'/> &nbsp;
                        </button>
                    </Col>
                </Row>
            </div>
            }
            </>
        );
    }
    
    renderLoader() {
        //console.log("FeedbackForm -> renderLoader()... ");
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    toggleLoading = () => {
        //console.log("FeedbackForm -> toggleLoading()... ");
        this.setState(state => ({ showLoading: !state.showLoading }));
    };

    handleSingleChoices = (event, question) => {
        //console.log("handleSingleChoices....");
        question.feedbackFormQuestionChoiceBeans.forEach(choice => {
            choice.selected = false;
            if (choice.id === parseInt(event.target.value)) {
                choice.selected = true; //event.target.checked;
                question.feedbackResponse = choice.id;
            }
        })
    }

    handleMultipleChoices = (event, question) => {
        //console.log("handleMultipleChoices....");
        let selectedChoices = [];
        question.feedbackFormQuestionChoiceBeans.forEach(choice => {
            if (choice.id === parseInt(event.target.value)) {
                    choice.selected =  event.target.checked;
            }
        })
        question.feedbackFormQuestionChoiceBeans.forEach(choice => {
            if (choice.selected === true) {
                selectedChoices.push(choice.id);
            }
        })
        question.feedbackResponse=selectedChoices.join();
    }

    submit = () => {
        //console.log("FeedbackForm -> submit()... ");
        //console.log(JSON.stringify(this.state.feedbackFormBean));
        let user = JSON.parse(localStorage['user']);
        let feedbackFormBean = this.state.feedbackFormBean;
        let employeeId = this.props.match.params.instructorId || 0;
        let courseId = this.props.match.params.courseId || 0;
        feedbackFormBean.employeeId = employeeId;
        feedbackFormBean.courseId = courseId;
        feedbackFormBean.applicableToUserId = this.props.location.state.userId || 0;
        feedbackFormBean.respondentToUserId = this.props.location.state.userId ? user?.userId : 0;
       
        this.setState({ showLoading: true }, () => {
            ApiService.saveFeedbackForm(feedbackFormBean, 0)
            .then((res) => {
                //console.log("FeedbackForm -> submit(); res : "+JSON.stringify(res.data));
                let respData = res.data;
                if(respData.status==0) {
                    let questions = [];        
                    for(let question of feedbackFormBean.feedbackQuestionBeans) {
                        question.errorMessage=null;
                        for(let i=0; i<respData.data.length; i++) {
                            if(parseInt(respData.data[i].id) === question.id) {
                                question.errorMessage=respData.data[i].message;
                                break;
                            }
                        }
                        questions.push(question);
                    }
                    feedbackFormBean.feedbackQuestionBeans=questions;
                    this.setState({
                        showLoading: false,
                        feedbackFormBean : feedbackFormBean
                    });
                    this.showErrorAlert(respData.message);
                }
                else {  //SuccessCB      
                    //this.showMessage("Confirmation Message", respData.message);
                    this.setState({
                        showLoading: false
                    });
                    this.showSuccessAlert(respData.message);                                        
                }
            });              
        });
    }

    showSuccessAlert(message) {
        swal({
            text: message,
            icon: "success",
            button: "Ok",
            allowOutsideClick: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then(exit => {
            this.props.history.goBack();
        });
    }

    showErrorAlert(message) {
        swal({
            text: message,
            icon: "warning",
            button: "Ok",
            allowOutsideClick: false,
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then(exit => {
            //console.log("Error!");
        });
    }

}

  
export {FeedbackForm};

/*
    References:
    Card -> https://getbootstrap.com/docs/4.0/components/card/

*/