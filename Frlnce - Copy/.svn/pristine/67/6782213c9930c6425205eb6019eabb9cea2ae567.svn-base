import React, { Component } from "react";
import "./Notification.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {ILoader} from './../../_components/iloader/iloader';
import { markNotificationsAsRead } from "./../../push-notification";


class Notification extends Component {
  constructor(props) {    
    super(props);
    //console.log("Notification -> constructor()... ");
    this.state = {
      notifications: [],
      message: null,
      showLoading: false
    };
  }

  componentDidMount() {
    //console.log("Notification -> componentDidMount()... ");
    this.init();
  }

  init() {
    //console.log("Notification -> init()... ");
    let notificationMsgs = localStorage.getItem('ilearn-notifications');
    this.setState(state => ({ notifications:  notificationMsgs?JSON.parse(notificationMsgs):[] }));
    markNotificationsAsRead();   
  }
  
  render() {
    const _loadingText = 'Please wait...';
    return (
      <>
        <Container fluid>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderLoader()}          
        </Container>
      </>
    );
  }

  renderHeader() {
    //console.log("Notification -> renderHeader()... ");
    return (
      <div className={`ilearn-plain-header blue-card`}>
        <div className="back">
          <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
        </div>
        <h4>Notifications</h4>
      </div>
    );
  }

  renderBody() {
    //console.log("Notification -> renderBody()... ");
    let _notifications = this.state.notifications;
    return  (
      <>
        <div className="ilearn-padding-top">
            {
                _notifications.sort((a, b) => b.messageId - a.messageId)
                .map((notification, index) => {
                    return ( 
                        <div key={index} className="ilearn-padding-both-sides ilearn-padding-top">
                            <Card>
                              {notification.picture?
                                <Card.Img variant="top" src={notification.picture} />
                                : ''}
                            <Card.Body>
                                <div className="ilearn-item-block notification-card">
                                    <p className={`notification-text ${notification.status == 0? 'notification-unread' : ''}`}>{notification.message}</p>
                                </div>
                                <Row>
                                  <Col className="text-right notification-date">
                                    {notification.receivedDate}
                                  </Col>
                                </Row>
                            </Card.Body>
                            </Card>
                        </div>
                    );
                })
            }
        </div>
      </>
    );
  }

  renderLoader() {
    //console.log("Notification -> renderLoader()... ");
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

export {Notification};
