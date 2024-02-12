import React from "react";
import RingLoader from 'react-spinners/RingLoader'
import "./iloader.css";

class ILoader extends React.Component {

  render() {
    return (this.props.isShow ?  this.renderLoading(): "");
  }

  renderLoading() {    
    return ( 
          this.props.loaderStyle=="dark" ?
            <div className="loading blue">
                <div className="content">{this.props.loadingText} <br /> <a><i></i><i></i><i></i></a></div>
                
            </div> :
            <div className="loading">
                <span>
                  <RingLoader color={"#1d7ed5"}/>
                  <div className="content">{this.props.loadingText}</div>
                </span>
            </div> 
    );
  }
}

export {ILoader}