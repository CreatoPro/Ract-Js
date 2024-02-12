import React, { Component } from "react";
import "./payments.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHistory} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import swal from 'sweetalert';
import Config from './../../_config/config'

class PaymentDetail extends Component { 

	constructor(props) {
        super(props);
        console.log("PaymentDetail -> constructor()... ");
        if(!Config.CURRENT_PORTLET) {
            Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
        }
        this.state = {
            message: null,
            showLoading: false,
            courseCode : '',
            receiptName : '',
            paymentDetails: {},
            enrollmentId: null,
            receiptId: null
        };
    }
    
    componentDidMount() {
        console.log("PaymentDetail -> componentDidMount()... ");
        this.init();
    }
    
    init() {
        const {enrollmentId, receiptId,courseCode,receiptName} = this.props.location.state;
        console.log("PaymentDetail -> init()... ");
        this.setState({ showLoading: true }, () => {
            ApiService.getPaymentDetails(enrollmentId,receiptId)
            .then((res) => {
              console.log("PaymentDetail -> init(); res : "+JSON.stringify(res));
              this.setState({
                paymentDetails : res.data,
                showLoading: false,
                enrollmentId,
                receiptId,
                courseCode,
                receiptName
              });
            });
        });
    }
    
    render() {
        console.log("PaymentDetail -> render()... ");        
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
        console.log("PaymentDetail -> renderHeader()... ");
        const {courseCode,receiptName} = this.state;
        return (
            <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
                <div className="back">
                <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                <h4>{`${courseCode}-${receiptName}`}</h4>
            </div>
        )
    }
    
    renderBody() {
        console.log("PaymentDetail -> renderBody()... ");
        let paymentDetails = this.state.paymentDetails?.data;
        console.log(paymentDetails);
        return (
            <>
                <div className="ilearn-padding-top">
                    <ul className="list-group">
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Total Fee</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} /> {paymentDetails?.totalFee}</span>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Discount</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.discount}</span>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Total Paid</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.totalFeePaidWithTax}</span>
                                    <p className="payment-desc">Fee: <div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.totalFeePaid} {paymentDetails?.totalTaxPaid!=='0'&& '+ Tax:' + <><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.totalTaxPaid} </>} </p>
                                </div>
                            </div>
                        </li>
                        {/* <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Total Outstanding</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.totalOutstandingWithTaxRounded}</span>
                                    <p className="payment-desc">Fee: <div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.totalOutstandingAmount} + Tax: <div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.totalOutstandingTax}</p>
                                </div>
                            </div>
                        </li> */}
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Current Outstanding</span>
                                    <span className="float-right"><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.currentOutstandingWithTaxRounded}</span>
                                    <p className="payment-desc">Fee: <div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} />{paymentDetails?.currentOutstandingAmount}  {paymentDetails?.currentOutstandingTax!=='0' && ' + Tax: ' + <><div style={{display: 'contents'}} dangerouslySetInnerHTML={{__html: `${paymentDetails?.symbol}`}} /> {paymentDetails?.currentOutstandingTax}</>} </p>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item payment-detail-item" >
                            <div className="ilearn-item-block ">
                                <div className="ilearn-item-inner">
                                    <span>Next Due Date</span>
                                    <span className="float-right">{paymentDetails?.nextDueDate}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <button type="button" className="btn btn-fab btn-success" data-placement="left" title="Pay" onClick={( ) => this.makePayment() /*this.payNow()*/}> 
                    Pay Now 
                </button>
            </>
        );        
    }
    
    renderFooter() {
        console.log("PaymentDetail -> renderFooter()... ");
        console.log(this.state.paymentDetails.totalFeePaid);
        let paymentDetails = this.state.paymentDetails?.data;
        return ( 
            <>
            {
            paymentDetails && parseFloat(paymentDetails.totalFeePaid.replace(/,/g, '')) > 0 && 
            <div className="ilearn-footer">                    
                <Row>
                    <Col className="ilearn-footer-col ilearn-blue-btn" onClick={() => this.showHistory()}>
                        <button className="btn ilearn-blue-btn ilearn-footer-btn btn-block" > 
                            <FontAwesomeIcon icon={ faHistory }  size = 'lg' color='#fff'/> &nbsp;
                            <b>History</b> 
                        </button>
                    </Col>
                </Row>
            </div>
            }
            </>
        );
    }
    
    renderLoader() {
        console.log("PaymentDetail -> renderLoader()... ");
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    showHistory() {
        let paymentDetails = this.state.paymentDetails?.data;
        console.log("PaymentDetail -> showHistory()... ");
        let path = "/paymentHistory";
        this.props.history.push({
            pathname: path,
            state: { "paymentDetail": paymentDetails}
        });    
    }

    payNow() {
        let paymentDetails = this.state.paymentDetails?.data;
        console.log("PaymentDetail -> payNow()... "+paymentDetails.pdcCoverage);
        if(parseFloat(paymentDetails.pdcCoverage)>0) {
            this.showAlert("Alert", paymentDetails.pdcCoverageErrorMsg);
        }
        else {
            let path = "/makePayment";
            this.props.history.push({
                pathname: path,
                state: { "paymentDetail": paymentDetails}
            });
        }
    }

    makePayment() {
        const paymentDetails = this.state.paymentDetails.data;
        const amountPaying = parseFloat(paymentDetails.currentOutstandingWithTaxRounded.replace(/,/g, ''));
        console.log(amountPaying,parseFloat(paymentDetails.currentOutstandingWithTaxRounded.replace(/,/g, '')),parseFloat(paymentDetails.totalOutstandingWithTaxRounded.replace(/,/g, '')))
        if(parseInt(amountPaying)<=0) {
          this.showAlert("Alert", "Amount must be greater than 0.");
        }
        else if(parseInt(amountPaying) < parseFloat(paymentDetails.currentOutstandingWithTaxRounded.replace(/,/g, ''))) {
          this.showAlert("Alert", "Amount cannot be less than current outstanding.");
        }
        else if(parseInt(amountPaying) > parseFloat(paymentDetails.totalOutstandingWithTaxRounded.replace(/,/g, ''))) {
          this.showAlert("Alert", "Amount cannot be more than total outstanding.");
        }
        else {
            let paymentURL = Config.siteUrl+"popup/paymentGateway.do?reqCode=preCollectPaymentFromStudentPortal&enrollmentId="+this.state.enrollmentId+"&receiptSeriesId="+this.state.receiptId;
            this.openBrowser(paymentURL);
        }
    }

    openBrowser(paymentGatewayUrl) {
        window.open(paymentGatewayUrl, '_blank', 'location=no');
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

}


  
export {PaymentDetail};