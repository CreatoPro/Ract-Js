import React, { Component } from "react";
import "./payments.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHistory} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Config from './../../_config/config'

class PaymentHistory extends Component { 

	constructor(props) {
        super(props);
        console.log("PaymentHistory -> constructor()... ");
        if(!Config.CURRENT_PORTLET) {
            Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
        }
        this.state = {
            message: null,
            showLoading: false,
            paymentDetail : this.props.location.state.paymentDetail,
            paymentTransactions: []
        };
    }
    
    componentDidMount() {
        console.log("PaymentHistory -> componentDidMount()... ");
        this.init();
    }
    
    init() {
        console.log("PaymentHistory -> init()... ");
        this.setState({ showLoading: true }, () => {
            ApiService.getPaymentHistory(this.state.paymentDetail.enrollmentId)
            .then((res) => {
              console.log("PaymentHistory -> init(); res : "+JSON.stringify(res));
              this.setState({
                showLoading: false,
                paymentTransactions : res.data
              });
            });
        });
    }
    
    render() {
        console.log("PaymentHistory -> render()... ");        
        return (  
            <>
                <div className="ilearn-full-height page-payments">
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderLoader()}                    
                    </Container>
                </div>
            </>           
              
        );
    }

    renderHeader() {
        console.log("PaymentHistory -> renderHeader()... ");
        return (
            <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
                <div className="back">
                <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                <h4>Payment History</h4>
            </div>
        )
    }
    
    renderBody() {
        console.log("PaymentHistory -> renderBody()... ");
        let transactions = this.state.paymentTransactions;
        return (
            <>
        {
        !this.state.showLoading && 
        <div className="ilearn-padding-top">
          <Card className="mx-auto" style={{ maxWidth: '75rem' }}>
            <Card.Header className="payment-history-item" style={{paddingLeft:'0px', paddingRight:'0px'}}>
              <div className="row payment-history-row">
                <div className="col payment-history-col payment-history-header" style={{paddingLeft:'10px'}}> SNo. </div>
                <div className="col payment-history-col payment-history-header">Date</div>
                <div className="col payment-history-col payment-history-header" style={{textAlign:'right', paddingRight:'10px'}}> Amount Paid </div>
              </div>
            </Card.Header>          
            <ul className="list-group list-group-flush">
            {
              transactions.map((transaction, index) => {
                return ( 
              <li key={index}  className="list-group-item ilearn-item-border payment-history-item">
                <div className={`row payment-history-row}`}>
                  <div className="col payment-history-col" style={{paddingLeft:'15px'}}>
                    {index+1}
                  </div>
                  <div className="col payment-history-col">
                    {transaction.paymentDate}
                  </div>
                  <div className="col payment-history-col" style={{textAlign:'right', paddingRight:'15px'}}>{transaction.amountPaidWithTax}</div>
                </div>      
              </li>
                );
              })
            }
            </ul>
          </Card>
        </div>
        }
      </>
        );        
    }
    
    renderFooter() {
        console.log("PaymentHistory -> renderFooter()... ");
        return ( 
            <>
            {
            this.state.paymentDetails && this.state.paymentDetails.totalFeePaid > 0 && 
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
        console.log("PaymentHistory -> renderLoader()... ");
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }
}
  
export {PaymentHistory};