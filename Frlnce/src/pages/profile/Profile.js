import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarker, faEnvelope, faPhone, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import avatar from './images/blank-avatar.png';
import Config from "../../_config/config";


class Profile extends Component {

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.photoPath) {
      var pic = user.photoPath;
    } else {
      var pic = avatar;
    }
    return (
      <div className="login">
        {
          <Container fluid>
            <div className="back">
              <FontAwesomeIcon icon={faArrowLeft} onClick={() => this.routeChange('/dashboard')} />
            </div>
            <div className="header-image" style={{ background: `url(${Config.cover}) no-repeat transparent`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="main-content">
              <img className="prifile_img" src={pic} alt="profile" /><br />
              <span className="gradient-text">
                <strong> {user.enquiryName} </strong>
              </span>
              <p><span>{user.course} . {user.center}</span></p>
              <hr />
              <div className="profile_details">
                <p><FontAwesomeIcon icon={faCreditCard} /> <span>Student Code : {user.studentCode}</span></p>
                {/* <p><FontAwesomeIcon icon={faCreditCard} /> <span>Enquiry Id : {user.enquiryId}</span></p> */}
                <p><FontAwesomeIcon icon={faEnvelope} /> <span>Email : {user.emailId}</span></p>
                <p><FontAwesomeIcon icon={faPhone} /> <span>Mobile : {user.mobileNumber}</span></p>
                <p><FontAwesomeIcon icon={faMapMarker} /> <span>Address : <br /> <p dangerouslySetInnerHTML={{ __html: user.address }} /></span></p>
              </div>
            </div>
          </Container>
        }
      </div>
    );
  }

}

export default Profile;
