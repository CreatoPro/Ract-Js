import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./BiometricAttendance.css";
import "./circle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Loader from './../../_components/loader/loader';
import getBiometricAttendance from './../../_actions/bioMetricAttendanceActions';

class BiometricAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.getBiometricAttendance();
  }
  
  routeChange = (card) => {
    this.props.history.push({
      pathname: '/bioMetricAttendance/semester',
      state: { card: card }});
  };

  render() {
    console.log(this.props);
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
				  <h4>Biometric Attendance</h4>
              </div><br /><br />
			  {loading ?  <Loader />: this.renderCard()}   
          </Container>
        }
      </div>
    );
  }
  
  renderCard() {
	    var data ="";
		if(this.props.biometricattendance.data){
		  data = JSON.parse(this.props.biometricattendance.data);
		  console.log(data);
		}
		
		return  <div className="attendance card_list"> 
		{
	
			this.props.biometricattendance.data && data.map((item, index) => {
		     return ( 
			     <Card className={`card`} key={index} onClick={() =>this.routeChange(item)}>
					<Card.Body>
					  <div className="cardbody">
					    <div className="half">
							<h4>{item.semesterName}</h4>
							<p><span className="topic">Active Days </span> <span className="activecount">{item.totalData.activeDays}</span></p>
							<p><span className="topic">Present</span> <span className="presentcount"> {item.totalData.presents}</span></p>
							<p><span className="topic">Absent</span> <span className="absentcount"> {item.totalData.absent}</span></p>
						 </div>
						 <div className="half">
						   <div className={`c100 small green p${Math.round(item.totalData.presentPercentage)}`}>
								<span>{item.totalData.presentPercentage}%</span>
								<div class="slice">
									<div class="bar"></div>
									<div class="fill"></div>
								</div>
							</div>
						 </div>
					  </div>
					</Card.Body>
				 </Card>
			  )
			})
        }
       </div>
  }
}

const mapStateToProps = state => ({
  biometricattendance: state.biometricattendance.biometricattendance
});

const mapDispatchToProps = dispatch => ({
  getBiometricAttendance: () => dispatch(getBiometricAttendance())
});


export default connect(mapStateToProps,mapDispatchToProps) (BiometricAttendance);
