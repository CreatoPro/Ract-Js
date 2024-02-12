import React, { Component } from 'react'
import swal from 'sweetalert';
import Timer from "../../_components/timer/timer";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiService from "../../_services/ApiService";
import { faEye,faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Test.css';
import Loader from './../../_components/loader/loader';
import Utils from "../../_helpers/utils";

class TestTaking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            message: null,
			question_num : 0,
			boxClass:['notvisited'],
			addClass: false,
			mark: false,
			checked:false,
			tests:[],
			math: '',
			questime: 0,
			loading: false,
			networkError:0,
			prevTime:0
		};
		this.node = React.createRef();
		this.reloadQuestionList = this.reloadQuestionList.bind(this);
		//this.startTimer = this.startTimer.bind(this);
		//this.resetTimer = this.resetTimer.bind(this);
	}
	
	

    componentDidMount() {
       
		this.reloadQuestionList();
        this.startTimer();
		if (window.MathJax !== undefined) {
		    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub,this.node.current]);
		}

		window.addEventListener('load', function() {
			window.history.pushState({}, '')
		})
		
		let paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        let lms =  params.get('lms');
		let title =  params.get('title');

		/*window.addEventListener("visibilitychange", function() {
			var testObject = JSON.parse(localStorage.getItem('tests')) || [];
			var i = localStorage.getItem('test_id');
			var catid = localStorage.getItem('test_catid');
			testObject[i].resume=1;
			testObject[i].resumeTime = localStorage.getItem('time_left');
			localStorage.setItem("tests", JSON.stringify(testObject));
			if(lms==1){
			  window.history.pushState(null, null, '/lesson/steps/attachments/'+catid+'/'+title+'?back=quiz');
			}else{
			  window.history.pushState(null, null, '/TestList/'+catid);
			}
			window.location.reload();
		});*/
         window.onbeforeunload = function () {
		  var testObject = JSON.parse(localStorage.getItem('tests')) || [];
		  var i = localStorage.getItem('test_id');
		  testObject[i].resume=1;
		  testObject[i].resumeTime = localStorage.getItem('time_left');
		  localStorage.setItem("tests", JSON.stringify(testObject));
		 }

		 window.addEventListener('popstate', function() {
		  window.history.pushState({}, '');
		  //this.closeExamAlert();
		  //document.getElementById("testclose").click();
		  var testObject = JSON.parse(localStorage.getItem('tests')) || [];
		  if(typeof testObject !== 'undefined' && testObject.length > 0){
			  var i = localStorage.getItem('test_id');
			  var catid = localStorage.getItem('test_catid');
			  if(lms==1 && i){
				  testObject[i].resume=1;
				  testObject[i].resumeTime = localStorage.getItem('time_left');
				  localStorage.setItem("tests", JSON.stringify(testObject));
				  window.history.pushState(null, null, '/lesson/steps/attachments/'+catid+'/'+title+'?back=quiz');
			  }else if(i){
				  testObject[i].resume=1;
				  testObject[i].resumeTime = localStorage.getItem('time_left');
				  localStorage.setItem("tests", JSON.stringify(testObject));
				  window.history.pushState(null, null, '/TestList/'+catid);
			  }else{
				  window.history.pushState(null, null, '/TestList/'+catid);
			  }
			  window.location.reload();
		  }else{
			  var catid = localStorage.getItem('test_catid');
			  if(lms==1){
				  window.history.pushState(null, null, '/lesson/steps/attachments/'+catid+'/'+title+'?back=quiz');
			  }else{
				  window.history.pushState(null, null, '/TestList/'+catid);
			  }
			  window.location.reload();
		  }
		  /*swal({
			title: "CONFIRM",
			text: "Are you sure you want to quit the Test?",
			buttons: ['No','Yes'],
			dangerMode: true,
			})
			.then(exitExam => {
				if (exitExam) {
					window.location.reload();
				}
		    });*/
		})
		 this.testActive();
		 var intervalId = setInterval(()=> this.testActive(), 60000);
		 this.setState({intervalId: intervalId});
		 let testid = this.props.match.params.id;
		 this.initTestTaking(testid);
		
	}

	componentDidUpdate(){
		if (window.MathJax !== undefined) {
			window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub,this.node.current]);
		}
		//this.startTimer();
	}
	
	async testActive() {
		let testid = this.props.match.params.id;
		ApiService.testisActive(testid)
		.then((res) => {
		   if(res.data.isActive==false){
               document.getElementById("endExam").click();
		   }
		}).catch((error) => {
		   if(this.state.networkError==2){
			   clearInterval(this.state.intervalId);
			   var testObject = JSON.parse(localStorage.getItem('tests')) || [];
			   if(typeof testObject !== 'undefined' && testObject.length > 0){
				  var i = localStorage.getItem('test_id');
				  var catid = localStorage.getItem('test_catid');
				  testObject[i].resume=1;
				  testObject[i].resumeTime = localStorage.getItem('time_left');
				  localStorage.setItem("tests", JSON.stringify(testObject));
				  window.history.pushState(null, null, '/TestList/'+catid);
			   }
			   swal({
				title: "Alert",
				text: "Could not Connect to Server. Please check your Internet connection and try again Later.",
				dangerMode: true,
			  })
			  .then(endExam => {
					if (endExam) {
						this.goBack();
					}
			  });
		   }else{
			   this.setState({networkError: this.state.networkError + 1});
		   }
        });
    }
	
	startTimer = () => {
    /* this.timer = setInterval(() => this.setState({
      questime: this.state.questime + 1
     }), 1000)
     console.log("start");*/
    }
	
	resetTimer = () => {
      this.setState({questime: 0})
      console.log("reset")
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

				if(testObject[i].resumeQuestion){
					this.setState({question_num: parseInt(testObject[i].resumeQuestion)});
				}
				
				
				this.setState({totalMarks: testObject[i].totalMarks});
				this.setState({noOfQuestions: testObject[i].noOfQuestions});
				localStorage.setItem('test_id', i);
				localStorage.setItem('test_catid', this.props.match.params.pid);
			}
		}
	}

	initTestTaking(testId) {
		this.setState({ loading: true }, () => {
		  ApiService.initTestTaking(testId)
		  .then((res) => {
			  this.setState({
				loading: false,
			  });
		  });
		});	
	}

	goBack = () => {
		let paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        let lms =  params.get('lms');
		let title =  params.get('title');
		if(lms==1){
		   this.props.history.replace('/lesson/steps/attachments/'+this.props.match.params.pid+'/'+title+'?back=quiz');
		}else{
		   this.props.history.replace('/TestList/'+this.props.match.params.pid);
		}
	}
	
    EndExamAlert = () => {
		swal({
			title: "CONFIRM",
			text: "Are you sure you want to submit the Test?",
			buttons: ['No','Yes'],
			dangerMode: true,
			})
			.then(endExam => {
				if (endExam) {
					this.EndExam();
				}
		    });
    }

    closeExamAlert = () => {
		swal({
			title: "CONFIRM",
			text: "Are you sure you want to quit the Test?",
			buttons: ['No','Yes'],
			dangerMode: true,
			})
			.then(exitExam => {
				if (exitExam) {
					clearInterval(this.state.intervalId);
					var testObject = JSON.parse(localStorage.getItem('tests')) || [];
					var i = this.state.index;
					testObject[i].resume=1;
					testObject[i].resumeTime = localStorage.getItem('time_left');
					testObject[i].resumeQuestion = this.state.question_num;
					localStorage.setItem("tests", JSON.stringify(testObject));
					this.goBack();
				}
		    });
    }

   EndExam = () => {
	clearInterval(this.state.intervalId);
	var online = navigator.onLine;
	var testObject = JSON.parse(localStorage.getItem('tests')) || [];
	var i = this.state.index;
	var studentPdfResponse = testObject[i].studentPdfResponse;
	var test_id = testObject[i].id;
	//online = false;
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
					timeTaken : ""+(testObject[i].questions[j].question_time*1000)+""
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
					timeTaken : ""+(testObject[i].questions[j].question_time*1000)+""
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
					timeTaken : ""+(testObject[i].questions[j].question_time*1000)+""
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
        this.setState({ loading: true }, () => {
			ApiService.endExam(json_data)
			.then((res) => {
				if(res.data.status==1){
					for (var i = 0; i < testObject.length; i++) {
					if (testObject[i].id == this.props.match.params.id) {
						testObject.splice(i, 1); //remove item from array
					}
					}
					localStorage.setItem("tests", JSON.stringify(testObject));
					this.setState({ loading: false});
					if(studentPdfResponse==false){
					   this.goBack();
					}else{
					   this.props.history.push({pathname: "/test/upload/"+ test_id , state: { testEndTime: 0 }});
					}
					
				}else{
					swal({
						title: "Alert",
						text: "Could not Connect to Server. Please check your Internet connection and try again Later.",
						dangerMode: true,
					});
				}
			});
		});
	}else{	
        testObject[i].submit=1;
		localStorage.setItem("tests", JSON.stringify(testObject));
		this.goBack();
	}

   }
	
   getCheckeboxValue(event) {
		const choice = event.target.value;
		const status = event.target.checked;
		var testObject = JSON.parse(localStorage.getItem('tests')) || [] ; var checked =0; var mark = 0;
		var i = this.state.index;
		for (var j = 0; j < testObject[i].questions.length; j++) {
			if(this.state.question_num+1 === testObject[i].questions[j].questionNumber){  //look for match with id
			   let category = testObject[i].questions[j].questionCategory;
			   if(category==1 || category==26){
				for(var k=0; k < testObject[i].questions[j].choices.length; k++){	
					if(choice == testObject[i].questions[j].choices[k].id && category==1){
						if(status){
						 testObject[i].questions[j].choices[k].checked = 1;
						 testObject[i].questions[j].class="answered";
						 this.setState({ boxClass : "answered" });
						}else{
						 testObject[i].questions[j].choices[k].checked = 0;
						 testObject[i].questions[j].class="notanswered";
						 this.setState({ boxClass : "notanswered" });
						}
						this.setState({ addClass : true });
						if(testObject[i].questions[j].mark){ mark = 1; }
						break;  //exit loop since you found the choice
					}else if(category==26){
						var singleOpt = document.getElementById("single_opt");
						var chks = singleOpt.getElementsByTagName("INPUT");
						for (var c = 0; c < chks.length; c++) {
							chks[c].onclick = function () {
								for (var c = 0; c < chks.length; c++) {
									if (chks[c] != this && this.checked) {
										chks[c].checked = false;
									}
								}
							};
						}
						if(choice == testObject[i].questions[j].choices[k].id && status){
							testObject[i].questions[j].choices[k].checked = 1;
							testObject[i].questions[j].class="answered";
							this.setState({ boxClass : "answered" });
							checked = 1;
						}else{
							testObject[i].questions[j].choices[k].checked = 0;
							testObject[i].questions[j].class="notanswered";
						    this.setState({ boxClass : "notanswered" });	
						}
						
						this.setState({ addClass : true });
						if(testObject[i].questions[j].mark){ mark = 1; }
					}
				}
			   }else if(category==2){
					 var answered_array =  testObject[i].questions[j].answered || [];
					 if(status){
						if (!answered_array.includes(choice)) {
							answered_array.push(choice);
							testObject[i].questions[j].answered=answered_array;
							testObject[i].questions[j].class="answered";
							this.setState({ boxClass : "answered" });
							checked = 1;
							console.log("answered");
						}
					  }else{
						for (var i = 0; i < answered_array.length; i++) { //loop over the collection
							if (answered_array[i] == choice) { //see if choice match
								answered_array.splice(i, 1); //remove item from array
								break; //exit loop
							}
						}
					  }
					  if(answered_array.length == 0){
						testObject[i].questions[j].class="notanswered";
						this.setState({ boxClass : "notanswered" }); 
						console.log("notanswered");
					  }
			   }
			   
			   if(checked==1){
					testObject[i].questions[j].class="answered";
					this.setState({ boxClass : "answered" });
			   }
			   //if(testObject[i].questions[j].mark){ mark = 1; }
			   break;
			}
			
		}	
		localStorage.setItem("tests", JSON.stringify(testObject));
		if(mark==1){this.MarkQuestion();}
		this.reloadQuestionList();		
	}

	handleKeyUp = event => {
		var answer = event.target.value;
		var testObject = JSON.parse(localStorage.getItem('tests')) || [];var mark = 0;
		var i = this.state.index;
		for (var j = 0; j < testObject[i].questions.length; j++) {
			let category = testObject[i].questions[j].questionCategory;
			if(this.state.question_num+1 === testObject[i].questions[j].questionNumber){  //look for match with id
			    if(category==4 || category==7 || category==0 || category==5){
				  if(answer){
				    testObject[i].questions[j].answered=answer;
				    testObject[i].questions[j].class="answered";
				    this.setState({ boxClass : "answered" });
				  }else{
					testObject[i].questions[j].answered='';
				    testObject[i].questions[j].class="notanswered";
				    this.setState({ boxClass : "notanswered" });
				  }
				  if(testObject[i].questions[j].mark){ mark = 1; }
				}
			}
		}	
		localStorage.setItem("tests", JSON.stringify(testObject));
		if(mark==1){this.MarkQuestion();}
		this.reloadQuestionList();
	}

	NextQuestion = () => {
		var testObject = JSON.parse(localStorage.getItem('tests')) || []; var checked =0;
		var category = testObject[this.state.index].questions[this.state.question_num].questionCategory;
		if(this.state.question_num < (testObject[this.state.index].questions.length-1)){
		  if(category==1 || category == 26){
			for (var c = 0; c < testObject[this.state.index].questions[this.state.question_num].choices.length; c++) {
				if(testObject[this.state.index].questions[this.state.question_num].choices[c].checked==1){
					checked = 1;
				}
			}
		  }else if(category == 4 || category==7 || category==0 || category==5){
			if(testObject[this.state.index].questions[this.state.question_num].answered){
				checked = 1;
			}
		  }else if(category == 2){
		     var answered_array =  testObject[this.state.index].questions[this.state.question_num].answered || [];
			 if(answered_array.length){
			    checked = 1;
			 }
		  }

		  if(checked==0){
			testObject[this.state.index].questions[this.state.question_num].class="notanswered";
			this.setState({ boxClass : "notanswered" });
			this.setState({ addClass : true });
		  }
		  
		  if(!localStorage.getItem('prevTime')){
		      localStorage.setItem('prevTime', testObject[this.state.index].testTime*60);
		  }
		  if(!testObject[this.state.index].questions[this.state.question_num].question_time){
			//alert(localStorage.getItem('prevTime') - localStorage.getItem('time_left'));
		    testObject[this.state.index].questions[this.state.question_num].question_time = localStorage.getItem('prevTime') - localStorage.getItem('time_left');
		  }else{
			var ques_time = testObject[this.state.index].questions[this.state.question_num].question_time;
			testObject[this.state.index].questions[this.state.question_num].question_time = parseInt(ques_time) + parseInt(localStorage.getItem('prevTime')) - parseInt(localStorage.getItem('time_left'));
		  }
		  localStorage.setItem('prevTime', localStorage.getItem('time_left'));
		  
		  this.setState({ question_num: this.state.question_num + 1 });
		  testObject[this.state.index].resumeQuestion = this.state.question_num + 1;
		}
		localStorage.setItem("tests", JSON.stringify(testObject));
		this.reloadQuestionList();
		this.renderQuestions();
		this.resetTimer();
		this.startTimer();
	}
	
	MarkQuestion = () => {
		  
		var testObject = JSON.parse(localStorage.getItem('tests')) || []; var checked =0;
		var category = testObject[this.state.index].questions[this.state.question_num].questionCategory;
		if(category==1 || category == 26){
			for (var c = 0; c < testObject[this.state.index].questions[this.state.question_num].choices.length; c++) {
				if(testObject[this.state.index].questions[this.state.question_num].choices[c].checked==1){
					checked = 1;
				}
			}
	    }else if(category == 4 || category==7 || category==0 || category==5){
			if(testObject[this.state.index].questions[this.state.question_num].answered){
				checked = 1;
			}
		}else if(category==2){
			var answered_array =  testObject[this.state.index].questions[this.state.question_num].answered || [];
			if(answered_array.length == 0){
				checked = 1; 
			}
		}
		if(checked==0){
			testObject[this.state.index].questions[this.state.question_num].mark="marked";
			this.setState({ boxClass : "marked" });
			this.setState({ addClass : true });
		}else{
			testObject[this.state.index].questions[this.state.question_num].mark="markedanswered";
			this.setState({ boxClass : "markedanswered" });
			this.setState({ addClass : true });  
		}
		localStorage.setItem("tests", JSON.stringify(testObject));
		this.reloadQuestionList();
	}

	UNMarkQuestion = () => {
		  
		var testObject = JSON.parse(localStorage.getItem('tests')) || []; var checked =0;
		var category = testObject[this.state.index].questions[this.state.question_num].questionCategory;
		if(category==1 || category == 26){
			for (var c = 0; c < testObject[this.state.index].questions[this.state.question_num].choices.length; c++) {
				if(testObject[this.state.index].questions[this.state.question_num].choices[c].checked==1){
					checked = 1;
				}
			}
		}else if(category==4 || category==7 || category==0 || category==5){
			if(testObject[this.state.index].questions[this.state.question_num].answered){
				checked = 1;
			}
		}else if(category==2){
			var answered_array =  testObject[this.state.index].questions[this.state.question_num].answered || [];
			if(answered_array.length == 0){
				checked = 1; 
			}
		}
		if(checked==0){
			testObject[this.state.index].questions[this.state.question_num].mark="";
			this.setState({ boxClass : "" });
			this.setState({ addClass : true });
		}else{
			testObject[this.state.index].questions[this.state.question_num].mark="";
			this.setState({ boxClass : "" });
			this.setState({ addClass : true });  
		}
		localStorage.setItem("tests", JSON.stringify(testObject));
		this.reloadQuestionList();
	}
	  
	PrevQuestion = () => {
		var testObject = JSON.parse(localStorage.getItem('tests')) || [];
		if(this.state.question_num >=1 ){
		  this.setState({ question_num: this.state.question_num - 1 });
		  testObject[this.state.index].resumeQuestion = this.state.question_num - 1;
		  
		  if(!localStorage.getItem('prevTime')){
		      localStorage.setItem('prevTime', testObject[this.state.index].testTime*60);
		  }
		  if(!testObject[this.state.index].questions[this.state.question_num].question_time){
		    testObject[this.state.index].questions[this.state.question_num].question_time = localStorage.getItem('prevTime') - localStorage.getItem('time_left');
		  }else{
			var ques_time = testObject[this.state.index].questions[this.state.question_num].question_time;
			testObject[this.state.index].questions[this.state.question_num].question_time = parseInt(ques_time) + parseInt(localStorage.getItem('prevTime')) - parseInt(localStorage.getItem('time_left'));
		  }
		  localStorage.setItem('prevTime', localStorage.getItem('time_left'));
		  
		}
		localStorage.setItem("tests", JSON.stringify(testObject));
	}
	
	prevDisabled(){
	   if(this.state.question_num === 0){
		 return true;
	   }else{
	     return false;
	   }
	}
	
	nextDisabled(){
	   let question = this.state.questions;
	   if(this.state.question_num < (question.length-1)){
		 return false;
	   }else{
	     return true;
	   }
	}
	
	openNav() {
	  let isMobile = Utils.isMobileDevice();
	  if(isMobile===true){
		document.getElementById("QuestionsSidenav").style.width = "100%";
	  }else{
		document.getElementById("QuestionsSidenav").style.width = "30%";
		document.getElementById("sidenavclose").style.right = "71%";
	  }
	}
	
	closeNav() {
	  document.getElementById("QuestionsSidenav").style.width = "0";
	}
	
	showQuestion (e,id) {
		e.preventDefault();
		this.setState ({ question_num: id });
		var testObject = JSON.parse(localStorage.getItem('tests')) || [];
	    testObject[this.state.index].resumeQuestion = id;
		localStorage.setItem("tests", JSON.stringify(testObject));
		document.getElementById("QuestionsSidenav").style.width = "0";
	}

	currentTime(time){
		//alert(time);
		this.setState({ 
			currentTimeSeconds: time,
		});
	}
	
	render() {
		let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
		const { loading } = this.state;
		return(
			<div>
				<div className={`test-header ${portlet.class ? portlet.class : 'orange-card'}`}>
				<div className="testclose" id="testclose">
					<FontAwesomeIcon icon={ faTimesCircle } id="closeAlert" onClick={this.closeExamAlert} />
				</div>
				<h4>{this.state.testName}</h4> 
				<div className="timer">
				  {this.state.testTime > 0 &&	
					<Timer startTimeInSeconds={parseInt(this.state.testTime)} currentTime={this.currentTime.bind(this)} EndExam={this.EndExam.bind(this)}  type="mobile" />
				  }
				</div>
				</div>
				{this.renderSidePanel()}
				{loading ?  <Loader />: this.renderQuestions()}
			</div>
		)	
    }
	
	renderSidePanel() {
		let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
		return (
			<div id="QuestionsSidenav" className="QuestionsSidenav">
					 <div className={`test-header ${portlet.class ? portlet.class : 'orange-card'}`}>
					  <h4>Review</h4> 
					  <div className="sidenavclose" id="sidenavclose">
						<FontAwesomeIcon icon={ faTimesCircle } onClick={this.closeNav} />
					  </div>
					</div>
					<div className="questionspanelno">
					     <p>Tap on the Question no. you want to review </p>
						   <div className="questionstatus">
							 <span className="answered">Answered</span> 
							 <span className="marked">Marked</span>
							 <span className="markedanswered">Marked & Answered</span>
							 <span className="notanswered">Not Answered</span>
							 <span className="notvisited">Not Visited</span>
						   </div>
						   <div className="questionsnumbers">
					         {this.renderSidePanelNumbers()}
						   </div>
					</div>
			</div>
		);
    }
	
	renderSidePanelNumbers() {
		
		let list = [];
		let question = this.state.questions;
		//console.log(question);
		for(let i=0; i<question.length; i++){
			if(question[i].mark){
			  list.push(<Button onClick={(e) => this.showQuestion(e,i)} className={question[i].mark}>{i+1} </Button>);
			}else if(question[i].class){
				list.push(<Button onClick={(e) => this.showQuestion(e,i)} className={question[i].class}>{i+1} </Button>);
			}else{
			  list.push(<Button onClick={(e) => this.showQuestion(e,i)} className="">{i+1} </Button>);
			}
		}
		return <div className="questions-list">{list}</div>;		    
	}

	renderQuestions() {
		let button = null;
		let text = "";
		let type = "";
		
		return  <div className="questions_list"> 
		{
		  this.state.questions.map((item, index) => {
		    if(index===this.state.question_num){
			  let category = this.state.questions[index].questionCategory;
			  if (this.state.questions[index].mark==="markedanswered" || this.state.questions[index].mark==="marked") {
				button = <Button variant="danger" onClick={this.UNMarkQuestion}>UNMARK</Button>
			  }else {
				button = <Button variant="primary" onClick={this.MarkQuestion}>MARK</Button>
			  }
			  if(category==1){
				type = "multiple_opt";
			  }else if(category==26){
                type = "single_opt";
			  }else if(category==4 || category==7 || category==5){
				type = "num_opt";
				if(this.state.questions[index].answered){
                    text = <input type="number"  name="numberic" defaultValue={this.state.questions[index].answered}  onKeyUp={this.handleKeyUp} />;
				}else{
					text = <input type="number" name="numberic" defaultValue="" onKeyUp={this.handleKeyUp} />;
				}
			  }else if(category==0){
				type = "num_opt";
				this.state.questions[index].choices = [];
				if(this.state.questions[index].answered){
                    text = <textarea name="numberic" defaultValue={this.state.questions[index].answered}  onKeyUp={this.handleKeyUp} />;
				}else{
					text = <textarea name="numberic" defaultValue="" onKeyUp={this.handleKeyUp} />;
				} 
			  
			  }else if(category==2){
				let list = []; let opt = [];let match = [];
				let aplpha =  ['A','B','C','D','E','F'];
				let aplpha2 =  ['P','Q','R','S','T','U'];
				var choices = this.state.questions[index].choices;
				var matches = this.state.questions[index].matches;
				var answered = this.state.questions[index].answered || [];
				var match_div = "";	var match_opt = "";				
				for(let i=0;i<choices.length;i++){
					list.push(<tr><td>{aplpha[i]}. </td><td><div dangerouslySetInnerHTML={{ __html:choices[i].name}} /></td><td>{aplpha2[i]}. </td><td><div dangerouslySetInnerHTML={{ __html:matches[i].name}} /></td></tr>);
				}

				for(let c=0; c<choices.length; c++) {
				opt.push(<label className="option_container"><span className="mark">{aplpha[c]}. </span></label>);
					for(let m=0; m<matches.length; m++) {
					    if(c==0){
						  match.push(<label className="option_container"><span className="mark">{aplpha2[m]} </span></label>);
						}
                        if(answered.includes(choices[c].id+':'+matches[m].id)){
							opt.push(<label className="option_container"><input defaultChecked="true" className="option_checkbox" type="checkbox" value={choices[c].id+':'+matches[m].id}  onClick={this.getCheckeboxValue.bind(this)}/><span className="checkmark"></span></label>);
						}else{
                            opt.push(<label className="option_container"><input className="option_checkbox" type="checkbox" value={choices[c].id+':'+matches[m].id}  onClick={this.getCheckeboxValue.bind(this)}/><span className="checkmark"></span></label>);
						}
						  
					}
					opt.push(<br/>);
					opt.push(<br/>);
				}
				
			    match_opt = <div className="match_opts"><p className="option"><label className="option_container"><span className="mark"></span></label>{match}<br/><br/>{opt}</p></div>
				
				match_div = <table><tr><th></th><th><b>column I</b> </th><th></th><th><b>column II</b></th></tr>{list}</table>
			  }
			  return (
			     <div>
			      <div className="questionHeader">
				       <div className="">{this.state.questions[index].testSectionQuestionMapping.sectionName}</div> 
			           <span className="question_num">Q : {this.state.questions[index].questionNumber}; &nbsp; </span> 
					   <span className="question_marks">Mark : {this.state.questions[index].marks}; &nbsp;</span>
					   <span className="question_neg_marks">Negative Mark : {this.state.questions[index].negativeMarks}; &nbsp;</span>
					   <span className="question_panel"><FontAwesomeIcon icon={ faEye } onClick={this.openNav} /></span>
				  </div>
				  <div className="question"  id="questions_res">
				      <div className="questionStatement" dangerouslySetInnerHTML={{ __html: this.state.questions[index].groupQuestion}}></div>
					  <div className="questionStatement" dangerouslySetInnerHTML={{ __html: this.state.questions[index].statement}}></div>
					  <div id={type}>
					   {match_div}
					   {match_opt}
					   { category!=2 && this.state.questions[index].choices.map((c, i) =>
							<p className="option">
							 <label className="option_container">
							  <input className="option_checkbox" id={'checkbox'+i} name="option" defaultChecked={c.checked} type="checkbox" value={c.id} onClick={this.getCheckeboxValue.bind(this)}/>
							  <span className="checkmark"></span>
							  <div className="optiin_desc" dangerouslySetInnerHTML={{ __html: c.name }}></div>
							 </label>
							</p>
					   )}
					   {text}
					   </div>
				  </div>
				 </div>
				)
		     }
		  })	
		}
		  <div class="testButtons">
			<Button variant="primary" onClick={this.PrevQuestion} disabled={this.prevDisabled()}>PREV</Button>
			<Button variant="primary" onClick={this.NextQuestion} disabled={this.nextDisabled()}>NEXT</Button>
			 {button}
			<Button variant="primary" onClick={this.EndExamAlert}>FINISH</Button>
			<Button variant="primary"  style={{display: "none"}} id="endExam" onClick={this.EndExam}>End</Button>
		  </div>
		</div>	 
     }	
}

export default TestTaking;