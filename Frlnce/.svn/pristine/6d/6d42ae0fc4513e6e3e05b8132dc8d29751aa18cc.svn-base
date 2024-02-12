import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Config from './../../_config/config'

class QuizList extends Component {
  constructor(props) {    
    super(props);
    console.log("QuizList -> constructor()... ");
    console.log("QuizList -> constructor(); Portlet : "+JSON.stringify(Config.CURRENT_PORTLET));
    console.log("QuizList -> constructor(); quizBlock : "+JSON.stringify(this.props.location.state.quizBlock));
    if(!Config.CURRENT_PORTLET) {
      Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
    }
    this.state = {
      quizBlock : this.props.location.state.quizBlock,
      testCategoryId : this.props.location.state.quizBlock.testCategoryId,
      testBeans : [],
      message: null,
      showLoading: false,
      errorMessage: null
    };
    //this.init = this.init.bind(this);
  }

  componentDidMount() {
    console.log("QuizList -> componentDidMount()... ");
    this.init();
  }

  init() {
    console.log("QuizList -> init()... "+JSON.stringify(this.state.testCategoryId));
    this.setState({ showLoading: true }, () => {
        ApiService.getTestCategoryWiseTestList(this.state.testCategoryId)
        .then((res) => {
          console.log("QuizList -> init(); res : "+JSON.stringify(res));
          let testBeans = res.data.length>0?res.data[0].categoryBeans[0].testDataBeans:[];
          this.setState({
            showLoading: false,            
            testBeans : testBeans,
            errorMessage : testBeans.length<=0?"No tests found!":null
          });
        });
      });
  }
  
  render() {
    const _loadingText = 'Please wait...';
    return (
      <>
        <Container fluid>
          {this.renderHeader()}
          {this.state.errorMessage && this.renderError()}
          {!this.state.errorMessage && this.renderBody()}
          {this.renderLoader()}          
        </Container>
      </>
    );
  }

  renderHeader() {
    console.log("QuizList -> renderHeader()... ");
    return (
      <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
        <div className="back">
          <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
        </div>
        <h4>{this.state.quizBlock.displayName}</h4>
      </div>
    );
  }

  renderBody() {
    console.log("QuizList -> renderBody()... ");
    let testBeans = this.state.testBeans.sort((a, b) => a.id - b.id);
    return  <ul className="list-group">
      {
        testBeans.map((testBean, index) => {
            return (             
                <li className="list-group-item ilearn-item-border" key={index} onClick={() => this.start(testBean)}>
                  <div className="ilearn-item-block ">
                    <h4>{testBean.name}</h4>
                    <button 
                      className={`ilearn-btn-right  ${testBean.status=='Launch'? 'ilearn-blue-btn' : testBean.status=='View Result' ? 'ilearn-green-btn':'ilearn-grey-btn'}`}>
                      {testBean.status}
                    </button>
                  </div>
                </li>
            )
        })
      }
      </ul>
  }

  renderLoader() {
    console.log("QuizList -> renderLoader()... ");
    const _loadingText = 'Please wait...';
    return (
        <ILoader
          loadingText={_loadingText}
          isShow={this.state.showLoading}
        >
        </ILoader>
    )
  }

  start(testBean) {
    console.log("QuizList -> start()... "+JSON.stringify(testBean));
    if(testBean.status==='Launch') {
      this.startQuiz(testBean);      
    }
    else if(testBean.status==='View Result') {
      //this.navCtrl.push(QuizResultPage, {testBean:JSON.stringify(testBean)});
      this.showResult(testBean);
    }
  };

  startQuiz(testBean) {
    console.log("QuizList -> startQuiz()... "+JSON.stringify(testBean));
    let path = "/quizPlayer";
    this.props.history.push({
        pathname: path,
        state: { testBean: testBean }
    });
  }

  showResult(testBean) {
    console.log("QuizList -> startQuiz()... "+JSON.stringify(testBean));
    let path = "/quizResult";
    this.props.history.push({
        pathname: path,
        state: { testBean: testBean }
    });  
  }

  renderError() {
    return (
        <> 
          <br/>        
          <div className="alert alert-danger text-center">
              <h4 className="alert-heading">Error!</h4>
              <p>{this.state.errorMessage}</p>
          </div>
        </>
    )    
  }

}

export {QuizList};
