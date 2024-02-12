import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./Analysis.css";
import analysis from "./images/analysis.png";
import doc from "./images/doc.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Loader from './../../_components/loader/loader';
import {getAnalysis} from './../../_actions/analysisActions';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.getAnalysis();
  }

  render() {
    console.log(this.props);
	let portlet = JSON.parse(localStorage.getItem('portlet'));
    const { loading } = this.state;
    return (
      <div className="Analysis">
        {
          <Container fluid>
              <div className="module-header">
                <div className= {`module-header-inner ${portlet.class ? portlet.class : 'orange-card'}`}>
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                  <img src={analysis} alt="analysis" /> 
                </div>
                <div className="arrow-set">
                  <h4>Test Performance</h4>
                </div>
              </div>
              {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
  }

  renderCard() {
	    //let data = this.props.analysis.courses;
		return  <div className="card_list"> 
		{
		  this.props.analysis.courses && 
		  this.props.analysis.courses.map((item, index) => {
			 return ( 
				 <Card key={index}>
						{ item.categories.map((c, i) =>
						  <div key={i} className="cardbody" onClick={() => this.routeChange(c,item.id)}>
							 <img src={doc} alt={c.name} />
						     <h4 className="head">{c.name}</h4>
						     <FontAwesomeIcon icon={ faArrowRight }  />
						  </div> 
						)}
				  </Card>
			  )
		  })
    }
    </div>
  }
  
  routeChange = (card,testId) => {
    this.props.history.push({
      pathname: '/test/list',
      state: { card: card,testId }});
  };

}

const mapStateToProps = state => ({
  analysis: state.analysis.analysis
});

const mapDispatchToProps = {
  getAnalysis: getAnalysis,
};;


export default connect(mapStateToProps,mapDispatchToProps) (Analysis);
