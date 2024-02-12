import React, {Component} from 'react';
import { slide as Menu } from "react-burger-menu";
import background from './images/material-design-background.jpg';
import avatar from './images/blank-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faBullseye ,faLock } from '@fortawesome/free-solid-svg-icons';

//export default props => {
export default class SideBar extends Component{
	
	constructor(props) {
		super(props);
	}

	routeChange(path) {
		this.props.history.push(path);
	}
	
	render(){
		let user = JSON.parse(localStorage.getItem('user'));
		if(typeof(user) !== 'undefined' || user != null){
			var pic = "";
			if(user.photoPath){
			  pic = user.photoPath;
			}else{
			  pic = avatar;
			}

			return (
				// Pass on our props
				<Menu>
					<div className="menu-container">
					<img src={background} className="background" alt="background" />
					<div className="title">
						<img src={pic} alt="profile"/>
						<strong> {user.enquiryName}</strong>
						<p>{user.emailId}</p>
					</div>
					</div>
					<div style={{display:"flex","flex-direction":"column"}}>
					<a style={{color:"#666",width: "100%"}} onClick={() => this.routeChange('/profile')} ><FontAwesomeIcon icon={ faUser } /> My Profile</a>
					<a style={{color:"#666",width: "100%"}} onClick={() => this.routeChange('/changepassword')} ><FontAwesomeIcon icon={ faLock } /> Change Password</a>
					<a href="/logout" ><FontAwesomeIcon icon={ faBullseye } /> Logout</a>

					</div>
				</Menu>
			);
		}
    }
};
