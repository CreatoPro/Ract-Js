import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import payment_icon from "./images/payment.png";
import Config from './../../_config/config'
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';




class ReceiptSeries extends React.Component{
    constructor(){
        super();
        if(!Config.CURRENT_PORTLET) {
            Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
        }
        this.state = {
            courseCode: '',
            enrollmentId: null,
            receiptSeries: {},
            showLoading: true
        }
    }

    componentDidMount(){
        const {enrollmentId,courseCode} = this.props.location.state
        ApiService.getReceiptSeries(enrollmentId)
        .then((res)=>{
            this.setState({receiptSeries:res.data,showLoading:false,enrollmentId,courseCode},()=>{
                console.log(this.state);
            });
            if(res.data.data.length===1){
                const receipt = res.data.data[0];
                return this.skipToPaymentDetail(receipt.name,receipt.id)
            }
        })
    }

    renderHeader =()=> {
        return (
            <div className="module-header">
                <div className={`module-header-inner ${Config.CURRENT_PORTLET.class}`} >
                    <div className="back">
                        <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                    </div>
                    <img src={payment_icon} alt="payment icon" /> 
                </div>
                <div className="arrow-set">
                    <h4>{this.state.courseCode}</h4>                            
                </div>
            </div>
        )
    }

    skipToPaymentDetail = (receiptName,receiptId)=> {
        const {enrollmentId,courseCode} = this.state;
        let path = "/paymentDetail";
        this.props.history.replace({
            pathname: path,
            state: { receiptName,receiptId, enrollmentId, courseCode }
        });
      }

    showPaymentDetail= (receiptName,receiptId)=> {
      const {enrollmentId,courseCode} = this.state;
      let path = "/paymentDetail";
      this.props.history.push({
          pathname: path,
          state: { receiptName,receiptId, enrollmentId, courseCode }
      });
    }

    renderBody =()=> {
        const {data: receiptData} = this.state.receiptSeries;
        return  (
            <div className="ilearn-padding-top"> 
                {
                    receiptData?.map((receipt, index) => {
                        return ( 
                            <div key={index} className="ilearn-padding-both-sides ilearn-padding-top">
                                <Card onClick={() => this.showPaymentDetail(receipt.name,receipt.id)}>
                                <Card.Body>
                                    <div className="ilearn-item-block ">
                                        <FontAwesomeIcon className="ilearn-avatar payment-icon" icon={ faFileAlt }/>
                                        <div className="ilearn-item-inner">
                                            <h4>{receipt.name}</h4>
                                        </div>
                                        <FontAwesomeIcon icon={ faChevronRight }  size = 'lg' color="gray" className="float-right"/>
                                    </div>
                                </Card.Body>
                                </Card>
                            </div>
                        );
                    })
                }
            </div>
        );
        
    } 
    
    renderLoader =()=> {
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    render(){
        return<div>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderLoader()}
        </div> 
    }


}

export default ReceiptSeries;