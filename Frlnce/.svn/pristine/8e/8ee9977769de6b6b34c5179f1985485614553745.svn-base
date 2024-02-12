import React, { Component } from 'react';
import Config from "../../_config/config";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import './InstituteCardDetail.css';


class InstituteCardDetail extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log(this.props.location.state);
    }

    routeChange(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <div className="row-header header header-md">
                    <Button variant="button-md back-button" onClick={() => this.routeChange('/')} >
                        <FontAwesomeIcon icon={ faArrowLeft } />
                    </Button>                
                </div>
                <div className="instituteCardDetail app flex-row align-items-center">
                    <div className="institute-top" style={{background: `url(${Config.cover}) no-repeat transparent`,  backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div className="institute-top-logo" style={{background: `url(${Config.logo}) no-repeat transparent`, backgroundSize: '100%'}}></div>
                    <div className="institute-top-intro">
                    <h4>{this.props.location.state.card.name}</h4>
                    
                    </div>
                    <hr/>
                    <div className="tutorial-bottom" dangerouslySetInnerHTML={{__html: this.props.location.state.card.description}}>
                    </div>
                </div>
            </div>
        );
    }
}
export default InstituteCardDetail;