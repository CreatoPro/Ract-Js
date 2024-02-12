import React, { Component } from "react";
import "./question-style.css";
import Config from "../../_config/config";
import ApiService from "../../_services/ApiService";
import { ILoader } from "./../../_components/iloader/iloader";
import Header from "./components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import Utils from "../../_helpers/utils";
import lock_icon from "./img/lock.png";
import test_icon from "./img/test.png";
import { Container, Row, Modal, Form } from "react-bootstrap";

const AWS = require("aws-sdk");
AWS.config.clear();
// AWS.config.update({
//   region: Config.AWSRegion,
//   accessKeyId: Config.AWSAccessKeyId,
//   secretAccessKey: Config.AWSSecretAccessKey,
// });
var docClient = new AWS.DynamoDB.DocumentClient();

class TestInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      show: false,
      close: false,
      testObject: "",
      userObject: "",
      testCategory: null,
      msg: "",
      blockMsg:
        "Suspicious activity detected. Your Exam is now blocked. Please contact the Exam Department for further assistance.",
      showLockdownSection: false,
      lockdownUrl: "",
      sebUrl: "",
      testPaperStatus: undefined,
      testTimeStatus: "timein",
      effectiveTestTime: "",
      showModal: false,
      modalTitle: "Enter Password",
      testPassword: {
        studentPassword: "",
        testMasterPassword: "",
      },
      submitted: false,
      validatePwdStatus: false,
    };
    this.downloadTest = this.downloadTest.bind(this);
    this.dynamodbInit = this.dynamodbInit.bind(this);
    this.timeout = 0;
  }

  componentDidMount() {
    this.setState({
      userObject: JSON.parse(localStorage.getItem("user")) || [],
      tenant: localStorage.getItem("tenant") || Config.siteTitle,
      //tenant: "isbat_testing",
      testCategory: this.props.location.state
        ? this.props.location.state.testCategory
        : "",
      testId: this.props.match.params.id,
    });
    document.body.classList.add("test-player-body");
    this.dynamodbInit();
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

  dynamodbInit() {
    let tenant = localStorage.getItem("tenant") || Config.siteTitle;
    //let tenant = "isbat_testing";
    let userObject = JSON.parse(localStorage.getItem("user")) || [];
    var student_response = {
      tenant: tenant,
      testId: this.props.match.params.id,
      userId: userObject.userId,
      isTimer: false,
      isUpdate: false,
    };
    console.log(student_response, "response");
    var that = this;

    that.setState({ showLoading: true }, () => {
      ApiService.testResponses(JSON.stringify(student_response))
        .then((res) => res.json())
        .then((res) => {
          //   console.log(res,'response');
          if (res.status == "success") {
            if (
              res?.testSubmit == 1 ||
              res?.testSubmit == 2 ||
              res?.testSubmit == 3
            ) {
              let paramsString = that.props.location.search;
              const params = new URLSearchParams(paramsString);
              let testCategory = params.get("cat");
              window.location =
                "/test-result/" +
                testCategory +
                "/" +
                that.props.match.params.id;
            }
            that.setState({
              msg: res.message,
              testResume: res.testResume,
              testPaperStatus: res.testPaperUrl,
              showLoading: false,
            });
            that.downloadTest(res.testPaperUrl, 0);
          } else {
            that.setState({
              showLoading: false,
              testPaperStatus: undefined,
            });
            console.log(res, "res");
            that.showAlert();
          }
        })
        .catch((err) => {
          that.setState({
            showLoading: false,
          });
          that.showAlert();
          console.log(err, err.stack); // an error occurred
        });
      // }
    });
    // })
  }

  /* code for read item from dynamodb start*/
  dynamodbUpdateProfile = async (tenant_userId, key, bucket) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { userId } = user;

    const payload = {
      photo: key,
      userId,
      clientName: Config.siteTitle,
      photoBucketName: bucket,
      profileUpdate: true,
    };

    console.log(payload, "payload");

    try {
      const res = await ApiService.updateProctoredProfile(
        JSON.stringify(payload)
      );
      const data = await res.json();
      if (data.message?.status === "success") {
        return console.log(data, "proctordata");
      }
      this.showAlert();
    } catch (err) {
      console.log(err);
      this.showAlert();
    }
  };
  /* code for read item from dynamodb end*/

  dynamodbUpdateUrl(testPaperUrl, paperId) {
    let tenant = localStorage.getItem("tenant") || Config.siteTitle;
    //let tenant = "isbat_testing";
    let userObject = JSON.parse(localStorage.getItem("user")) || [];
    var student_response = {
      tenant: tenant,
      testId: this.props.match.params.id,
      userId: userObject.userId,
      testUrl: true,
      testPaper: testPaperUrl,
      testPaperId: paperId,
    };

    console.log(student_response, "response");

    var that = this;

    that.setState({ showLoading: true }, () => {
      ApiService.testResponses(JSON.stringify(student_response))
        .then((res) => res.json())
        .then((res) => {
          if (res.status == "success") {
            that.setState({
              msg: res.message,
              showLoading: false,
              testPaperStatus: res.status,
            });
          } else {
            that.setState({
              showLoading: false,
              testPaperStatus: undefined,
            });
            that.showAlert();
          }
        })
        .catch((err) => {
          that.setState({
            showLoading: false,
          });
          that.showAlert();
          console.log(err, err.stack); // an error occurred
        });
    });
  }

  checkLockdownBrowser() {
    var response = {
      userAgent: navigator.userAgent,
      checkUserAgent: true,
    };

    let tenant = localStorage.getItem("tenant") || Config.siteTitle;

    var that = this;

    console.log(response, "response");

    ApiService.testResponses(JSON.stringify(response))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == "failed") {
          that.setState({
            showLockdownSection: true,
            lockdownUrl: res.LockdownUrl,
            sebUrl:
              "https://tuningfork-live.s3-ap-southeast-1.amazonaws.com/" +
              tenant +
              "/files/seb/edusquares.seb",
          });
        }
      })
      .catch((err) => {
        console.log(err, err.stack);
      });
  }

  checkProctorStatus(testId, lockdownBrowser) {
    var blockMsg = this.state.blockMsg;
    const { tenant, userObject } = this.state;
    var student_response = {
      tenant: tenant,
      testId: testId,
      userId: userObject.userId,
      isTimer: true,
      proctor: true,
      proctorStatus: true,
    };
    console.log(student_response, "response");
    var that = this;

    ApiService.testResponses(JSON.stringify(student_response))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.blanket_flag == "BLOCK") {
          that.BlockAlert(blockMsg, lockdownBrowser);
        } else if (res.blanket_flag == "" && res.block_test == true) {
          that.BlockAlert(blockMsg, lockdownBrowser);
        }
      })
      .catch((err) => {
        console.log(err, err.stack); // an error occurred
      });
  }

  testTimerCheck(testId, testTime, endDateTime, dayEndTime, dayStartTime) {
    const { tenant, userObject } = this.state;
    var student_response = {
      tenant: tenant,
      testId: testId,
      userId: userObject.userId,
      dayTimes: true,
      endDateTime: endDateTime,
      testTime: testTime,
      dayStartTime: dayStartTime,
      dayEndTime: dayEndTime,
    };

    var that = this;

    console.log(student_response, "response");

    ApiService.testResponses(JSON.stringify(student_response))
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.timeStatus) {
          that.setState({
            testTimeStatus: res.timeStatus,
            effectiveTestTime: res.testTime,
          });
        }
      })
      .catch((err) => {
        console.log(err, err.stack); // an error occurred
      });
  }

  BlockAlert(msg, lockdownBrowser) {
    swal({
      text: msg,
      icon: "warning",
      button: "Ok",
      allowOutsideClick: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((willDelete) => {
      if (willDelete) {
        if (lockdownBrowser == true) {
          window.location.href = "/dashboard";
          //this.props.history.replace('/dashboard');
        } else {
          window.close();
        }
      }
    });
  }

  validatePassword() {
    if (
      (this.state.testObject?.testConfig?.studentLevelPasswordCheck ||
        this.state.testObject?.testConfig?.testLevelPasswordCheck) &&
      this.state.validatePwdStatus == false
    ) {
      this.setState({
        showModal: true,
      });
      return false;
    } else {
      return true;
    }
  }

  handleClose() {
    this.setState({
      showModal: false,
    });
  }

  updateInput = (e) => {
    let v = e.target.value;
    let k = e.target.name;
    let testPassword = { ...this.state.testPassword };
    testPassword[k] = v;
    this.setState({ testPassword });
  };

  renderModal() {
    let { submitted, testPassword } = this.state;
    //let CURRENT_PORTLET = JSON.parse(localStorage['portlet']);
    let CURRENT_PORTLET = "blue-full-card";
    return (
      <>
        <Modal
          show={this.state.showModal}
          size="sm"
          onHide={() => this.handleClose()}
          backdrop="static"
        >
          <Modal.Header
            closeButton
            className={`ilearn-plain-header text-white blue-full-card`}
          >
            <Modal.Title>
              {" "}
              <div>{this.state.modalTitle}</div>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="message">
                {this.state.testObject?.testConfig
                  ?.studentLevelPasswordCheck === true ? (
                  <>
                    <Form.Label>Student Test Password</Form.Label>
                    <div
                      className={
                        "item-inner" +
                        (submitted && !testPassword.studentPassword
                          ? " has-error"
                          : "")
                      }
                    >
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Password"
                        name="studentPassword"
                        onChange={this.updateInput}
                      />
                    </div>
                  </>
                ) : null}

                {(this.state.testObject?.testConfig
                  ?.studentLevelPasswordCheck === false &&
                  this.state.testObject?.testConfig?.testLevelPasswordCheck) ||
                (this.state.msg == "test record exist" &&
                  this.state.testObject?.testConfig?.testLevelPasswordCheck ===
                    true) ? (
                  <>
                    <br />
                    <Form.Label>Test Master Password</Form.Label>
                    <div
                      className={
                        "item-inner" +
                        (submitted && !testPassword.testMasterPassword
                          ? " has-error"
                          : "")
                      }
                    >
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Password"
                        name="testMasterPassword"
                        onChange={this.updateInput}
                      />
                    </div>
                  </>
                ) : null}
              </Form.Group>
            </Form>
            {this.state.errorMessage && (
              <div className="text-danger">{this.state.errorMessage}</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => this.validateTestPwd()}
            >
              Start Test
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  validateTestPwd() {
    let { testPassword } = this.state;
    if (
      this.state.testObject?.testConfig?.studentLevelPasswordCheck &&
      this.state.testObject?.testConfig?.testLevelPasswordCheck &&
      testPassword.studentPassword &&
      (this.state.msg !== "test record exist" ||
        (this.state.msg == "test record exist" &&
          testPassword.testMasterPassword === this.state.testObject?.password))
    ) {
      this.studentLevelPasswordCheckApi(testPassword.studentPassword);
    } else if (
      this.state.testObject?.testConfig?.testLevelPasswordCheck === false &&
      this.state.testObject?.testConfig?.studentLevelPasswordCheck &&
      testPassword.studentPassword
    ) {
      this.studentLevelPasswordCheckApi(testPassword.studentPassword);
    } else if (
      this.state.testObject?.testConfig?.studentLevelPasswordCheck === false &&
      this.state.testObject?.testConfig?.testLevelPasswordCheck === true &&
      testPassword.testMasterPassword === this.state.testObject?.password
    ) {
      this.setState({
        showLoading: false,
        validatePwdStatus: true,
      });
      setTimeout(() => {
        this.routeChange(
          "/TestPlayer/" + this.state.testId,
          0,
          this.state.testCategory
        );
      }, 100);
    } else if (
      this.state.testObject?.testConfig?.testLevelPasswordCheck === true &&
      testPassword.testMasterPassword !== this.state.testObject?.password
    ) {
      this.setState({
        submitted: true,
        errorMessage: "Please enter valid test password",
      });
    } else {
      this.setState({
        submitted: true,
        errorMessage: "Please enter password",
      });
    }
  }

  studentLevelPasswordCheckApi(studentPassword) {
    this.setState({ submitted: true, showLoading: true }, () => {
      ApiService.studentLevelPasswordCheck(
        this.state.testId,
        studentPassword
      ).then((res) => {
        if (res.data.type === 1) {
          this.setState({
            showLoading: false,
            validatePwdStatus: true,
          });
          this.routeChange(
            "/TestPlayer/" + this.state.testId,
            0,
            this.state.testCategory
          );
        } else {
          this.setState({
            showLoading: false,
            errorMessage: res.data.message,
          });
        }
      });
    });
  }

  routeChange(path, endDate, testCategory) {
    if (this.validatePassword()) {
      let paramsString = this.props.location.search;
      const params = new URLSearchParams(paramsString);
      let lms = params.get("lms") || 0;
      let steps = params.get("steps") || 0;
      let testCategory2 = params.get("cat") || testCategory;

      if (this.state.testPaperStatus == undefined) {
        this.showAlert();
      } else {
        this.props.history.replace({
          pathname: path,
          state: {
            testEndDate: endDate,
            testCategory: testCategory2,
            lms: lms,
            steps: steps,
            resume: this.state.msg == "test record exist" ? true : false,
            testUrl: this.state.testUrl,
          },
        });
      }
    }
  }

  closeTest() {
    window.close();
  }

  payCheck(testId, testObject) {
    this.setState({ loading: true }, () => {
      let payLoad = {
        type: "test",
        testId: testId,
      };
      ApiService.studentPayCheck(payLoad).then((res) => {
        this.setState({
          loading: false,
        });
        if (res.data.type == 2) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = res.data.message;
          swal({
            content: wrapper,
            icon: "warning",
            button: "Ok",
            allowOutsideClick: false,
            closeOnClickOutside: false,
            className: "orange-card",
          }).then((willDelete) => {
            if (willDelete) {
              window.close();
            }
          });
        } else {
          this.setState({
            testObject: testObject,
          });
        }
      });
    });
  }

  downloadTest(testPaperUrl, randomTest) {
    let testId = this.props.match.params.id;
    var d = new Date();
    var rand = d.getTime();
    let tenant = localStorage.getItem("tenant") || Config.siteTitle;
    //let tenant = 'isbat_testing';
    var testobj = "";
    if (testPaperUrl) {
      testobj = testPaperUrl;
    } else if (randomTest) {
      testobj =
        "https://tuningfork-" +
        Config.siteMode +
        ".s3.amazonaws.com/" +
        tenant +
        "/uploads/testPapers/" +
        testId +
        "/papers/" +
        randomTest +
        ".json";
    } else {
      testobj =
        "https://tuningfork-" +
        Config.siteMode +
        ".s3.amazonaws.com/" +
        tenant +
        "/uploads/testPapers/" +
        testId +
        "/" +
        testId +
        ".json";
    }

    this.setState({ showLoading: true }, () => {
      ApiService.fetchTestJson(testobj + "?id=" + rand)
        .then(
          (res) => {
            //console.log(JSON.stringify(res));
            let testObject = res.data;
            this.setState({
              showLoading: false,
            });

            if (testObject?.testPapers?.length > 0) {
              let testPapers = testObject.testPapers;
              let randomTestId = Math.floor(Math.random() * testPapers.length);
              this.downloadTest(null, testPapers[randomTestId]);
            } else {
              if (testObject?.testConfig?.webCamProctoring?.enabled == true) {
                this.checkProctorStatus(
                  testId,
                  testObject?.testConfig?.lockdownBrowser
                );

                /** profile update */
                const userObject = JSON.parse(localStorage.getItem("user"));
                const url = userObject.photoPath;
                let userId = userObject.userId;
                //const url = '';
                var referencePhoto = "";
                var referencePhotoBucketName = "";
                var tenant_userId = tenant + "_" + userId;
                if (url) {
                  var match = url.match(
                    /^https?:\/\/([^.]+).s3.amazonaws.com\/?(.*?)$/
                  );
                  if (match) {
                    referencePhoto = match[2];
                    referencePhotoBucketName = match[1];
                    this.dynamodbUpdateProfile(
                      tenant_userId,
                      referencePhoto,
                      referencePhotoBucketName
                    );
                  }
                } else {
                  this.BlockAlert(
                    "Dear Student you don't have profile image. Please contact the Exam Department for further assistance.",
                    testObject?.testConfig?.lockdownBrowser
                  );
                }
                /** profile update */
              }

              if (
                testObject?.testConfig != undefined &&
                testObject.testConfig.dayStartTime != undefined &&
                testObject.testConfig.dayEndTime != undefined
              ) {
                this.testTimerCheck(
                  testId,
                  testObject?.testTime,
                  testObject?.endDateTime,
                  testObject.testConfig.dayEndTime,
                  testObject.testConfig.dayStartTime
                );
              }

              if (
                testObject?.testConfig?.checkForPaymentStatusBeforeStart == true
              ) {
                this.payCheck(testId, testObject);
              }

              this.setState({
                testObject: testObject,
                testUrl: testobj,
              });

              if (this.state.testResume == 0) {
                this.dynamodbUpdateUrl(testobj, randomTest);
              } else if (
                this.state.testResume == 1 &&
                this.state.testPaperStatus == undefined
              ) {
                this.dynamodbUpdateUrl(testobj, randomTest);
              }

              if (testObject?.testConfig?.lockdownBrowser == true) {
                this.checkLockdownBrowser();
              }
            }
          }
          // ,error => {
          // }
        )
        .catch((err) => {
          const testDate = JSON.parse(sessionStorage.getItem("testDate"));
          const testTime = JSON.parse(sessionStorage.getItem("testTime"));
          console.log(err.response.status, err);
          this.setState({
            showLoading: false,
          });
          if (err.response.status === 404) {
            this.BlockAlert(
              "Online test not available. Please contact administrator",
              false
            );
          }
          if (err.response.status === 403) {
            this.BlockAlert(
              `Hey! Looks like you are a  ahead of the scheduled time. \n Please come back on ${testDate} ${testTime} and take the test!`,
              false
            );
          }
        });
    });
  }

  render() {
    return (
      <div className="test-player">
        <Container id="container" fluid>
          <div className="mainView">
            <Header title={this.state.testObject.name} />
            <Row>{this.state.testObject ? this.renderInstructions() : ""}</Row>
            {this.renderLoader()}
          </div>
        </Container>
        {this.state.testObject?.testConfig?.studentLevelPasswordCheck ||
        this.state.testObject?.testConfig?.testLevelPasswordCheck
          ? this.renderModal()
          : null}
      </div>
    );
  }

  renderInstructions() {
    const { testObject } = this.state;
    let isMobile = Utils.isMobileDevice();
    return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="test_instructions">
          {this.state.showLockdownSection === false ? (
            <div className="qustion_div">
              {this.state.testTimeStatus == "timeout" ? (
                <h6 className="error-message">
                  Note : Your test is timed out. <br /> Please come tomorrow to
                  take the test.{" "}
                </h6>
              ) : this.state.testTimeStatus == "partialtimeout" ? (
                <h6 className="error-message">
                  Note : Your test time is less than{" "}
                  {this.state.effectiveTestTime} minuts. <br />
                  Please come tomorrow to take the test.{" "}
                </h6>
              ) : (
                ""
              )}
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

              <br />
              <div className="center">
                {this.state.testTimeStatus == "timein" ? (
                  <button
                    className="btn btn-primary text-center"
                    onClick={() =>
                      this.routeChange(
                        "/TestPlayer/" + this.state.testId,
                        0,
                        this.state.testCategory
                      )
                    }
                  >
                    {this.state.msg == "test record exist"
                      ? "Resume Test"
                      : "Start Test"}{" "}
                    &nbsp;
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                ) : (
                  ""
                )}
                &nbsp;{" "}
                <button
                  className="btn btn-primary text-center"
                  onClick={() => this.closeTest()}
                >
                  Cancel <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="center">
                <br /> <br /> <br /> <br /> <br /> <br />
              </div>
            </div>
          ) : (
            <div className="locakdown">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Lockdown Exam Browser Required
                </div>
                <div className="panel-body">
                  <br />
                  <h5 className="text-center">
                    You need to take this Test from Lockdown Exam Browser.
                  </h5>
                  <br />
                  <a href={this.state.lockdownUrl} target="_blank">
                    <button type="button" className="btn btn-success">
                      <img src={lock_icon} /> Download Lockdown Exam Browser
                    </button>
                  </a>
                  <a href={this.state.sebUrl} target="_blank">
                    <button type="button" className="btn btn-warning">
                      <img src={test_icon} /> Download Exam Launcher
                    </button>
                  </a>
                </div>
                <br />
              </div>
            </div>
          )}
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

export default TestInstructions;
