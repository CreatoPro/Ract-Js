import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import "./float-label-min.css"
import cw_logo from "./../images/cw_logo.png";
import Config from "../../../_config/config";
import ApiService from "../../../_services/ApiService";
import OTPValidator from './../../../_components/OTPValidator';
import {ILoader} from './../../../_components/iloader/iloader';
import Button from "react-bootstrap/Button";
import FacebookLoginComponent from './../../login/FacebookLoginComponent'
import jwt_decode from "jwt-decode";

class DesktopHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            message: null,
            loading: false,
            loaderStyle:'',
            errorMessage: null,
            connectionErrorMsg: null,
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
        };    
    }

    componentDidMount() {
        this.init();
    }

    init() {

        let paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        let token =  params.get('token');

        this.setState({ loading: true, loaderStyle: token ? 'dark':'' }, () => {
            ApiService.fetchHome()
            .then((res) => {
                console.log(JSON.stringify(res.data.data));
                this.setState({
                    loading: false,
                    info: res.data.data
                });

                
                if(token){ this.loginToken(token); }
            },
            error => { //ErrorCB
                this.setState({loading:false, 
                connectionErrorMsg: Config.CONNECTION_ERROR_MSG});
            });
        });	
    }    

    render() {
        let auth = JSON.parse(localStorage.getItem('user'));
        if(auth != null){
            let paramsString = this.props.location.search;
            const params = new URLSearchParams(paramsString);
            let token =  params.get('token');
            if(!token){
              this.props.history.push('dashboard');
            }
        }
        const info = this.state.info;

        // console.log(info?.loginPageConfig,'text');
        const { Text1 } = info?.loginPageConfig || '';
        console.log(Text1,'text');
        //console.log("Info : "+JSON.stringify(info));
        const show_registration_btn = info?.loginPageConfig?.SHOW_REGISTER_BUTTON==='true'?true:false;
        const show_facebook_btn = info?.loginPageConfig?.FACEBOOK_LOGIN==='true'?true:false;
        let desktop_hero_imgs = info?.loginPageConfig?.desktopHeroImage;
        let dektop_hero_img = "";
        //let dektop_hero_img = "https://staticfiles.edusquares.com/images/login-background.png";
        if(desktop_hero_imgs) {
            dektop_hero_img = desktop_hero_imgs[Math.floor(Math.random() * desktop_hero_imgs.length)];
        }
        return (            
        <div className="home">
            {
            <main className="home-container MuiGrid-container">
                <div className="home-col-left MuiGrid-item MuiGrid-grid-sm-4 MuiGrid-grid-md-7"
                style={{backgroundImage: `url(${dektop_hero_img})`, backgroundSize: `100% 100%`, backgroundColor: `#fafafa`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`}}
                ></div>
                <div className="home-col-right MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8 MuiGrid-grid-md-5 MuiPaper-elevation6">
                    <div className="login-container">
                        <div className="margin-top-2">
                            <img src={Config.logo} className="institute_logo" alt="Logo"/>
                        </div>
                        <div className="institute-top-intro">
                            <span class="gradient-text"><strong> {info?.instituteName} </strong></span>
                        </div>
                        <br/>
                        <form className="login-form"> 
                            <div class="form-group input-group">
                                <span class="has-float-label col-sm-12">
                                    <input class="form-control login-input" id="username" type="text" name="username" onChange={this.updateInput} outline size="lg" placeholder=" "/>
                                    <label for="username">Username *</label>
                                </span>
                            </div>
                            <div class="form-group input-group">
                                <span class="has-float-label col-sm-12">
                                    <input class="form-control login-input" id="password" type="password" name="password" onChange={this.updateInput} onKeyPress={this.handleKeypress} outline size="lg" placeholder=" "/>
                                    <label for="password">Password *</label>
                                </span>
                            </div>
                            { this.state.errorMessage && <div className="error-message">{this.state.errorMessage}</div> }
                            <button className="primary login button-full ilearn-blue-btn button-md" type="button" onClick={() => this.login()}>
                                <span className="button-inner"> SIGN IN </span>
                            </button>
                            {/*<button className="primary login button-full ilearn-blue-btn button-md" type="button" onClick={() => this.loginToken()}>
                                <span className="button-inner"> SIGN IN Using Token </span>
                            </button>*/}         
                            <div className="MuiGrid-container">
                                <div className="MuiGrid-item MuiGrid-grid-xs-true">
                                    <a className="login-link" href="/forgetpwd">Forgot password?</a>
                                </div>
                                {
                                 show_registration_btn &&  
                                <div className="MuiGrid-item">
                                    <Link className="login-link" to="/register">Don't have an account? Sign Up</Link>
                                </div>
                                }
                            </div> 
                            <br/>
                            {
                                show_facebook_btn && 
                                <FacebookLoginComponent {...this.props} />
                            }                                             
                        </form>
                    </div>
                    
                    {Text1&&<p className="terms-and-conditions">{Text1}</p>}


                    {this.renderCard()} 

                    <OTPValidator data={this.state.otpValidator} 
                        onOTPValidatorClose={this.onOTPValidatorClose} /> 
                    {this.renderLoader()}                  
                    {this.renderFooter()}
                </div>
            </main>            
            }		
        </div>
        );
    }  

    renderFooter() {
        return (
            <div className="MuiGrid-grid-xs-12 MuiGrid-grid-sm-8 MuiGrid-grid-md-5 powered-by-container">
                {this.state.connectionErrorMsg && <div class="off-line">{this.state.connectionErrorMsg}</div>}
                <div className="powered-by">
                    <p className="powered-by-text text-alignCenter">
                        Copyright © &nbsp;
                        <a className="login-link" href="https://conceptwaves.com/">
                            <img src={cw_logo} alt="logo" />
                        </a> 2022.
                    </p>                
                </div>
            </div>
        );
    }

    renderLoader() {
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.loading}
                loaderStyle={this.state.loaderStyle}
                >
            </ILoader>
        )
    }

    renderCard() {
        let data = this.state.info;
          return  <div className="hashbg home-card"> 
          {
               data?.cards && data?.cards?.map((item, index) => {
                      return ( 
                <Button key={index} variant="primary login button-full ilearn-white-btn button-md" onClick={() =>this.routeInstituteCard(item)}>
                  <img src={Config.logo} alt={item.name} /> {item.name}
                </Button>
                      )
                })
      }
      </div>
    }

    routeInstituteCard = (card) => {
        //console.log(JSON.stringify(card));
        this.props.history.push({
          pathname: '/instituteCardDetail',
          state: { card: card }});
      };

    updateInput = (e) =>{
        let v = e.target.value;
        let k = e.target.name;
        let loginDetails = {...this.state.loginDetails}
        loginDetails[k] = v;
        this.setState({loginDetails});
    }
    
    handleKeypress = e => {
        console.log("key : "+e.charCode );
        if (e.charCode  === 13) {
            this.login();
        }
    };

    login() {
        let { loginDetails} = this.state;
        if (loginDetails.username && loginDetails.password) {
          this.setState({ loading: true, connectionErrorMsg:null }, () => {
            ApiService.fetchLogin(loginDetails.username, loginDetails.password)
            .then((res) => {
                if(res.data.status===1) { 
                    this.setState({ loading: false, loginUserData: res.data.data }, () => {
                        this.dologin();
                    }); 
                }
                else {
                    this.setState({
                        loading: false,
                        errorMessage : res.data.message
                    });  
                }
            },
            error => { //ErrorCB
                this.setState({loading:false, 
                connectionErrorMsg: Config.CONNECTION_ERROR_MSG});
            });
          });
        }
    }

    loginToken(token) {
        if (token) {
            console.log('here');
          if(Config.siteTitle === 'unsat' || Config.siteTitle === 'unsat2') this.dologin(token);
          this.setState({ loading: true, loaderStyle:'dark', connectionErrorMsg:null }, () => {
            ApiService.fetchLoginToken(token)
            .then((res) => {
                if(res.data.status===1) { 
                    this.setState({ loading: false, loginUserData: res.data.data }, () => {
                        this.dologin();
                    }); 
                }
                else {
                    this.setState({
                        loading: false,
                        errorMessage : res.data.message
                    });  
                }
            },
            error => { //ErrorCB
                this.setState({loading:false, 
                connectionErrorMsg: Config.CONNECTION_ERROR_MSG});
            });
          });
        }
    }

    dologin(reqToken = null) {
        console.log('here');
        let loginUserData = this.state.loginUserData;
        var decoded = jwt_decode(loginUserData?.token || reqToken);
        if(reqToken) decoded['token'] = reqToken;
        let paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        let token =  params.get('token');
        let testId =  params.get('testId');
        let target =  params.get('target')
        if(token || testId){
            localStorage.setItem('user', JSON.stringify(loginUserData || decoded));
            localStorage.setItem('enquiryId', loginUserData?.enquiryId || decoded?.enquiryId);
            localStorage.setItem('tenant', decoded.tenant);
            if(testId){
                this.props.history.push('/TestInstructions/'+testId+'?cat=0');
            }else if(target){
                this.props.history.push('/'+target);
            }else {
                this.props.history.push('/');
            }
        }else if(loginUserData.otpEnableStatus && loginUserData.otpEnableStatus===1) {
            let _otpValidator = { show:true, 
                otpLength: loginUserData.otpLength, 
                smsAddress: loginUserData.smsAddress,
                message: loginUserData.otpMessage,
                userId: loginUserData.userId
            }
            this.setState({ otpValidator: _otpValidator });   
        }else {
            
            localStorage.setItem('user', JSON.stringify(loginUserData));
            localStorage.setItem('enquiryId', loginUserData.enquiryId);
            localStorage.setItem('tenant', decoded.tenant);
            //localStorage.setItem('user', JSON.stringify(loginUserData));
            //localStorage.setItem('user', JSON.stringify(loginUserData));
            this.props.history.push('/');
        }
    }

    onOTPValidatorClose = value => {
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

  
}

export default DesktopHome;