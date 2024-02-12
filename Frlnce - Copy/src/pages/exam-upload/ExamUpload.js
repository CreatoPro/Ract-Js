import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./ExamUpload.css";
import uploads from "./images/uploads.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight,faFile } from '@fortawesome/free-solid-svg-icons';
import Loader from './../../_components/loader/loader';
import {getExamUpload} from './../../_actions/examUploadActions';

class ExamUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      secondsActiveAfterExamSubmit:0
    };
  }

  componentDidMount() {
    let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    //portlet.params.secondsActiveAfterExamSubmit
    this.props.getExamUpload(portlet.params.testCategoryIds,portlet.params.secondsActiveAfterExamSubmit);
    //this.props.getExamUpload(portlet.params.testCategoryIds,18000);
    this.setState({ secondsActiveAfterExamSubmit: portlet.params.secondsActiveAfterExamSubmit });
  }

  render() {
    console.log(this.props);
    let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    const { loading } = this.state;
    return (
      <div className="Analysis">
        {
          <Container fluid>
              <div className="module-header">
                <div className= {`module-header-inner ${portlet.class ? portlet.class : 'orange-card'}`}>
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/dashboard','') }/>
                </div>
                  <img src={uploads} alt="test" /> 
                </div>
                <div className="arrow-set">
                  <h4>Pick your exam for upload</h4>
                </div>
              </div>
              
              {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
  }

  renderCard() {
    //console.log(this.props.examupload);
		return  <div className="card_list analysis_details examList"> 
		{
      this.props.examupload && 
      this.props.examupload.length ?
		  this.props.examupload.map((item, index) => {
			 return (
        <div  key={index} className="cardbody" onClick={() => this.routeChange("/exam/upload/"+ item.id, item.completedOn)}>
          <FontAwesomeIcon className="Book" icon={ faFile } /> 
          <h4 className="head">{item.name}</h4>
          <FontAwesomeIcon icon={ faArrowRight }  />
        </div> 
			  )
      })    
      : <div className="cardbody"> <h4 className="no_result"> Looks like you have not submitted any exam in the last {this.state.secondsActiveAfterExamSubmit/60} minutes </h4></div> 
    }
    </div>
  }
  
  /*routeChange = (card) => {
    this.props.history.push({
      pathname: '/exam/list',
      state: { card: card }});
  };*/

  routeChange(path, testEndTime) {
    this.props.history.push({pathname: path , state: { testEndTime: testEndTime }});
  }

}

const mapStateToProps = state => ({
  examupload: state.examupload.examupload
});

const mapDispatchToProps = {
  getExamUpload: getExamUpload,
};


export default connect(mapStateToProps,mapDispatchToProps) (ExamUpload);
