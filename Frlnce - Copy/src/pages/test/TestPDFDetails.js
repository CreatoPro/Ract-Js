import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from './../../_components/loader/loader';
import swal from 'sweetalert';

class TestPDFDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
    };
  }

  componentDidMount(){
    //console.log(this.props);
  }

  
  onFileUpload = () => { 
    swal({
      title: "Success",
      text: "Successfully uploaded your answer sheet. Thank you.",
      dangerMode: false,
     })
     .then(exit => {
        this.props.history.push({ pathname: '/dashboard'})
     });
  };

  onFileUploadCancel = () => { 
    var testId = this.props.match.params.id;
    this.props.history.push({ pathname: '/test/upload/'+ testId, state: { testEndTime: 0}})
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="testlist">
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
    console.log(this.props.location.state.pdfpreview);
    let content = "";
    if(this.props.location.state.pdfpreview){
      let pdfurl = this.props.location.state.pdfpreview;
      const url = window.location.protocol + "//" + window.location.host +"/assets/js/pdfjs-1.1.366/web/viewer.html?file="+pdfurl;
      content = <div> <iframe title="pdf" height="500" width="100%" src={url}></iframe></div>
    }
		return  <div className="card_list"> 
    {         
        <div>
          <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
          <h4>Finalise Submit</h4>
          </div>
          <Card>
            <Card.Body>
              <div className="cardbody">
                {content} 
              </div>
            </Card.Body>
          </Card>
          {this.renderFooter()}
        </div>
    }
    </div>
  }

  renderFooter() {
    console.log("QuizZone -> renderFooter()... ");
    return ( 
        <div className="ilearn-footer">                    
            <Row>
                <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.onFileUpload()}>
                    <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block" > 
                        <b>Submit</b> 
                    </button>
                </Col>
                <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.onFileUploadCancel()}>
                    <button className="btn btn-danger ilearn-footer-btn btn-block" > 
                        <b>Cancel</b> 
                    </button>
                </Col>
            </Row>
        </div>
    );
  }

}

export default TestPDFDetails;
