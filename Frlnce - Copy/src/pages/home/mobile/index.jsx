import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ApiService from "../../../_services/ApiService";
import "./style.css";
import cw_logo from "../images/cw_logo.png";
import Config from "../../../_config/config";
import {ILoader} from './../../../_components/iloader/iloader';
import jwt_decode from "jwt-decode";

class MobileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      loaderStyle:'',
    };
    this.reloadInstitute = this.reloadInstitute.bind(this);
    
  }


  componentDidMount() {
    this.reloadInstitute();

    /*window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      // if no localStorage is set, first time visitor
        // show the prompt banner
        prompt.style.display = 'block';
        // store the event for later use
        let installEvent = event;
    });*/
  }

  promptToInstall = () => {
    let installEvent;
    prompt.style.display = 'none';
    // trigger the prompt to show to the user
    installEvent.prompt();  
  };

  reloadInstitute() {

      let paramsString = this.props.location.search;
      const params = new URLSearchParams(paramsString);
      let token =  params.get('token');

      this.setState({ loading: true, loaderStyle: token ? 'dark':'' }, () => {
        ApiService.fetchHome()
        .then((res) => {
            this.setState({
              loading: false,
              list: res.data.data
            });
			      document.title = this.state.list.instituteName;
            localStorage.setItem('siteTitle', this.state.list.instituteName);
            localStorage.setItem('instituteHomeLink', this.state.list.instituteHomeLink);
            if(token){ this.loginToken(token); }
        });
      });	
  }


  routeChange = (e) => {
    let path = `login`;
    //this.props.history.push(path);
    this.props.history.push({
      pathname: path,
      state: { loginPageConfig: this.state.list.loginPageConfig }});
  };

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

    const { Text1 } = this.state.list?.loginPageConfig || '';


    return (
      <div className="home">
        {
            <Container fluid>
              <div className="institute-top" style={{background: `url(${Config.cover}) no-repeat transparent`,  backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <div className="institute-top-logo" style={{background: `url(${Config.logo}) no-repeat transparent`, backgroundSize: '100%'}}></div>
              <div className="institute-top-intro">
                <h4>{this.state.list && this.state.list.instituteName}</h4>
              </div>
              <div className="institute-sign-in-btn">
                <button className="primary login button-full ilearn-blue-btn button-md" onClick={this.routeChange}
                >
                  <span className="button-inner"> SIGN IN </span>
                </button>
              </div>

              {Text1&&<p className="terms-and-conditions">{Text1}</p>}
              
              {this.renderCard()} 
              { this.state.list.address && 
                <div className="address">
                <span dangerouslySetInnerHTML={{ __html:this.state.list.address}} />
                </div>
              }
            </Container>
        }
        {this.renderFooter()}
        {this.renderLoader()}
        { 
          //this.renderInstallPrompt()
        }
      </div>
    );
  }

  renderCard() {
	  let data = this.state.list;
		return  <div className="hashbg home-card"> 
		{
			 data.cards && data.cards.map((item, index) => {
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


  renderInstallPrompt() {
    return (
      <div className="ath-container banner-bottom-center prompt" style={{display:"block" }}>
          <div className="ath-banner">
            <div className="ath-banner-cell"> <img src={Config.logo} className="ath-prompt-logo" style={{width:"50px" }} /> </div>
            <div className="ath-banner-title">Install this PWA?</div>
            <div className="ath-banner-cell">
              <button type="button" class="btn btn-cancel btn-link prompt__close">Not Now</button>
            </div>
            <div className="ath-banner-cell">
              <button type="button" className="btn btn-install btn-success prompt__install" onClick={this.promptToInstall}>Install</button>
            </div>

          </div>
        </div>
    );
  }
  

  loginToken(token) {
    if (token) {
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
    console.log(reqToken);
    let loginUserData = this.state.loginUserData;
    var decoded = jwt_decode(loginUserData?.token || reqToken );
    if(reqToken) decoded['token'] = reqToken;
    let paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
    let token =  params.get('token');
    let testId =  params.get('testId');
    let target =  params.get('target')
    if(token || testId){
        localStorage.setItem('user', JSON.stringify(loginUserData || decoded));
        localStorage.setItem('enquiryId', loginUserData?.enquiryId || decoded?.enquiryId);
        localStorage.setItem('tenant', decoded.tenant );
        if(testId){
            this.props.history.push('/TestInstructions/'+testId+'?cat=0');
            //this.props.history.push('/test-instructions/0/'+testId);
        }else if(target){
          this.props.history.push('/'+target);
        }else{
            this.props.history.push('/');
        }
    }
    else if(loginUserData.otpEnableStatus && loginUserData.otpEnableStatus===1) {
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
        localStorage.setItem('enquiryId', loginUserData.enquiryId);
        localStorage.setItem('tenant', decoded.tenant);
        this.props.history.push('/');
    }
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

  renderFooter() {
    return (
      <div className="institute-cards hashbg">
        <div className="">
          <div className="institute-top-intro">
            <h6> Powered by </h6>
            <img src={cw_logo} alt="logo" />
          </div>
        </div>
      </div>
    );
  }

  
}

export default MobileHome;
