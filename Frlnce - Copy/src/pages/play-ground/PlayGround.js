import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Config from '../../_config/config'

class PlayGround extends Component {

  routeChange(path) {
    this.props.history.push({
      pathname: path,
    });
  }


  render() {
	  let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    let user = JSON.parse(localStorage.getItem('user')) || [];
    var url = Config.siteUrl+ "popup/practice.do?reqCode=loadPlayGround&token="+user.token;

    {/* https://triangles.edusquares.com/popup/practice.do?reqCode=loadPlayGround&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MzAyOSIsImp0aSI6IjQzMDI5IiwiaWF0IjoxNjEzOTk2NDcwLCJ1c2VybmFtZSI6IlMxIiwidXNlcl9lbWFpbCI6InN1cHBvcnRAY29uY2VwdHdhdmVzLmNvbSIsInJvbGVzIjpbIlN0YW5kYXJkU3R1ZGVudCJdfQ.4R7rfSkTcDjked7OOeVQ-KaXm2v-L5S0GfP7HhZYhhM */}

    return (
      <div className="testlist">
        {
          <Container fluid>
            <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
              <div className="">
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft }  onClick={() => this.routeChange('/dashboard')}/>
                </div>
                <h4> Play Ground </h4>
              </div>
              </div>
              <iframe  key="iframe100" class="iframe100" width="100%" title="Play Ground " src={url} title="iframe" id="my_iframe" sandbox="allow-same-origin allow-forms allow-scripts allow-modals allow-popups"></iframe>
          </Container>
        }
      </div>
    );
  }

}

export default PlayGround;
