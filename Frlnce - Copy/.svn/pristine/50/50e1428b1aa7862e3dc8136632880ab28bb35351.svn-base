import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import "./ExamUpload.css";
import Parser from 'html-react-parser';
import dateFormat from 'dateformat';

class ExamUploadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
      result: 0,
      selectedFile: null,
      invalidImage:"",
      submitDateBefore:""
    };
  }

  componentDidMount() {
  }

  onFileChange = event => {  
    // Update the state 
    var File = event.target.files[0];
    this.setState({ selectedFile: File });
    if (!File) {
      this.setState({ invalidImage: 'Please Upload your handwritten PDF File.' });
      return false;
    }
   
    if (!File.name.match(/\.(pdf|PDF)$/)) {
      this.setState({ invalidImage: 'Please select PDF File.' });
      return false;
    }else{
      this.setState({ invalidImage: '' });
    }

  };

  onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
    // Update the formData object 
    if(this.state.selectedFile){
      let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
      var compltedDate = this.props.location.state.testEndTime;
      var submitDateBefore ="";
      if(compltedDate){
        var d = new Date(compltedDate);
        var minutes = portlet.params.secondsActiveAfterExamSubmit/60;
        var newtime = d.setMinutes ( d.getMinutes() + minutes );
        submitDateBefore = dateFormat(newtime, "yyyy-mm-dd HH:MM:ss");
        //submitDateBefore = "2020-09-30 23:00:00";
      }
      formData.append('dateBefore', submitDateBefore);
      formData.append( 
        "answersheetFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name,    
      );
      var testId = this.props.match.params.id;
      this.setState({ loading: true }, () => {
        ApiService.uploadFile(formData,testId)
        .then((res) => {
            this.setState({
              loading: false,
            });
            if(res.data.type=="error"){
              this.setState({ invalidImage: res.data.message });
            }else if(res.data.type=="timeout"){
              this.setState({ invalidImage: portlet.params.TimeoutMessage });
            }else{
              if(res.data.url){
                this.props.history.push({ pathname: '/exam/pdfview/'+testId, state: { pdfpreview: res.data.url, testEndTime: compltedDate} });
              }
              
            }
        })
        .catch(err => {
          console.log(err);
          this.setState({ invalidImage: err });
        });
      });

       // Details of the uploaded file 
       console.log(this.state.selectedFile);        
  
    }else{
      this.setState({ invalidImage: 'Please Upload your handwritten PDF File.' });
    }
    
  }; 

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
    const { loading } = this.state;
    let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    var compltedDate = this.props.location.state.testEndTime;
    if(compltedDate){
      var d = new Date(compltedDate);
      var minutes = portlet.params.secondsActiveAfterExamSubmit/60;
      var newtime = d.setMinutes ( d.getMinutes() + minutes );
      //var submitDateBefore = dateFormat(newtime, "yyyy-mm-dd HH:MM:ss");
      //this.setState({ submitDateBefore: submitDateBefore });
      var submit_time = dateFormat(newtime, "h:MM TT");
    }
    
    return (
      <div className="testlist">
        {
          <Container fluid>
          <div className="learn-header">
          <div className={`module-header-step2 AnalysisReport ${portlet.class ? portlet.class : 'orange-card'}`}>
					<div className="back">
					  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/examUpload') } />
					</div>
					<h4>Exam Uploads</h4>
          </div>
          </div>
          <div className="testResult testFileupload">
              <div className="">
                <h4>Upload PDF</h4>
                <p class="help-block">{Parser(portlet.params.DisplayTextOnUploadScreen)}</p>
                <p>You have to complete the upload process by: <strong>{submit_time}</strong></p>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile" name="answersheetFile" onChange={this.onFileChange}/>
                  <label class="custom-file-label" for="customFile">{this.state.selectedFile ? this.state.selectedFile.name : 'Choose file'} </label>
                </div>
                <p class="error">{this.state.invalidImage}</p>
                <button type="submit" class="btn btn-primary full-width" onClick={this.onFileUpload}>Upload File</button>
              </div>
          </div>
          {loading ?  <Loader /> : ""}
          </Container>
        }
      </div>
    );
  }

}

export default ExamUploadDetails;
