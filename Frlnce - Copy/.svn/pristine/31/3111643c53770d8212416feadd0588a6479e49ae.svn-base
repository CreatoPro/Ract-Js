import React, { Component } from "react";
import "./payments.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form";
import {ILoader} from '../../_components/iloader/iloader';
import swal from 'sweetalert';
import Config from '../../_config/config'

class MakePayment extends Component { 

	constructor(props) {
        super(props);
        console.log("MakePayment -> constructor()... ");
        if(!Config.CURRENT_PORTLET) {
            Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
        }
        this.state = {
            message: null,
            showLoading: false,
            paymentDetail : this.props.location.state.paymentDetail,
            amountPaying : parseFloat(this.props.location.state?.paymentDetail?.currentOutstandingWithTaxRounded?.replace(/,/g, ''))
        };
    }
    
    componentDidMount() {
        console.log("MakePayment -> componentDidMount()... ");
    }
    
    render() {
        console.log("MakePayment -> render()... ");        
        return (  
            <>
                <div className="ilearn-full-height page-payments">
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderLoader()}                    
                    </Container>
                </div>
                {this.renderFooter()}
            </>           
              
        );
    }

    renderHeader() {
        console.log("MakePayment -> renderHeader()... ");
        return (
            <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
                <div className="back">
                <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                <h4>Make Payment</h4>
            </div>
        )
    }
    
    renderBody() {
        console.log("MakePayment -> renderBody()... ");
        let paymentDetail = this.state.paymentDetail;
        return (
            <>
                <div className="ilearn-padding-top">
                    <ul className="list-group">
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Total Outstanding</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetail?.symbol}`}} />{paymentDetail.totalOutstandingWithTaxRounded}</span>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Current Outstanding</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetail?.symbol}`}} />{paymentDetail.currentOutstandingWithTaxRounded}</span>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Amount Paying</span>
                                    <Form.Control type="text" placeholder="Amount" name="amountPaying" defaultValue={this.state.amountPaying} onChange={this.updateInput}/>                         
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        );        
    }
    
    renderFooter() {
        console.log("MakePayment -> renderFooter()... ");
        return ( 
            <>
            {
            this.state.amountPaying && this.state.amountPaying > 0 && 
            <div className="ilearn-footer">                    
                <Row>
                    <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.makePayment()}>
                        <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block" > 
                            <b>Make Payment</b> 
                        </button>
                    </Col>
                </Row>
            </div>
            }
            </>
        );
    }
    
    renderLoader() {
        console.log("MakePayment -> renderLoader()... ");
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    updateInput = (e) => {
        const v = e.target.value;
        const k = e.target.name;
        this.setState({k:v});
    }

    makePayment() {
        console.log("MakePayment -> makePayment() : "+this.state.amountPaying);
        if(parseInt(this.state.amountPaying)<=0) {
          this.showAlert("Alert", "Amount must be greater than 0.");
        }
        else if(parseInt(this.state.amountPaying) < parseFloat(this.state.paymentDetail.currentOutstandingWithTaxRounded.replace(/,/g, ''))) {
          this.showAlert("Alert", "Amount cannot be less than current outstanding.");
        }
        else if(parseInt(this.state.amountPaying) > parseFloat(this.state.paymentDetail.totalOutstandingWithTaxRounded.replace(/,/g, ''))) {
          this.showAlert("Alert", "Amount cannot be more than total outstanding.");
        }
        else {
            let paymentURL = Config.siteUrl+"popup/paymentGateway.do?reqCode=preCollectPaymentFromStudentPortal&enrollmentId="+this.state.paymentDetail.enrollmentId+"&receiptSeriesId="+this.state.paymentDetail.receiptSeriesId;
            this.openBrowser(paymentURL);
        }
    }

    showAlert(title, message) {
        swal({
            title: title,
            text: message,
            //icon: "success",
            button: "OK",
          })
          .then((value) => {
            console.log("Ok Clicked...");
        }); 
    }

    openBrowser(paymentGatewayUrl) {
        window.open(paymentGatewayUrl, '_blank', 'location=no');
    }

}


  
export {MakePayment};