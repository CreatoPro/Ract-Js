import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Config from "../../_config/config";
import ApiService from "../../_services/ApiService";
import swal from 'sweetalert';

class TestInstructions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: null,
        }
        this.reloadQuestionList = this.reloadQuestionList.bind(this);
		this.downloadTest = this.downloadTest.bind(this);
    }

    componentDidMount() {
        this.reloadQuestionList();
		this.downloadTest();
    }

	downloadTest(){
		var d = new Date();
		var rand = d.getTime();
		var testId = this.props.match.params.id
		var tenant = localStorage.getItem('tenant') || Config.siteTitle
		var testobj = 'https://tuningfork-'+ Config.siteMode +'.s3.amazonaws.com/'+ tenant +'/uploads/testPapers/'+ testId +'/'+ testId +'.json';
		//alert(testobj);
		this.setState({ showLoading: true }, () => {
			ApiService.fetchTestJson(testobj+"?id="+rand)
			.then((res) => {
				console.log(JSON.stringify(res));
				let testObject = res.data; 
				this.setState({
					testObject: testObject,
					showLoading: false,
				});
			},error => {
				this.setState({
					showLoading: false,
				});
				if(error.response.status==404){
					swal({
						text: "Online test not available. Please contact administrator",
						icon: "warning",
						button: "Ok",
						allowOutsideClick: false,
						closeOnClickOutside: false
					  })
					  .then((willDelete) => {
						  if(willDelete){
							 window.close();
						  }
					  });
				}else{
					alert(Config.CONNECTION_ERROR_MSG);
					window.close();
				}
				
			});
	    });
	}

    reloadQuestionList() {
		var testObject = JSON.parse(localStorage.getItem('tests')) || [];
		for(var i=0; i<testObject.length; i++){
            if(testObject[i].id==this.props.match.params.id){
				this.setState({testName: testObject[i].name});
				this.setState({testTime: testObject[i].testTime});
				this.setState({totalMarks: testObject[i].totalMarks});
				this.setState({noOfQuestions: testObject[i].noOfQuestions}); 
				this.setState({instructions: testObject[i].instructions}); 
			}
		}	
    }
    
	routeChange=()=> {
		let paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        let lms =  params.get('lms');
		let title =  params.get('title');
		let path = `/test-taking/`+this.props.match.params.pid+'/'+this.props.match.params.id+"?lms="+lms+"&title="+title;
		this.props.history.push(path);
		//this.props.history.replace(path);
	}
	
	render() {
		const { testObject } = this.state;
		let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
		return(	 
		   <div> 
		      <div className={`test-header ${portlet.class ? portlet.class : 'orange-card'}`}>
			      <div className="testclose">
						<FontAwesomeIcon icon={ faTimesCircle } onClick={this.props.history.goBack} />
				  </div>
				  <h4>{this.state.testName}</h4>
			  </div>
			  <div className="question"><br /><br /><br />
				<h4>Test instructions</h4>
				{ 
				  testObject && 
				   <p className="mobile test_instructions" dangerouslySetInnerHTML={{ __html: testObject.instructions || testObject.webInstructions}} /> 
				}
				{/* <p>Total Question: {this.state.noOfQuestions}</p>
				<p>Total Marks: {this.state.totalMarks}</p>
				<p>Total Time: {this.state.testTime} Min</p>
		        */}
				<button className="btn stratTest" onClick={this.routeChange}> CONTINUE</button>
			  </div>
		   </div>
		)
     }
}

export default TestInstructions;