import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Login.css";
import cw_logo from "./images/cw_logo.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Config from "../../_config/config";
import Parser from 'html-react-parser';
import ApiService from "../../_services/ApiService";
import OTPValidator from './../../_components/OTPValidator';
import {ILoader} from './../../_components/iloader/iloader';

class Forgetpwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      submitted: false,
      user: null,
      message: '',
      otpValidator: { show:false, 
        otpLength: 0, 
        smsAddress: null, 
        message:'Successfully sent the One Time Password to your Registered Mobile Number',
        userId: null
      },
      otpResponse: null,
      showLoading: false
    };
    
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {    
    return (
      <div className="login">
        {
          <Container fluid>
            <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
            </div>
            <div className="header-image" style={{background: `url(${Config.cover}) no-repeat transparent`,  backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
            <div className="main-content">
              <span className="gradient-text">
                <strong> Recover Password </strong>
              </span>
              {this.renderFormLogin()}
            </div>
          </Container>
        }
        {this.renderFooter()}
        <OTPValidator data={this.state.otpValidator} 
                onOTPValidatorClose={this.onOTPValidatorClose} />
        {this.renderLoader()}
      </div>
    );
  }

  renderFormLogin() {
    //console.log(this.props);
    let {username, submitted} = this.state;
    return (
      <Form>
      <Form.Group>
        <div className={'item-inner' + (submitted && !username ? ' has-error' : '')}>
          <Form.Control type="text" placeholder="Username" name="username" onChange={e => this.setState({username: e.target.value})} value={username} />
        </div>
        <br />
        <div className="institute-sign-in-btn">
          <input className="primary button-full ilearn-blue-btn button-md" type="button" value="Recover Password" onClick={() => this.resetPassword()}/>
        </div>
        { this.state.message && <div className="red">{Parser(this.state.message)}</div> }
      </Form.Group>
     </Form>
    );
  }


  renderFooter() {
    return (
      <div className="institute-cards">
        <div className="">
          <div className="institute-top-intro">
            <h6> Powered by </h6> <img src={cw_logo} alt="logo" />
          </div>
        </div>
      </div>
    );
  }

  renderLoader() {
    console.log("Login -> renderLoader()... ");
    const _loadingText = 'Please wait...';
    return (
        <ILoader
            loadingText={_loadingText}
            isShow={this.state.showLoading}
            >
        </ILoader>
    )
  }

  resetPassword() {
    this.setState({ submitted: true });
    let { username, } = this.state;
    if (username) {
      this.setState({ submitted: true, showLoading: true, message: '' }, () => {
        ApiService.fetchForgetpwd(username)
        .then((res) => {
          //console.log("Forgetpwd -> resetPassword(); res : "+JSON.stringify(res));
          if(res.data.status===1) { 
            let _otpValidator = { show:true, 
              otpLength: res.data.data.otpLength, 
              smsAddress: res.data.data.smsAddress,
              message: res.data.data.otpMessage,
              userId: res.data.data.userId
            }
            this.setState({ showLoading: false, otpValidator: _otpValidator, otpResponse:res.data.data }); 
          }
          else {
            this.setState({
              showLoading: false,
              message : res.data.message
            });  
          }
        });
      });
    }
  }

  onOTPValidatorClose = value => {
    //console.log("Register --> onOTPValidatorClose..."+value);
    // store user details in local storage to keep user logged in between page refreshes    
    if(value===true) {
      this.props.history.push({
        pathname: '/resetPwd',
        state: { otp: this.state.otpResponse }});
    }
    else {
      let _otpValidator= { show:false, 
        otp: null, 
        smsAddress: null, 
        message:'Successfully sent the One Time Password to your Registered Mobile Number',
        userId: null
      }
      this.setState({ otpValidator: _otpValidator }); 
    }
  }

}

export default Forgetpwd;
