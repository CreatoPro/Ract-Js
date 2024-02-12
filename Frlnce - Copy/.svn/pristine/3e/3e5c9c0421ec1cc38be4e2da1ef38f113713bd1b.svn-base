import React, { Component } from "react";
import "./Quiz.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft , faClock} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import swal from 'sweetalert';
import Config from './../../_config/config'
import Confetti from 'react-dom-confetti';

class QuizPlayer extends Component {
  constructor(props) {    
    super(props);
    console.log("QuizPlayer -> constructor()... ");
    console.log("QuizPlayer -> constructor(); Portlet : "+JSON.stringify(Config.CURRENT_PORTLET));
    console.log("QuizPlayer -> constructor(); testBean : "+JSON.stringify(this.props.location.state.testBean));
    if(!Config.CURRENT_PORTLET) {
      Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
    }
    this.state = {
      testBean : this.props.location.state.testBean,
      enquiryId : localStorage.getItem('enquiryId'),
      enrollmentId : 0,
      message: null,
      errorMessage: null,
      showLoading: false,
      testdata: null,
      showConfettii: false,
      testRemainingTimeInSeconds: 0,
      time: {} // Timer
    };
    /* Timer Properties */
    this.timer = 0;
    this.done = false;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.sync = this.sync.bind(this);
    this.autoSyncTimer = 0;
    /* Timer Properties*/
  }

  componentDidMount() {
    console.log("QuizPlayer -> componentDidMount()... ");
    this.init();
  }

  componentWillUnmount() {
    
  }

  init() {
    console.log("QuizPlayer -> init()... "+JSON.stringify(this.state.testBean));
    this.setState({ showLoading: true }, () => {
        ApiService.getOnlineTestData(this.state.testBean.id)
        .then((res) => {
          console.log("QuizPlayer -> init(); res : "+JSON.stringify(res));
          let testData = res.data;
          if(!testData) {
            console.log("QuizPlayer -> init() -> No test data found!");
            this.setState({
              showLoading: false,
              errorMessage: "No test data found!"
            });
          }
          else {
            this.setUp(testData);
          }     
          
        },
        error => { //ErrorCB
          console.log("QuizPlayer -> init() -> Connection Error : "+Config.CONNECTION_ERROR);
          this.setState({
            showLoading: false
          });
        });
    });    
  }

