import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "./Learning.css";
import learningmodules from "./images/learningmodules.png";
import default_icon from "./images/learning_module_default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import ApiService from "../../_services/ApiService";
import Loader from "./../../_components/loader/loader";
import tile from "./images/tile.svg";
import list from "./images/list.svg";
import Utils from "../../_helpers/utils";
import swal from "sweetalert";

class Learning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      view: "grid",
      isMobile: true,
    };
    this.reloadLearningList = this.reloadLearningList.bind(this);
  }

  componentDidMount() {
    this.reloadLearningList();
    if (Utils.isMobileDevice()) {
      console.log("Ismobile.....");
      this.setState({
        view: "grid",
        isMobile: true,
      });
    } else {
      console.log("Ismobile Not.....");
      this.setState({
        view: "list",
        isMobile: false,
      });
    }
  }

  reloadLearningList() {
    this.setState({ loading: true }, () => {
      let portlet = JSON.parse(localStorage.getItem("portlet"));
      let typeId =
        portlet.params.resourceTypeId || this.props.match.params.typeId;
      let subTypeId =
        portlet.params.resourceSubTypeId || this.props.match.params.subTypeId;
      ApiService.fetchLearning(typeId, subTypeId).then((res) => {
        this.setState({
          loading: false,
          list: res.data,
        });
      });
    });
  }

  payCheck(path, card) {
    this.setState({ loading: true }, () => {
      let payLoad = {
        type: "lms",
      };
      ApiService.studentPayCheck(payLoad).then((res) => {
        this.setState({
          loading: false,
        });
        if (res.data.type == 2) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = res.data.message;
          swal({
            title: "Alert",
            content: wrapper,
            dangerMode: true,
            buttons: true,
            className: "blue-card",
          }).then((willResume) => {
            if (willResume) {
            }
          });
        } else {
          this.props.history.push({
            pathname: path,
            state: { card: card },
          });
        }
      });
    });
  }

  routeChange(path, card) {
    this.payCheck(path, card);
  }

  routeChange2(path, card) {
    this.props.history.push({
      pathname: path,
      state: { card: card },
    });
  }

  changeView(view) {
    this.setState({ view: view });
  }

  render() {
    console.log(this.props);
    const { loading } = this.state;
    let portlet = JSON.parse(localStorage.getItem("portlet"));
    localStorage.setItem("firstVisit", true);
    console.log(JSON.stringify(portlet));

    return (
      <div className="Learning">
        {
          <Container fluid>
            <div className="module-header">
              <div
                className={`module-header-inner ${
                  portlet.class ? portlet.class : "orange-card"
                }`}
              >
                <div className="back">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => this.routeChange2("/dashboard")}
                  />
                </div>
                <img src={learningmodules} alt="learning logo" />
              </div>

              <div className="arrow-set">
                {this.state.isMobile ? (
                  <div className="row">
                    <div className="col-10">
                      <h3>
                        {portlet.name
                          ? portlet.name
                          : this.props.match.params.title}
                      </h3>
                    </div>
                    <div className="col-2">
                      {this.state.view === "list" ? (
                        <img
                          alt="list"
                          src={tile}
                          className="border"
                          onClick={() => this.changeView("grid")}
                        />
                      ) : (
                        <img
                          alt="grid"
                          src={list}
                          className="border"
                          onClick={() => this.changeView("list")}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <h4>
                    {portlet.name
                      ? portlet.name
                      : this.props.match.params.title}
                  </h4>
                )}
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : this.state.view === "list" ? (
              this.renderList()
            ) : (
              this.renderGrid()
            )}
          </Container>
        }
      </div>
    );
  }

  renderList() {
    let portlet = JSON.parse(localStorage.getItem("portlet"));
    return (
      <div className="card_list">
        {this.state.list
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item, index) => {
            if (!item.icon) {
              item.icon = default_icon;
            }
            return (
              <Card
                key={index}
                onClick={() =>
                  this.routeChange("/lesson/steps/" + item.id + "/1", item)
                }
              >
                <Card.Body>
                  <div className="cardbody align-center">
                    <img src={item.icon} alt={item.name} />
                    <h4 className="head">{item.name}</h4>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        <>
          {portlet.buyNow && portlet.buyNow.enableStatus === true && (
            <Card onClick={() => this.buyNow()}>
              <Card.Body>
                <div className="cardbody">
                  <img src="/assets/imgs/products.png" alt="Buy Now" />
                  <h4 className="head">{portlet.buyNow.displayLabel}</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Card.Body>
            </Card>
          )}
        </>
      </div>
    );
  }

  renderGrid() {
    let portlet = JSON.parse(localStorage.getItem("portlet"));
    return (
      <div className="mobile_course_list">
        {this.state.list
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item, index) => {
            if (!item.icon) {
              item.icon = default_icon;
            }
            return (
              <div
                key={index}
                onClick={() =>
                  this.routeChange("/lesson/steps/" + item.id + "/1", item)
                }
              >
                <div className="row">
                  <div className="col-12">
                    <div className="course_box">
                      <div className="card">
                        <img
                          alt={item.name}
                          src={item.icon}
                          className="resposive-image"
                        />
                        <div className="head">
                          <p className="title">
                            <strong>{item.name}</strong>
                          </p>
                          <p className="light_blue">
                            Date : {item.creationDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <>
          {portlet.buyNow && portlet.buyNow.enableStatus === true && (
            <Card onClick={() => this.buyNow()}>
              <Card.Body>
                <div className="cardbody">
                  <img src="/assets/imgs/products.png" alt="Buy Now" />
                  <h4 className="head">{portlet.buyNow.displayLabel}</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Card.Body>
            </Card>
          )}
        </>
      </div>
    );
  }

  buyNow() {
    this.props.history.push("/Products");
  }
}

export default Learning;
