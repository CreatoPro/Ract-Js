import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Config from '../../_config/config'

class MyPrograms extends Component {
  render() {
	  let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    let user = JSON.parse(localStorage.getItem('user')) || [];
    var tenant = localStorage.getItem('tenant') || Config.siteTitle
    var url = Config.siteUrl+ tenant +"/studentportal/studentPortal.do?reqCode=loadRestMyPrograms&token="+user.token;
    return (
      <div className="testlist">
        {
          <Container fluid>
          <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
          <div className="">
					<div className="back">
					  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
					</div>
					<h4>My Programs</h4>
          </div>
          </div>
          <iframe  class="iframe100" width="100%" title="My Programs" src={url}></iframe>
          </Container>
        }
      </div>
    );
  }

}

export default MyPrograms;
