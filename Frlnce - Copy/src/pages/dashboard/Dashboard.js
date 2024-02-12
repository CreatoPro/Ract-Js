import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {connect} from "react-redux";
import ApiService from "../../_services/ApiService";
import ThemeService from "../../_services/ThemeService";
import Config from './../../_config/config'
import { getUnReadNotificationCount, checkNewNotificationsOnServer } from "./../../push-notification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBell } from '@fortawesome/free-solid-svg-icons';
import getPortlets from './../../_actions/dashboardActions';
import Button from "react-bootstrap/Button";
import "./Dashboard.css";
import SideBar from "../../_components/sidebar/sidebar";
import cloud from "./images/cloud.png";
import Loader from './../../_components/loader/loader';
import avatar from './images/blank-avatar.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
      dashboard: null,
      notificationCount: 0,
      showA2H: false,
      ticker : null,
    };
    this.installEvent = null;
    this.isPWAInstalled = false;
  }
  
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    ThemeService.getActiveTheme();
    if(typeof(user) !== 'undefined' || user != null){
      localStorage.setItem('enquiryId', user.enquiryId);	
      this.props.getPortlets();
      this.setState({ name: user.enquiryName });
    }

    this.setState({ dashboard: this.props.dashboard,
      notificationCount: getUnReadNotificationCount() 
    });    
    
    window.addEventListener('beforeinstallprompt', (event) => {
      //console.log("Dashboard --> beforeinstallprompt Event...");
      event.preventDefault();
      // store the event for later use
      this.installEvent = event;
      this.state.showA2H = true;
    });

    window.addEventListener('appinstalled', (event) => {
      //console.log("Dashboard --> appinstalled Event...");
      this.state.showA2H = false;
    });
    this.isPWAInstalled = this.isInstalled();
    this.generateEndPoint(user);
    checkNewNotificationsOnServer();
    this.studentTickerMessages();
  }


  getDeviceId() {
    let deviceId = localStorage.getItem('ilearn-pwa-deviceId');
    if(!deviceId) {
        //console.log("DeviceId Not found generating new");
        let sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
        deviceId = "PWA-"+sixdigitsrandom;
        localStorage.setItem('ilearn-pwa-deviceId', deviceId);
    }
    return deviceId;
  }

  generateEndPoint(user) {
      let key = user.userId;
      if(!localStorage.getItem("push-notification-endpoint_"+key)) {
      //console.log("Generating Endpoint...");
      var postJsonData = {
        "appId"         : 3,
        "appIdentifier" : Config.site,
        "userId"        : user.userId,
        "enquiryId"     : user.enquiryId  ,
        "deviceId"      : this.getDeviceId(),
        "platform"      : "PWA",
        "deviceToken"   : localStorage.getItem("notification-token")
      };
      ApiService.generateEndPoint(postJsonData)
      .then((res) => { //SuccessCB
        let respData = res.data;
        if(respData.status == 0) {
          //
        }
        else {
          //console.log("Endpoint : "+respData.data.endPoint);
          localStorage.setItem("push-notification-endpoint_"+key, respData.data.endPoint);
        }
      },
      error => { //ErrorCB
        console.log("Dashboard --> generateEndPoint() -> Connection Error : "+Config.CONNECTION_ERROR);
      });
    }
  }

  addToHome = () => {
    //console.log("Dashboard --> addToHome()...");
    //console.log("Dashboard --> isPWAInstalled = "+this.isPWAInstalled);
    if(this.installEvent) {
      this.installEvent.prompt();  
    }
  };
  
  routeChange(path, portletData) {
    //this.props.history.push(path);
	  localStorage.setItem('portlet', JSON.stringify(portletData));
    this.props.history.push({
      pathname: path,
      state: { portlet: portletData }});
  }

  showNotification() {
    //console.log("Dashboard -> showNotification()... ");
    let path = "/notification";
    this.props.history.push({
        pathname: path
    });  
  }

  studentTickerMessages() {
      
      ApiService.studentTickerMessages()
      .then((res) => { 
        this.setState({
          ticker: res.data.importantMessages
        });
      },
      error => { //ErrorCB
        console.log(Config.CONNECTION_ERROR);
      });
  }

  onHover = () => {
    document.getElementById("myMarquee").stop();
  };

  onOut = () => {
    document.getElementById("myMarquee").start();
  };

  sliderButtonAction = (slide) =>{
    //if(slide.button.buttonAction.actionType==='product')
    let productId = slide.button.buttonAction.actionId;    
    if(!Config.CURRENT_PORTLET && !JSON.parse(localStorage.getItem('portlet'))) {
      let portletConfig = { "id":productId,
        "class":"blue-card",
        "name":slide.title,
        "icon":"./assets/imgs/payment.png"
      }
			Config.CURRENT_PORTLET = portletConfig;
		}
    this.setState({ loading: true }, () => {
      ApiService.getProduct(productId)
      .then((res) => { //SuccessCB
        let product = res.data.data;
        this.setState({loading: false});
        this.props.history.push({
          pathname: '/ProductDetails',
          state: { product: product }});
      },
      error => { //ErrorCB
        console.log("Dashboard --> getProduct() -> Connection Error : "+Config.CONNECTION_ERROR);
      });
    });    
  }

  render() {
    const { loading } = this.state;
    let user = JSON.parse(localStorage.getItem('user'));
    var pic = "";
    if(user.photoPath) {
      pic = user.photoPath;
    } else {
      pic = avatar;
    }
    let data = this.props.dashboard.data;
    let slider = data?.slider || null;
    let isSliderEnable = slider? slider.enableStatus : false;
    let siteTitle = localStorage.getItem('siteTitle') || Config.siteTitle;
    return (
      <>
      <div className="dashboard">
        {
          <Container fluid>
            <SideBar history={this.props.history} />
            <navbar className="second-header toolbar toolbar-md toolbar-md-primary" id="second-header">
              <div className="toolbar-content toolbar-content-md">
              
                <div className="img-set profile-set">
                  { isSliderEnable ? <img src={cloud} alt="Cloud"  className="cloud_img_slider" /> : <img src={cloud} alt="Cloud" />}
                  { 
                    this.state.ticker &&  this.renderTicker()
                  }
                  { isSliderEnable ? <span className="logo_text"> {siteTitle}</span> : '' }
                  <span className="notification_icon" onClick={() => this.showNotification()}>   
                    <FontAwesomeIcon icon={faBell} /> 
                    {this.state.notificationCount>0?<span class="count">{this.state.notificationCount}</span>:''} 
                  </span>
                  { !isSliderEnable && 
                      <div className="txt-set">
                        <img src={pic} alt="profile" onClick={() => this.routeChange('profile','')}/>
                        <p className="good-txt"> {this.greetUser()} </p>
                        <p className="name-txt"> {this.state.name} </p>
                      </div>
                  }
                </div>
              </div>
            </navbar>
            { isSliderEnable && <div className="slider-list">  { this.renderSlider(slider) } </div> }
            <div className="category-list">              
                {loading ?  <Loader />: this.renderPortlets()} 
              <br />
            </div>
          </Container>
        }
      </div>
      { this.renderAddToHome() }
      </>
    );
  }

  greetUser() {
    let myDate = new Date();
    let hrs = myDate.getHours();
    let greetMsg;

    if (hrs < 12)
      greetMsg = 'Good Morning';
    else if (hrs >= 12 && hrs <= 16)
      greetMsg = 'Good Afternoon';
    else if (hrs >= 16 && hrs <= 21)
      greetMsg = 'Good Evening';
    else if (hrs >= 16 && hrs <= 21)
      greetMsg = 'Good Night';

    return greetMsg;
  }

  renderTicker() { 
      return ( 
            <div className="marq">  
              <marquee  className="marquee" direction="left" id="myMarquee" onMouseEnter={this.onHover} onMouseLeave={this.onOut}>
                        <>
                        {
                          this.state.ticker.map((item, index) => {
                              return (
                                <>
                                  <span dangerouslySetInnerHTML={{ __html:item}} /> 
                                  {index < this.state.ticker.length - 1 &&  <span> &nbsp; || &nbsp; </span> } 
                                </>
                              )
                          })
                        }
                        </>
              </marquee>     
            </div>
      );
  }

  renderSlider(slider) {     
      let settings = {
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      return ( 
        <div>
              <Slider {...settings}>
              {		  
                slider.slides.map((slide, index) => {
                  return (
                    <div>
                        <div className="mb-outer">
                            <div className="mb-text-1">
                                <h1>{slide.title}</h1>
                                <h3>{slide.subTitle}</h3>
                                {
                                  slide.button.enableStatus && 
                                  <a className="banner-button" href="#" 
                                    onClick={() => this.sliderButtonAction(slide)}
                                    style={{background: slide.button.buttonColor, color: slide.button.buttonTextColor}}>
                                    {slide.button.buttonTitle}
                                  </a>
                                }
                            </div>
                            <img src={slide.imageURL} />
                        </div>
                    </div>
                  )
                })
              }                
              </Slider>
          </div>
      );
}

  renderPortlets() {    
    let data = this.props.dashboard.data;
    if(typeof(data) !== 'undefined' || data != null){	
      
      let user = JSON.parse(localStorage.getItem('user'));
      user.mobileNumber = data.studentDetails.mobile;
      user.photoPath= data.studentDetails.photoPath;
      user.studentCode= data.studentDetails.studentCode;
      user.course = data.studentDetails.course;
      user.center = data.studentDetails.center
      localStorage.setItem("user", JSON.stringify(user));      
      return  <Row>
      {		  
      data.portlets.sort((a, b) => a.id - b.id)
      .map((portlet, index) => {
			//console.log(portlet.name)
        if(portlet.isTile==true){
          let params = "";
          if(portlet.target=="studyResource" || portlet.target=="lessonPlan"){
            params = portlet.params.resourceTypeId +'/'+portlet.params.resourceSubTypeId +'/'+ portlet.name;
          }
          
          let portlet_div =
            <div key={index} className="col col-md-3 col-sm-3 col-xs-6 order-2"> 
              <Button className={portlet.class+' button button-md button-clear button-clear-md'} onClick={() => this.routeChange(portlet.target+'/'+params,portlet)}>
                <item className="item-set-new item item-block item-md">
                  <thumbnail>
                    <img src={portlet.icon} alt="Messages" />
                  </thumbnail>
                  <label className="label label-md">
                    <h5>{portlet.name}</h5>
                  </label>
                </item>
              </Button>
            </div>
          
            if(user.userTypeId!==9){
              return ( portlet_div);
            }else if(user.userTypeId ==9 && portlet.enableForParent==true){
              return ( portlet_div);
            }
          }
        })
      }
      </Row>
    }
  }

  renderAddToHome() {  //A2H
    //console.log("Dashboard --> renderAddToHome() >> showA2H : "+this.state.showA2H);
    return (
      <>
      {
        this.state.showA2H && !this.isPWAInstalled && 
        <div className="ilearn-footer">                    
            <Row>
                <Col className="ilearn-footer-col" >
                  <button className="btn ilearn-blue-btn ilearn-footer-btn btn-lg btn-block" >
                    <img src="/logo192.png" alt="notification" className="float-left" style={{width:'24px',height:'24px',float:'left'}}/> 
                    <span onClick={() => this.addToHome()}>
                      Add {(new URL(window.location)).hostname} to Home screen 
                    </span>
                    <span onClick={() => this.closeAddToHome()} className="float-right">
                      <FontAwesomeIcon icon={ faTimes }  size = 'lg' color='#fff'/>
                      &nbsp;
                    </span>
                    </button>
                </Col>
            </Row>
        </div>
      }
      </>
    );
  }

  isInstalled() {
    //console.log("Dashboard --> isInstalled()..."+(new URL(window.location)).hostname);
    if (navigator.standalone) {
      //console.log("Dashboard --> isInstalled() >> navigator.standalone");
      return true;  // iOS
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      //console.log("Dashboard --> isInstalled() >> display-mode: standalone");
      return true;  // Android with "display": "standalone" in Manifest
    }
    if (new URL(window.location).searchParams.has('ilearnPWA')) {
      //console.log("Dashboard --> isInstalled() >> ilearnPWA");
      return true;  // fallback to check for "?homescreen=1"
    }
    //console.log("Dashboard --> isInstalled() >> FALSE");
    return false;
  }

  closeAddToHome() {
    //console.log("Dashboard --> closeAddToHome()");
    this.setState({ showA2H: false });
  }


}

const mapStateToProps = state => ({
  dashboard: state.dashboard.dashboard
});

const mapDispatchToProps = dispatch => ({
  getPortlets: () => dispatch(getPortlets())
});


export default connect(mapStateToProps,mapDispatchToProps) (Dashboard);