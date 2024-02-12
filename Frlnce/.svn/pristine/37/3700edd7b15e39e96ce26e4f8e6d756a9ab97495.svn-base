import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { ILoader } from "./iloader/iloader";
import ApiService from "../_services/ApiService";

export default class OTPValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      otpInput: null,
      showError: false,
      errorMessage:
        "The OTP you entered is invalid. Please enter the correct OTP.",
      showLoading: false,
    };
  }

  /*componentDidMount() {
        console.log("OTPValidator --> componentDidMount...");
    }*/

  /*shouldComponentUpdate(newProps, newState) {
        console.log("OTPValidator --> shouldComponentUpdate()...);
        return newState.data.show != this.state.data.show
    }*/

  componentWillReceiveProps(newProps) {
    //console.log("OTPValidator --> componentWillReceiveProps()...");
    if (newProps.data.show !== this.props.data.show) {
      this.setState({
        data: newProps.data,
      });
    }
  }

  render() {
    //console.log("OTPValidator --> render()...");
    const {
      enableResendOtp,
      showTimer,
      resendOtp,
      callForOtp,
      timeLeft,
      handleResendMessage,
      handleCallForOtp,
    } = this.props;
    let otpData = this.state.data;
    return (
      <>
        <Modal
          show={otpData.show}
          style={{ fontFamily: "Work Sans, sans-serif" }}
          backdrop="static"
          onHide={() => this.handleClose(false)}
        >
          <Modal.Header
            closeButton
            className={`ilearn-plain-header ilearn-blue-light-btn`}
          >
            <Modal.Title className="text-white"> Verify OTP </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.handleClose(true);
              }}
            >
              <Form.Group controlId="otp">
                <Form.Label
                  dangerouslySetInnerHTML={{ __html: otpData.message }}
                ></Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  onChange={this.updateInput}
                />
              </Form.Group>
              {this.state.showError && (
                <div className="error-message">{this.state.errorMessage}</div>
              )}
            </Form>
            {enableResendOtp ? (
              <>
                <span>Did not Receive OTP? </span>
                {showTimer && <span>Wait {timeLeft} seconds</span>}
                {resendOtp && (
                  <span
                    style={{ color: "var(--primary)", cursor: "pointer" }}
                    onClick={handleResendMessage}
                  >
                    Resend OTP
                  </span>
                )}
                {callForOtp && (
                  <span
                    style={{ color: "var(--primary)", cursor: "pointer" }}
                    onClick={handleCallForOtp}
                  >
                    Get OTP on Call
                  </span>
                )}
              </>
            ) : null}
            {this.renderLoader()}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              className="text-uppercase"
              onClick={() => this.handleClose(true)}
            >
              Verify
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  renderLoader() {
    //console.log("OTPValidator -> renderLoader()... ");
    const _loadingText = "Please wait...";
    return (
      <ILoader
        loadingText={_loadingText}
        isShow={this.state.showLoading}
      ></ILoader>
    );
  }

  updateInput = (e) => {
    let v = e.target.value;
    let k = e.target.name;
    let otpInput = { ...this.state.otpInput };
    otpInput = v;
    this.setState({ otpInput: otpInput });
  };

  handleClose = (value) => {
    //console.log("OTPValidator --> handleClose()..."+this.state.otpInput);
    if (
      value === true &&
      (this.state.otpInput === null ||
        this.state.otpInput.length !== this.state.data.otpLength)
    ) {
      this.setState({ showError: true });
    } else if (value === true && !this.props.masterControl) {
      this.setState({ showLoading: true, showError: false }, () => {
        ApiService.verifyOTP(this.state.data.userId, this.state.otpInput).then(
          (res) => {
            //console.log("OTPValidator -> handleClose(); res : "+JSON.stringify(res));
            if (res.data.status === 1) {
              this.setState({ showLoading: false }, () => {
                const { onOTPValidatorClose = (f) => f } = this.props;
                onOTPValidatorClose(value);
              });
            } else {
              this.setState({
                showLoading: false,
                showError: true,
                errorMessage: res.data.message,
              });
            }
          }
        );
      });
    } else {
      const { onOTPValidatorClose = (f) => f } = this.props;
      this.props?.masterControl
        ? onOTPValidatorClose(this.state.otpInput, value)
        : onOTPValidatorClose(value);
    }
  };
}

/*
    References:
    Modal -> https://react-bootstrap.github.io/components/modal/

*/
