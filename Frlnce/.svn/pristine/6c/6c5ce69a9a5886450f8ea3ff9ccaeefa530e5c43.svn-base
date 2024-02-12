import React, { Component } from "react";
import { connect } from 'react-redux';
import { changepwd } from './../../_actions/userActions';
import Container from "react-bootstrap/Container";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form";
import Config from "../../_config/config";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      message:'',
      submitted: false,
      user: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    let { currentPassword, newPassword, confirmPassword } = this.state;
    if (currentPassword && newPassword && confirmPassword) {
      if(newPassword != confirmPassword){
        this.setState({ message: "Password and confirm Password must be same."});
      }else{
        let auth = JSON.parse(localStorage.getItem('user'));
        var userName = auth.userName;
        this.props.changepwd(userName, currentPassword, newPassword, confirmPassword);
        this.setState({ message: ""});
      }
      
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
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/dashboard')} />
            </div>
            <div className="header-image"> <img src={Config.cover} /></div>
            <div className="main-content">
              <span className="gradient-text">
                <strong> CHANGE PASSWORD </strong>
              </span>
              {this.renderFormChangePwd()}
            </div>
          </Container>
        }
      </div>
    );
  }

  renderFormChangePwd() {
    //console.log(this.props);
    let auth = JSON.parse(localStorage.getItem('user'));
    let {currentPassword, newPassword, confirmPassword, submitted} = this.state;
    let {user} = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
      <Form.Group>
        <div className={'item-inner'}>
          <Form.Control type="text" name="userName" editable={false} defaultValue={auth.userName} />
        </div>
        <br />
        <div className={'item-inner' + (submitted && !currentPassword ? ' has-error' : '')}>
          <Form.Control type="password" placeholder="Current Password" name="currentPassword" onChange={e => this.setState({currentPassword: e.target.value})} value={currentPassword} />
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
        { user.user.message && <div>{user.user.message}</div> }
        { this.state.message && <div>{this.state.message}</div>}
      </Form.Group>
     </Form>
    );
  }

}

function mapState(state) {
  return {
    user : state.user
  };
}

const actionCreators = {
  changepwd: changepwd,
};

export default connect(mapState, actionCreators)(ChangePassword);
