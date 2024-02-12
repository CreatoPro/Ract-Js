import React, { Component } from "react";
import {connect} from "react-redux";
import "./Resource.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import {getResource} from './../../_actions/resourceActions';
import Iframe from "../../_components/iframe/iframe";
import { ReactReader } from '../../_components/epub';

const storage = global.localStorage || null

class ResourcePDFDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fullscreen: false,
      location:
        storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2,
      localFile: null,
      localName: null,
      largeText: false
    };
    this.rendition = null
  }
  
  componentDidMount() {
    this.props.getResource(this.props.match.params.typeId,this.props.match.params.subTypeId);
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  onLocationChanged = location => {
    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem('epub-location', location)
      }
    )
  }

  render() {
	  let portlet = JSON.parse(localStorage.getItem('portlet'));
	  var content ="";
		return  <div className="ebook_details card_list mt60"> 
		{
      this.props.resource.map((item, index) => {
        if(item.id==this.props.match.params.id){
          if(item?.url?.slice((item?.url?.lastIndexOf(".") - 1 >>> 0) + 2)=='pdf'){
          const url = window.location.protocol + "//" + window.location.host +"/assets/js/pdfjs-1.1.366/web/viewer.html?file="+item.url;
            content = <div> <Iframe url={url} title={item.name} class="iframe100" width="100%" /> </div>
          } else if(item?.url?.slice((item?.url?.lastIndexOf(".") - 1 >>> 0) + 2)=='epub'){
            const { location } = this.state
            content =
              <div>
                <div style={{ position: "relative", height: "100vh" }}>
                  <ReactReader 
                    url= {item.url}
                    title={item.name}
                    location={location}
                    locationChanged={this.onLocationChanged}
                    getRendition={this.getRendition}
                  />
               </div>
             </div>
          }
          return ( 
            <div key={index}>
              <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
              <div className="back">
                <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
              </div>
              <h4>{item.name}</h4>
              </div>
              <Card>
                <Card.Body>
                  <div className="">
					          {content}
                  </div>
                </Card.Body>
              </Card>
          </div>
          )
        }
      })
    }
    </div>
  }

}

const mapStateToProps = state => ({
  resource: state.resource.resource
});

const mapDispatchToProps = {
  getResource: getResource,
};


export default connect(mapStateToProps,mapDispatchToProps) (ResourcePDFDetails);
