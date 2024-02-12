import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Config from "../../_config/config";
import Card from 'react-bootstrap/Card'
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import swal from 'sweetalert';
import Utils from "../../_helpers/utils";

const AWS = require('aws-sdk');
AWS.config.clear();
AWS.config.update({
	region: Config.AWSRegion,
	accessKeyId: Config.AWSAccessKeyId,
	secretAccessKey: Config.AWSSecretAccessKey
  });

class TestListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      tests:[],
      download : "Download",
	  testname: "Online Test"
    };
    this.reloadTestListDetails = this.reloadTestListDetails.bind(this);
    this.downloadTest = this.downloadTest.bind(this);
  }

  componentDidMount() {
    let paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
    let enquiryId =  params.get('enquiryId');
    if(enquiryId){
      localStorage.setItem('enquiryId', enquiryId);
    }
    this.reloadTestListDetails();
  }

  openTest = (testID) => {
    var url = '/TestInstructions/'+testID+'?cat='+this.props.match.params.id;
    window.open(url, 'Start Test', 'height=' + window.screen.height + ',width=' + window.screen.width);
	}

  reloadTestListDetails() {
    var testlist = JSON.parse(localStorage.getItem('testlist')) || [];
	  var online = navigator.onLine;
    if(online == false){
      this.setState({
        loading: false,
        list: testlist
      });
      /*this.setState({ loading: true }, () => {
        ApiService.fetchTestList()
        .then((res) => {
            this.setState({
              loading: false,
              list: res.data
            });
        });
      }); */
    }else{
      this.setState({ loading: true }, () => {
        ApiService.fetchTestList()
        .then((res) => {
            this.setState({
              loading: false,
              list: res.data
            });
        });
      });
    }
  }

  payCheck(path,testID) {
    this.setState({ loading: true }, () => {
      let payLoad = {
        "type": "test",
        "testId": testID 
      };
      ApiService.studentPayCheck(payLoad)
      .then((res) => {
          this.setState({
            loading: false,
          });
          if(res.data.type==2){
            const wrapper = document.createElement('div');
            wrapper.innerHTML = res.data.message;
            swal({
              title: "Alert",
              content: wrapper,
              dangerMode: true,
              buttons: true,
              className: 'blue-card'
            })
            .then((willResume) => {
              if (willResume) {
                
              }
            });
          }else {
            this.props.history.push( { pathname: path, state: {testEndDate: '', testCategory: ''} } );
          }
      });
    });	
  }

  routeChange(path,testID) {
    this.payCheck(path, testID);
  }

  routeChange2(path,endDate,testCategory) {
    this.props.history.push( { pathname: path, state: {testEndDate: endDate, testCategory: testCategory} } );
  }

 addUrlToCache(url) {
    window.fetch(url).then(function(response) {
      caches.open('test-images').then(function(cache) {
        cache.add(url);
      });
    }).catch(function(error) {
        console.log("cache put image error "+error);
    });
  }
  
  
  showAlert(msg) {
	  swal({
			title: "Alert",
			text: msg,
			dangerMode: true,
	   });
  }

  downloadTest(testid) {
      ApiService.fetchTest(testid)
      .then((res) => {
          if(res.data.status==1 && res.data.data.tests[0].testJSONFile!="TestJSONNotFound"){
            var d = new Date();
            var rand = d.getTime();
            var studentPdfResponse = res.data.data.tests[0].studentPdfResponse;
            ApiService.fetchTestJson(res.data.data.tests[0].testJSONFile+"?id="+rand)
            .then((res) => {
              this.setState({tests: res.data});
              //alert(JSON.stringify(res.data.testImages));
              var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
              if (oldTests.filter(test=> test.id == testid).length == 0){
                res.data.resume=0;
                res.data.studentPdfResponse=studentPdfResponse;
                oldTests.push(res.data);  
                localStorage.setItem('tests', JSON.stringify(oldTests));
                this.props.history.replace('/test-instructions/'+this.props.match.params.id+'/'+testid);
                /*var images = "";
                images = res.data.testImages;
                if(!images){
                }else{
                  //for(let i=0;i<images.length; i++){
                    //this.addUrlToCache(images[i].replace('http://','https://'));
                    //var per = (i/images.length)*100;
                    //progress(per);
                  //}
                }*/
                //this.addUrlToCache("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML");
                //this.reloadTestListDetails();
              }
            });
          }else{
            swal({
              title: "Alert",
              text: "Online test not available. Please contact administrator",
              dangerMode: true,
            });
          }
      });
  }



  render() {
	  let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    const { loading } = this.state;
    return (
      <div className="testlist">
        {
          <Container fluid>
              <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
                <div className="">
					<div className="back">
					  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange2('/TestList')} />
					</div>
					<h4 id="testname"></h4>
                </div>
              </div>
              {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
  }

  renderCard() {
	  let data = this.state.list;
		return <div className="card_list"> 
		{
		  data.map((item, index) => {
			return (
			 <div>{this.renderTest(data[index].id,data[index].name, data[index].categoryBased , data[index].categoryBeans)}</div>
			)
		  })
    }
    </div>
  }
  
  renderTest(id, name, categoryBased, categoryBeans){
  let isMobile = Utils.isMobileDevice();
	return <div>
  {	
    categoryBased===true ?	
      categoryBeans.map((c, i) =>{
        let test_parentcat_id = localStorage.getItem('test_parentcat_id') || 0;
        if(c.id==this.props.match.params.id && id == test_parentcat_id){
          document.getElementById('testname').innerHTML = c.name;
            return (
            <div className="">
              { isMobile===true ? 
                <div className="card_list">{this.renderTestListMobile(c.testDataBeans)} </div> : 
                <div className="download_list zoom_video_list card_list">{this.renderTestListDesktop(c.testDataBeans)}</div>
              }
            </div>
          )
        }
      })
    :
      categoryBeans.map((c, i) =>{
        if(id==this.props.match.params.id){
            document.getElementById('testname').innerHTML = name;
            return (
            <div className="">
              { isMobile===true ? 
                <div className="card_list">{this.renderTestListMobile(c.testDataBeans)} </div> : 
                <div className="download_list zoom_video_list card_list">{this.renderTestListDesktop(c.testDataBeans)}</div>
              }
            </div>
          )
        }
      })
	}
	</div>
  }
  
  renderTestList(beans){
	  return <div>
	  {
      beans.sort((a, b) => b.id - a.id) 
      .map((d, j) =>{
        var button;
        var sedate = '';
        if(d.startDate != "--"){
          sedate = d.startDate +'-'+ d.endDate;
        }else{
          sedate = <br />
        }
	  
      if(d.status=="Launch"){
        var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
        if (oldTests.filter(test=> test.id == d.id).length == 0){
          button =  <button onClick={() => this.downloadTest(d.id)} className="download blue-card">Start</button>
        }else{
          button=  <button onClick={() => this.routeChange('/test-instructions/'+this.props.match.params.id+'/'+d.id, d.id)} className="download blue-card">Start</button>
          for(var i=0; i<oldTests.length; i++){
            if(oldTests[i].submit==1 && (oldTests[i].id==d.id)){
              button=  <button onClick={() => this.routeChange2('/test-submit/'+this.props.match.params.id+'/'+d.id)} className="download blue-card">Submit</button>
            }else if(oldTests[i].resume==1 && (oldTests[i].id==d.id)){
              button=  <button onClick={() => this.routeChange('/test-instructions/'+this.props.match.params.id+'/'+d.id, d.id)} className="download blue-card">Resume</button>
            }
          }
        }
      }else if(d.status == "Time Out"){
        var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
        button=  <button onClick={() => this.showAlert("The test is closed at  "+d.endDate)} className="download blue-light-card">{d.status}</button>
        for(var i=0; i<oldTests.length; i++){
          if(oldTests[i].resume==1 && (oldTests[i].id==d.id)){
                button=  <button onClick={() => this.routeChange2('/test-submit/'+this.props.match.params.id+'/'+d.id)} className="download blue-card">{d.status}</button>
          }
        }     
      }else if(d.status == "View Result"){
        button=  <button onClick={() => this.routeChange2('/test-result/'+this.props.match.params.id+'/'+d.id, d.endDate)} className="download green-card">Result</button>
      }else if(d.status == "Coming Soon"){
	      button=  <button onClick={() => this.showAlert("The test is available between "+sedate)} className="download orange-card">{d.status}</button>
	    }
      
			 return (
				  <Card>
					<Card.Body>
					  <div className="cardbody">
					      <FontAwesomeIcon className="Book" icon={ faFileAlt } /> 
						  <p className="option">
						    {d.name}
						   <div className="testdate">{sedate}</div>
						  </p>
                {button}
					  </div>
					</Card.Body>
				  </Card> 
			  )
		 })
	  }
	 </div>
  }

  submitTimeOut=(testId)=>{
    const tenant = localStorage.getItem('tenant') || Config.siteTitle
    const userObject = JSON.parse(localStorage.getItem('user'));
    console.log(userObject);
    console.log(userObject.userId);

    //'https://tuningfork-'+ Config.siteMode +'.s3.amazonaws.com/'+ tenant +'/uploads/testPapers/'+ testId +'/'+ testId +'.json'
		let testUrl = 'https://tuningfork-'+ Config.siteMode +'.s3.amazonaws.com/'+ tenant +'/uploads/testPapers/'+ testId +'/'+ testId +'.json'

		
			const studentTestData = {
				"tenant":tenant,
				"testId": testId,
				"userId":userObject.userId,
				"s3Url":testUrl
			}

			//console.log(student_response);

			//alert(JSON.stringify(student_response));
			var lambda = new AWS.Lambda();
			var params = {
			FunctionName: 'testResume', /* required */
			Payload: JSON.stringify(studentTestData)
			};

				lambda.invoke(params, function(err, response) {
					if (err){
						
						//alert(Config.CONNECTION_ERROR_MSG);
						console.log(err);
					// console.log(err, err.stack); // an error occurred
					}else{
						let res = JSON.parse(response.Payload)
						let testObject = res.data; 
            console.log(testObject);
            const student_response = {
		        	"tenant":tenant,
		        	"testId": testId,
		        	"userId": [userObject.userId],
		        	"testSubmit": true,
		        	"submitStatus":1,
		        	"autoSubmitToRDS":testObject?.testConfig?.autoSubmitToRDS,
		        	"siteUrl":Config.siteUrl
		        }
          
		        console.log(student_response);
          
		        var lambda = new AWS.Lambda();
		        var params = {
		        FunctionName: 'testResponses', /* required */
		        Payload: JSON.stringify(student_response)
		        };
          
		        	lambda.invoke(params, function(err, data) {
		        		if (err){
		        		  console.log(err, err.stack); // an error occurred
		        		  alert(Config.CONNECTION_ERROR_MSG);
		        		}else{
		        		  let res = JSON.parse(data.Payload);
		        		  //console.log(data);  // successful response
                
		        		  //if(res.status=="success" && testObject?.testConfig?.autoSubmitToRDS == true){
		        			//that.SubmitToRDS();
		        		  //}else 
                  console.log(res);
				  
				          if(res.status=="success"){
					          console.log("sucesssssssss")
                    swal({
					      	    text: "Test submitted successfully.",
					      	    icon: "success",
					      	    button: "Ok",
					      	    allowOutsideClick: false,
					      	    closeOnClickOutside: false,
					      	    closeOnEsc: false
					        }).then(()=>{
                    window.location.reload();
                  })
                }
              }
      })

    }
  })
  }

  renderTestListMobile(beans){
	  return <div>
	  {
      beans.sort((a, b) => b.id - a.id) 
      .map((d, j) =>{
        var button;
        var sedate = '';
        if(d.startDate != "--"){
          sedate = d.startDate +'-'+ d.endDate;
        }else{
          sedate = <br />
        }
	  
      if(d.status=="Launch"){

        /*var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
        if (oldTests.filter(test=> test.id == d.id).length == 0){
          button =  <button onClick={() => this.downloadTest(d.id)} className="download blue-card">Start</button>
        }else{
          button=  <button onClick={() => this.routeChange('/test-instructions/'+this.props.match.params.id+'/'+d.id, d.id)} className="download blue-card">Start</button>
          for(var i=0; i<oldTests.length; i++){
            if(oldTests[i].submit==1 && (oldTests[i].id==d.id)){
              button=  <button onClick={() => this.routeChange2('/test-submit/'+this.props.match.params.id+'/'+d.id)} className="download blue-card">Submit</button>
            }else if(oldTests[i].resume==1 && (oldTests[i].id==d.id)){
              button=  <button onClick={() => this.routeChange('/test-instructions/'+this.props.match.params.id+'/'+d.id, d.id)} className="download blue-card">Resume</button>
            }
          }
        }*/

        var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
        button=  <button onClick={() => this.openTest(d.id)} className="download blue-card">Start</button>

      }else if(d.status == "Time Out"){
        var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
        button=  <button onClick={() => this.submitTimeOut(d.id)/*this.showAlert("The test is closed at  "+d.endDate)*/} className="download blue-light-card">{d.status}</button>
        for(var i=0; i<oldTests.length; i++){
          if(oldTests[i].resume==1 && (oldTests[i].id==d.id)){
                button=  <button onClick={() => this.routeChange2('/test-submit/'+this.props.match.params.id+'/'+d.id)} className="download blue-card">{d.status}</button>
          }
        }     
      }else if(d.status == "View Result"){
        button=  <button onClick={() => this.routeChange2('/test-result/'+this.props.match.params.id+'/'+d.id, d.endDate)} className="download green-card">Result</button>
      }else if(d.status == "Coming Soon"){
	      button=  <button onClick={() => this.showAlert("The test is available between "+sedate)} className="download orange-card">{d.status}</button>
	    }
      
			 return (
				  <Card>
					<Card.Body>
					  <div className="cardbody">
					      <FontAwesomeIcon className="Book" icon={ faFileAlt } /> 
						  <p className="option">
						    {d.name}
						   <div className="testdate">{sedate}</div>
						  </p>
                {button}
					  </div>
					</Card.Body>
				  </Card> 
			  )
		 })
	  }
	 </div>
  }

  renderTestListDesktop(beans){
	  return <div>
            <Card>
              <Card.Body>
                <div className="cardbody head align-center">
                <span className="sno">#</span>
                <h4 className="head">Name</h4>
                <span className="date">Start Date</span>
						    <span className="date">End Date</span>
                <span>Action</span>
                </div>
              </Card.Body>
            </Card>
	  {
      beans.sort((a, b) => b.id - a.id) 
      .map((d, j) =>{
        var button;
        var sedate = '';
        if(d.startDate != "--"){
          sedate = d.startDate +'-'+ d.endDate;
        }else{
          sedate = <br />
        }
        /** for desktop test launch code start */
        
        if(d.status=="Launch" || d.status=="Practice" || d.status=="Quiz"){
          var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
          button=  <button onClick={() => this.openTest(d.id)} className="download blue-card">Start</button>
        }else if(d.status == "Time Out"){
          var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
          button=  <button onClick={() => this.submitTimeOut(d.id) /*this.showAlert("The test is closed at  "+d.endDate)*/ }className="download blue-light-card">{d.status}</button>
          for(var i=0; i<oldTests.length; i++){
            if(oldTests[i].resume==1 && (oldTests[i].id==d.id)){
                  button=  <button onClick={() => this.routeChange2('/test-submit/'+this.props.match.params.id+'/'+d.id)} className="download blue-card">{d.status}</button>
            }
          }     
        }else if(d.status == "View Result"){
          button=  <button onClick={() => this.routeChange2('/test-result/'+this.props.match.params.id+'/'+d.id, d.endDate)} className="download green-card">Result</button>
        }else if(d.status == "Coming Soon"){
          button=  <button onClick={() => this.showAlert("The test is available between "+sedate)} className="download orange-card">{d.status}</button>
        }

        /** for desktop test launch code end */
      
			 return (
				  <Card>
					<Card.Body>
					  <div className="cardbody align-center">
              <span className="sno">{j+1}</span>
              <h4 className="head">{d.name}</h4>
              <span className="date">{d.startDate}</span>
							<span className="date">{d.endDate}</span>
              {button}
					  </div>
					</Card.Body>
				  </Card> 
			  )
		 })
	  }
	 </div>
  }

}

export default TestListDetails;
