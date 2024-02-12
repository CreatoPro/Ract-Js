import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Login.css";
import cw_logo from "./images/cw_logo.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ApiService from "../../_services/ApiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Config from "../../_config/config";
import OTPValidator from './../../_components/OTPValidator';
import {ILoader} from './../../_components/iloader/iloader';
import FacebookLoginComponent from './FacebookLoginComponent';
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      user: null,
      errorMessage: '',
      loginDetails:{
        username: '',
        password: ''
      },
      otpValidator: { show:false, 
        otpLength: 0, 
        smsAddress: null, 
        message:'Successfully sent the One Time Password to your Registered Mobile Number',
        userId: null
      },
      loginUserData: null,
      showLoading: false,
      loginPageConfig : this.props.location.state.loginPageConfig
    }
     //this.onSubmit = this.onSubmit.bind(this);
     //this.init();
  }

  init() {
    let loginUser = JSON.parse(localStorage.getItem('user'));
    if(loginUser != null) {
      localStorage.removeItem("user");
      this.props.history.push('/');
    }  
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  updateInput = (e) =>{
    let v = e.target.value;
    let k = e.target.name;
    let loginDetails = {...this.state.loginDetails}
    loginDetails[k] = v;
    this.setState({loginDetails});
  }

  login() {
    let { loginDetails} = this.state;
    if (loginDetails.username && loginDetails.password) {
      this.setState({ submitted: true, showLoading: true }, () => {
        ApiService.fetchLogin(loginDetails.username, loginDetails.password)
        .then((res) => {
          console.log("Login -> onSubmit(); res : "+JSON.stringify(res));
          if(res.data.status===1) { 
            this.setState({ showLoading: false, loginUserData: res.data.data }, () => {
              this.dologin();
            }); 
          }
          else {
            this.setState({
              showLoading: false,
              errorMessage : res.data.message
            });  
          }
        });
      });
    }
  }

  dologin() {
    //localStorage.getItem('user')
    let loginUserData = this.state.loginUserData;
    var decoded = jwt_decode(loginUserData.token);
    if(loginUserData.otpEnableStatus && loginUserData.otpEnableStatus===1) {
      let _otpValidator = { show:true, 
        otpLength: loginUserData.otpLength, 
        smsAddress: loginUserData.smsAddress,
        message: loginUserData.otpMessage,
        userId: loginUserData.userId
      }
      this.setState({ otpValidator: _otpValidator });   
    }
    else {
      localStorage.setItem('user', JSON.stringify(loginUserData));
      localStorage.setItem('tenant', decoded.tenant);
      this.props.history.push('/');
    }
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
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/')} />
            </div>
            <div className="header-image" style={{background: `url(${Config.cover}) no-repeat transparent`,  backgroundSize: 'cover', backgroundPosition: 'center'}}>

            </div>
            <div className="main-content">
              <span className="gradient-text">
                <strong> LOGIN </strong>
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
    let { submitted, loginDetails} = this.state;    
    return (
      <Form>
        <br/>
      <Form.Group>
        <div className={'item-inner' + (submitted && !loginDetails.username ? ' has-error' : '')}>
          <input class="form-control" type="text" placeholder="Username" name="username" onChange={this.updateInput} />
        </div>
        <br />
        <div className={'item-inner' + (submitted && !loginDetails.password ? ' has-error' : '')}>
          <input class="form-control" type="password" placeholder="Password" name="password" onChange={this.updateInput} />
        </div>
        <div className="institute-sign-in-btn">
          <input className="primary button-full ilearn-blue-btn button-md" type="button" value="Login"  onClick={() => this.login()}/>
        </div>
        { this.state.errorMessage && <div className="red">{this.state.errorMessage}</div> }
        {this.renderRegister()}
      </Form.Group>
     </Form>
    );
  }

  renderRegister() {
    const show_registration_btn = this.state.loginPageConfig?.SHOW_REGISTER_BUTTON==='true'?true:false;
    const show_facebook_btn = this.state.loginPageConfig?.FACEBOOK_LOGIN==='true'?true:false;    
    return (
      <div>        
        <Row>
            <div className="forgetpwd_link" onClick={() => this.routeChange("forgetpwd")}>
              <b> Forgot Password ? </b>
            </div>            
        </Row>
        {
          (show_registration_btn ||  show_facebook_btn) && 
          <>
            <div className="or">
              <div className="strike">
                <span> OR </span>
              </div>
            </div>
            {
              show_registration_btn && 
              <div className="institute-sign-in-btn">
                <Button variant="primary button-full ilearn-blue-btn button-md" onClick={() => this.routeChange("register")}>
                  <span className="button-inner"> Register </span>
                </Button>
              </div>
            }
            { 
              show_facebook_btn && 
              <FacebookLoginComponent {...this.props} />
            }
          </>
        }
      </div>
    );
  }

  onOTPValidatorClose = value => {
    //console.log("Register --> onOTPValidatorClose..."+value);
    // store user details in local storage to keep user logged in between page refreshes    
    if(value===true) {
      var loginUserData = this.state.loginUserData;
      var decoded = jwt_decode(loginUserData.token);
      localStorage.setItem('user', JSON.stringify(this.state.loginUserData));
      localStorage.setItem('tenant', decoded.tenant);
      this.props.history.push('/');
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
}

export default Login;
