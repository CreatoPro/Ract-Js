import React, { Component } from "react";
import { connect } from 'react-redux';
import { resetpwd } from './../../_actions/userActions';
import Container from "react-bootstrap/Container";
import "./Login.css";
import cw_logo from "./images/cw_logo.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Config from "../../_config/config";
import Parser from 'html-react-parser';

class Resetpwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
	    newPassword: '',
      confirmPassword: '',
      submitted: false,
      user: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    let { newPassword, confirmPassword } = this.state;
    if (newPassword && confirmPassword) {
	  if(newPassword != confirmPassword){
        this.setState({ message: "Password and confirm Password must be same."});
      }else{
		let userName = this.props.location.state.otp.userName;
	    this.props.resetpwd(userName, newPassword, confirmPassword);
        this.setState({ message: ""});
	  }
    }
  }

  render() {
    
    return (
      <div className="login">
        {
          <Container fluid>
            <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/login')} />
            </div>
            <div className="header-image" style={{background: `url(${Config.cover}) no-repeat transparent`,  backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
            <div className="main-content">
              <span className="gradient-text">
                <strong> Reset Password </strong>
              </span>
              {this.renderFormLogin()}
            </div>
          </Container>
        }
        {this.renderFooter()}
      </div>
    );
  }

  renderFormLogin() {
    console.log(this.props);
    let {newPassword, confirmPassword, submitted} = this.state;
    let {user} = this.props;
	if(user.user.status == 1){
		this.props.history.push('/login');
	}
	
    return (
      <Form onSubmit={this.onSubmit}>
      <Form.Group>
        <div className={'item-inner'}>
          <Form.Control type="text" name="userName" editable={false} defaultValue={this.props.location.state.otp.userName} />
        </div>
        <br />
        <div className={'item-inner' + (submitted && !newPassword ? ' has-error' : '')}>
          <Form.Control type="password" placeholder="New Password" name="newPassword" onChange={e => this.setState({newPassword: e.target.value})} value={newPassword} />
        </div>
        <br />
        <div className={'item-inner' + (submitted && !confirmPassword ? ' has-error' : '')}>
          <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" onChange={e => this.setState({confirmPassword: e.target.value})} value={confirmPassword} />
        </div>
        <div className="institute-sign-in-btn">
          <input className="primary button-full ilearn-blue-btn button-md" type="submit" value="CHANGE PASSWORD" />
        </div>
		{ user.user.messag && <div className="red">{Parser(user.user.messag)}</div>}
        { this.state.message && <div className="red">{Parser(this.state.message)}</div>}
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
}

function mapState(state) {
  return {
    user : state.user
  };
}

const actionCreators = {
  resetpwd: resetpwd,
};

export default connect(mapState, actionCreators)(Resetpwd);
