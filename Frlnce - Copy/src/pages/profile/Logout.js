import { Component } from "react";
import "./Profile.css";

class Logout extends Component {

  render() {
	const {redirectRoute} = this.props.location?.state || {};
	let user = JSON.parse(localStorage.getItem('user'));
	localStorage.removeItem("user");
	localStorage.removeItem("tenant");
	localStorage.removeItem("enquiryId");
	localStorage.removeItem("push-notification-endpoint");
	localStorage.removeItem("notification-token");
	localStorage.removeItem("instituteHomeLink");
	localStorage.removeItem("siteTitle");
	localStorage.removeItem("push-notification-endpoint_"+user.userId);
	localStorage.removeItem("ilearn-notifications");
	this.props.history.push(redirectRoute||'/');
	//localStorage.clear();
	return "";
  }
}

export default Logout;