  setUp(data) {
    console.log("QuizPlayer -> setUp()..."+JSON.stringify(data));
    //this.showLoading("Initializing...");
    

    /*periodically update test remaining time  every autosyncperiod configured in the resource*/
    if(data.test.autosyncperiod!=undefined) {
      this.autoSyncTimer = setInterval(this.sync, data.test.autosyncperiod);
    }
    let autoTerminateTest="0";
    let sectionaldistribution=data.test.sectionaldistribution;
    let prematureTermination=data.test.prematuretermination;
    if(prematureTermination == 0 && sectionaldistribution == 1) { // disable Finish button
      autoTerminateTest="1";
    }
    let sections=[];
    for(let secIndex=0; secIndex<data.test.sections.section.length-1; secIndex++) {
      let section= data.test.sections.section[secIndex];
      /*Creating JSON Array(question) when there is single JSON Object(question)*/
      if(!(Array.isArray(section.questions.question))) {
        let questionJsonArray = [];
        questionJsonArray.push(section.questions.question);
        section.questions.question = questionJsonArray;
      }
      sections.push(section);
    }

    console.log("sections : "+JSON.stringify(sections));
    let currentIndex=0;
    let currentSectionIndex=0;
    let question=sections[0].questions.question[currentIndex];
    console.log("QuizPlayer -> setUp(); question <<1>> "+JSON.stringify(question));
    if( ! this.isNumber(question.textanswer) && question.textanswer==false) {
      question.textanswer="";
    }
    let sectionDataStore={data: []};
    let _sectionDataStore={data: []};
    for(let section in sections) {
      _sectionDataStore.data[section]= {
          "sectionIndex":section,
          "sectionId":sections[section].id,
          "sectionQuestionIndex":0
      }
      sectionDataStore=_sectionDataStore;
    }
    let lastAttemptedSectionId=data.test.lastattemptedsectionid;
    let resumeFromSection;
    let totalQuestions = 0;
    let questionDataStore={data:[]};
    console.log("QuizPlayer -> setUp(); Iterating section START...");
    console.log("QuizPlayer -> setUp(); lastAttemptedSectionId : "+lastAttemptedSectionId);
    for(let si in data.test.sections.section) {
      let section= data.test.sections.section[si];
      if(lastAttemptedSectionId > 0 && lastAttemptedSectionId == section.sectionid){
        console.log("QuizPlayer -> setUp(); resumeFromSection : "+JSON.stringify(resumeFromSection));
        resumeFromSection = section;
        currentSectionIndex = parseInt(si);
      }
      if(!section.sectionid)  // Checking blank Section
          continue;
      for(let qi in section.questions.question) {
        let _question = section.questions.question[qi];
        let attemptedChoices = [];
        if(_question.questioncategory=="1" || _question.questioncategory=="26") {
          for(let choiceIndex in _question.choices.choice) {
            if(_question.choices.choice[choiceIndex].attempted=="1") {
                attemptedChoices.push(_question.choices.choice[choiceIndex].id);
            }
          }
        }
        /*if(_question.questioncategory=="2"){ // mtf
          let choices=_question.choices;
          for(let index in choices.choice){
            let matches=choices.choice[index].matches;
            let selectedMatches="";
            for(let matchIndex in matches.match){
              if(matches.match[matchIndex].attempted=="1"){
                if(selectedMatches.length>0){
                  selectedMatches+=";";
                }
                selectedMatches+=matches.match[matchIndex].id;
              }
            }
            if(selectedMatches.length>0){
              attemptedChoices.push(choices.choice[index].id+":"+selectedMatches);
            }
          }
        }*/
        let textualAnswer = "";
        /*if(_question.questioncategory=="0" || _question.questioncategory=="4" ||  _question.questioncategory=="5") {
            if(isNumber(_question.textanswer) || _question.textanswer != false) {
              textualAnswer=_question.textanswer;
            }
        }*/
        let _question1 = {
            questionIndex       : qi,
            questionNumber      : _question.questionnumber,
            testid              : this.state.testBean.id,
            sectionid           : _question.questionsectionid,
            enquiryid           : this.state.enquiryId,
            enrollmentid        : this.state.enrollmentId,
            questionnumber      : _question.questionnumber,
            questionid          : _question.id,
            questioncategory    : _question.questioncategory,
            attemptid           : _question.attemptid,
            attempted           : _question.attempted,
            timetaken           : _question.timespent ,
            currenttimetaken    : "",
            attemptedchoices    : attemptedChoices,
            textualanswer       : textualAnswer,
            state               : "",
            stateid             : _question.markforlater,
            markstatus          : "",
            runningquestionnumber: _question.runningquestionnumber
        };
        //questionDataStore.data.push(_question1);
        questionDataStore.data[_question.questionnumber] = _question1;
      }
    }
    console.log("QuizPlayer -> setUp(); questionDataStore : "+JSON.stringify(questionDataStore));
    console.log("QuizPlayer -> setUp(); Iterating section END...");
    console.log("QuizPlayer -> setUp(); currentSectionIndex : "+currentSectionIndex);
    if(!questionDataStore.data[0]){
      console.log("QuizPlayer -> setUp(); Removing Empty question");
      totalQuestions = questionDataStore.data.length-1;
    }
    else {
      totalQuestions = questionDataStore.data.length;
    }
    
    //console.log(questionDataStore);
    questionDataStore.data[question.questionnumber].attempted=1; // first question always in READY TO ATTEMPT mode i.e. 1
    //sections[0].questions.question[0].visited="1";
    question.visited="1";
    //question.marked=questionDataStore.data[question.questionnumber].stateid;
    //console.log("currentSectionIndex = "+currentSectionIndex);
    let currentSection = null;
    let testtime = 0;
    let currentTab = 0;
    if(typeof resumeFromSection !== 'undefined' ) {
      console.log("QuizPlayer -> setUp(); resumeFromSection : "+resumeFromSection);
      currentSection = resumeFromSection;      
      //this.selectTab(currentSectionIndex);
      //console.log(currentSection);
      currentIndex=data.test.resumefrom-1;
      testtime = data.test.resumetime;
      question = sections[currentSectionIndex].questions.question[currentIndex];
      console.log("QuizPlayer -> setUp(); resumeFromSection >> currentIndex: "+currentIndex);
      console.log("QuizPlayer -> setUp(); resumeFromSection >> testtime: "+testtime);
    }
    else {
      console.log("QuizPlayer -> setUp(); resumeFromSection else...."); 
      /*start of [ to resume from in case of non-sectional time] */
      let resumeFrom = data.test.resumefrom-1; // rF = 7 ,1s = 6,2s = 6 (12-7 = 5)
      let questionCount = 0;
      for(let si in sections) {
        let section = sections[si];
        questionCount+= section.questions.question.length;
        if(questionCount > resumeFrom ) {
          currentIndex = resumeFrom - ( questionCount - section.questions.question.length);
          currentSection = section;
          question = currentSection.questions.question[currentIndex ];
          currentSectionIndex = parseInt(si);
          currentTab = currentSectionIndex;
          break;
        }
      }
      /* end of [to resume from in case of non-sectional time]*/
      //currentSection=sections[0]; // uncomment this line if [to resume from in case of non-sectional time] has any issue

      if(sectionaldistribution==1){
        testtime = currentSection.testtime;
      }
      else{
        testtime = data.test.testtime;
      }
    }

    let testJSONObj = {
      "syncCounter":0,
      "testName":data.test.name,
      "studentName":data.test.studentname,
      "studentCode":data.test.studentcode,
      "studentPhotoPath":data.test.studentphotopath,
      "usefulData":data.test.showusefuldata,
      "isTodayEndDate":data.test.isTodayEndDate,
      "testAutoQuitMessage":data.test.testAutoQuitMessage,
      "importantConstants":data.test.importantConstants,
      "sectionaldistribution":sectionaldistribution,
      "prematureTermination":prematureTermination,
      "autosyncperiod":data.test.autosyncperiod,
      "instructions": data.test.instructions,
      "autoTerminateTest":autoTerminateTest,
      "sections":sections,
      "currentIndex":currentIndex,
      "currentSectionIndex":currentSectionIndex,
      "question":question,
      "sectionDataStore":sectionDataStore,
      "lastAttemptedSectionId":lastAttemptedSectionId,
      "resumeFromSection":resumeFromSection,
      "totalQuestions":totalQuestions,
      "questionDataStore":questionDataStore,
      "currentSection":currentSection,
      "testtime":testtime,
      "currentTab":currentTab,
      "choicetype":currentSection.choicetype,
      "calculatorMode":currentSection.calculatortype,
      "startTime":new Date().getTime(),
      "display":1
    }

    console.log("QuizPlayer -> setUp();  Question : "+JSON.stringify(testJSONObj.question));
    console.log("QuizPlayer -> setUp(); Test time : "+testtime);
    let testRemainingTimeInSeconds = testtime/1000;
    console.log("QuizPlayer -> setUp(); testRemainingTimeInSeconds "+ testRemainingTimeInSeconds);
    let timeLeftVar = this.secondsToTime(testRemainingTimeInSeconds);
    this.setState({
      showLoading: false,
      testdata : testJSONObj,
      testRemainingTimeInSeconds : testRemainingTimeInSeconds,
      time: timeLeftVar
    });

    console.log("QuizPlayer -> setUp(); Test Data : "+JSON.stringify(testJSONObj));
    
    this.startTimer();
    
    //this.loadMathJax();
  }


