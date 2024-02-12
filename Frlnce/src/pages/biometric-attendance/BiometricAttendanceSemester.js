import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./BiometricAttendance.css";
import "./circle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Loader from './../../_components/loader/loader';

class BiometricAttendanceSemester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
 
  componentDidMount() {
        console.log(this.props.location.state);
  }

  render() {
	let portlet = JSON.parse(localStorage.getItem('portlet'));
    const { loading } = this.state;
    return (
      <div className="BiometricAttendance">
        {
          <Container fluid>
		      <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
				  <div className="back">
					<FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
				  </div>
				  <h4>{this.props.location.state.card.semesterName}</h4>
              </div><br /><br />
			  {loading ?  <Loader />: this.renderCard()}   
          </Container>
        }
      </div>
    );
  }
  
  renderCard() {
	    var data ="";
		data = this.props.location.state.card.monthWiseData;
		var months = [ "Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		return  <div className="attendance card_list"> 
		{
	
			this.props.location.state.card.monthWiseData && data.map((item, index) => {
		     return ( 
			     <Card className={`card`} key={index} onClick={() =>this.routeChange(item)}>
					<Card.Body>
					  <div className="cardbody">
					    <div className="half">
							<h4>{months[item.startMonth]} {item.startYear}</h4>
							<p><span className="topic">Active Days </span> <span className="activecount">{item.activeDays}</span></p>
							<p><span className="topic">Present</span> <span className="presentcount"> {item.presents}</span></p>
							<p><span className="topic">Absent</span> <span className="absentcount"> {item.absent}</span></p>
						 </div>
						 <div className="half">
						   <div className={`c100 small green p${Math.round(item.presentPercentage)}`}>
								<span>{item.presentPercentage}%</span>
								<div class="slice">
									<div class="bar"></div>
									<div class="fill"></div>
								</div>
							</div>
						 </div>
						 <div className={`absent`}><p><b>Absent on:</b> <br /> {item.absentOn}</p></div>
					  </div>
					</Card.Body>
				 </Card>
			  )
			})
        }
       </div>
  }
}


export default BiometricAttendanceSemester;
