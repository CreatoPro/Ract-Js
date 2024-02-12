import React, { Component } from "react";
import "./payments.css";
import payment_icon from "./images/payment.png";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronRight,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import ApiService from "../../_services/ApiService";
import { ILoader } from "./../../_components/iloader/iloader";
import Config from "./../../_config/config";

class Payments extends Component {
  constructor(props) {
    super(props);
    console.log("Payments -> constructor()... ");
    this.state = {
      message: null,
      showLoading: false,
      portlet: this.props.location.state.portlet,
      enrollmentData: [],
    };
  }

  componentDidMount() {
    console.log("Payments -> componentDidMount()... ");
    this.init();
  }

  init = () => {
    console.log("Payments -> init()... ");
    Config.CURRENT_PORTLET = this.state.portlet;
    this.setState({ showLoading: true }, () => {
      ApiService.getStudentEnrollements().then((res) => {
        console.log("Payments -> init(); res : " + JSON.stringify(res));
        if(res.data.enrollments.length === 1){
          const enrollment = res.data.enrollments[0];
          return this.skipToReceiptSeries(enrollment.courseCode,enrollment.enrollmentId)
        }
        this.setState({
          showLoading: false,
          enrollmentData: res.data,
        });
      });
    });
  };

  render() {
    console.log("Payments -> render()... ");
    return (
      <>
        <div className="ilearn-full-height page-payments">
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
    console.log("Payments -> renderHeader()... ");
    return (
      <div className="module-header">
        <div
          className={`module-header-inner ${this.props.location.state.portlet.class}`}
        >
          <div className="back">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={this.props.history.goBack}
            />
          </div>
          <img src={payment_icon} alt="payment icon" />
        </div>
        <div className="arrow-set">
          <h4>{this.state.portlet.name}</h4>
        </div>
      </div>
    );
  }

  skipToReceiptSeries = (courseCode, enrollmentId) => {
    console.log(courseCode, enrollmentId);
    this.props.history.replace({
      pathname: `/paymentReceipts`,
      state: { courseCode, enrollmentId },
    });
  };

  showReceiptSeries = (courseCode, enrollmentId) => {
    console.log(courseCode, enrollmentId);
    this.props.history.push({
      pathname: `/paymentReceipts`,
      state: { courseCode, enrollmentId },
    });
  };

  renderBody() {
    console.log("Payments -> renderBody()... ");
    const { enrollments } = this.state.enrollmentData;
    return (
      <div className="ilearn-padding-top">
        {enrollments?.map((enrollment, index) => {
          return (
            <div
              key={index}
              className="ilearn-padding-both-sides ilearn-padding-top"
            >
              <Card
                onClick={() =>
                  this.showReceiptSeries(
                    enrollment.courseCode,
                    enrollment.enrollmentId
                  )
                }
              >
                <Card.Body>
                  <div className="ilearn-item-block ">
                    <FontAwesomeIcon
                      className="ilearn-avatar payment-icon"
                      icon={faFileAlt}
                    />
                    <div className="ilearn-item-inner">
                      <h4>{enrollment.courseCode}</h4>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="lg"
                      color="gray"
                      className="float-right"
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }

  renderLoader() {
    console.log("Payments -> renderLoader()... ");
    const _loadingText = "Please wait...";
    return (
      <ILoader
        loadingText={_loadingText}
        isShow={this.state.showLoading}
      ></ILoader>
    );
  }

 

  toggleLoading = () => {
    console.log("Payments -> toggleLoading()... ");
    this.setState((state) => ({ showLoading: !state.showLoading }));
  };
}

export { Payments };
