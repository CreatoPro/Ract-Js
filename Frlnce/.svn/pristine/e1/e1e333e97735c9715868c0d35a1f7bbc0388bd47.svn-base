import React, { Component } from "react";
//import {connect} from "react-redux";
import Parser from 'html-react-parser';
import "./Resource.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
//import {getResource} from './../../_actions/resourceActions';
import Iframe from "../../_components/iframe/iframe";
import swal from 'sweetalert';
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import VideoPlayer from "../../_components/video-player";
import XAPIUtils from "../xapi/xapiutils";

class ResourceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  loading: true,
	  resource:[]
	};
	this.fetchResources = this.fetchResources.bind(this);
  }

  componentDidMount() {
    //this.props.getResource(this.props.match.params.typeId,this.props.match.params.subTypeId);
	let paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
    let item =  params.get('item');
	 window.addEventListener('popstate', function() {
	 if(item==1){
	   window.history.pushState({}, '');
	   window.history.pushState(null, null, '/dashboard');
	   window.location.reload();
	 }
	});
	this.fetchResources();
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  fetchResources() {
    this.setState({ loading: true }, () => {
      ApiService.fetchResources(this.props.match.params.typeId,this.props.match.params.subTypeId)
      .then((res) => {
          this.setState({
            loading: false,
            resource: res.data
          });
      });
    });	
  }

  render() {
	    const { loading } = this.state;
	    var enquiryId = localStorage.getItem('enquiryId');
		if(loading==false && this.state.resource.length==0 ){
			  swal({
				title: "Alert",
				text: "Content not Available",
				dangerMode: true,
				className: this.props.location.state.portlet.class ? this.props.location.state.portlet.class : 'orange-card'
			  })
			  .then(exitExam => {
				 this.props.history.goBack();	
			  });
		}
		return  <div className="message_details"> 
		{
		  loading ?  <Loader />: this.renderCard()
		}
        </div>
  }

  renderCard() {
	var content = ""; var video =""; var pdf ="";
	return  <div className=""> 
	{
		this.state.resource && this.state.resource.map((item, index) => {
			if(item.id==this.props.match.params.id){
				XAPIUtils.track(item);
			
			if(this.props.match.params.typeId==16){
				if(item.url){ video = <div id="video_div"><VideoPlayer url={item.url} transcripts={[]} /></div> }
				content =  <div>
							{video}
							<div id="content">{Parser(item.description)}</div>
							</div>;
			}else if(this.props.match.params.typeId==13 || this.props.match.params.typeId==6){
				if(item.url){ pdf = <div id="Attachment"><a onClick={() => this.routeChange('/studyResource/' + this.props.match.params.typeId + '/' + this.props.match.params.subTypeId + '/pdf/' + item.id)}>VIEW ATTACHMENT</a></div> }
				content = <div>
							<div id="content">{Parser(item.description)}</div>
							{pdf}
							</div>;
			}else if(this.props.match.params.typeId==1){
				if(item.url){ pdf = <div id="Attachment"><a href={item.url} download >VIEW ATTACHMENT</a></div> }
				content = <div>
							<div id="content">{Parser(item.description)}</div>
							{pdf}
						</div>;
			}else if(this.props.match.params.typeId==5){
				var youtube = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
				var url = item.url
				if(url.match(youtube)){
					content = <div id="video_div"><VideoPlayer url={url} transcripts={[]} /></div>
				}else{
					content = <div><Iframe height="1000" url={url} /></div>					
				}
			}else if(this.props.match.params.typeId==3){
				var url =  "https://view.officeapps.live.com/op/embed.aspx?src=" + item.url;
				content = <div>
							<Iframe height="500" url={url} />
						</div>
			}else if(this.props.match.params.typeId==31){
				var url = item.url;
					if(url.includes("player")){
					url = item.url;
				}else{
					url = new URL(item.url);
					url = url.pathname.substring(1);
					url = url.substring(0, url.lastIndexOf("/") + 1);
					url = "https://player.vimeo.com/video/"+url;
				}
				content =   <div id="video_div"> <VideoPlayer url={url} transcripts={[]} /> </div> 
			}else if(this.props.match.params.typeId==30){
				content = <div>
							<div id="content">{item.name}
								<a href={item.url} style={{float:'right'}}>START MEETING</a>
							</div>
							<div>
								<span>{item.startDateTime}&nbsp;--&nbsp;{item.endDateTime}</span>
							</div>
						</div>
			}else{
				content = <div>
							<div id="content">No Resource Type Found!</div>
						  </div>;
			}
			
			let paramsString = this.props.location.search;
			const params = new URLSearchParams(paramsString);
			var len =  params.get('item');
			var back_url ="";
			if(len==1){
				back_url = <a href="/dashboard" className="text-white"><FontAwesomeIcon icon={ faArrowLeft } /></a> ;
			}else{
				back_url = <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} /> ;
			}
		
			return ( 
				<div key={index}>
				<div className={`module-header-step2 ${this.props.location.state ? this.props.location.state.portlet.class : 'orange-card'}`}>
				<div className="back">
					{back_url}
				</div>
				<h4>{item.name}</h4>
				</div>
				<Card className="no_border_lrt">
					<Card.Body>
					<div className="cardbody">
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

/*const mapStateToProps = state => ({
  resource: state.resource.resource
});

const mapDispatchToProps = {
  getResource: getResource,
};

export default connect(mapStateToProps,mapDispatchToProps) (ResourceDetails);

*/
export default ResourceDetails;
