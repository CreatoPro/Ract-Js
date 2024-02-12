import React, { Component, useState } from "react";
import "./question-style.css";
import Config from "../../_config/config";
import ApiService from "../../_services/ApiService";
import { ILoader } from "./../../_components/iloader/iloader";
import { Row, Container } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Header from "./components/Header";
import Section from "./components/Section";
import Timer from "./../../_components/timer/timer";
import QuestionPalette from "./components/QuestionPalette";
import Model from "./components/Model";
import Question from "./components/Question";
import { QUESTION_TYPES } from "./components/Types";
import swal from "sweetalert";
import NumPad from "react-numpad";
import avatar from "./img/blank-avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Proctored from "./../../_components/proctored";
import toogleOpen from "./img/mobile-slide.png";
import toogleClose from "./img/mobile-slide2.png";
import Utils from "../../_helpers/utils";

const AWS = require("aws-sdk");
AWS.config.clear();
// AWS.config.update({
//   region: Config.AWSRegion,
//   accessKeyId: Config.AWSAccessKeyId,
//   secretAccessKey: Config.AWSSecretAccessKey,
// });

class TestPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      questions: [],
      show: false,
      close: false,
      testObject: "",
      userObject: "",
      section_index: 0,
      question_index: 0,
      view: "question",
      prevTime: 0,
      answer: null,
      testCategory: null,
      isUpdate: true,
      progress: "",
      allowAttachmentUploadAfterTest: false,
      webCamProctoring: false,
      blockMsg:
        "Suspicious activity detected. Your Exam is now blocked. Please contact the Exam Department for further assistance.",
      toogleActive: false,
      notificationActive: true,
      similarity: 100,
      timerBlock: false,
    };
    //this.downloadTest = this.downloadTest.bind(this);
    this.resumeTest = this.resumeTest.bind(this);
    this.node = React.createRef();
    this.inputOpenFileRef = React.createRef();
    this.myBucket = new AWS.S3({
      params: { Bucket: "tuningfork-live" },
      region: Config.AWSRegion,
    });
    this.timeout = 0;
  }

  componentDidMount() {
    //console.log("this.props.location.....");
    //console.log(this.props.location);
    //console.log("this.props.location.....end");
    this.setState({
      userObject: JSON.parse(localStorage.getItem("user")) || [],
      tenant: localStorage.getItem("tenant") || Config.siteTitle,
      //testTime: parseInt(testobj.testTime)*60
      testCategory: this.props.location.state
        ? this.props.location.state.testCategory
        : "",
      testLms: this.props.location.state ? this.props.location.state.lms : 0,
      testSteps: this.props.location.state
        ? this.props.location.state.steps
        : 0,
      testResume: this.props.location.state
        ? this.props.location.state.resume
        : false,
      testUrl: this.props.location.state
        ? this.props.location.state.testUrl
        : "",
    });
    document.body.classList.add("test-player-body");
    //this.downloadTest();
    if (window.MathJax !== undefined) {
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
        this.node.current,
      ]);
    }

    //this.updateTimer();
    this.interval = setInterval(() => {
      this.updateTimer();
    }, 60000);

    this.resumeTest();
  }

  componentDidUpdate() {
    if (window.MathJax !== undefined) {
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
        this.node.current,
      ]);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showAlert() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = Config.CONNECTION_ERROR_MSG;
    swal({
      content: wrapper,
      icon: "warning",
      button: "Ok",
      allowOutsideClick: false,
      closeOnClickOutside: false,
      className: "orange-card",
    }).then((willDelete) => {
      if (willDelete) {
        window.location.reload();
      }
    });
  }

  BlockAlert(msg) {
    const { testObject } = this.state;
    swal({
      text: msg,
      icon: "warning",
      button: "Ok",
      allowOutsideClick: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((willDelete) => {
      if (willDelete) {
        if (testObject?.testConfig?.lockdownBrowser == true) {
          //this.props.history.push('/');
          window.location.href = "/dashboard";
        } else {
          window.close();
        }
      }
    });
  }

  onFileChange(event) {
    event.preventDefault();
    let testObject = this.state.testObject;
    let file = event.target.files[0];
    let fileName = event.target.files[0].name;
    //var res_field = document.myform.elements["filefield"].value;
    var extension = fileName
      .substr(fileName.lastIndexOf(".") + 1)
      .toLowerCase();
    var allowedExtensions = testObject?.testConfig?.validUploadFormats || [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
    ];
    if (fileName.length > 0) {
      if (allowedExtensions.indexOf(extension) === -1) {
        alert(
          "Invalid file Format. Only " +
            allowedExtensions.join(", ") +
            " are allowed."
        );
        return false;
      } else {
        this.uploadFile(file);
      }
    }
    /*var allowedExtensions = /(\.pdf|\.doc|\.docx|\.xls|\.xlsx)$/i;
		if (!allowedExtensions.exec(fileName)) {
			alert('Invalid file type');
		}else{
			this.uploadFile(file)
		}*/
  }

  uploadFile = async (file) => {
    const { userObject, testObject, section_index, question_index } =
      this.state;
    const question =
      testObject.sections[section_index].questions[question_index];
    const tenant = localStorage.getItem("tenant") || Config.siteTitle;

    const testId = this.props.match?.params?.id;

    this.setState({ showLoading: true }, async () => {
        const formData = new FormData();
        formData.append('dateBefore', new Date());
        formData.append( 
          "answersheetFile", 
          file, 
          file.name,    
        );
  
      try {
        const { testObject, section_index, question_index } = this.state;
        const question =
          testObject.sections[section_index].questions[question_index];
        console.log('here');
        const res = await ApiService.uploadDoucment(
          formData,
          testId,
          question.id
        );
        console.log(res);
        var uploads = question.studentUploads || [];
        const {url} = res?.data || {};
        const urlArr = url?.split('/') || [];
        console.log(urlArr);
        const fileName = urlArr[urlArr.length -1];
        console.log(fileName);
        uploads.push(fileName);
        question.studentUploads = uploads;
        //console.log(question);
        this.setState({
          testObject: testObject,
        });
        this.updateS3file(question.id, uploads);
      } catch (err) {
        console.log(err);
        this.showAlert();
      } finally {
        this.setState({
          showLoading: false,
        });
      }
    });
  };

  deleteFile(e, index) {
    e.preventDefault();
    const { testObject, section_index, question_index } = this.state;
    const question =
      testObject.sections[section_index].questions[question_index];
    var uploads = question.studentUploads;
    const filteredItems = uploads
      .slice(0, index)
      .concat(uploads.slice(index + 1, uploads.length));
    question.studentUploads = filteredItems;
    this.updateS3file(question.id, filteredItems);
  }

  updateS3file(question_id, uploads) {
    const fileUploads = uploads.join();
    const { tenant, userObject, testObject } = this.state;
    var student_response = {
      tenant: tenant,
      testId: testObject.id,
      userId: userObject.userId,
      isTimer: false,
      isUpload: true,
      student_uploads: {
        [question_id]: fileUploads,
      },
    };

    console.log(student_response, "response");

    ApiService.testResponses(JSON.stringify(student_response))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, err.stack); // an error occurred
        this.showAlert();
      });
  }

  resumeTest() {
    const userObject = JSON.parse(localStorage.getItem("user"));
    const testId = this.props.match.params.id;
    var tenant = localStorage.getItem("tenant") || Config.siteTitle;
    //'https://tuningfork-'+ Config.siteMode +'.s3.amazonaws.com/'+ tenant +'/uploads/testPapers/'+ testId +'/'+ testId +'.json'
    let testUrl = this.props.location.state?.testUrl;

    if (testUrl) {
      var student_response = {
        tenant: tenant,
        testId: testId,
        userId: userObject.userId,
        s3Url: testUrl,
      };
      var that = this;

      this.setState({ showLoading: true }, () => {
        ApiService.testResumes(JSON.stringify(student_response))
          .then((res) => res.json())
          .then((res) => {
            console.log(res, "response");

            let section_index = 0;
            let question_index = 0;
            let testObject = res.data;
            console.log(testObject, "Test object");
            if (testObject?.last_attempt != undefined) {
              let sindex = testObject.sections.findIndex(
                (x) => x.id === testObject.last_attempt.sectionid
              );
              if (sindex >= 0) {
                section_index = sindex;
              }
            }

            testObject?.sections.forEach((section, i) => {
              var questions = [];
              testObject.sections[i].questions.forEach((question, j) => {
                if (question.hasOwnProperty("questions")) {
                  var questions_list =
                    testObject.sections[i].questions[j].questions;
                  questions_list.forEach((q, k) => {
                    questions.push(questions_list[k]);
                  });
                } else {
                  questions.push(question);
                }
              });
              testObject.sections[i].questions = questions;
              if (testObject.last_attempt != undefined) {
                let qindex = questions.findIndex(
                  (x) => x.id === testObject.last_attempt.questionid
                );
                if (qindex >= 0) {
                  question_index = qindex;
                }
              }
            });

            if (!testObject.sections[0]?.questions[0]?.class) {
              testObject.sections[0].questions[0].class = "not-answered-large";
            }

            if (
              testObject?.testConfig?.initRDSonTestStart == true ||
              testObject?.testConfig?.initRDSonTestStart == undefined
            ) {
              that.initTestRDS(testId);
            }

            if (that.state.testResume == false) {
              that.initTestDynamodb();
            }

            that.setState({
              testObject: testObject,
              timeSpent: parseInt(testObject.timeSpent),
              //testTime : (parseInt(testObject.testTime)-parseInt(testObject.timer.time || 0))*60,
              //prevTime: (parseInt(testObject.testTime)-parseInt(testObject.timer.time || 0))*60,
              testTime: parseInt(testObject.testTime) * 60,
              prevTime: parseInt(testObject.testTime) * 60,
              showLoading: false,
              section_index: section_index,
              question_index: question_index,
              webCamProctoring:
                testObject?.testConfig?.webCamProctoring?.enabled,
              allowAttachmentUploadAfterTest:
                testObject?.testConfig?.allowAttachmentUploadAfterTest,
            });

            if (that.timeout) clearTimeout(that.timeout);
            that.timeout = setTimeout(() => {
              that.considerBestOf(section_index);
            }, 100);
          })
          .catch((err) => {
            that.setState({
              showLoading: false,
            });
            //alert(Config.CONNECTION_ERROR_MSG);
            that.showAlert();
            console.log(err, err.stack); // an error occurred
          });
      });
    } else {
      this.showAlert();
    }
  }

  initTestRDS(testId) {
    this.setState({ loading: true }, () => {
      ApiService.initTestTaking(testId).then(
        (res) => {
          this.setState({
            loading: false,
          });
        },
        (error) => {
          this.setState({
            showLoading: false,
          });
          this.showAlert();
        }
      );
    });
  }

  initTestDynamodb() {
    let tenant = localStorage.getItem("tenant") || Config.siteTitle;
    //let tenant = "isbat_testing"
    let userObject = JSON.parse(localStorage.getItem("user")) || [];
    var student_response = {
      tenant: tenant,
      testId: this.props.match.params.id,
      userId: userObject.userId,
      testDetails: true,
    };

    console.log(student_response, "response");
    var that = this;

    ApiService.testResponses(JSON.stringify(student_response))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        that.props.history.replace({ state: { resume: true } });
      })
      .catch((err) => {
        that.showAlert();
        console.log(err, err.stack); // an error occurred
      });
  }

  updateTimer() {
    if (this.state.timerBlock === false) {
      var blockMsg = this.state.blockMsg;
      var time = Math.round(
        (this.state.testTime - this.state.currentTimeSeconds) / 60
      );
      const { tenant, userObject, testObject, timeSpent } = this.state;
      var student_response = {
        tenant: tenant,
        testId: testObject.id,
        userId: userObject.userId,
        time: timeSpent + time,
        sectionid: "",
        isTimer: true,
        isUpdate: this.state.isUpdate,
        proctor: this.state.webCamProctoring,
      };
      var that = this;
      console.log(student_response, "response");

      ApiService.testResponses(JSON.stringify(student_response))
        .then((res) => res.json())
        .then((res) => {
          console.log(res); // successful response
          if (that.state.webCamProctoring) {
            that.setState({
              similarity: res.similarity,
              notificationActive: true,
            });
          }
          if (res.blanket_flag == "BLOCK") {
            that.BlockAlert(blockMsg);
            that.setState({
              timerBlock: true,
            });
          } else if (res.blanket_flag == "" && res.block_test == true) {
            that.BlockAlert(blockMsg);
            that.setState({
              timerBlock: true,
            });
          }
        })
        .catch((err) => {
          alert(Config.CONNECTION_ERROR_MSG);
          console.log(err, err.stack); // an error occurred
        });
    }
  }

  downloadTest() {
    var d = new Date();
    var rand = d.getTime();
    var testId = this.props.match.params.id;
    var tenant = localStorage.getItem("tenant") || Config.siteTitle;
    var testobj =
      "https://tuningfork-" +
      Config.siteMode +
      ".s3.amazonaws.com/" +
      tenant +
      "/uploads/testPapers/" +
      testId +
      "/" +
      testId +
      ".json";
    this.setState({ showLoading: true }, () => {
      ApiService.fetchTestJson(testobj + "?id=" + rand).then(
        (res) => {
          console.log(JSON.stringify(res));
          let testObject = res.data;
          for (let i = 0; i < testObject.sections.length; i++) {
            for (let j = 0; j < testObject.sections[i].questions.length; j++) {
              if (testObject.sections[i].questions[j].questions) {
                var questions_list =
                  testObject.sections[i].questions[j].questions;
                var questions_length = questions_list.length;
                //delete testObject.sections[i].questions[j];
                for (let k = 0; k < questions_length; k++) {
                  testObject.sections[i].questions.push(questions_list[k]);
                }
                //testObject.sections[i].questions.splice(j,1);
              }
            }
          }

          for (let i = 0; i < testObject.sections.length; i++) {
            for (let j = 0; j < testObject.sections[i].questions.length; j++) {
              if (testObject.sections[i].questions[j].questions) {
                testObject.sections[i].questions.splice(j, 1);
                //	console.log(JSON.stringify(testObject));
              }
            }
            testObject.sections[i].questions.sort(function (a, b) {
              return a.questionNumber - b.questionNumber;
            });
          }

          for (let i = 0; i < testObject.sections.length; i++) {
            for (let j = 0; j < testObject.sections[i].questions.length; j++) {
              if (testObject.sections[i].questions[j].questions) {
                testObject.sections[i].questions.splice(j, 1);
                //	console.log(JSON.stringify(testObject));
              }
            }
          }

          if (!testObject.sections[0].questions[0].class) {
            testObject.sections[0].questions[0].class = "not-answered-large";
          }

          //console.log(JSON.stringify(testObject));
          this.setState({
            testObject: testObject,
            testTime: parseInt(testObject.testTime) * 60,
            prevTime: parseInt(testObject.testTime) * 60,
            showLoading: false,
          });
        },
        (error) => {
          this.setState({
            showLoading: false,
          });
          alert(Config.CONNECTION_ERROR_MSG);
        }
      );
    });
  }

  modeShow = (show) => {
    this.setState({
      show: show,
    });
  };

  changeView(view) {
    this.setState({
      view: view,
      toogleActive: false,
      overlay: false,
    });
  }

  toggleClass() {
    const currentState = this.state.toogleActive;
    this.setState({ toogleActive: !currentState, overlay: !currentState });
  }

  closeNotifiction() {
    this.setState({ notificationActive: false });
  }

  EndExam = (status) => {
    this.NextQuestion("submit");
    const { tenant, userObject, testObject } = this.state;
    var submitStatus = status;
    if (!submitStatus) {
      submitStatus = 2;
    }
    var student_response = {
      tenant: tenant,
      testId: testObject.id,
      userId: [userObject.userId],
      testSubmit: true,
      submitStatus: submitStatus,
      autoSubmitToRDS: testObject?.testConfig?.autoSubmitToRDS,
      siteUrl: Config.siteUrl,
    };
    var that = this;
    console.log(student_response, "response");

    that.setState({ showLoading: true }, () => {
      ApiService.testResponses(JSON.stringify(student_response))
        .then((res) => res.json())
        .then((res) => {
          //console.log(data);  // successful response
          that.setState({
            showLoading: false,
          });

          //if(res.status=="success" && testObject?.testConfig?.autoSubmitToRDS == true){
          //that.SubmitToRDS();
          //}else

          if (res.status == "success") {
            swal({
              text:
                testObject?.testConfig?.resutDeclarationMessage ||
                "Test submitted successfully.",
              icon: "success",
              button: "Ok",
              allowOutsideClick: false,
              closeOnClickOutside: false,
              closeOnEsc: false,
            }).then((willDelete) => {
              if (willDelete) {
                document.body.classList.remove("test-player-body");
                if (that.state.allowAttachmentUploadAfterTest == true) {
                  console.log("here");
                  that.props.history.replace({
                    pathname: "/test/upload/" + testObject.id,
                    state: { testEndTime: 0 },
                  });
                } else if (testObject?.testConfig?.lockdownBrowser == true) {
                  window.location.href = "/dashboard";
                } else if (testObject?.testConfig?.autoSubmitToRDS == true) {
                  that.props.history.replace("/test-result/1/" + testObject.id);
                } else {
                  window.close();
                }
              }
            });
          } else {
            that.BlockAlert("Unable to submit test. Please try again later");
          }
        })
        .catch((err) => {
          console.log(err, err.stack); // an error occurred
          that.setState({
            showLoading: false,
          });
          alert(Config.CONNECTION_ERROR_MSG);
        });
    });

    this.setState({
      show: false,
    });
  };

  SubmitToRDS = () => {
    const { tenant, userObject, testObject } = this.state;
    this.setState({ showLoading: true }, () => {
      ApiService.submitTest(testObject.id, userObject.userId).then(
        (res) => {
          console.log(JSON.stringify(res));
          this.setState({
            showLoading: false,
          });
          if (res.data.message) {
            //Your answers have been saved and the Test has been submitted successfully.
            //Please wait we are redirect to test result page.
            swal({
              text: res.data.message,
              icon: "success",
              button: "Ok",
              allowOutsideClick: false,
              closeOnClickOutside: false,
              closeOnEsc: false,
            }).then((willDelete) => {
              if (willDelete) {
                document.body.classList.remove("test-player-body");
                if (this.state.allowAttachmentUploadAfterTest == true) {
                  console.log("here");
                  this.props.history.push({
                    pathname: "/test/upload/" + testObject.id,
                    state: { testEndTime: 0 },
                  });
                } else if (
                  this.state.testLms == 0 &&
                  this.state.testSteps == 0
                ) {
                  this.props.history.replace("/test-result/1/" + testObject.id);
                } else {
                  this.props.history.replace("/test-result/1/" + testObject.id);
                }
              }
            });
          } else {
            swal({
              text: "Unable to submit test. Please try again later",
              icon: "warning",
              button: "Ok",
              allowOutsideClick: false,
              closeOnClickOutside: false,
              closeOnEsc: false,
            }).then((willDelete) => {
              if (willDelete) {
                document.body.classList.remove("test-player-body");
                if (this.state.testLms == 0 && this.state.testSteps == 0) {
                  this.props.history.replace("/test-result/1/" + testObject.id);
                } else {
                  this.props.history.replace("/test-result/1/" + testObject.id);
                }
              }
            });
          }
        },
        (error) => {
          this.setState({
            showLoading: false,
          });
          alert(Config.CONNECTION_ERROR_MSG);
        }
      );
    });

    this.setState({
      show: false,
    });
  };

  changeSection = (section_index) => {
    this.setState({
      section_index: section_index,
      question_index: 0,
    });
    let question_index = 0;
    const testObject = this.state.testObject;
    const question =
      testObject.sections[section_index].questions[question_index];
    if (!question.class) {
      question.class = "not-answered-large";
    }

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.considerBestOf(this.state.section_index);
    }, 100);
  };

  showQuestion(section_index, question_index) {
    const testObject = this.state.testObject;
    const question =
      testObject.sections[section_index].questions[question_index];
    //console.log(testObject);
    var a = [];
    a = document.getElementsByTagName("input");

    if (question.questionCategory == QUESTION_TYPES[5].value) {
      for (var b = 0; b < a.length; b++) {
        if (a[b].type == "checkbox") {
          a[b].checked = false;
        }
      }
    }

    this.setState({
      section_index: section_index,
      question_index: question_index,
      answer: "",
    });

    //let answered = question.answered;
    if (!question.class) {
      question.class = "not-answered-large";
    }

    this.setState({ toogleActive: false, overlay: false });
  }

  getCheckeboxValue(event) {
    const choice = event.target.value;
    //const status = event.target.checked;
    this.setState({
      choice: choice,
    });
  }

  onTodoChange(answer) {
    this.setState({
      answer: answer,
    });
  }

  NextQuestion = (type) => {
    var that = this;
    const { tenant, userObject, testObject, section_index, question_index } =
      this.state;
    const section = testObject.sections[section_index];
    const question =
      testObject.sections[section_index].questions[question_index];

    //console.log(testObject.sections[section_index].questions);

    var choiceString = [];
    var status = "";
    var choice = [];
    var checkeds = "";
    if (
      question.questionCategory == QUESTION_TYPES[0].value ||
      question.questionCategory == QUESTION_TYPES[1].value
    ) {
      if (question.questionCategory == QUESTION_TYPES[0].value) {
        checkeds = document.querySelectorAll("input[type=checkbox]:checked");
      } else if (question.questionCategory == QUESTION_TYPES[1].value) {
        checkeds = document.querySelectorAll("input[type=radio]:checked");
      }

      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          for (var opt = 0; opt < question.choices.length; opt++) {
            if (question.choices[opt].id == checkeds[i].value) {
              choiceString[opt] = question.choices[opt].choiceString;
              choice[opt] = checkeds[i].value;
              question.choices[opt].checked = 1;
              question.answered = 1;
            } else {
              question.choices[opt].checked = 0;
            }
          }
        }
      }

      if (choiceString.length > 0) {
        choiceString = choiceString.filter((n) => n);
        choiceString = choiceString.join();
        choice = choice.filter((n) => n);
        choice = choice.join();
      } else {
        choiceString = "";
        choice = "";
      }
    } else if (
      question.questionCategory == QUESTION_TYPES[2].value ||
      question.questionCategory == QUESTION_TYPES[3].value ||
      question.questionCategory == QUESTION_TYPES[4].value ||
      question.questionCategory == QUESTION_TYPES[6].value
    ) {
      var choiceString = "";
      var choice = "";
      choiceString = this.state.answer || question.answered;
      question.answered = this.state.answer || question.answered;
    } else if (question.questionCategory == QUESTION_TYPES[5].value) {
      /*var answered_array =  "";
			var choiceString = "";
			var choice = "";*/
      var answered_array = [];
      var choiceString = [];
      var choice = [];
      checkeds = document.querySelectorAll("input[type=checkbox]:checked");
      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          answered_array.push(checkeds[i].value);
        }
      }
      question.answered = answered_array;
      var arr = answered_array;
      var answered = {};
      if (arr != undefined) {
        for (var c = 0; c < arr.length; c++) {
          var cur = arr[c];
          var choice = cur.split(":")[0];
          var match = cur.split(":")[1];
          if (answered[choice]) {
            var matches = answered[choice];
            matches.push(match);
            answered[choice] = matches;
          } else {
            var matches = [];
            matches.push(match);
            answered[choice] = matches;
          }
        }
      }

      var answers = Object.keys(answered);
      var attemptedAnswer = "";
      for (var d = 0; d < answers.length; d++) {
        var choice = answers[d];
        attemptedAnswer += choice + ":";
        for (var e = 0; e < answered[choice].length; e++) {
          attemptedAnswer += answered[choice][e] + ";";
        }
        attemptedAnswer = attemptedAnswer.slice(0, attemptedAnswer.length - 1);
        attemptedAnswer += ",";
      }
      attemptedAnswer = attemptedAnswer.slice(0, attemptedAnswer.length - 1);

      if (answered_array.length == 0) {
        choiceString = "";
      } else {
        //choiceString = answered_array;
        choiceString = answered_array.join();
      }
      choice = attemptedAnswer;
    }

    if (
      choiceString &&
      (type == "next" ||
        type === "save" ||
        type === "prev" ||
        type === "submit")
    ) {
      status = "A";
      question.class = "answered-large";
    } else if (
      type == "next" ||
      type === "save" ||
      type === "prev" ||
      type === "submit"
    ) {
      status = "N_A";
      question.class = "not-answered-large";
    } else if (choiceString && (type == "mark" || type === "mark_notSave")) {
      status = "M_A";
      question.class = "answered-marked-large";
    } else if (type == "mark" || type === "mark_notSave") {
      status = "M";
      question.class = "marked-large";
    }

    var ts =
      parseInt(this.state.prevTime) - parseInt(this.state.currentTimeSeconds);
    this.setState({
      prevTime: this.state.currentTimeSeconds,
    });

    var timestamp = new Date().valueOf();
    var student_response = {
      tenant: tenant,
      testId: testObject.id,
      userId: userObject.userId,
      t: timestamp,
      ts: ts,
      questionid: question.id,
      sectionid: section.id,
      attemptedchoiceid: choice,
      attemptedchoicestring: choiceString,
      status: status,
      isTimer: false,
      isUpdate: this.state.isUpdate,
    };

    question.attemptedchoiceid = choice;
    question.attemptedchoicestring = choiceString;

    console.log(student_response, "response");

    that.setState({ showLoading: true }, () => {
      ApiService.testResponses(JSON.stringify(student_response))
        .then((res) => res.json())
        .then((res) => {
          console.log(res); // successful response
          that.setState({
            showLoading: false,
          });

          if (type === "submit") return;
          if (type === "save") return;
          if (type === "prev") return;
          if (type === "mark_notSave") return;

          this.considerBestOf();

          var a = [];
          a = document.getElementsByTagName("input");
          for (var b = 0; b < a.length; b++) {
            if (a[b].type == "checkbox") {
              a[b].checked = false;
            }
          }

          if (
            question_index <
            testObject.sections[section_index].questions.length - 1
          ) {
            this.setState({
              question_index: this.state.question_index + 1,
              choice: "",
              answer: "",
              testObject: testObject,
            });
          } else if (section_index < testObject.sections.length - 1) {
            this.setState({
              section_index: this.state.section_index + 1,
              question_index: 0,
              choice: "",
              answer: "",
              testObject: testObject,
            });
          } else {
            this.setState({
              section_index: 0,
              question_index: 0,
              choice: "",
              answer: "",
              testObject: testObject,
            });
          }
        })
        .catch((err) => {
          that.setState({
            showLoading: false,
          });
          alert(Config.CONNECTION_ERROR_MSG);
          console.log(err, err.stack); // an error occurred
        });
    });

    //console.log(this.state.testObject)
  };

  PrevQuestion = () => {
    this.NextQuestion("prev");

    const { testObject, section_index, question_index } = this.state;

    if (question_index != 0) {
      this.setState({
        question_index: this.state.question_index - 1,
        choice: "",
        answer: "",
        testObject: testObject,
      });
    } else if (section_index != 0) {
      this.setState({
        section_index: this.state.section_index - 1,
        question_index:
          testObject.sections[this.state.section_index - 1].questions.length -
          1,
        choice: "",
        answer: "",
        testObject: testObject,
      });
    } else {
      this.setState({
        section_index: 0,
        question_index: 0,
        choice: "",
        answer: "",
        testObject: testObject,
      });
    }
  };

  considerBestOf = (section_ind) => {
    const { testObject, section_index } = this.state;
    let section_ques;
    if (section_ind) {
      section_ques = testObject.sections[section_ind].questions;
    } else {
      section_ques = testObject.sections[section_index].questions;
    }

    let answered_count = 0;
    for (var e = 0; e < section_ques.length; e++) {
      if (
        section_ques[e].class == "answered-large" ||
        section_ques[e].class == "answered-marked-large"
      ) {
        answered_count++;
      }
    }

    if (
      testObject.sections[section_index].considerBestOf == true &&
      section_ques.length ==
        testObject.sections[section_index].noOfQuestionsToConsider
    ) {
      document.getElementById("save_next").disabled = false;
      let markNext = document.getElementById("mark_next");
      if (markNext) {
        markNext.disabled = false;
      }
    } else if (
      testObject.sections[section_index].considerBestOf == true &&
      testObject.sections[section_index].noOfQuestionsToConsider <=
        answered_count
    ) {
      document.getElementById("save_next").disabled = true;
      let markNext = document.getElementById("mark_next");
      if (markNext) {
        markNext.disabled = true;
      }
    } else {
      document.getElementById("save_next").disabled = false;
      let markNext = document.getElementById("mark_next");
      if (markNext) {
        markNext.disabled = false;
      }
    }
  };

  clearResponse = () => {
    var that = this;
    var a = [];
    a = document.getElementsByTagName("input");

    const textArea = document.getElementsByTagName("textarea");
    if (textArea) this.setState({ answer: "" });

    for (var b = 0; b < a.length; b++) {
      if (a[b].type == "radio") {
        a[b].checked = false;
      } else if (a[b].type == "checkbox") {
        a[b].checked = false;
      } else if (a[b].type == "text") {
        console.log("here");
        this.setState({
          answer: "",
        });
      }
    }

    const { tenant, userObject, testObject, section_index, question_index } =
      this.state;
    const section = testObject.sections[section_index];
    const question =
      testObject.sections[section_index].questions[question_index];
    if (
      question.questionCategory == QUESTION_TYPES[0].value ||
      question.questionCategory == QUESTION_TYPES[1].value
    ) {
      for (var opt = 0; opt < question.choices.length; opt++) {
        question.choices[opt].checked = "";
      }
    } else if (
      question.questionCategory == QUESTION_TYPES[2].value ||
      question.questionCategory == QUESTION_TYPES[3].value ||
      question.questionCategory == QUESTION_TYPES[4].value ||
      question.questionCategory == QUESTION_TYPES[6].value ||
      question.questionCategory == QUESTION_TYPES[5].value
    ) {
      question.answered = "";
    }
    question.class = "not-answered-large";

    question.attemptedchoicestring = "";
    question.attemptedchoiceid = "";
    var ts =
      parseInt(this.state.prevTime) - parseInt(this.state.currentTimeSeconds);
    this.setState({
      prevTime: this.state.currentTimeSeconds,
    });

    var timestamp = new Date().valueOf();
    var student_response = {
      tenant: tenant,
      testId: testObject.id,
      userId: userObject.userId,
      t: timestamp,
      ts: ts,
      questionid: question.id,
      sectionid: section.id,
      attemptedchoiceid: "",
      attemptedchoicestring: "",
      status: "N_A",
      isTimer: false,
      isUpdate: this.state.isUpdate,
    };

    console.log(student_response, "response");

    that.setState({ showLoading: true }, () => {
      ApiService.testResponses(JSON.stringify(student_response))
        .then((res) => res.json())
        .then((res) => {
          console.log(res); // successful response
          that.setState({
            showLoading: false,
          });
        })
        .catch((err) => {
          that.setState({
            showLoading: false,
          });
          alert(Config.CONNECTION_ERROR_MSG);
          console.log(err, err.stack); // an error occurred
        });
    });

    this.setState({
      testObject: testObject,
    });

    this.considerBestOf();
  };

  currentTime(time) {
    this.setState({
      currentTimeSeconds: time,
    });
  }

  render() {
    //console.log(this.state.testObject);
    const userObject = JSON.parse(localStorage.getItem("user"));
    const testId = this.props.match.params.id;
    var tenant = localStorage.getItem("tenant") || Config.siteTitle;
    return (
      <div className="test-player">
        {this.state.webCamProctoring == true && this.state.similarity <= 70 ? (
          <div
            className={
              this.state.notificationActive
                ? "alert alert-warning open"
                : "alert alert-warning close"
            }
          >
            <strong>
              Please adjust your camera to avoid blocking of the test
            </strong>{" "}
            <button className="close" onClick={() => this.closeNotifiction()}>
              &times;
            </button>
          </div>
        ) : (
          ""
        )}

        <Container id="container" fluid>
          <div className="mainView">
            <Header title={this.state.testObject.name} />
            {this.state.testObject !== "" &&
            this.state.testObject?.testConfig?.disableNavigationPanel ? null : (
              <div
                className={
                  this.state.toogleActive ? "toggle-name open" : "toggle-name"
                }
                onClick={() => this.toggleClass()}
              >
                <img src={toogleOpen} className="toggle-open" alt="" />
                <img src={toogleClose} className="toggle-close" alt="" />
              </div>
            )}
            <div className={this.state.webCamProctoring ? "proctored_div" : ""}>
              {this.state.webCamProctoring && (
                <Row>
                  <div className="col-9 padding-0"></div>
                  <div className="col-3 padding-0">
                    <Proctored
                      tenant={tenant}
                      testId={testId}
                      userId={userObject.userId}
                      bucketName="tuningfork-proctored-live"
                    />
                  </div>
                </Row>
              )}
              <Row>
                <Section
                  testObject={this.state.testObject}
                  sectionIndex={this.state.section_index}
                  changeSection={this.changeSection.bind(this)}
                />

                <div className="col-md-3 col-sm-3 col-xs-12 order-first order-md-last padding-0">
                  {this.renderProfileWebcam()}
                  {this.state.timerBlock === false &&
                    this.state.testTime >= 0 && (
                      <Timer
                        startTimeInSeconds={parseInt(this.state.testTime)}
                        EndExam={this.EndExam.bind(this)}
                        currentTime={this.currentTime.bind(this)}
                        type="desktop"
                      />
                    )}
                </div>
                <div
                  className={
                    this.state.toogleActive ? "overlay_show" : "overlay_hide"
                  }
                  onClick={() => this.toggleClass()}
                >
                  &nbsp;
                </div>
              </Row>

              <Row>
                {this.state.view == "question" ? this.renderQuestions() : " "}
                {this.state.view == "profile" ? this.renderProfile() : " "}
                {this.state.view == "instructions"
                  ? this.renderInstructions()
                  : " "}
                {this.state.view == "paper" ? this.renderPaper() : " "}
                {this.renderQuestionsPalette()}
                <div
                  className={
                    this.state.toogleActive ? "overlay_show" : "overlay_hide"
                  }
                  onClick={() => this.toggleClass()}
                >
                  &nbsp;
                </div>
              </Row>
            </div>

            <Model
              show={this.state.show}
              close={this.state.close}
              modeShow={this.modeShow.bind(this)}
              EndExam={this.EndExam.bind(this)}
            />
            {this.renderLoader()}
          </div>
        </Container>
      </div>
    );
  }

  renderProfileWebcam() {
    return (
      <>
        <div className="profile_block">
          <span className="img-container">
            {this.state.userObject?.photoPath && (
              <img
                className="profile_pic"
                src={this.state.userObject.photoPath}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatar;
                }}
                alt=""
              />
            )}
            <img
              style={{
                marginLeft: this.state.userObject?.photoPath ? "30px" : "0px",
              }}
              className="test-player-logo-img"
              src={`https://webfront.edusquares.com/${Config.siteTitle}/files/logos/logo.png`}
              alt="logo"
            />
          </span>
        </div>
      </>
    );
  }

  renderQuestions() {
    let isMobile = Utils.isMobileDevice();
    const { section_index, question_index } = this.state;
    return (
      <div className="col-md-9 col-sm-9 col-xs-12 mobile-p15">
        {this.state.testObject &&
          this.renderQuestionsInfo(section_index, question_index)}
        {this.state.testObject &&
          this.renderQuestionsType(section_index, question_index)}
        {isMobile === true
          ? this.renderQuestionsBtnsMobile(true)
          : this.state.testObject !== "" &&
            this.state.testObject?.testConfig?.disableNavigationPanel
          ? this.renderQuestionsBtnsMobile(false)
          : this.renderQuestionsBtns()}
      </div>
    );
  }

  renderQuestionsPalette = () => {
    if (
      this.state.testObject !== "" &&
      this.state.testObject?.testConfig?.disableNavigationPanel
    ) {
      return null;
    } else {
      return (
        <div
          className={
            this.state.toogleActive
              ? "col-md-3 col-sm-3 col-xs-12 question-palette open"
              : "col-md-3 col-sm-3 col-xs-12 question-palette"
          }
        >
          <div className="panel-right">
            <QuestionPalette
              testObject={this.state.testObject}
              showSection={this.state.section_index}
              showQuestion={this.showQuestion.bind(this)}
              curentQuestion={this.state.question_index}
            />
            {this.renderLegend()}
          </div>
        </div>
      );
    }
  };

  renderQuestionsInfo(section_index, question_index) {
    const question =
      this.state.testObject.sections[section_index].questions[question_index];
    return (
      <>
        <div className="question-info">
          <span className="question-type">
            Question Type :
            <span className="category">
              {QUESTION_TYPES.map((questionType, index) => {
                return (
                  <>
                    {" "}
                    {question.questionCategory == questionType.value
                      ? questionType.key
                      : ""}{" "}
                  </>
                );
              })}
            </span>
          </span>
          <span className="marks_details">
            Marks for correct answer :{" "}
            <font className="green">
              <span>{question.marks}</span>
            </font>{" "}
            ; Negative Marks :{" "}
            <font className="red">
              <span>{question.negativeMarks}</span>
            </font>
          </span>
        </div>
      </>
    );
  }

  renderQuestionsType(section_index, question_index) {
    let testObject = this.state.testObject;
    //console.log(testObject);
    const question =
      testObject.sections[section_index].questions[question_index];
    const section = this.state.testObject.sections[section_index];
    return (
      <>
        {question.questionCategory == QUESTION_TYPES[0].value
          ? this.renderMultipleChoiceType(section, question)
          : question.questionCategory == QUESTION_TYPES[1].value
          ? this.renderSingleChoiceType(section, question)
          : question.questionCategory == QUESTION_TYPES[2].value
          ? this.renderNumericalAnswerType(section, question)
          : question.questionCategory == QUESTION_TYPES[3].value
          ? this.renderNumericalAnswerType(section, question)
          : question.questionCategory == QUESTION_TYPES[4].value
          ? this.renderNumericalAnswerType(section, question)
          : question.questionCategory == QUESTION_TYPES[6].value
          ? this.renderTextQuestionType(section, question)
          : question.questionCategory == QUESTION_TYPES[5].value
          ? this.renderMatchTheFollowingType(section, question)
          : ""}
      </>
    );
  }

  renderMultipleChoiceType(section, question) {
    return (
      <div className="qustion_div" id="question">
        <div>
          <p
            className="margin-bottom-0"
            dangerouslySetInnerHTML={{ __html: section?.instructions }}
          ></p>
        </div>
        <div className="question-sno">
          Question Number : <span>{question.questionNumber}</span>
        </div>
        <div className="qstatement_div">
          <div
            id="qstatement"
            className={question.groupQuestion ? "div50l" : ""}
          >
            {question.groupQuestion && (
              <p
                dangerouslySetInnerHTML={{ __html: question.groupQuestion }}
              ></p>
            )}
          </div>
          <div className={question.groupQuestion ? "div50r" : ""}>
            <div id="qstatement">
              <p dangerouslySetInnerHTML={{ __html: question.statement }}></p>
            </div>
            <ul className="options">
              {question.choices.map((option, index) => (
                <li key={index}>
                  <div className="optionsro">( {option.choiceString} )</div>
                  <div>
                    <p dangerouslySetInnerHTML={{ __html: option.name }}></p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="checkbox_div">
              {question.choices.map((option, i) =>
                question.attemptedchoiceid &&
                question.attemptedchoiceid.includes(option.id) ? (
                  <li key={option.id}>
                    <input
                      className="option_checkbox"
                      id={"checkbox" + option.id}
                      name={"option" + question.id}
                      type="checkbox"
                      value={option.id}
                      onClick={this.getCheckeboxValue.bind(this)}
                      defaultChecked="true"
                    />
                    <span className="choiceString">{option.choiceString}</span>
                  </li>
                ) : (
                  <li key={option.id}>
                    <input
                      className="option_checkbox"
                      id={"checkbox" + option.id}
                      name={"option" + question.id}
                      type="checkbox"
                      value={option.id}
                      onClick={this.getCheckeboxValue.bind(this)}
                      defaultChecked={option.checked}
                    />
                    <span className="choiceString">{option.choiceString}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderSingleChoiceType(section, question) {
    //var testObject = JSON.parse(localStorage.getItem('tests'));
    //var question = testObject[0].questions[2];
    return (
      <div className="qustion_div" id="question">
        <div>
          <p
            className="margin-bottom-0"
            dangerouslySetInnerHTML={{ __html: section?.instructions }}
          ></p>
        </div>
        <div className="question-sno">
          Question Number : <span>{question.questionNumber}</span>
        </div>
        <div className="qstatement_div">
          <div
            id="qstatement"
            className={question.groupQuestion ? "div50l" : ""}
          >
            {question.groupQuestion && (
              <p
                dangerouslySetInnerHTML={{ __html: question.groupQuestion }}
              ></p>
            )}
          </div>

          <div className={question.groupQuestion ? "div50r" : ""}>
            <div id="qstatement">
              <p dangerouslySetInnerHTML={{ __html: question.statement }}></p>
            </div>
            <ul className="options">
              {question.choices.map((option, index) => (
                <li key={index}>
                  <div className="optionsro">( {option.choiceString} )</div>
                  <div>
                    <p dangerouslySetInnerHTML={{ __html: option.name }}></p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="checkbox_div">
              {question.choices.map((option, i) =>
                question.attemptedchoiceid == option.id ? (
                  <li key={option.id}>
                    <input
                      className="option_checkbox"
                      type="radio"
                      id={"checkbox" + option.id}
                      name={"option" + question.id}
                      value={option.id}
                      onClick={this.getCheckeboxValue.bind(this)}
                      defaultChecked="true"
                    />
                    <span className="choiceString">{option.choiceString}</span>
                  </li>
                ) : (
                  <li key={option.id}>
                    <input
                      className="option_checkbox"
                      type="radio"
                      id={"checkbox" + option.id}
                      name={"option" + question.id}
                      value={option.id}
                      onClick={this.getCheckeboxValue.bind(this)}
                      defaultChecked={option.checked}
                    />
                    <span className="choiceString">{option.choiceString}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderNumericalAnswerType(section, question) {
    //console.log("answered" + question.answered);
    if (question.attemptedchoicestring) {
      question.answered = parseFloat(question.attemptedchoicestring);
      //console.log(question.attemptedchoicestring)
    }
    return (
      <div className="qustion_div" id="question">
        <div>
          <p
            className="margin-bottom-0"
            dangerouslySetInnerHTML={{ __html: section?.instructions }}
          ></p>
        </div>
        <div className="question-sno">
          Question Number : <span>{question.questionNumber}</span>
        </div>
        <div className="qstatement_div">
          <div
            id="qstatement"
            className={question.groupQuestion ? "div50l" : ""}
          >
            {question.groupQuestion && (
              <p
                dangerouslySetInnerHTML={{ __html: question.groupQuestion }}
              ></p>
            )}
          </div>
          <div className={question.groupQuestion ? "div50r" : ""}>
            <div id="qstatement">
              <p dangerouslySetInnerHTML={{ __html: question.statement }}></p>
            </div>
            {typeof question.answered !== "undefined" ? (
              <NumPad.Number
                name={"numberic" + question.id}
                value={this.state.answer || question.answered}
                id={"numberic" + question.id}
                onChange={(value) => this.onTodoChange(value)}
              />
            ) : (
              <NumPad.Number
                name={"numberic" + question.id}
                id={"numberic" + question.id}
                value={this.state.answer ? this.state.answer : ""}
                onChange={(value) => this.onTodoChange(value)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  renderTextQuestionType(section, question) {
    //console.log("answered" + question.answered);
    const { testObject } = this.state;
    if (question.attemptedchoicestring) {
      question.answered = question.attemptedchoicestring;
    }

    if (question.uploads) {
      question.studentUploads = question.uploads.split(",");
    }
    let studentUploads = question.studentUploads;
    let validUploadFormats = testObject?.testConfig?.validUploadFormats || [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
    ];

    return (
      <div className="qustion_div" id="question">
        <div>
          <p
            className="margin-bottom-0"
            dangerouslySetInnerHTML={{ __html: section?.instructions }}
          ></p>
        </div>
        <div className="question-sno">
          Question Number : <span>{question.questionNumber}</span>
        </div>
        <div className="qstatement_div">
          <div
            id="qstatement"
            className={question.groupQuestion ? "div50l" : ""}
          >
            {question.groupQuestion && (
              <p
                dangerouslySetInnerHTML={{ __html: question.groupQuestion }}
              ></p>
            )}
          </div>
          <div className={question.groupQuestion ? "div50r" : ""}>
            <div id="qstatement">
              <p dangerouslySetInnerHTML={{ __html: question.statement }}></p>
            </div>
            {typeof question.answered !== "undefined" ? (
              <textarea
                rows="15"
                id={"numberic" + question.id}
                name={"numberic" + question.id}
                value={this.state.answer || question.answered}
                onChange={(e) => this.onTodoChange(e.target.value)}
              />
            ) : (
              <textarea
                rows="15"
                name={"numberic" + question.id}
                value={this.state.answer}
                id={"numberic" + question.id}
                onChange={(e) => this.onTodoChange(e.target.value)}
              />
            )}
          </div>
          {testObject?.testConfig
            ?.allowAttachmentUploadForEachTextQuestionResponse == true ? (
            <div className="fileUploadText">
              <h5>
                Attachments{" "}
                <span>*Supports {validUploadFormats?.join(", ")} only.</span>
              </h5>
              {studentUploads &&
                studentUploads.map((upload, index) => {
                  return (
                    <span className="tag">
                      <span>
                        <a href="#" className="title ng-binding">
                          {upload}
                        </a>
                      </span>
                      <span
                        className="remover"
                        onClick={(e) => this.deleteFile(e, index)}
                      >
                        ×
                      </span>
                    </span>
                  );
                })}
              <span
                className="btn btn-sm btn-default btn-file fileUplodWrap"
                onClick={this.showOpenFileDlg}
              >
                Add <FontAwesomeIcon icon={faPlusCircle} id="closeAlert" />
                <input
                  type="file"
                  ref={this.inputOpenFileRef}
                  onChange={(e) => this.onFileChange(e)}
                />
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  renderMatchTheFollowingType(section, question) {
    let list_choices = [];
    let list_matches = [];
    let opt = [];
    let match = [];
    let aplpha = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let aplpha2 = ["P", "Q", "R", "S", "T", "U", "V", "W"];
    var choices = question.choices;
    var matches = question.matches;
    var answered = question.answered || question.attemptedchoicestring || [];
    var match_opt = "";

    //console.log(answered);

    question.choices.map((option, index) =>
      list_choices.push(
        <tr key={index}>
          <td className="choiceString">
            <p>{option.choiceString}. </p>
          </td>
          <td>
            <div dangerouslySetInnerHTML={{ __html: option.name }} />
          </td>
        </tr>
      )
    );

    question.matches.map((option, index) =>
      list_matches.push(
        <tr key={index}>
          <td className="choiceString">
            <p>{option.choiceString}.</p>
          </td>
          <td>
            <div dangerouslySetInnerHTML={{ __html: option.name }} />
          </td>
        </tr>
      )
    );

    for (let c = 0; c < choices.length; c++) {
      opt.push(
        <label className="option_container2">
          <span className="mark">{aplpha[c]}. </span>
        </label>
      );
      for (let m = 0; m < matches.length; m++) {
        if (c == 0) {
          match.push(
            <label className="option_container2">
              <span className="mark">{aplpha2[m]} </span>
            </label>
          );
        }

        if (answered.includes(choices[c].id + ":" + matches[m].id)) {
          opt.push(
            <label className="000 option_container2">
              <input
                id={"checkbox" + choices[c].id}
                name={"option" + choices[c].id}
                checked="true"
                className="option_checkbox"
                type="checkbox"
                value={choices[c].id + ":" + matches[m].id}
                onClick={this.getCheckeboxValue.bind(this)}
              />
            </label>
          );
        } else {
          opt.push(
            <label className="111 option_container2">
              <input
                className="option_checkbox"
                id={"checkbox" + choices[c].id}
                name={"option" + choices[c].id}
                type="checkbox"
                value={choices[c].id + ":" + matches[m].id}
                onClick={this.getCheckeboxValue.bind(this)}
              />
            </label>
          );
        }
      }
      opt.push(<br />);
    }

    match_opt = (
      <div className="match_opts">
        <p className="option">
          <label className="option_container2">
            <span className="mark"></span>
          </label>
          {match}
          <br />
          {opt}
        </p>
      </div>
    );

    return (
      <div className="mtf_statement qustion_div" id="question">
        <div>
          <p
            className="margin-bottom-0"
            dangerouslySetInnerHTML={{ __html: section?.instructions }}
          ></p>
        </div>
        <div className="question-sno">
          Question Number : <span>{question.questionNumber}</span>
        </div>
        <div className="qstatement_div">
          <div>
            <div id="qstatement">
              <p dangerouslySetInnerHTML={{ __html: question.statement }}></p>
            </div>
            <ul className="options">
              <table className="mtf_statement_table">
                <tr className="mtf_statement_head">
                  <td colspan="2">
                    <tr align="center">
                      <td colspan="2">
                        <b>Column I</b>
                      </td>
                    </tr>
                    {list_choices}
                  </td>
                  <td colspan="2">
                    <tr align="center">
                      <td colspan="2">
                        <b>Column II</b>
                      </td>
                    </tr>
                    {list_matches}
                  </td>
                </tr>
              </table>
              {match_opt}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderLegend() {
    return (
      <div className="question-palette-btn">
        <div id="legend" className="margin-bottom-5">
          <div className="margin-bottom-5">
            <b>Legend : </b>
          </div>
          <Row>
            <div className="col-6 margin-bottom-5">
              <div className="answered-small pull-left">&nbsp; </div>&nbsp;
              Answered
            </div>
            <div className="col-6 margin-bottom-5">
              <div className="not-answered-small pull-left">&nbsp; </div>&nbsp;
              Not Answered
            </div>
            <div className="col-6 margin-bottom-5">
              <div className="marked-small pull-left">&nbsp; </div>&nbsp; Marked
            </div>
            <div className="col-6 margin-bottom-5">
              <div className="not-visited-small pull-left">&nbsp; </div>&nbsp;
              Not Visited
            </div>
            <div className="col-12">
              <div className="answered-marked-small pull-left">&nbsp; </div>
              &nbsp; Marked &amp; Answered
            </div>
          </Row>
        </div>

        <Row>
          <div className="col-6 margin-bottom-5">
            <button
              className="btn btn-primary width100"
              onClick={() =>
                Config.siteTitle === "unsat" || Config.siteTitle === "unsat2"
                  ? null
                  : this.changeView("profile")
              }
            >
              Profile
            </button>
          </div>
          <div className="col-6 margin-bottom-5">
            <button
              className="btn btn-primary width100"
              onClick={() => this.changeView("instructions")}
            >
              Instructions
            </button>
          </div>
        </Row>
        <Row className="mobile_hide">
          <div className="col-6">
            <button
              className="btn btn-primary width100"
              onClick={() => this.changeView("paper")}
            >
              Paper
            </button>
          </div>
          <div className="col-6">
            <OverlayTrigger
              placement="left"
              overlay={
                <Popover id="popover-basic" className="popover">
                  <Popover.Title as="h3">
                    <strong className="red">Alert</strong>
                  </Popover.Title>
                  <Popover.Content>
                    <p>
                      Are you sure you want to <br />
                      finish the Test ?
                    </p>
                  </Popover.Content>
                </Popover>
              }
            >
              <button
                className="btn btn-success width100"
                onClick={() => this.setState({ show: true })}
              >
                Finish
              </button>
            </OverlayTrigger>
          </div>
        </Row>
      </div>
    );
  }

  renderQuestionsBtnsMobile(onMobile) {
    console.log(
      this.state.testObject?.sections &&
        this.state.section_index ===
          this.state.testObject?.sections?.length - 1 &&
        this.state.question_index ===
          this.state.testObject?.sections[this.state.section_index]?.questions
            ?.length -
            1
    );
    return (
      <div
        className="testButtons"
        style={{ bottom: !onMobile ? "30px" : "0px" }}
      >
        {this.state.question_index === 0 &&
        this.state.section_index === 0 ? null : (
          <button
            className={`btn ${!onMobile && "m-3 btn-lg"} btn-primary`}
            onClick={() => this.PrevQuestion()}
          >
            PREV
          </button>
        )}
        {this.state.testObject?.sections &&
        this.state.section_index ===
          this.state.testObject?.sections?.length - 1 &&
        this.state.question_index ===
          this.state.testObject?.sections[this.state.section_index]?.questions
            ?.length -
            1 ? (
          <button
            className={`btn btn-primary ${!onMobile && "m-3"}`}
            id="save_next"
            onClick={() => this.NextQuestion("save")}
          >
            SAVE
          </button>
        ) : (
          <button
            className={`btn btn-primary ${!onMobile && "m-3"}`}
            id="save_next"
            onClick={() => this.NextQuestion("next")}
          >
            NEXT
          </button>
        )}
        <button
          className={`btn btn-primary ${!onMobile && "m-3"}`}
          onClick={() => this.clearResponse()}
        >
          CLEAR
        </button>
        {this.state.testObject?.sections &&
        this.state.section_index ===
          this.state.testObject?.sections?.length - 1 &&
        this.state.question_index ===
          this.state.testObject?.sections[this.state.section_index]?.questions
            ?.length -
            1
          ? ((this.state.testObject !== "" &&
              this.state.testObject?.testConfig?.markForReview) ||
              (this.state.testObject !== "" &&
                this.state.testObject?.testConfig?.markForReview ===
                  undefined)) && (
              <button
                className={`btn btn-primary ${!onMobile && "m-3"}`}
                id="mark_next"
                onClick={() => this.NextQuestion("mark_notSave")}
              >
                MARK
              </button>
            )
          : ((this.state.testObject !== "" &&
              this.state.testObject?.testConfig?.markForReview) ||
              (this.state.testObject !== "" &&
                this.state.testObject?.testConfig?.markForReview ===
                  undefined)) && (
              <button
                className={`btn btn-primary ${!onMobile && "m-3"}`}
                id="mark_next"
                onClick={() => this.NextQuestion("mark")}
              >
                MARK
              </button>
            )}
        <button
          className={`btn btn-primary ${!onMobile && "m-3"}`}
          onClick={() => this.setState({ show: true })}
        >
          FINISH
        </button>
      </div>
    );
  }

  renderQuestionsBtns() {
    return (
      <div className="question-btns">
        <Row>
          {this.state.testObject?.sections &&
          this.state.section_index ===
            this.state.testObject?.sections?.length - 1 &&
          this.state.question_index ===
            this.state.testObject?.sections[this.state.section_index]?.questions
              ?.length -
              1
            ? ((this.state.testObject !== "" &&
                this.state.testObject?.testConfig?.markForReview) ||
                (this.state.testObject !== "" &&
                  this.state.testObject?.testConfig?.markForReview ===
                    undefined)) && (
                <div className="col-md-3 col-sm-3 col-xs-6">
                  <button
                    className="btn btn-primary"
                    id="mark_next"
                    onClick={() => this.NextQuestion("mark_notSave")}
                  >
                    Mark
                  </button>
                </div>
              )
            : ((this.state.testObject !== "" &&
                this.state.testObject?.testConfig?.markForReview) ||
                (this.state.testObject !== "" &&
                  this.state.testObject?.testConfig?.markForReview ===
                    undefined)) && (
                <div className="col-md-3 col-sm-3 col-xs-6">
                  <button
                    className="btn btn-primary"
                    id="mark_next"
                    onClick={() => this.NextQuestion("mark")}
                  >
                    Mark for Review &amp; Next
                  </button>
                </div>
              )}
          <div className="col-md-3 col-sm-3 col-xs-6">
            <button
              className="btn btn-primary"
              onClick={() => this.clearResponse()}
            >
              Clear Response
            </button>
          </div>
          <div className="col-md-6 col-sm-3 col-xs-6">
            {this.state.testObject?.sections &&
            this.state.section_index ===
              this.state.testObject?.sections?.length - 1 &&
            this.state.question_index ===
              this.state.testObject?.sections[this.state.section_index]
                ?.questions?.length -
                1 ? (
              <button
                className="btn btn-primary pull-right"
                id="save_next"
                onClick={() => this.NextQuestion("save")}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-primary pull-right"
                id="save_next"
                onClick={() => this.NextQuestion("next")}
              >
                Save &amp; Next
              </button>
            )}
          </div>
        </Row>
      </div>
    );
  }

  renderProfile() {
    const user = this.state.userObject;
    //console.log(user);
    return (
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="testinfo_tab">
          <div className="profile">
            <table
              className="table-bordered table-condensed table-striped profile_info"
              align="center"
            >
              <tbody>
                <tr>
                  <td colspan="2" className="active profile_info_head">
                    Profile Information
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center">
                    <span className="ng-binding">
                      {this.state.userObject?.photoPath && (
                        <img
                          src={user.photoPath}
                          alt=""
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = avatar;
                          }}
                        />
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="studentName">Name</td>
                  <td className="studentCode">
                    <span className="ng-binding">{user.enquiryName}</span>
                  </td>
                </tr>
                <tr>
                  <td className="studentName">Code</td>
                  <td className="studentCode">
                    <span className="ng-binding">"{user.studentCode}"</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <div className="center">
              <button
                className="btn btn-info text-center"
                onClick={() => this.changeView("question")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInstructions() {
    const { testObject } = this.state;
    let isMobile = Utils.isMobileDevice();
    return (
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="testinfo_tab">
          <div className="test_instruction">
            <div className="qustion_div">
              {isMobile === true ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      testObject.instructions || testObject.webInstructions,
                  }}
                ></div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      testObject.webInstructions || testObject.instructions,
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className="center">
            <button
              className="btn btn-info text-center"
              onClick={() => this.changeView("question")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderPaper() {
    const testObject = this.state.testObject;
    return (
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="testinfo_tab">
          <div className="qustion_div question_paper">
            {testObject.sections.map((section, section_index) => (
              <>
                <div className="section_name">
                  Section:{" "}
                  <span className="label label-success ng-binding">
                    {section.name}
                  </span>
                </div>
                {section.questions.map((question, question_index) => {
                  return (
                    <div className="" id="question">
                      <div className="question-sno">
                        Question Number : <span>{question.questionNumber}</span>
                      </div>
                      <Question question={question} />
                      {this.renderQuestionsInfo(section_index, question_index)}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
          <div className="center">
            <button
              className="btn btn-info text-center"
              onClick={() => this.changeView("question")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderLoader = () => {
    const _loadingText = "Please wait...";
    return (
      <ILoader
        loadingText={_loadingText}
        isShow={this.state.showLoading}
      ></ILoader>
    );
  };
}

export default TestPlayer;
