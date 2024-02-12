import React, { Component } from "react";
import "./ProductDetails.css";
import {Container, Card, Button} from "react-bootstrap";
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LearningSteps from '../learning/LearningSteps'
import ApiService from '../../_services/ApiService';
import Config from '../../_config/config';


class ProductDetails extends Component {  

	constructor(props) {
		super(props);
		if(!Config.CURRENT_PORTLET) {
			Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
		}
		this.state = {
			product:this.props.location.state.product,
			preOrderDetails: null
		};
	}

  	componentDidMount() {
		console.log(this.props.location.state.product);
		console.log("Product : ", this.state.product);
	}

  	routeChange(path) {
    	this.props.history.push(path);
	}
	  
	render() {
		return (
			<>
				<div className="ilearn-full-height page-product-details">
					<Container fluid>
						{this.renderHeader()}
						{this.renderBody()}         
					</Container>
				</div>
			</>
		);
	}

	renderHeader() {
		return (
		  <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
			<div className="back">
			  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
			</div>
			<h4>{this.state.product?.name}</h4>
		  </div>
		);
	}

	renderBody() {
		console.log("ProductDetails -> renderBody()... ");
		return (
			<> 
				{ this.state.product.previewLearningModuleId ? 
					this.renderLearningModule() : 
					this.renderProduct() 
				}
			</>
		);
		
		
	}

	renderProduct() {
		console.log("ProductDetails -> renderProduct()... ");
		return  (
			<>				
				<div className="ilearn-padding-top">
					<Card className="mx-auto" style={{ maxWidth: '50rem' }}>
						<Card.Img top width="100%" src={this.state.product.imageUrl} alt="Card image cap" />
						<Card.Body>
							<Card.Title><h4>{this.state.product.name}</h4></Card.Title>
							<Card.Text dangerouslySetInnerHTML={{__html:this.state.product.description}}></Card.Text>
							{this.renderBuyNow()}
						</Card.Body>
					</Card>
				</div>
			</>
		);	
	}

	renderBuyNow() {
		return (
			<>
				<Button type="button" className="btn btn-primary btn-lg btn-block" 
					onClick={() => this.buyNow()}>
					&#x20b9; {this.state.product.cost} &nbsp; &nbsp; Buy Now
				</Button>
			</>
		)
	}

	renderLearningModule() {
		console.log("ProductDetails -> renderLearningModule()... ");
		return  (
			<>
			    <div className="product_learning_module">
					<LearningSteps
						learnId={this.state.product.previewLearningModuleId}
						lock={true}
						history={this.props.history}
					/>
					{this.renderBuyNow()}
				</div>
				
			</>
		);
	}
	  
	buyNow() {
		console.log("ProductDetails -> buyNow()...");
		this.renderPreOrderAlert();
		/*ApiService.preOrderProduct(this.state.product.id)
            .then(res => {
                console.log("ProductDetails -> Pre Order Details : "+JSON.stringify(res.data));
				let resp = res.data;
				if(resp.result ==1 ) {
					this.renderPreOrderAlert(resp.data);
				}
				else {
					console.log("Error : "+resp.message);
				}
				
            },
            error => {
				console.log("ProductDetails -> Pre Order Details, Connection Error : "+Config.CONNECTION_ERROR);
            }
        );*/
		
	}

	renderPreOrderAlert() {
		console.log("ProductDetails -> renderPreOrderAlert()...");
		swal({
			title: "CONFIRM",
			text: "Product : "+this.state.product.name+"\n Price : Rs. "+this.state.product.cost ,
			buttons: ['CANCEL','MAKE PAYMENT'],
			dangerMode: true,
			className: 'PaymentConfirm'
			})
			.then(resp => { 
				if (resp) { // Yes else No
					console.log("ProductDetails -> Redirect CCAvenue Page...");
					this.makePayment();
				}
		    });
	}

	/*
	renderPreOrderAlert(orderDetails) {
		console.log("ProductDetails -> renderPreOrderAlert()...");
		swal({
			title: "ORDER DETAILS",
			text: "Order Id : "+orderDetails.orderNumber+"\n Price : Rs. "+orderDetails.amount ,
			buttons: ['CANCEL','MAKE PAYMENT'],
			dangerMode: true,
			})
			.then(resp => { 
				if (resp) { // Yes else No
					console.log("ProductDetails -> Redirect CCAvenue Page...");
					this.redirectToPaymentGateway(orderDetails);
				}
		    });
	}

	redirectToPaymentGateway(orderDetails) {
		//var paymentGatewayUrl="http://icegateinstitute.studentdetails.com/icegateacademy/paymentgateway/ccavRequestHandler.jsp";
		let paymentGatewayUrl=orderDetails.paymentGatewayURl;
		paymentGatewayUrl+="?merchant_id="+orderDetails.merchantId;
		paymentGatewayUrl+="&amount="+orderDetails.amount;
		paymentGatewayUrl+="&order_id="+orderDetails.orderNumber;
		paymentGatewayUrl+="&currency=INR";
		paymentGatewayUrl+="&redirect_url="+orderDetails.redirectUrl;
		paymentGatewayUrl+="&cancel_url="+orderDetails.cancelUrl;
		paymentGatewayUrl+="&language=EN";
		paymentGatewayUrl+="&workingKey="+orderDetails.workingKey;
		paymentGatewayUrl+="&accessCode="+orderDetails.accessCode;
		paymentGatewayUrl+="&merchant_param1="+orderDetails.productId;
		paymentGatewayUrl+="&merchant_param2="+orderDetails.verificationCode;
		console.log("ProductDetails -> PaymentGateway URL : "+paymentGatewayUrl);
		window.open(paymentGatewayUrl, '_blank', 'location=no');
	}*/

	makePayment() {
		console.log("MakePayment -> makePayment() : "+this.state.product.cost);
		let instituteHomeLink = Config.siteUrl; 
		if(localStorage.getItem('instituteHomeLink') && localStorage.getItem('instituteHomeLink')!=='undefined'){
			instituteHomeLink = "https://"+ localStorage.getItem('instituteHomeLink') +'/';
		}
		let paymentURL = instituteHomeLink +"popup/mobilePayment.do?reqCode=makePayment&enquiryId="+localStorage.getItem('enquiryId')+"&amountPaying="+this.state.product.cost+"&productId="+this.state.product.id;
		console.log(paymentURL);
		window.open(paymentURL, '_blank', 'location=no');
    }
  
}
  
export {ProductDetails};
