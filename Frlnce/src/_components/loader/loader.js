import React from "react";

class Loader extends React.Component {

  render() {
    return (
      <div className="loading2">
	     <span>
		   <div className="loading2-spinner">
		     <div className="loading2-spinner-inner">
			   <div></div>
			 </div>
		   </div> 
		   <div className="content">Loading...</div>
		 </span>
	   </div>
    );
  }
}

export default Loader