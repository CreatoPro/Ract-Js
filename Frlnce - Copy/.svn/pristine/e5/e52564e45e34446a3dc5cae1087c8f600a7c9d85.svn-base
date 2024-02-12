import React, { Component } from "react";
import video_icon from "../../_assets/imgs/stream.png";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Vdocipher from './vdocipher';

class VideoPlayer extends Component { 

	constructor(props) {
        super(props);        
    }
    
    componentDidMount() {
        //console.log("VideoPlayer -> componentDidMount()... ");
    }
    
    render() {
        return (  
            <>
                <div className="ilearn-full-height">
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody()}                    
                    </Container>
                </div>
            </>           
              
        );
    }

    renderHeader() {
        return (
            <div className="module-header">
                <div className={`module-header-inner blue-card`} >
                    <div className="back">
                        <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                    </div>
                    <img src={video_icon} alt="video icon" /> 
                </div>
                <div className="arrow-set">
                    <h4>Video Player</h4>                            
                </div>
            </div>
        )
    }
    
    renderBody() {
        return  (
            <div className="ilearn-padding-top center"> 
               <Vdocipher>

               </Vdocipher>
            </div>
        );
        
    } 
}


  
export default VideoPlayer;