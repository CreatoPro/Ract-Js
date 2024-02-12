import React, { Component } from "react";
import {connect} from "react-redux";
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import getProducts from './../../_actions/productActions';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
		return  <div className="Product card_list"> 
		{
		  this.props.product.map((item, index) => {
			if(item.id==this.props.match.params.id){
			  return ( 
				<div key={index}>
				  <div className="module-header-step2 blue-light-card">
				  <div className="back">
					<FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
				  </div>
				  <h4>{item.name}</h4>
				  </div><br /><br /><br />
				  <div className="card_list">{this.renderProduct(item.productList)}</div>
			  </div>
			  )
			}
		  })
		}
    </div>
  }
  
  
  renderProduct(productList){
	return <div>
	{
		productList.map((c, i) =>{
			return (
			  <Card key={i} onClick={() => this.routeProductDetail(c)}>
				<Card.Body>
				  <div className="cardbody product">
					<img src={c.imageUrl} alt={c.name} />
					<h4 className="head">{c.name}</h4>
					<button className="download green-card">₹ {c.cost}</button>
				  </div>
				</Card.Body>
			  </Card>
			)
		})
	}
	</div>
  }
  

routeProductDetail = (product) => {
    //console.log(JSON.stringify(card));
    this.props.history.push({
      pathname: '/ProductDetails',
      state: { product: product }});
  };

}

const mapStateToProps = state => ({
  product: state.product.product
});

const mapDispatchToProps = {
  getProducts: getProducts,
};


export default connect(mapStateToProps,mapDispatchToProps) (ProductList);
