import React, { Component } from "react";
import { Container, Accordion , Card, Button, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from '../../_components/iloader/iloader';
import Config from '../../_config/config'
import './FeedbackForm.css';
import swal from 'sweetalert';
import Iframe from "../../_components/iframe/iframe";

class InstructorFeedback extends Component { 

	constructor(props) {
        super(props);
        //console.log("InstructorFeedback -> constructor()... ");
        this.state = {
            message: null,
            showLoading: false,
            courseFeedbackFormBeans : []           
        };       
    }
    
    componentDidMount() {
        //console.log("FeedbackForm -> componentDidMount()... ");
        this.init();
    }
    
    init() {
        //console.log("FeedbackForm -> init()... ");        
        this.setState({ showLoading: true }, () => {
            ApiService.getInstructorFeedbackForms()
            .then((res) => {
              console.log("InstructorFeedback -> init(); res : "+JSON.stringify(res.data.data));
              this.setState({
                showLoading: false,
                courseFeedbackFormBeans : res.data.data
              });
            });
        });
    }

    giveFeedback(feedbackFormId, employeeFeedbackBean, courseId) {
        let instructorId = employeeFeedbackBean.id
        let instructorName = employeeFeedbackBean.name
        let _path = '/feedback/form/'+feedbackFormId+'/instructor/'+instructorId+'/course/'+courseId;
        let data = {'instructorName': instructorName};
		data.studyResource = {id:feedbackFormId, name:'Feedback1'};
		this.props.history.push({pathname: _path, state: data});
    }
    
    render() {
        //console.log("InstructorFeedback -> render()... ");        
        return (  
            <>                
                <Container fluid >
                    <>
                        {this.renderHeader()}
                        {this.renderBody()}
                    </>
                    {this.renderLoader()}                    
                </Container>
            </>           
              
        );
    }

    renderHeader() {
        //console.log("InstructorFeedback -> renderHeader()... ");
        let CURRENT_PORTLET = JSON.parse(localStorage['portlet']);
        return (
            <div className={`ilearn-plain-header ${CURRENT_PORTLET.class}`}>
                <div className="back">
                    <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                {
                   <h4>{CURRENT_PORTLET.name}</h4>  
                }
            </div>
        )
    }

    renderBody() {
        //console.log("InstructorFeedback -> renderBody()... ");
        const courseFeedbackBeans = this.state?.courseFeedbackFormBeans;
        return (
            <>
                <Accordion defaultActiveKey="0">
                {
                    courseFeedbackBeans.map((courseFeedbackBean, index) => {
                        return (                        
                            <Card key={index}>
                                <Card.Header>
                                    {courseFeedbackBean.courseName}
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="float-right">
                                        <FontAwesomeIcon icon={ faChevronDown } />
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    {this.renderEmployeeFeedbackBeans(courseFeedbackBean.courseId, courseFeedbackBean.employeeFeedbackBeans)}
                                </Accordion.Collapse>
                            </Card>                        
                        )
                    })
                }
                </Accordion>
            </>
        );
    }

    renderEmployeeFeedbackBeans(courseId, employeeFeedbackBeans) {
        return (
            <>
            <ListGroup className="list-group-flush">
            {
                employeeFeedbackBeans.map((employeeFeedbackBean, index) => {
                    return (
                        <ListGroupItem key={index}>{employeeFeedbackBean.name}
                            <div>
                                {[...Array(employeeFeedbackBean.numberOfFeedbackAvailable)].map((x, i) => {
                                        return(
                                            <>
                                            {employeeFeedbackBean['responseForLink'+(i+1)] === true && 
                                                <>
                                                <Badge variant="success" className="instructor_feedback_button" onClick={()=>this.giveFeedback(employeeFeedbackBean['link'+(i+1)], employeeFeedbackBean, courseId)}>
                                                    Feedback {i+1} Given
                                                </Badge>{' '}
                                                </>
                                            }
                                            {employeeFeedbackBean['responseForLink'+(i+1)] == false && 
                                                <>    
                                                <Badge variant="warning" className="instructor_feedback_button" onClick={()=>this.giveFeedback(employeeFeedbackBean['link'+(i+1)], employeeFeedbackBean, courseId)}>
                                                    Give Feedback {i+1}
                                                </Badge>{' '}
                                                </>
                                            }
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </ListGroupItem>
                    )
                })
            }
            </ListGroup>
            </>
        )
    }
    
    renderLoader() {
        //console.log("InstructorFeedback -> renderLoader()... ");
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
        //console.log("InstructorFeedback -> toggleLoading()... ");
        this.setState(state => ({ showLoading: !state.showLoading }));
    };

}

  
export {InstructorFeedback};

/*
    References:
    Card -> https://getbootstrap.com/docs/4.0/components/card/

*/