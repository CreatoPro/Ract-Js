import React, { Component } from "react";
import {Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Config from './../../_config/config'

class LeaderBoard extends Component {
  constructor(props) {    
    super(props);
    console.log("LeaderBoard -> constructor()... ");
    console.log("LeaderBoard -> constructor(); Portlet : "+JSON.stringify(Config.CURRENT_PORTLET));
    if(!Config.CURRENT_PORTLET) {
      Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
    }
    this.state = {
      enquiryId : localStorage.getItem('enquiryId')+"",
      message: null,
      showLoading: true,
      rankDetails: []
    };
    //this.init = this.init.bind(this);
  }

  componentDidMount() {
    console.log("LeaderBoard -> componentDidMount()... ");
    this.init();
  }

  init() {
    console.log("LeaderBoard -> LeaderBoard()... ");    
    ApiService.getQuizLeaderBoard()
    .then((res) => {
      let respData = res.data.data;
      console.log("LeaderBoard -> init(); res : "+JSON.stringify(respData));
      this.setState({
        showLoading: false,
        rankDetails: respData.rankDetails
      });
    },
    error => { //ErrorCB
      console.log("LeaderBoard -> init() -> Connection Error : "+Config.CONNECTION_ERROR);
      this.setState({
        showLoading: false
      });
    });
  }
  
  render() {
    const _loadingText = 'Please wait...';
    return (
      <>
        <div className="ilearn-full-height page-quiz-zone">
          <Container fluid>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderLoader()}          
          </Container>
        </div>
      </>
    );
  }

  renderHeader() {
    console.log("LeaderBoard -> renderHeader()... ");
    return (
      <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
        <div className="back">
          <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
        </div>
        <h4>Leaderboard</h4>
      </div>
    );
  }

  renderBody() {
    console.log("LeaderBoard -> renderBody()... ");
    let _rankDetails = this.state.rankDetails;
    let _enquiryId = this.state.enquiryId;
    if(typeof(_rankDetails) !== 'undefined' || _rankDetails != null){	
    return (
      <>
        {
        !this.state.showLoading && 
        <div className="ilearn-padding-top">
          <Card className="mx-auto" style={{ maxWidth: '75rem' }}>
            <Card.Header className="leader-board-item">
              <div className="row leader-board-row">
                <div className="col leader-board-header-col leader-board-header-rank">
                  RANK
                </div>
                <div className="col leader-board-header-col">NAME</div>
                <div className="col leader-board-header-col leader-board-header-coins">
                  COINS
                </div>
              </div>
            </Card.Header>          
            <ul className="list-group list-group-flush">
            {
              _rankDetails.map((rankDetail, index) => {
                return ( 
              <li key={index}  className="list-group-item ilearn-item-border leader-board-item">
                <div className={`row leader-board-row ${rankDetail.enquiryId===_enquiryId? 'leaderboard-active-row' : ''}`}>
                  <div className="col col-rank-no-padding">
                    {rankDetail.rank==1 ?
                      <img src="./assets/imgs/gold-medal.png" style={{maxWidth: '32px', maxHeight: '32px'}}/>
                    : rankDetail.rank==2 ?
                    <img src="./assets/imgs/silver-medal.png" style={{maxWidth: '32px', maxHeight: '32px'}}/>
                    : rankDetail.rank==3 ?
                    <img src="./assets/imgs/bronze-medal.png" style={{maxWidth: '32px', maxHeight: '32px'}}/>
                    : <b>{rankDetail.rank}</b>
                    }
                  </div>
                  <div className="col col-photo">
                    <div className="leaderboard-photo">
                      <img style={{maxWidth: '100%', maxHeight: '100%'}} src={rankDetail.photo}/>
                    </div>
                  </div>
                  <div className="col col-name">{rankDetail.name}</div>
                  <div className="col col-coins">
                    <b>{rankDetail.totalCoins}</b>
                  </div>
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
  }

  renderLoader() {
    console.log("LeaderBoard -> renderLoader()... ");
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

export {LeaderBoard};
