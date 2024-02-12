import React, { Component } from "react";
import "./Refer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import referbanner from "./images/refer-banner.png";
import gift from "./images/gift.png";
import giftflip from "./images/gift-flip.png";

class Refer extends Component {
  constructor(props) {
    super(props);
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
	  let portlet = JSON.parse(localStorage.getItem('portlet'));
	  return ( 
		<div className="Refer mt60 card_list"> 
		  <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
		  <div className="back">
			<FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
		  </div>
		  <h4>Refer a friend</h4>
		  </div>
		  <Card className="mh220">
			<Card.Body>
			  <div className="cardbody">
			    <img src={referbanner} alt="refer banner" className="referbanner"/> 
			  </div>
			</Card.Body>
		  </Card>
		  <Card className="cardgift">
			<Card.Body>
			  <div className="cardbody">
				<p>Earn <span className="pink">Reward Points</span> for every <span className="green">Enrolled Student</span></p>
			    <img src={gift} alt="refer banner" className="gift"/> 
				<img src={giftflip} alt="refer banner" className="giftflip"/> 
			  </div>
			</Card.Body>
		  </Card>
		  <button className="btn refernow" onClick={() => this.routeChange('/refer/details')}> REFER NOW</button>
	  </div>
	  )
  }

}



export default Refer;
