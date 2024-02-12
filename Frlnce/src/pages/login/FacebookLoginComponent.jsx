import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import ApiService from "../../_services/ApiService";
import { OpenLoginTypes } from "../../_config/config";

export default class FacebookLoginComponent extends Component {
    constructor(props) {
		super(props);
	}
	
	/*componentDidMount() {
        console.log("FacebookLogin --> componentDidMount...");
    }
    
    shouldComponentUpdate(newProps, newState) {
        console.log("FacebookLogin --> shouldComponentUpdate...");
        return newState.showReplies != this.state.showReplies
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data.show !== this.props.data.show) {
          this.setState({
            data: newProps.data
          });
        }
    }*/

    render() {
        return (
            <FacebookLogin
                appId="553176341502962"
                autoLoad={false}
                fields="name,first_name,last_name,gender,birthday,email,picture"
                scope="public_profile"
                callback={this.responseFacebook}
                icon="fa-facebook" 
                disableMobileRedirect={true} />
        );
    }

    responseFacebook = (response) => {
        //console.log(">> FacebookLogin: "+JSON.stringify(response));
        this.loginWithFacebook(response);
    }
    
    loginWithFacebook(facebookResponse) {
        let postData = {
          "openId":facebookResponse.userID,
          "openLoginType":OpenLoginTypes.OPEN_LOGIN_TYPE_FACEBOOK,
          "deviceId":ApiService.getDeviceId()
        };
        ApiService.openIdLogin(postData)
        .then((res) => {
            //console.log("FacebookLogin -> openIdLogin(); res : "+JSON.stringify(res.data));
            if (res.data.status==1) {
                //console.log("FacebookLogin -> openIdLogin : SUCCESS...");
                if(res.data.data.enquiryId) {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                this.props.history.push('/');
                }        
            } else if(res.data.Buttonstatus==0) {
                console.log("FacebookLogin -> openIdLogin : ERROR..."+res.data.message);
            }
            else {
                //console.log("FacebookLogin -> openIdLogin : REGISTER...");
                facebookResponse.openLoginTypeId = OpenLoginTypes.OPEN_LOGIN_TYPE_FACEBOOK
                sessionStorage.setItem('openIdLoginData', JSON.stringify(facebookResponse));
                this.props.history.push('register');       
            }
        });
    }

}