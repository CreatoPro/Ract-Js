import React from "react";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import payment_icon from "./images/payment.png";
import Config from './../../_config/config'
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';




class RecieptSeries extends React.Component{
    constructor(){
        super();
        if(!Config.CURRENT_PORTLET) {
            Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
        }
        this.state = {
            courseCode: '',
            enrollmentId: null,
            recieptSeries: {},
            showLoading: true
        }
    }

    componentDidMount(){
        const {enrollmentId,courseCode} = this.props.location.state
        ApiService.getRecieptSeries(enrollmentId)
        .then((res)=>{
            this.setState({recieptSeries:res.data,showLoading:false,enrollmentId,courseCode},()=>{
                console.log(this.state);
            });
            if(res.data.data.length===1){
                const reciept = res.data.data[0];
                return this.skipToPaymentDetail(reciept.name,reciept.id)
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

    skipToPaymentDetail = (recieptName,recieptId)=> {
        const {enrollmentId,courseCode} = this.state;
        let path = "/paymentDetail";
        this.props.history.replace({
            pathname: path,
            state: { recieptName,recieptId, enrollmentId, courseCode }
        });
      }

    showPaymentDetail= (recieptName,recieptId)=> {
      const {enrollmentId,courseCode} = this.state;
      let path = "/paymentDetail";
      this.props.history.push({
          pathname: path,
          state: { recieptName,recieptId, enrollmentId, courseCode }
      });
    }

    renderBody =()=> {
        const {data: recieptData} = this.state.recieptSeries;
        return  (
            <div className="ilearn-padding-top"> 
                {
                    recieptData?.map((reciept, index) => {
                        return ( 
                            <div key={index} className="ilearn-padding-both-sides ilearn-padding-top">
                                <Card onClick={() => this.showPaymentDetail(reciept.name,reciept.id)}>
                                <Card.Body>
                                    <div className="ilearn-item-block ">
                                        <FontAwesomeIcon className="ilearn-avatar payment-icon" icon={ faFileAlt }/>
                                        <div className="ilearn-item-inner">
                                            <h4>{reciept.name}</h4>
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

export default RecieptSeries;