import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Learning.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import { ReactReader } from '../../_components/epub';

class LearningPDFDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
    };
    this.reloadLearningStepAttachmentDetailsList = this.reloadLearningStepAttachmentDetailsList.bind(this);
  }

  componentDidMount(){
    //console.log(this.props);
    this.reloadLearningStepAttachmentDetailsList();
  }

  reloadLearningStepAttachmentDetailsList() {
    this.setState({ loading: true }, () => {
      ApiService.fetchLearningStepAttachments(this.props.match.params.id)
      .then((res) => {
          this.setState({
            loading: false,
            list: res.data.attachments
          });
      });
    });	
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="LearningAttachment">
        {
          <Container fluid>
              {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
  }

  renderCard() {
	let portlet = JSON.parse(localStorage.getItem('portlet'));
    let content = "";
		return  <div className="card_list"> 
		{
      this.state.list.map((item, index) => {
        if(item.id==this.props.match.params.resourceId){
          if(item.type==="e-book" ||item.type==="book" ){
            if(item?.url?.slice((item?.url?.lastIndexOf(".") - 1 >>> 0) + 2)=='pdf'){
              const url = window.location.protocol + "//" + window.location.host +"/assets/js/pdfjs-1.1.366/web/viewer.html?file="+item.url;
              content = <div> <iframe title={item.name} class="iframe100" width="100%" src={url}></iframe></div>
            } else if(item?.url?.slice((item?.url?.lastIndexOf(".") - 1 >>> 0) + 2)=='epub'){
                const { location } = this.state
                content =
                  <div>
                    <div style={{ position: "relative", height: "100vh" }}>
                      <ReactReader 
                        url= {item.url}
                        title={item.name}
                        location={location}
                        locationChanged={this.onLocationChanged}
                        getRendition={this.getRendition}
                      />
                   </div>
                 </div>
            }
          }
          return (
              <div key={index}>
                <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                <h4>{item.name}</h4>
                </div>
                <Card>
                  <Card.Body>
                    <div className="">
                      {content} 
                    </div>
                  </Card.Body>
                </Card>
              </div>
          )
        }
      })
    }
    </div>
  }

}

export default LearningPDFDetails;
