import React, { Component } from "react";
import "./Quiz.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import test_icon from "./images/test.png";
import test_list_icon from "./images/test-list.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faTrophy, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {ILoader} from './../../_components/iloader/iloader';
import Config from './../../_config/config'

class QuizZone extends Component { 

	constructor(props) {
        super(props);
        console.log("QuizZone -> constructor()... ");
        this.state = {
            quizBlocks: this.props.location.state.portlet.params.blocks,
            message: null,
            showLoading: false,
            portlet: this.props.location.state.portlet
        };
    }
    
    componentDidMount() {
        console.log("QuizZone -> componentDidMount()... ");
        this.init();
    }
    
    init() {
        console.log("QuizZone -> init()... ");
        Config.CURRENT_PORTLET = this.state.portlet;         
        /*let quizBlocks = this.props.location.state.portlet.params.blocks || [];
        if(quizBlocks.length > 0) {
          this.setState({
            showLoading: false,
            quizBlocks: quizBlocks,
            portlet : this.props.location.state.portlet
          }); 
        }*/

    }
    
    render() {
        console.log("QuizZone -> render()... ");        
        return (  
            <>
                <div className="ilearn-full-height page-quiz-zone">
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
        console.log("QuizZone -> renderHeader()... ");
        return (
            <div className="module-header">
                <div className={`module-header-inner ${this.state.portlet.class}`} >
                    <div className="back">
                        <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                    </div>
                    <img src={test_icon} alt="test icon" /> 
                </div>
                <div className="arrow-set">
                    <h4>{this.state.portlet.name}</h4>                            
                </div>
            </div>
        )
    }
    
    renderBody() {
        console.log("QuizZone -> renderBody()... ");
        let data = this.state.quizBlocks;
        return  (
            <div className="ilearn-padding-top"> 
                {
                    data.map((quizBlock, index) => {
                        return ( 
                            <div key={index} className="ilearn-padding-both-sides ilearn-padding-top">
                                <Card onClick={() => this.showQuizList(quizBlock)}>
                                <Card.Body>
                                    <div className="ilearn-item-block ">
                                        <img className="ilearn-avatar" src={test_list_icon} alt={quizBlock.displayName} />
                                        <h4 className="ilearn-item-inner">{quizBlock.displayName}</h4>
                                        <FontAwesomeIcon icon={ faChevronRight }  size = 'lg' color="gray" className="float-right"/>
                                    </div>
                                </Card.Body>
                                </Card>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderFooter() {
        console.log("QuizZone -> renderFooter()... ");
        return ( 
            <div className="ilearn-footer">                    
                <Row>
                    <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.showLeaderBoard()}>
                        <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block" > 
                            <FontAwesomeIcon icon={ faTrophy }  size = 'lg' color='#fff'/> &nbsp;
                            <b>LEADER BOARD</b> 
                        </button>
                    </Col>
                    <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.showWallet()}>
                        <button className="btn ilearn-footer-btn btn-block" > 
                            <FontAwesomeIcon icon={ faCreditCard }  size = 'lg' color='#fff'/> &nbsp;
                            <b>WALLET</b> 
                        </button>
                    </Col>
                </Row>
            </div>
        );
    }

    renderLoader() {
        console.log("QuizZone -> renderLoader()... ");
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
        console.log("QuizZone -> toggleLoading()... ");
        this.setState(state => ({ showLoading: !state.showLoading }));
    };

    showQuizList(quizBlock) {
        console.log("QuizZone -> showQuizList(): "+JSON.stringify(quizBlock));
        let path = "/quizList";
        this.props.history.push({
            pathname: path,
            state: { quizBlock: quizBlock }
        });
    }

    showLeaderBoard() {
        console.log("QuizZone -> showLeaderBoard()... ");
        let path = "/leaderboard";
        this.props.history.push({
            pathname: path
        });    
    }
    
    showWallet() {
        console.log("QuizZone -> showWallet()... ");
        let path = "/wallet";
        this.props.history.push({
            pathname: path
        });    
    }

}


  
export {QuizZone};