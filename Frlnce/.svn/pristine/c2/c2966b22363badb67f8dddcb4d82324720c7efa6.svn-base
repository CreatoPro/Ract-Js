import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Login.css";
import cw_logo from "./images/cw_logo.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Config from "../../_config/config";
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import OTPValidator from './../../_components/OTPValidator';
import swal from 'sweetalert';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
	    loading: false,
      user: null,
      list2:[],
      otpValidator: { show:false, 
        otpLength: 0, 
        smsAddress: null, 
        message:'Successfully sent the One Time Password to your Registered Mobile Number',
        userId: null
      },
      loginUserData: null
    };
    this.onSubmit = this.onSubmit.bind(this);
	  this.reloadRegisterList = this.reloadRegisterList.bind(this);
  }

  routeChange(path) {
    this.props.history.push(path);
  }
  
  componentDidMount() {
    const mobile = this.props.location?.state?.mobile;
    if(mobile){
      this.setState({contactNumber:mobile});
    }
    this.init();
  }

  init() {
    this.reloadRegisterList();
	  this.reloadCountryCodeList();  
  }
  
  reloadRegisterList() {
      this.setState({ loading: true }, () => {
        ApiService.fetchRegisterList()
        .then((res) => {
            let quickEnquiryForm = res.data.data;
            let openIdLoginData1 = sessionStorage.getItem('openIdLoginData');
            if(openIdLoginData1) {
              console.log("OpenId Login Data: "+openIdLoginData1);
              let openIdLoginData = JSON.parse(openIdLoginData1);
              quickEnquiryForm.openLoginId = openIdLoginData.userID;
              quickEnquiryForm.openLoginType = openIdLoginData.openLoginTypeId;
              for(let index=0; index<quickEnquiryForm.fields.length; index++) {
                if(quickEnquiryForm.fields[index].enableStatus==1) {
                  if(quickEnquiryForm.fields[index].name=="firstName" && openIdLoginData.first_name) {
                    quickEnquiryForm.fields[index].response=openIdLoginData.first_name;  
                  }
                  else if(quickEnquiryForm.fields[index].name=="lastName" && openIdLoginData.last_name) {
                    quickEnquiryForm.fields[index].response=openIdLoginData.last_name;
                  }
                  else if(quickEnquiryForm.fields[index].name=="email" && openIdLoginData.email) {
                    quickEnquiryForm.fields[index].response=openIdLoginData.email;
                  }
                  else if(quickEnquiryForm.fields[index].name=="userName" && openIdLoginData.email) {
                    quickEnquiryForm.fields[index].response=openIdLoginData.email;
                  }
                }
              }
            }
            this.setState({
              loading: false,
              list: quickEnquiryForm
            });
        });
      });	
  }
  
  updateInput = (e) => {
        const v = e.target.value;
        const k = e.target.name;
        this.setState({[k]:v});
        //console.log(this.state)
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true, loading: true });
      let registerForm = this.state.list;
      let myForm = document.getElementById('myForm');
      let formData = new FormData(myForm);
      //registerForm.platform = "Android";
      formData.forEach((value, key) => {
        for (let i = 0; i < registerForm.fields.length; i++) {
          if(registerForm.fields[i].name==key && registerForm.fields[i].enableStatus==1){
             registerForm.fields[i].response= value;
          }
        }	      
      });
      let openIdLoginData1 = sessionStorage.getItem('openIdLoginData');
      if(openIdLoginData1) {
        //console.log("OpenId Login Data: "+openIdLoginData1);
        let openIdLoginData = JSON.parse(openIdLoginData1);
        registerForm.openLoginId = openIdLoginData.userID;
        registerForm.openLoginType = openIdLoginData.openLoginTypeId;
      }
	  //console.log(JSON.stringify(registerForm));
	  ApiService.fetchRegister(registerForm)
        .then((res) => {
          console.log(res);
          /*  {"status":1,
        "message":"Thank you for the details you entered.<br/>Registration done successfully.",
        "data":{"userId":64715,"status":1,"userName":"testotp","enquiryId":76310,"enquiryName":"testotp",
        "userTypeId":2,"instructorId":0,"instructorName":null,"allowMultipleUser":0,"emailId":"testotp@cw.com",
        "mobileNumber":"9848040040","address":"","otpEnableStatus":1,"otp":"883796","smsAddress":"CWAVES",
        "otpMessage":"Successfully sent the One Time Password to your Registered Mobile Number 
        <br/>98**0***40 <br/> and Email <br/>t****p@cw.com."}}
      */
			if(res.data.status==1) {
        console.log("Register Data : "+JSON.stringify(res.data.data));
        if(res.data.data.otpEnableStatus && res.data.data.otpEnableStatus === 1) { //validate OTP
          let _otpValidator = { show:true, 
            otpLength: res.data.data.otpLength, 
            smsAddress: res.data.data.smsAddress,
            message: res.data.data.otpMessage,
            userId: res.data.data.userId
          }
          this.setState({ loading: false,
            otpValidator: _otpValidator,
            loginUserData: res.data.data 
          });                         
        }
        else {        
          // store user details in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(res.data.data));
          this.props.history.push('/');
        }
      }
      else if(res.data.status==0) {
				this.setState({
				  loading: false,
				  list: res.data.data
				});        
			}
      else {
        this.showErrorAlert("Somethig went wrong, Please try again later.");
      }
    });
  }

  render() {
	const { loading } = this.state;
    return (
      <>
      <div className="login">
        {
          <Container fluid>
            <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
            </div>
            <div className="header-image"  style={{background: `url(${Config.cover}) no-repeat transparent`,  backgroundSize: 'cover', backgroundPosition: 'center'}}> </div>
            <div className="main-content">
              <span className="gradient-text">
                <strong> Register </strong>
              </span>
              {loading ?  <Loader />: this.renderFormLogin()}
            </div>
          </Container>
        }
        {this.renderFooter()}
      </div>
      <OTPValidator data={this.state.otpValidator} 
                onOTPValidatorClose={this.onOTPValidatorClose} />
			</>
    );
  }

  onOTPValidatorClose = value => {
    //console.log("Register --> onOTPValidatorClose..."+value);
    // store user details in local storage to keep user logged in between page refreshes    
    if(value===true) {
      localStorage.setItem('user', JSON.stringify(this.state.loginUserData));
      this.props.history.push('/');
    }
    else {
      let _otpValidator= { show:false, 
        otpLength: 0, 
        smsAddress: null, 
        message:'Successfully sent the One Time Password to your Registered Mobile Number',
        userId: null
      }
      this.setState({ otpValidator: _otpValidator }); 
    }      
}

  renderFormLogin() {
    return (
      <Form onSubmit={this.onSubmit} id="myForm" className="registrationForm">
      <Form.Group>
       {this.renderCard()}
        <div className="institute-sign-in-btn">
          <input className="primary button-full ilearn-blue-btn button-md" type="submit" value="Register" />
        </div>
      </Form.Group>
     </Form>
    );
  }
  
  reloadCountryCodeList() {
      this.setState({ loading: true }, () => {
        ApiService.fetchCountries()
        .then((res) => {
            this.setState({
              loading: false,
              list2: res.data.data
            });
        });
      });	
  }

  renderCard() {
    let data = this.state.list;
	  let options = this.state.list2;
    let field = "";
		return (
    <div className="card_list"> 
		{
        
		  data && data.fields.map((item, index) => {
          if(item.enableStatus==1 && item.type != "tagType") {
            if(item.type == "select"){
              field =  <Form.Group controlId="exampleForm.SelectCustomSizeSm" className="select">
                          <Form.Label>{item.displayName}</Form.Label>
                          <Form.Control as="select"  name={item.name} defaultValue={item.response} onChange={this.updateInput}>
                            { item.options.map((c, i) =>
                              <option value={c.id}>{c.name}</option>
                            )}
                          </Form.Control>
                        </Form.Group>;
            }
            else if(item.name=="contactNumberCountryCode") {
              field =  <div className={'item-inner'}>
                          <Form.Control as="select"  name={item.name} defaultValue={item.response} onChange={this.updateInput}>
                            { options.map((c, i) =>
                              <option value={c.countryCode} selected={c.defaultCountry}>+{c.countryCode}</option>
                            )}
                          </Form.Control>
                        </div>;
			      }
            else {
               field =  <div>
                          <div className={'item-inner'}>
                            <Form.Control type={item.type} placeholder={item.displayName} name={item.name} value={this.state[item.name]} defaultValue={item.response} onChange={this.updateInput}/>
                          </div>
                          <br /> 
                        </div>;
            }
            return (
              <div className={item.name}> 
                {field}
				        <div  className="error"  style={item.errorMessage ? {}:{display:'none'}}>{item.errorMessage}</div>
              </div> 
            )
          }
			  })
    }
    </div>
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

  showErrorAlert(message) {
    swal({
        text: message,
        icon: "warning",
        button: "Ok",
        allowOutsideClick: false,
        closeOnClickOutside: false,
        closeOnEsc: false
    }).then(exit => {
      this.init();
    });
}
}



export default Register;
