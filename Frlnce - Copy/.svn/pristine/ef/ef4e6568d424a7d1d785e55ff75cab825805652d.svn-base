import React, { Component } from "react";
import {connect} from "react-redux";
import Parser from 'html-react-parser';
import "./Analysis.css";
import Card from 'react-bootstrap/Card'
import {getResource} from './../../_actions/resourceActions';
import Iframe from "../../_components/iframe/iframe";
import doc from "./images/doc.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight,faFile } from '@fortawesome/free-solid-svg-icons';

class AnalysisList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  routeChange(path) {
    this.props.history.push({pathname:path,state:{testId:this.props?.location?.state?.testId}});
  }

  render() {
	    let portlet = JSON.parse(localStorage.getItem('portlet'));
	    console.log(this.props.location.state);
		return  <div className="Analysis analysis_details card_list">  
				  <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
					  <div className="back">
						<FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
					  </div>
					  <h4>{this.props.location.state.card.name}</h4>
				  </div>
				  <div className="card">
				  {this.renderCard()}
				  </div>
               </div>
  }
  
  renderCard() {
		return  <div className="card_list"> 
		{
		  this.props.location.state.card.tests && 
		  this.props.location.state.card.tests.map((item, index) => {
			 return ( 
				  <div  key={index} className="cardbody" onClick={() => this.routeChange("/test/reports/"+ item.id)}>
				     <FontAwesomeIcon className="Book" icon={ faFile } /> 
					 <h4 className="head">{item.name}</h4>
					 <FontAwesomeIcon icon={ faArrowRight }  />
				  </div> 
			  )
		  })
       }
       </div>
  }

}


export default AnalysisList;
