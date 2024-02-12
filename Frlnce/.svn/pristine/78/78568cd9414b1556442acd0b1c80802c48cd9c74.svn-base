import React, { Component } from "react";
import "./discussion.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import UserService from "../../_services/UserService";
import CKEditor from 'ckeditor4-react';
import {ILoader} from './../../_components/iloader/iloader';

class AddTopic extends Component { 

	constructor(props) {
        super(props);
        console.log("AddTopic -> constructor()... ");
        this.state = {
            message: null,
            showLoading: false,
            discussionBoard: null,
            commentDetails:{
                id: 0,
                title: '',
                content: ''
            },
            errorMessage: null
        };
    }
    
    componentDidMount() {
        console.log("AddTopic -> componentDidMount()... ");
        //this.init();
    }
    
    render() {
        console.log("AddTopic -> render()... ");        
        return (  
            <>
                <div className="ilearn-full-height">
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderLoader()}                    
                    </Container>
                </div>
                {this.renderFooter()}
            </>           
              
        );
    }

    renderHeader() {
        console.log("AddTopic -> renderHeader()... ");
        let CURRENT_PORTLET = JSON.parse(localStorage['portlet']);
        return (
            <div className={`ilearn-plain-header ${CURRENT_PORTLET.class}`}>
                <div className="back">
                <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                <h4>Ask a question</h4>
            </div>
        )
    }

    renderBody() {
        console.log("AddTopic -> renderBody()... ");
       return  (
            <div className="ilearn-padding-top ilearn-padding-both-sides">
                <Form>
                    <Form.Group controlId="subject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" placeholder="Enter subject" 
                        name="title" onChange={this.updateInput} />
                    </Form.Group>
                    <Form.Group controlId="question">
                        <Form.Label>Question</Form.Label>
                        <CKEditor
                            name="content"
                            placeholder="Compose message"
                            data={this.state.commentDetails.content}
                            onChange={this.updateEditor}
                        />
                    </Form.Group>
                </Form>
                {
                    this.state.errorMessage &&                 
                    <div className="error-message">
                        {this.state.errorMessage}
                    </div>
                }
            </div>
        );
    }

    renderFooter() {
        console.log("AddTopic -> renderFooter()... ");
        return ( 
            <>
            {
            
            <div className="ilearn-footer">                    
                <Row>
                    <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.createTopic()}>
                        <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block" > 
                            <b>Post</b> &nbsp;
                            <FontAwesomeIcon icon={ faPaperPlane }  size = 'lg' color='#fff'/>  
                        </button>
                    </Col>
                </Row>
            </div>
            }
            </>
        );
    }
    
    renderLoader() {
        console.log("AddTopic -> renderLoader()... ");
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    updateInput = (e) =>{
        let v = e.target.value;
        let k = e.target.name;
        let commentDetails = {...this.state.commentDetails}
        commentDetails[k] = v;
        this.setState({commentDetails});
    }

    updateEditor = (e) => {
        const v = e.editor.getData();
        const k = "content";
        let commentDetails = {...this.state.commentDetails}
        commentDetails[k] = v;
        this.setState({commentDetails});
        //console.log(this.state)
    }
    
    createTopic() {
        console.log("AddTopic -> createTopic()... ");
        let { commentDetails } = this.state;
        if (commentDetails.title && commentDetails.content) {
            commentDetails.userId = UserService.getUserId();
            commentDetails.enquiryId = UserService.getEnquiryId();
            commentDetails.discussionBoardId = this.props.location.state.discussionBoardId;               
            console.log("AddTopic -> createTopic : "+JSON.stringify(commentDetails));
            this.setState({ showLoading: true }, () => {
                ApiService.addTopic(commentDetails)
                .then((res) => {
                  console.log("AddTopic -> createTopic(); res : "+JSON.stringify(res));
                  this.setState({
                    showLoading: false
                  });
                  this.props.history.goBack();
                });
            });
        }
        else {
            this.setState({ errorMessage:'All fields are mandatory.' });    
        }
    }

    toggleView(view) {
        this.setState(state => ({ view: view }));    
    }

    toggleLoading = () => {
        console.log("AddTopic -> toggleLoading()... ");
        this.setState(state => ({ showLoading: !state.showLoading }));
    };

}


  
export {AddTopic};