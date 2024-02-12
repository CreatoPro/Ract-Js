import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Config from '../../_config/config'

class TestResultDetail extends Component {

  render() {
	let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    var enquiryId = localStorage.getItem('enquiryId');
    var url = Config.siteUrl + "popup/OnlineTest.do?reqCode=viewPerformance&testId="+this.props.match.params.id+"&enquiryId="+enquiryId+"&browserMode=tablet";
    return (
      <div className="testlist">
        {
          <Container fluid>
          <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
          <div className="">
					<div className="back">
					  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
					</div>
					<h4>Detailed Profiling</h4>
          </div>
          </div>
          <iframe height="700" width="100%" title="test analysis" src={url}></iframe>
          </Container>
        }
      </div>
    );
  }

}

export default TestResultDetail;
