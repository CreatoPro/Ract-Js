import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Config from "../../_config/config";
import Form from "react-bootstrap/Form";
import Parser from "html-react-parser";
import OTPValidator from "../../_components/OTPValidator";
import { ILoader } from "../../_components/iloader/iloader";
import ApiService from "../../_services/ApiService";
import jwt_decode from "jwt-decode";
import "./verify-mobile.styles.css";

class VerifyMobile extends React.Component {
  constructor() {
    super();
    this.state = {
      mobile: "",
      error: false,
      errorMessage: "",
      otpMessage:
        "Successfully sent the One Time Password to your Registered Mobile Number",
      userId: "null",
      otpLength: 4,
      showOtpInput: false,
      showLoading: false,
      mobilePattern: /^[0-9]{10}$/,
      showTimer: false,
      resendOtp: false,
      callForOtp: false,
      timeLeft: Infinity,
      enableResendOtp: true,
    };
    this.otpInterval = null;
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.checkMobile();
  };

  checkMobile = async () => {
    const { mobile: mobileNo, mobilePattern } = this.state;
    // console.log(mobilePattern.test(mobileNo));
    if (!mobilePattern.test(mobileNo)) {
      return this.setState({
        error: true,
        errorMessage:
          "Invalid Mobile Number. Please key in your 10 digit Indian mobile number (without the country code +91 )",
      });
    }

    try {
      this.setState({
        showLoading: true,
        error: false,
      });
      const res = await ApiService.verifyMobile(mobileNo);
      console.log(res);
      // if (res?.data?.status === 200) {
      if (res?.data?.type === "success") {
        this.setState(
          {
            showOtpInput: true,
            showLoading: false,
          },
          () => {
            this.startTimer("message");
          }
        );
      } else if (res?.data?.error_code === "E149") {
        this.setState({
          error: true,
          showLoading: false,
          errorMessage:
            "Sorry. This mobile number is not registered in our database. Did you use an alternative mobile number while signing up?",
          loginUserData: {},
        });
      } else {
        this.setState({
          showLoading: false,
          error: true,
          errorMessage: "Sorry some error occurred",
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        error: true,
        showLoading: false,
        errorMessage: "Sorry some error occurred",
      });
    }
  };

  handleResendMessage = async () => {
    try {
      const { mobile } = this.state;
      const res = await ApiService.resendTextOtp(mobile);
      console.log(res);
      if (res.data.type === "success") {
        this.startTimer("call");
      } else {
        this.setState({
          showOtpInput: false,
          error: true,
          showLoading: false,
          errorMessage: res.data?.message || "Sorry some error occurred",
          loginUserData: {},
        });
      }
    } catch (e) {
      this.setState({
        showOtpInput: false,
        error: true,
        showLoading: false,
        errorMessage: "Sorry some error occurred",
        loginUserData: {},
      });
    }
  };

  handleCallForOtp = async () => {
    try {
      const { mobile } = this.state;
      const res = await ApiService.resendCallOtp(mobile);
      console.log(res);
      if (res.data.type === "success") {
        this.setState({
          resendOtp: false,
          callForOtp: false,
          showTimer: false,
          timeLeft: Infinity,
          enableResendOtp: false,
        });
      } else {
        this.setState({
          showOtpInput: false,
          error: true,
          showLoading: false,
          errorMessage: res.data?.message || "Sorry some error occurred",
          loginUserData: {},
        });
      }
    } catch (e) {
      this.setState({
        showOtpInput: false,
        error: true,
        showLoading: false,
        errorMessage: "Sorry some error occurred",
        loginUserData: {},
      });
    }
  };

  handleOtpSubmit = async (otp, isSubmitted) => {
    this.setState({
      showOtpInput: false,
    });

    if (!isSubmitted) return;

    this.setState({
      showLoading: true,
    });

    console.log(otp);
    // const otpData = {
    //   channel: "mobile",
    //   identifier: this.state.mobile,
    //   otp,
    // };
    const { mobile } = this.state;

    try {
      const res = await ApiService.loginWithOtp(mobile, otp);
      this.setState({
        showLoading: false,
      });
      console.log(res);
      const { token } = res.data?.data || {};

      if (res.data.status === 404) {
        return this.setState({
          error: true,
          showLoading: false,
          errorMessage:
            "Sorry. This mobile number is not registered in our database. Did you use an alternative mobile number while signing up?",
          loginUserData: {},
        });
      }

      if (token) {
        // this.loginToken(token, res.data.data);
        return this.dologin(token, res.data.data);
      } else {
        this.setState({
          error: true,
          showLoading: false,
          errorMessage: "Invalid Otp",
          loginUserData: {},
        });
      }
    } catch (e) {
      this.setState({
        error: true,
        showLoading: false,
        errorMessage: "Sorry some error occurred",
        loginUserData: {},
      });
    }
  };

  startTimer = (event) => {
    this.setState(
      {
        enableResendOtp: true,
        resendOtp: false,
        callForOtp: false,
        showTimer: true,
        timeLeft: 30,
      },
      () => {
        this.otpInterval = setInterval(() => {
          if (this.state.timeLeft === 1) {
            clearInterval(this.otpInterval);
            this.setState({
              resendOtp: event === "message",
              showTimer: false,
              callForOtp: event === "call",
            });
          } else {
            this.setState((prevState) => ({
              timeLeft: prevState.timeLeft - 1,
            }));
          }
        }, 1000);
      }
    );
  };

  componentWillUnmount() {
    if (this.otpInterval) {
      clearInterval(this.otpInterval);
    }
  }

  loginToken(token, testDetails) {
    if (token) {
      console.log(token);
      this.setState(
        { loading: true, loaderStyle: "dark", connectionErrorMsg: null },
        () => {
          ApiService.fetchLoginToken(token).then(
            (res) => {
              console.log(res, "<--login");
              if (res.data.status === 1) {
                this.setState(
                  { loading: false, loginUserData: res.data.data },
                  () => {
                    this.dologin(testDetails);
                  }
                );
              } else {
                this.setState({
                  loading: false,
                  errorMessage: res.data.message,
                });
              }
            },
            (error) => {
              //ErrorCB
              this.setState({
                loading: false,
                connectionErrorMsg: Config.CONNECTION_ERROR_MSG,
              });
            }
          );
        }
      );
    }
  }

  dologin = (token, testDetails) => {
    // let loginUserData = this.state.loginUserData;
    let user = jwt_decode(token);
    delete user.sub;
    delete user.jti;
    delete user.iat;
    user.token = token;
    console.log(user, "<--decoded");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("enquiryId", user.enquiryId);
    localStorage.setItem("tenant", user.tenant);

    return this.props.history.replace({
      pathname: "/testdetails",
      state: { testDetails },
    });
  };

  render() {
    return (
      <div className="login work-sans-font">
        {
          <Container fluid>
            <div
              className="header-image"
              style={{
                background: `url(${Config.cover}) no-repeat transparent`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="main-content">
              <span className="gradient-text">
                <strong> Enter Your Mobile number</strong>
              </span>
              {
                <Form onSubmit={this.submitHandler}>
                  <Form.Group>
                    <div
                      className={`item-inner ${
                        this.state.error ? "has-error" : ""
                      }`}
                    >
                      <Form.Control
                        type="tel"
                        name="mobile"
                        onChange={this.onChange}
                        placeholder="Mobile Number"
                        title="please enter a valid phone no"
                        value={this.state.mobile}
                      />
                    </div>
                    <br />
                    <div className="institute-sign-in-btn">
                      <input
                        className="primary button-full ilearn-blue-btn button-md"
                        type="submit"
                        value="Send Otp"
                      />
                    </div>
                    {this.state.error && (
                      <div className="red">
                        {Parser(this.state.errorMessage)}
                      </div>
                    )}
                  </Form.Group>
                </Form>
              }
            </div>
          </Container>
        }
        <OTPValidator
          data={{
            show: this.state.showOtpInput,
            otpLength: this.state.otpLength,
            smsAddress: this.state.mobile,
            message: this.state.otpMessage,
            userId: this.state.userId,
          }}
          handleResendMessage={this.handleResendMessage}
          enableResendOtp={this.state.enableResendOtp}
          showTimer={this.state.showTimer}
          masterControl={true}
          timeLeft={this.state.timeLeft}
          resendOtp={this.state.resendOtp}
          callForOtp={this.state.callForOtp}
          onOTPValidatorClose={this.handleOtpSubmit}
          handleCallForOtp={this.handleCallForOtp}
        />
        <ILoader
          loadingText={"Please wait..."}
          isShow={this.state.showLoading}
        ></ILoader>
        <div className="verify-mobile-support">
          Having trouble? Please contact{" "}
          <span className="verify-mobile-support-email">
            help@unacademy.com
          </span>{" "}
          for further support.
        </div>
      </div>
    );
  }
}

export default VerifyMobile;
