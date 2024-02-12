import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import "./Product.css";
import payment from "./images/payment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Loader from "./../../_components/loader/loader";
import getProducts from "./../../_actions/productActions";
import Utils from "../../_helpers/utils";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      message: null,
      loading: false,
      view: "grid",
      isMobile: true,
    };
  }

  componentDidMount() {
    this.props.getProducts();
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

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
    console.log(this.props);
    const { loading } = this.state;
    return (
      <div className="Product">
        {
          <Container fluid>
            <div className="module-header">
              <div className="module-header-inner blue-light-card">
                <div className="back">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={this.props.history.goBack}
                  />
                </div>
                <img src={payment} alt="Products" />
              </div>
              <div className="arrow-set">
                <h4>Products</h4>
              </div>
            </div>
            {loading ? <Loader /> : this.renderCard()}
          </Container>
        }
      </div>
    );
  }

  renderCard() {
    console.log(this.props.product);
    return (
      <div className="card_list">
        {this.props.product &&
          this.props.product.map((item, index) => {
            return (
              <Card
                key={index}
                onClick={() =>
                  this.routeChange("/products/" + item.id + "/" + item.name)
                }
              >
                <Card.Body>
                  <div className="cardbody">
                    <img src={item.imageUrl} alt={item.name} />
                    <h4 className="head">{item.name}</h4>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
});

const mapDispatchToProps = {
  getProducts: getProducts,
};

/*const mapDispatchToProps = dispatch => ({
  getResource: () => dispatch(getResource())
});*/

export default connect(mapStateToProps, mapDispatchToProps)(Product);
