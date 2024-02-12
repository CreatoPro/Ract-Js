import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./Attendance.css";
import "./circle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Loader from './../../_components/loader/loader';
import getAttendance from './../../_actions/attendanceActions';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.getAttendance();
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
    console.log(this.props);
	let portlet = JSON.parse(localStorage.getItem('portlet'));
    const { loading } = this.state;
    return (
      <div className="Attendance">
        {
          <Container fluid>
		      <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
				  <div className="back">
					<FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
				  </div>
				  <h4>Attendance</h4>
              </div><br /><br />
			  {loading ?  <Loader />: this.renderCard()}   
          </Container>
        }
      </div>
    );
  }
  
  renderCard() {
		console.log(this.props.attendance.data);
		return  <div className="attendance card_list"> 
		{
           this.props.attendance.data && this.props.attendance.data.map((item, index) => {
			return (
			  <div>
				{ item.attendance.map((c, i) =>
				  <Card className={`card`} key={i}>
					<Card.Body>
					  <div className="cardbody">
					    <div className="half">
							<h4>{c.topic}</h4>
							<p>{item.name} [{item.year}]</p>
							<p><span className="topic">Active Days </span> <span className="activecount">{c.totalCount}</span></p>
							<p><span className="topic">Present</span> <span className="presentcount"> {c.presentCount}</span></p>
							<p><span className="topic">Absent</span> <span className="absentcount"> {c.absentCount}</span></p>
						 </div>
						 <div className="half">
						   <div className={`c100 small green p${Math.round(c.percentage)}`}>
								<span>{c.percentage}%</span>
								<div class="slice">
									<div class="bar"></div>
									<div class="fill"></div>
								</div>
							</div>
						 </div>
						 <div className={`absent`}><p><b>Absent on:</b> <br /> {c.absentDates}</p></div>
					  </div>
					  
					</Card.Body>
				  </Card>
				 )}
			   </div>
			)
        })
    }
    </div>
  }

}

const mapStateToProps = state => ({
  attendance: state.attendance.attendance
});

const mapDispatchToProps = dispatch => ({
  getAttendance: () => dispatch(getAttendance())
});


export default connect(mapStateToProps,mapDispatchToProps) (Attendance);
