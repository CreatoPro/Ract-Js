import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import stream from "./stream.png";
import Plays from './Components/Plays'
import GamePlaysInvitations from './Components/GamePlaysInvitations'
import CompletedGameDetails from './Components/CompletedGameDetails'
import UpcomingGameDetails from './Components/UpcomingGameDetails'
import OpenGameDetails from './Components/OpenGameDetails'
import RegisterGames from './Components/RegisterGames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Loader from './../../_components/loader/loader';
import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import './Components/styles.css'

class Games extends Component {
   constructor(props) {
    super(props);
    this.state = {
	  loading: false,
	  isMobile:true,
	  resource:[]
    };
	this.props = {
      loading: true,
	  resource: []
	};
  }

  componentDidMount() {

  }
  
  routeChange(path,data) {
    this.props.history.push({
      pathname: path,
      state: { portlet: data }});
  }

  render() {
    
	const { loading } = this.state;
	let icon = stream; 
  console.log(this.props);
  let color = this.props.location.state.portlet.class.split("-")[0]
  const enquiryId = localStorage.getItem("enquiryId")

  // let path = this.props.location.pathname
  // let comp = path[1].toUpperCase()+path.slice(2,-1)

		return (
      <div className="Message">
        {
		  loading ?  <Loader />:
          <Container fluid>
              <div className="module-header" style={{position:"sticky"}}>
                <div className={`module-header-inner ${this.props.location.state.portlet.class}`} >
               
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                  <img src={icon} alt={this.props.location.state.portlet.name} /> 
                </div>
                <div className="arrow-set">
                  <h2>{this.props.location.state.portlet.name}</h2>
                </div>
              </div>
              <Router>
                <Switch>
                  <Route exact path='/gamePlaysInvitations'>
                    <GamePlaysInvitations color={color}/>
                  </Route>
                  <Route path="/gamePlaysAll" exact >
                    <Plays color={color}/>
                  </Route>
                  <Route path='/gamePlaysCompleted' exact>
                    <CompletedGameDetails color={color} enquiryId={enquiryId}/>  
                  </Route>
                  <Route path="/gamePlaysOpen" exact>
                    <OpenGameDetails color={color} enquiryId={enquiryId}/>
                  </Route>
                  <Route path="/gamePlaysUpcoming" exact>
                    <UpcomingGameDetails color={color} enquiryId={enquiryId}/>
                  </Route>
                  <Route path="/gamePlaysRegistration" exact>
                    <RegisterGames color={color}/>
                  </Route>
                </Switch>
              </Router>
          </Container>
        }
      </div>
    );
  }


}

export default Games;
