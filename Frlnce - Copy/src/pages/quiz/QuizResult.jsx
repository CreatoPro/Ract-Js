import React, { Component } from "react";
import {Container, Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Config from './../../_config/config'

class QuizResult extends Component {
  constructor(props) {    
    super(props);
    console.log("QuizResult -> constructor()... ");
    console.log("QuizResult -> constructor(); Portlet : "+JSON.stringify(Config.CURRENT_PORTLET));
    console.log("QuizResult -> constructor(); quizBlock : "+JSON.stringify(this.props.location.state.quizBlock));
    if(!Config.CURRENT_PORTLET) {
      Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
    }
    this.state = {
      testBean : this.props.location.state.testBean,
      testResult : null,
      message: null,
      showLoading: true
    };
    //this.init = this.init.bind(this);
  }

  componentDidMount() {
    console.log("QuizResult -> componentDidMount()... ");
    this.init();
  }

  init() {
    console.log("QuizResult -> init()... "+JSON.stringify(this.state.testCategoryId));
    this.setState({ showLoading: true }, () => {
        ApiService.getTestAnalysis(this.state.testBean.id)
        .then((res) => {
          let respData = res.data;
          console.log("QuizResult -> init(); res : "+JSON.stringify(respData));          
          let totalMarks = 0;
          let correctCount = 0;
          let wrongCount = 0;
          for(let index in respData) {
              //console.log("Section Marks : "+quizResult[index].marks);
              var secMarks = respData[index].marks;
              if(secMarks) {
                  totalMarks = totalMarks+parseInt(secMarks);
                  correctCount = correctCount+parseInt(respData[index].correctcount);
                  wrongCount = wrongCount+parseInt(respData[index].wrongcount);
                  respData[index].marks = parseInt(secMarks);
              }
          }
          this.setState({
            showLoading: false,
            testResult : {'totalMarks':totalMarks, 'correctCount':correctCount, 'wrongCount':wrongCount}
          });
        });
      });
  }
  
  render() {
    const _loadingText = 'Please wait...';
    return (
      <>
        <div className="ilearn-full-height page-quiz-zone">
          <Container fluid>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderLoader()}          
          </Container>
        </div>
      </>
    );
  }

  renderHeader() {
    console.log("QuizResult -> renderHeader()... ");
    return (
      <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
        <div className="back">
          <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
        </div>
        <h4>{this.state.testBean.name}</h4>
      </div>
    );
  }

  renderBody() {
    console.log("QuizResult -> renderBody()... ");
    return (
      <>
        {
        !this.state.showLoading && this.state.testResult && 
        <div className="ilearn-padding-top">
          <Card className="mx-auto" style={{ maxWidth: '75rem' }}>
          <Card.Header>
            <h2>Quiz Result</h2>
          </Card.Header>
            <Card.Body>
              <Card.Text className="text-center">
              <button className="circle" style={{background:'#11c1f3', color:'#ffffff', outline: 'none'}}>
                <span style={{display:'block', fontSize:'12px'}}>Coins Won</span>
                <h1>{this.state.testResult.totalMarks}</h1>
                <img src="./assets/imgs/coins-32.png" style={{marginBottom:'2px !important'}}/>
              </button>
              </Card.Text>

              <div className="btn btn-danger btn-lg" aria-label="Left Align">
                <FontAwesomeIcon icon={ faTimes }  size = 'lg' color='#fff'/> &nbsp;
                <span>Wrong </span> &nbsp; <b>{this.state.testResult.wrongCount}</b>
              </div>

              <div className="btn btn-success btn-lg float-right" aria-label="Left Align">
                <FontAwesomeIcon icon={ faCheck }  size = 'lg' color='#fff'/> &nbsp;
                <span>Correct </span> &nbsp; <b>{this.state.testResult.correctCount}</b>
              </div>
            </Card.Body>
          </Card>
        </div>
        }
      </>
    );
    
  }

  renderLoader() {
    console.log("QuizResult -> renderLoader()... ");
    const _loadingText = 'Please wait...';
    return (
        <ILoader
          loadingText={_loadingText}
          isShow={this.state.showLoading}
        >
        </ILoader>
    )
  }

}

export {QuizResult};
