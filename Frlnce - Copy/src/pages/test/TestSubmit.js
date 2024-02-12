import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiService from "../../_services/ApiService";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Test.css';
import Loader from './../../_components/loader/loader';
import swal from 'sweetalert';

class TestSubmit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            message: null,
			question_num : 0,
			mark: false,
			checked:false,
			tests:[],
		};
		this.node = React.createRef();
		this.reloadQuestionList = this.reloadQuestionList.bind(this);
	}
	
    componentDidMount() {
		this.reloadQuestionList();
	}
	
	componentDidUpdate(){
		this.EndExam();
	}

    reloadQuestionList() {
		var testObject = JSON.parse(localStorage.getItem('tests')) || [];
		for(var i=0; i<testObject.length; i++){
            if(testObject[i].id==this.props.match.params.id){
				this.setState({index:i});
				this.setState({testId: testObject[i].id});
				this.setState({questions: testObject[i].questions});
				this.setState({testName: testObject[i].name});
				if(testObject[i].resumeTime){
				  this.setState({testTime: parseInt(testObject[i].resumeTime)});
				}else{
				  this.setState({testTime: parseInt(testObject[i].testTime)*60});
				}
				this.setState({totalMarks: testObject[i].totalMarks});
				this.setState({noOfQuestions: testObject[i].noOfQuestions});
				localStorage.setItem('test_id', i);
				localStorage.setItem('test_catid', this.props.match.params.pid);
			}
		}
	}
	
	goBack = () => {
		this.props.history.replace('/TestList/'+this.props.match.params.pid);
	}

    EndExam = () => {
	 var online = navigator.onLine;
	 var testObject = JSON.parse(localStorage.getItem('tests')) || [];
	 var i = this.state.index;
	 if(online == true){
        var question_array = [];
		for (var j = 0; j < testObject[i].questions.length; j++) {
			 var answers =''; var marks='';
			 let category = testObject[i].questions[j].questionCategory;
			 if(category==1 || category==26){
				for(var k=0; k < testObject[i].questions[j].choices.length; k++){
					if(testObject[i].questions[j].choices[k].checked==1){
						answers += testObject[i].questions[j].choices[k].id+',';
						if(testObject[i].questions[j].choices[k].correct==true){
							marks = testObject[i].questions[j].marks;
						}else{
							marks = "-"+testObject[i].questions[j].negativeMarks;
						}
					}
				}
				if(answers){ answers = answers.replace(/,(?=\s*$)/, ''); }
				question_array.push({
					questionId: ""+testObject[i].questions[j].id+"",
					answers: ""+answers+"",
					qnType:"mcq",
					marks : ""+marks+"",
					timeTaken : "3600"
				});
			}else if(category==4 || category==7 || category==0 || category==5){
				//alert(testObject[i].questions[j].answered);
				if(testObject[i].questions[j].answered==undefined){
					testObject[i].questions[j].answered = '';
				}
				//alert(testObject[i].questions[j].answered);
				question_array.push({
					questionId: ""+testObject[i].questions[j].id+"",
					answers: ""+testObject[i].questions[j].answered+"",
					qnType:"textAnswer",
					marks : ""+marks+"",
					timeTaken : "3600"
				});
			}else if(category==2){
				var questionId = testObject[i].questions[j].id;
				var arr = testObject[i].questions[j].answered;

				var answered = {};
				if(arr!=undefined){
					for(var c = 0 ; c < arr.length ; c++){
						var cur = arr[c];
						var choice  = cur.split(":")[0];
						var match  = cur.split(":")[1];
						if(answered[choice]){
							var matches = answered[choice] ;
							matches.push(match)
							answered[choice] = matches; 
						}
						else{
							var matches = [];
							matches.push(match)
							answered[choice] = matches;     
						}
					}
			    }

				var answers = Object.keys(answered);
				var attemptedAnswer = "";
				for(var d = 0 ; d < answers.length ; d++){
					var choice = answers[d];
					attemptedAnswer+=choice+":"
					for(var e = 0 ; e < answered[choice].length ; e++){
						attemptedAnswer+=answered[choice][e]+";"
					}
					attemptedAnswer = attemptedAnswer.slice(0, attemptedAnswer.length - 1);
					attemptedAnswer+=","
				}
				attemptedAnswer = attemptedAnswer.slice(0, attemptedAnswer.length - 1);

                question_array.push({
					questionId: ""+questionId+"",
					answers: ""+attemptedAnswer+"",
					qnType:"mcq",
					marks : "5",
					timeTaken : "3600"
				}); 
			}
		}	
		let user = JSON.parse(localStorage.getItem('user')) || [];
		if(!user.userName){
			user.userName = "";
			user.enquiryId = localStorage.getItem('enquiryId');
		}
		
		var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
		var json_data  = {
			"info" : {
			   "studentCode"   : ""+user.userName+"",
			   "enquiryId"     : ""+user.enquiryId+"",
			   "testId"        : ""+testObject[i].id+"",
			   "testPaperId"   : "0",
			   "startDate"     : ""+date+"",
			   "timeTaken"     : ""+this.state.testTime+""
			},
			"attempts" : question_array
		}

		ApiService.endExam(json_data)
		.then((res) => {
		   if(res.data.status==1){
			 for (var i = 0; i < testObject.length; i++) {
			   if (testObject[i].id == this.props.match.params.id) {
				 testObject.splice(i, 1); //remove item from array
			   }
			 }
			 localStorage.setItem("tests", JSON.stringify(testObject));
			 this.goBack();
		   }else{
			   swal({
				title: "Alert",
				text: "Unable to submit test. Please Try Again",
				dangerMode: true,
		       });
		   }
		});
	}else{
		 swal({
			title: "Alert",
			text: "Could not Connect to Server. Please check your Internet connection and try again Later.",
			dangerMode: true,
		  })
		  .then(endExam => {
				if (endExam) {
					testObject[i].submit=1;
		            localStorage.setItem("tests", JSON.stringify(testObject));
		            this.goBack();
				}
		  });
        
	}

   }
	
	render() {
		return(
			<div>
				<div className="test-header">
				<div className="testclose" id="testclose">
					<FontAwesomeIcon icon={ faTimesCircle } onClick={this.closeExamAlert} />
				</div>
				<h4>{this.state.testName}</h4>
				{<Loader />}
				</div>
			</div>
		)	
    }
		
}

export default TestSubmit;