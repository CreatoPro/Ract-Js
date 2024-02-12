import React, { Component } from "react";
import {connect} from "react-redux";
import "./Refer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card'
import Loader from './../../_components/loader/loader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from "react-bootstrap/Form";
import ApiService from "../../_services/ApiService";

class ReferDetails extends Component {
  constructor(props) {
    super(props);
	this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      message:'',
      submitted: false,
	  loading: false,
      user: null,
	  list: [],
	  list2: [],
	  response : [],
    };
	this.onSubmit = this.onSubmit.bind(this);
	this.reloadReferralsList = this.reloadReferralsList.bind(this);
  }

  componentDidMount() {
	this.reloadReferralsList();
	this.reloadCountryCodeList();
  }
  
  reloadReferralsList() {
      this.setState({ loading: true }, () => {
        ApiService.fetchReferrals()
        .then((res) => {
            this.setState({
              loading: false,
              list: res.data.data
            });
        });
      });	
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
  
  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    let { name, mobileNumber, email, remarks } = this.state;
	var countryCode = document.getElementById("countryCode").value;
    if (name && mobileNumber && email && remarks && countryCode) {	
		var dataString = {
            "name":name,
            "mobileNumber":mobileNumber,
            "email":email,
			"remarks":remarks,
			"countryCode":countryCode,
			"enquiryId": localStorage.getItem('enquiryId')
        };
		ApiService.fetchRefer(dataString)
        .then((res) => {
		   if(res.data.status==0){	
              this.setState({
                loading: false,
                response: res.data.data
              });
		   }else{
			  let emailValidationMsg = '';
			  let mobileNumberValidationMsg = '';
			  this.setState({ message: res.data.message });
			  this.setState({ response: mobileNumberValidationMsg });
			  this.setState({ response: emailValidationMsg });
			  this.reloadReferralsList(); 
		   }
        });
    }
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
	let portlet = JSON.parse(localStorage.getItem('portlet'));
    console.log(this.props);
    const { loading } = this.state;
    return (
      <div className="ReferDetails login">
        {
		 <div>
		  <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
			  <div className="back">
				<FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
			  </div>
			   <h4>Refer a friend</h4>
		  </div>
		  <div className="mt60">
		    <Tabs defaultActiveKey="Refer" id="uncontrolled-tab-example">
			  <Tab eventKey="Refer" title="Refer">
				{loading ?  <Loader />: this.renderForm()} 
			  </Tab>
			  <Tab eventKey="Referred" title="Referred">
				{loading ?  <Loader />: this.renderCard()} 
			  </Tab>
			</Tabs>
		  </div>
		 </div>
        }
      </div>
    );
  }

  renderCard() {
	    let data = this.state.list
		console.log("records");
		return  <div className="refer_list card_list"> 
		{
		 data && data.map((item, index) => {
				return ( 
				 <Card key={index}>
					<Card.Body>
					  <div className="cardbody">
						<h4 className="head">{item.name} <br /> 
						 <span>{item.mobile}</span>
						</h4>
						<p>{item.referredDate}</p>
					  </div>
					</Card.Body>
				  </Card>
		     )
        })
    }
    </div>
  }
  
  renderForm() {
	let options = this.state.list2;
	let {name, mobileNumber, email, remarks, submitted, response, message, countryCode} = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
      <Form.Group>
        <div className={'item-inner' + (submitted && !name ? ' has-error' : '')}>
          <Form.Control type="text" name="name" placeholder="Name"  onChange={e => this.setState({name: e.target.value})} value={name}  />
        </div>
        <br />
        <div className={'item-inner country_code' + (submitted && !mobileNumber ? ' has-error' : '')}>
          <Form.Control as="select" name="countryCode" id="countryCode" onChange={e => this.setState({countryCode: e.target.value})} >
		    {options.map((c, i) =>
			   <option value={c.countryCode} selected={c.defaultCountry}>+{c.countryCode}</option>
			)}	
		   </Form.Control>
		   <Form.Control type="text" placeholder="Mobile Number" name="mobileNumber" onChange={e => this.setState({mobileNumber: e.target.value})} value={mobileNumber} />
        </div>
		 {response.mobileNumberValidationMsg && <div className="res-error">{response.mobileNumberValidationMsg}</div> }
        <br />
        <div className={'item-inner' + (submitted && !email ? ' has-error' : '')}>
          <Form.Control type="text" placeholder="Email" name="email" onChange={e => this.setState({email: e.target.value})} value={email} />
        </div>
		{ response.emailValidationMsg && <div className="res-error">{response.emailValidationMsg}</div> }
        <br />
        <div className={'item-inner' + (submitted && !remarks ? ' has-error' : '')}>
          <Form.Control type="text" placeholder="Remarks" name="remarks" onChange={e => this.setState({remarks: e.target.value})} value={remarks} />
        </div>
        <div className="institute-sign-in-btn">
          <input className="primary button-full ilearn-blue-btn button-md" type="submit" value="REFER" />
        </div>
		{message && <div className="res-green">{message}</div> }
      </Form.Group>
     </Form>
    );
  }

}

export default ReferDetails;