  /* -----Timer Methods Start----- */
  startTimer() {
    console.log("QuizPlayer -> startTimer()... ");
    if (this.timer == 0 && this.state.testRemainingTimeInSeconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    //console.log("QuizPlayer -> countDown()... "+this.done);
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.testRemainingTimeInSeconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      testRemainingTimeInSeconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0  || this.done == true) { 
      //clearInterval(this.timer);
      //alert("Timer stop!...");
      this.stopCountdown();       
    }
  }

  stopCountdown() {
    console.log("QuizPlayer -> stopCountdown();");
    if(this.timer) {
      clearInterval(this.timer);
      this.timer= undefined;
    }
    if(this.autoSyncTimer) {
      clearInterval(this.autoSyncTimer);
    }
    
    if(!this.done) {
      this.timeOut();
    }
  };

  secondsToTime(secs ){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours<10?"0"+hours:hours,
      "m": minutes<10?"0"+minutes:minutes,
      "s": seconds<10?"0"+seconds:seconds
    };
    return obj;
  }


  /* -----Timer Methods END----- */

  
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
    //console.log("QuizPlayer -> renderHeader()... ");
    return (
      <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
        <div className="ilearn-item-block ">
          { this.state.testdata && 
            <>
            <div className="quiz-player-back" onClick={() => this.forceDismiss()}>
              <FontAwesomeIcon icon={ faArrowLeft } />
            </div>
            <h4 className="quiz-header">{this.state.testBean.name}</h4>
            <div className="quiz-player-timer">{this.renderTimer()}</div>
            </>
          }
          {
            !this.state.testdata && 
            <div className="quiz-player-back" onClick={() => this.props.history.goBack()}>
              <FontAwesomeIcon icon={ faArrowLeft } />
            </div>
          }
        </div>
      </div>
    );
  }

  renderBody() {
    //console.log("QuizPlayer -> renderBody()... ");
    return (      
      <>
      {
        this.state.testdata && this.state.testdata.question && 
        <div className="ilearn-padding-both-sides ilearn-padding-top">
          <Card>
          <Card.Header as="h5" className="question-number">Q :{this.state.testdata.question.runningquestionnumber}/{this.state.testdata.totalQuestions}               
          </Card.Header>
            <Card.Body>
                <div className="ilearn-item-block ">
                    <p className="ilearn-item-inner card-text" dangerouslySetInnerHTML={{__html: this.state.testdata.question.statement}}>
                    </p>
                </div>
                {
                    this.state.testdata.question.choices.choice.map((choice, index) => {
                        return ( 
                          this.renderChoice(choice)
                        );
                    })
                }
            </Card.Body>
          </Card>
        </div>
      }
      </>
    );
    
  }

  renderChoice(choice) {
    //console.log("QuizPlayer -> renderChoice()... ");
    return (
      <>
        <div className="ilearn-padding-both-sides ilearn-padding-top">
          <Card onClick={() => this.onClickOption(this.state.testdata.question, choice.id)}>
            <Card.Body className={`question-choice  ${choice.flag==true? 'correct' : choice.flag==false?'wrong':'normal'}`}>
                <div className="ilearn-item-block ">
                    <p className="ilearn-item-inner card-text question-choice-item-inner" dangerouslySetInnerHTML={{__html: choice.choice}}>
                    </p>
                </div>                
            </Card.Body>
          </Card>          
              <Confetti active={ choice.flag && this.state.showConfettii } />
          </div>
      </>
    )
  }

  renderLoader() {
    //console.log("QuizPlayer -> renderLoader()... ");
    const _loadingText = 'Please wait...';
    return (
        <ILoader
          loadingText={_loadingText}
          isShow={this.state.showLoading}
        >
        </ILoader>
    )
  }

  renderTimer() {
    //console.log("QuizPlayer -> renderTimer()... ");
    return ( 
        <span className="float-right">
            <FontAwesomeIcon icon={ faClock }/> {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
        </span>
    );
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

  toggleConfetti() {
    console.log("QuizPlayer -> toggleConfetti()... ");
    this.setState(state => ({ showConfettii: !state.showConfettii }));
  }
  
  onClickOption(question, selectedChoiceId) {
    console.log("QuizPlayer -> onClickOption(); selectedChoiceId: "+selectedChoiceId);
    if(!this.state.showLoading) { //For Blocking multiple clicks on option buttons.      
      this.setState({
        showLoading: true
      });
      let _showConfetti = false;
      let correctChoiceIndex = null;
      let selectedChoiceIndex = null;
      let correctChoice = null;
      let selectedChoice = null;
      for(let choiceIndex in question.choices.choice) {
        if(question.choices.choice[choiceIndex].correctFlag==1) {
          correctChoiceIndex = choiceIndex;
          correctChoice = question.choices.choice[choiceIndex];
          console.log("QuizPlayer -> onClickOption(); Correct Flag :"+JSON.stringify(correctChoice))
        }
        if(question.choices.choice[choiceIndex].id==selectedChoiceId) {
          selectedChoiceIndex = choiceIndex;
          selectedChoice = question.choices.choice[choiceIndex].id;
          console.log("QuizPlayer -> onClickOption(); Selected Flag :"+JSON.stringify(selectedChoice))
        }
      }
      question.choices.choice[selectedChoiceIndex].attempted="1";
      if(question.choices.choice[correctChoiceIndex].id == question.choices.choice[selectedChoiceIndex].id) {
          question.choices.choice[selectedChoiceIndex].flag= true; 
          _showConfetti = true;         
      }
      else {
        question.choices.choice[selectedChoiceIndex].flag= false;        
        question.choices.choice[correctChoiceIndex].flag = true;
      }
      this.setState({
        showLoading: false,
        showConfettii: _showConfetti
      });
      
      //setInterval(this.next(question.questionnumber), 2000);
      setTimeout(() => {
        this.next(question.questionnumber);
      }, 1000);
      /*setInterval(function() {        
        console.log("QuizPlayer -> onClickOption(); nextQuestion... ");
        this.next(question.questionnumber);
      },2000);*/
      
    }
  }

  next(questionNumber) {
    console.log("QuizPlayer -> next()... ");
    if(this.state.testdata.question.runningquestionnumber >= this.state.testdata.totalQuestions) {
      console.log("QuizPlayer -> next(); FINISH... ");
      this.finish();
    }
    else {
      this.goNext(questionNumber,0);
    }
  }

  goNext(questionNumber,stateId) {
    console.log("QuizPlayer -> goNext()... ");
    let stateName=stateId==0 ? "next" : stateId==1 ? "mark" : "";
    let currentSectionIndex=this.state.testdata.currentSectionIndex ;
    let sectionData=this.state.testdata.sectionDataStore.data[currentSectionIndex];
    //let questionIndex=sectionData.sectionQuestionIndex;
    let questionIndex=this.state.testdata.questionDataStore.data[questionNumber].questionIndex;
    //this.sections[currentSectionIndex].questions.question[questionIndex].marked="0";
    if(this.state.testdata.questionDataStore.data[this.state.testdata.question.questionnumber].stateid=="1"){
      this.state.testdata.questionDataStore.data[this.state.testdata.question.questionnumber].markstatus="reset";
    }
    this.state.testdata.questionDataStore.data[this.state.testdata.question.questionnumber].stateid=stateId;
    //console.log(this.question)
    if( ! this.isNumber(this.state.testdata.question.textanswer) && this.state.testdata.question.textanswer==false){
      this.state.testdata.question.textanswer="";
    }
    /*if(this.question.questioncategory=="0" || this.question.questioncategory=="4" || this.question.questioncategory=="5"){
        let value=document.getElementById("answer").value;
        this.question.textanswer=value;
        this.questionDataStore.data[this.question.questionnumber].textualanswer=value;
    }*/
    this.state.testdata.questionDataStore.data[this.state.testdata.question.questionnumber].state=stateName;
    this.processAttemptedQuestions(stateName);
    questionIndex++;
    let sectionCount=this.state.testdata.sections.length;
    if(questionIndex >= this.state.testdata.sections[currentSectionIndex].questions.question.length) {
      if(this.state.testdata.sectionaldistribution==0){
        if(currentSectionIndex<sectionCount-1){
          currentSectionIndex++;
          this.state.testdata.currentSectionIndex=currentSectionIndex;
          questionIndex=0;
          this.state.testdata.currentTab = currentSectionIndex;
        }
        else {
          currentSectionIndex=0;
          this.state.testdata.currentSectionIndex=currentSectionIndex;
          questionIndex=0;
          this.state.testdata.currentTab = currentSectionIndex;
        }
      }
      if(this.state.testdata.sectionaldistribution==1) {
        this.state.testdata.currentSectionIndex=currentSectionIndex;
        questionIndex=0;
        this.state.testdata.currentTab = currentSectionIndex;
      }
    }
    this.state.testdata.sectionDataStore.data[currentSectionIndex].sectionQuestionIndex=questionIndex;
    this.state.testdata.question=this.state.testdata.sections[currentSectionIndex].questions.question[questionIndex];
    this.state.testdata.question.visited="1";
    this.state.testdata.questionDataStore.data[this.state.testdata.question.questionnumber].attempted=1; // first question always in READY TO ATTEMPT mode i.e. 1
    if( ! this.isNumber(this.state.testdata.question.textanswer) && this.state.testdata.question.textanswer==false) {
      this.state.testdata.question.textanswer="";
    }
    if(this.state.testdata.question.questioncategory=="0" || this.state.testdata.question.questioncategory=="4" || this.state.testdata.question.questioncategory=="5") {
      /*if(this.questionDataStore.data[this.question.questionnumber].textualanswer=="false"){
        document.getElementById("answer").value="";
        }
        else{
        document.getElementById("answer").value=this.questionDataStore.data[this.question.questionnumber].textualanswer;
        }*/
      /*if(document.getElementById("answer")!=undefined) {
        (<HTMLInputElement>document.getElementById("answer")).value=this.question.textanswer;
      }*/

    }
    this.state.testdata.currentSection=this.state.testdata.sections[currentSectionIndex];
    this.state.testdata.calculatorMode=this.state.testdata.currentSection.calculatortype;
    this.state.testdata.choicetype=this.state.testdata.currentSection.choicetype;
    //this.isLoading=false;
    //this.loadMathJax();
  }

  processAttemptedQuestions(state) {
    console.log("QuizPlayer -> processAttemptedQuestions()... ");
    let presentTime=  new Date().getTime();
    // Calculate the difference in milliseconds
    let timeDifference = presentTime - this.state.testdata.startTime;
    let seconds = Math.round(parseInt(timeDifference)/1000);
    this.state.testdata.startTime= presentTime;
    let currentQuestion= this.state.testdata.question;
    if(currentQuestion==undefined){
      return;
    }
    let attemptedChoices=[];
    if(this.state.testdata.question.questioncategory=="1" || this.state.testdata.question.questioncategory=="26") { // mcq
      let choices=currentQuestion.choices;
      for(let index in choices.choice) {
        if(choices.choice[index].attempted=="1") {
          attemptedChoices.push(choices.choice[index].id);
        }
      }
    }
    /*if(this.state.testdata.question.questioncategory=="2"){ // mtf
        //console.log("mtf")
        let choices=currentQuestion.choices;
        for(let index in choices.choice){
          let matches=choices.choice[index].matches;
          let selectedMatches="";
          for(let matchIndex in matches.match){
            //console.log(matchIndex+"="+matches.match[matchIndex].attempted)
            if(matches.match[matchIndex].attempted==true){
              //console.log("yes")
              if(selectedMatches.length>0){
                selectedMatches+=";";
              }
              selectedMatches+=matches.match[matchIndex].id;
            }
          }
          if(selectedMatches.length>0){
            attemptedChoices.push(choices.choice[index].id+":"+selectedMatches);
          }
        }
        //console.log(attemptedChoices)
    }*/
    //this.choicetype;
    //console.log(attemptedChoices)
    let summedTimeSpent=parseInt(this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].timetaken) + seconds;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].sectionid=currentQuestion.questionsectionid;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].attemptid=currentQuestion.attemptid;
    if(this.state.testdata.question.questioncategory=="1" || this.state.testdata.question.questioncategory=="26") {
      this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].attemptedchoices=attemptedChoices;
    }
    /*if(this.state.testdata.question.questioncategory=="2"){
      this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].attemptedchoices=attemptedChoices;
    }*/
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].timetaken=summedTimeSpent;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].currenttimetaken=seconds;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].state=state;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].attempted=1;
    /*if(this.state.testdata.question.questioncategory=="0" || this.question.questioncategory=="4" || this.question.questioncategory=="5"){
        this.state.testdata.questionDataStore.data[this.question.questionnumber].textualanswer=currentQuestion.textanswer;
    }*/
    let currentAttempted=[] ;
    let toBeSubmittedIndex=0;
    for( let failedIndex in this.state.testdata.questionDataStore.data){
      if(this.state.testdata.questionDataStore.data[failedIndex].attempted==1){
        currentAttempted[toBeSubmittedIndex]=this.state.testdata.questionDataStore.data[failedIndex];
        toBeSubmittedIndex++;
      }
    }
    if(currentAttempted.length>=5){
       this.connectionError();
    }
    //console.log(currentAttempted);

    console.log("QuizPlayer -> processAttemptedQuestions(); submitTestData()-> currentAttempted :  "+JSON.stringify(currentAttempted));
    ApiService.submitTestData(currentAttempted)
      .then(res => { //SuccessCB
        //console.log("QuizPlayer -> processAttemptedQuestions(); submitTestData()-> Response :  "+JSON.stringify(res));
        let respData = res.data;
        console.log("QuizPlayer -> processAttemptedQuestions(); submitTestData()-> Response :  "+JSON.stringify(respData));
        /*{"status":1,"message":"Test data successfully saved.","data":[]}*/
        this.state.testdata.syncCounter=0;
        if(respData.status==1 || respData.status==2 ) { // server responded with NO ERRORS
          for(let updateIndex in currentAttempted) {   // if server responded i.e. submitted data saved successfully , change currentAttempts status to ATTEMPTED STATUS as 2
            this.state.testdata.questionDataStore.data[currentAttempted[updateIndex].questionnumber].attempted=2;
          }
          if(respData.status==2){
            this.state.testdata.publishResultLater=2;
            this.state.testdata.publishResultLaterMessage="<br/>We will publish the result soon.";
          }
          else{
            this.state.testdata.publishResultLater=0;
            this.state.testdata.publishResultLaterMessage="";
          }
        }
        if(respData.status==0){ // server responded with SOME ERRORS
          for(let updateIndex in currentAttempted){   // if server responded i.e. submitted data saved successfully , change currentAttempts status to ATTEMPTED STATUS as 1
            this.state.testdata.questionDataStore.data[currentAttempted[updateIndex].questionnumber].attempted=1;
          }
        }  
      },
      error => { //ErrorCB
        console.log("QuizPlayer -> processAttemptedQuestions(); submitTestData()-> Connection Error : "+Config.CONNECTION_ERROR);
        this.state.testdata.syncCounter++;
      }
    );    
  };

  finish() {
    console.log("QuizPlayer -> finish(); Finish Quiz...");
    ApiService.checkServer(this.state.enquiryId)
      .then(res => { //SuccessCB
        //this.isLoading=false;    
        let respData = res.data;
        console.log("QuizPlayer -> finish(); Response :  "+JSON.stringify(respData));
        /*{"status":1,"message":"Test data successfully saved.","data":[]}*/
        if(respData.status==1) {
          let finishMode="finish";
          if(this.state.testdata.timeover=="1") {
            finishMode="autofinish";
          }
          this.done=true;//this.stopCountdown();
          this.processAttemptedQuestions(finishMode);
          this.state.testdata.showcancel="0";
          if(this.state.testdata.timeover=="1"){
            this.timeOverConfirm();
          }
          else{
            this.confirm();
          }
        } 
      },
      error => { //ErrorCB
        console.log("QuizPlayer -> finish();Connection Error : "+Config.CONNECTION_ERROR);
        this.state.testdata.syncCounter++;
        if(this.state.testdata.syncCounter>=1) {
          this.connectionError();
        }
      }
    );    
  }

  /*update test remaining time periodically*/
  sync() {
    console.log("QuizPlayer -> sync();");
    let presentTime=  new Date().getTime();
    // Calculate the difference in milliseconds
    let timeDifference = presentTime - this.state.testdata.startTime;
    let seconds = Math.round(parseInt(timeDifference)/1000);
    this.state.testdata.startTime = presentTime;
    let currentQuestion = this.state.testdata.question;
    if(currentQuestion==undefined) {
      return;
    }
    let summedTimeSpent = parseInt(this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].timetaken) + seconds;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].sectionid = currentQuestion.questionsectionid;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].attemptid = currentQuestion.attemptid;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].timetaken = summedTimeSpent;
    this.state.testdata.questionDataStore.data[currentQuestion.questionnumber].currenttimetaken = seconds;
    let currentAttempted = [];
    let toBeSubmittedIndex = 0;
    currentAttempted[toBeSubmittedIndex] = this.state.testdata.questionDataStore.data[currentQuestion.questionnumber];
    ApiService.syncTime(currentAttempted)
      .then(res => { //SuccessCB
        let respData = res.data;
        console.log("QuizPlayer -> syncTime(); Response :  "+JSON.stringify(respData));
        /*{"status":1,"message":"Test data successfully saved.","data":[]}*/
        this.state.testdata.syncCounter=0;
        if(respData.status==2) {
          this.timeOut();
        }
      },
      error => { //ErrorCB
        console.log("QuizPlayer -> finish();Connection Error : "+Config.CONNECTION_ERROR);
        this.state.testdata.syncCounter++;
        if(this.state.testdata.syncCounter>=1) {
          this.connectionError();
        }
      }
    ); 
  }

  /*time over and finish the Test*/
  timeOut() {
    this.state.testdata.timeover="1";
    this.submitTest();
  }

  submitTest() {
    console.log("QuizPlayer -> submitTest();");
    let currentSectionIndex=this.state.testdata.currentSectionIndex;
    if( ! this.isLastSection() && this.state.testdata.sectionaldistribution==1) {
      this.processAttemptedQuestions("endsection");
      ApiService.checkServer(this.state.enquiryId)
      .then(res => { //SuccessCB   
        let respData = res.data;
        console.log("QuizPlayer -> submitTest(); Response :  "+JSON.stringify(respData));
        /*{"status":1,"message":"Test data successfully saved.","data":[]}*/
        if(respData.status==1) {
          currentSectionIndex++;
          this.state.testdata.currentSectionIndex=currentSectionIndex;
          this.state.testdata.testtime = this.sections[this.state.testdata.currentSectionIndex].sectiontesttime;
          //this.startCountdown(this.state.testdata.testtime);
          this.performancePage="performancePage";
          this.display="1"
        }
      },
      error => { //ErrorCB
        console.log("QuizPlayer -> submitTest();Connection Error : "+Config.CONNECTION_ERROR);
        this.state.testdata.syncCounter++;
        if(this.state.testdata.syncCounter>=1) {
          this.connectionError();
        }
      });
    }
    else{
        this.performancePage="";
        this.finish();
    }
  }

  confirm() {
    console.log("QuizPlayer -> confirm();");    
    swal({
      title: "Good job!",
      text: "Your answers have been saved and the Quiz has been submitted successfully.",
      //icon: "success",
      button: "OK",
    })
    .then((value) => {
      console.log("Redirect Test Analysis/home...");
      this._dismiss(1);
    });  
  }

  /*time over confirm*/
  timeOverConfirm() {
    console.log("QuizPlayer -> timeOverConfirm();");
    swal({
			title: "Time Out!",
			text: "<span style='color: #e94c42;font-weight: bold;'>The Quiz End Time is over.<span><div style='color: #000;font-weight: normal;'>Your answers have been saved and the quiz has been submitted successfully.</div>" ,
			buttons: "OK",
			})
    .then(resp => { 
      console.log("Redirect Test Analysis/home...");
      this._dismiss(1);
    });
      
  }

  connectionError() {
    console.log("QuizPlayer -> connectionError();");
    swal({
			title: "Netwok/Connection Error!",
			text: Config.CONNECTION_ERROR ,
			button: "OK",
			})
    .then(resp => { 
      console.log("Connection Error OK Clicked!..");
    });  
  }

  forceDismiss() {
    swal({
      title: "Are you sure?",
      text: "You want to quit the quiz?",
      //icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willQuit) => {
      if (willQuit) { // Yes else No
        this.done=true;  //stops the timer.
        this.sync();
        this._dismiss(0);
      }
    });
  }

  _dismiss(status) {
    this.done=true;  //stops the timer.
    this.props.history.goBack();   
  } 

  isLastSection() {
    return this.sections.length-1==this.currentSectionIndex;
  }

  startQuiz(testBean) {
    console.log("QuizPlayer -> startQuiz()... "+JSON.stringify(testBean));
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  isEmpty(str) {
    return (! this.isNumber(str) && str.length == 0);
  }

}

export {QuizPlayer};
