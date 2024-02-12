import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./Resource.css";
import announcement from "./images/announcement.png";
import download from "./images/downloads.png";
import ebook from "./images/ebook.png";
import stream from "./images/stream.png";
import reference from "./images/reference.png";
import message from "./images/message.png";
import feedbackform from "./images/feedbackform.png";
import doc from "./images/doc.png";
import download2 from "./images/download2.png";
import reference2 from "./images/reference2.png";
import video from "./images/video.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Loader from './../../_components/loader/loader';
import {getResource} from './../../_actions/resourceActions';
import { faSearch,faVideo } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import Parser from 'html-react-parser';
import { StudyResourceType } from "../../_constants/studyResourceTypes";

class Resource extends Component {
   constructor(props) {
    super(props);
    this.state = {
	  loading: true,
	  isMobile:true,
	  resource:[]
    };
	this.props = {
      loading: true,
	  resource: []
	};
	this.fetchResources = this.fetchResources.bind(this);
  }

  componentDidMount() {
	//this.props.getResource(this.props.match.params.typeId,this.props.match.params.subTypeId);
	
	// device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        this.setState({
          isMobile:true
        });
    }else{
      this.setState({
        isMobile:false
      });
	}
	this.fetchResources();
  }

  fetchResources() {
    this.setState({ loading: true }, () => {
      ApiService.fetchResources(this.props.match.params.typeId,this.props.match.params.subTypeId)
      .then((res) => {
		  console.log(res.data);
          this.setState({
            loading: false,
            resource: res.data
          });
      });
    });	
  }
  
  routeChange=(path,data,studyResource)=> {
	  let typeId = parseInt(this.props.match.params.typeId);
	  console.log("here");
	  if(typeId===16){
		  console.log("data--->",studyResource);
		  console.log(this.state.resource);
		  this.props.history.push({pathname:'/shaka',state:{selectedVideo: studyResource}});
		//   this.props.history.push('/shaka');
		
	  }else{
		  this.props.history.push({
			pathname: path,
			state: { portlet: data }});
	  }
	// this.routeChange('/studyResource/' + this.props.match.params.typeId + '/' + this.props.match.params.subTypeId + '/details/' + item.id, this.props.location.state.portlet)} >
    //this.props.history.push(path);	
  }

  displayStudyResource=(studyResource)=> {
	//console.log("displayStudyResource..."+JSON.stringify(studyResource));
	let typeId = parseInt(this.props.match.params.typeId);
	let subTypeId = this.props.match.params.subTypeId;
	let _path = '';
	let data = {portlet: this.props.location.state.portlet};
	if(typeId===StudyResourceType.REFERENCE) {		
		window.open(studyResource.url, "_blank");
	}
	else if(typeId===StudyResourceType.FEEDBACK_FORM) {				
		_path = '/feedback/form/'+studyResource.id;
		data.studyResource = studyResource;
		this.props.history.push({pathname: _path, state: data});
	}else if(typeId===16){
		console.log("resource--->",studyResource)
		console.log(this.state.resource);
		this.props.history.push({pathname:'/shaka',state:{selectedVideo: studyResource}});
	}
	else {
		_path = '/studyResource/' + typeId + '/' + subTypeId + '/details/'+ studyResource.id;
		this.props.history.push({pathname: _path, state: data});
	}
	
  }

  	displaySingleResource=(studyResource)=> {
		let typeId = parseInt(this.props.match.params.typeId);
		let subTypeId = this.props.match.params.subTypeId;
		let _path = '';
		let data = {portlet: this.props.location.state.portlet};
		if(typeId===StudyResourceType.FEEDBACK_FORM) {				
			_path = '/feedback/form/'+studyResource.id;
			data.studyResource = studyResource;
			this.props.history.replace({pathname: _path, state: data});
		}else if(typeId===16){
			console.log(this.state.resource);
			this.props.history.replace({pathname:'/shaka',state:{selectedVideo: studyResource}});
		}
		else {
			this.props.history.replace({
				pathname: '/studyResource/' + typeId + '/' + subTypeId + '/details/' + studyResource.id,
				state: { portlet: this.props.location.state.portlet }});
		}
	}

  openUrl(url){
	window.open( url, '_blank');
  }

  render() {
    console.log(this.props);
	//console.log(this.props.loading);
    //const { loading } = this.props.loading;
	const { loading } = this.state;
	let icon = ''; let icon2 = '';
	let typeId = this.props.match.params.typeId;
	if(typeId==1){
		icon = download;
		icon2 = download2;
	}else if(typeId==5){
		icon = reference;
		icon2 = reference2;
	}else if(typeId==6){
		icon = announcement;
		icon2 = message;
	}else if(typeId==13){
		icon = ebook;
		icon2 = doc;
	}else if(typeId==16 || typeId==30 || typeId==3 || typeId==31){
		icon = stream;
		icon2 = video;
	}else if(typeId==StudyResourceType.FEEDBACK_FORM){
		icon = feedbackform;
		icon2 = doc;
	}

		
    return (
      <div className="Message">
        {
		  loading ?  <Loader />:
          <Container fluid>
              <div className="module-header">
                <div className={`module-header-inner ${this.props.location.state.portlet.class}`} >
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                </div>
                  <img src={icon} alt={this.props.match.params.type} /> 
                </div>
                <div className="arrow-set">
                  <h4>{this.props.match.params.type}</h4>
                </div>
              </div>
			  {
			   typeId==1 || typeId==5 || typeId==13 || typeId==16 || typeId==30 || typeId==31 || typeId==3 ? 
			     this.state.isMobile ? this.renderCard(icon2) : typeId==30 ? this.renderCardDesktop2(typeId,icon2) : this.renderCardDesktop(typeId,icon2)
			   :  this.renderCard(icon2)
			  }     
			  { //<Loader />: this.renderCard(icon2)
			  }      
          </Container>
        }
      </div>
    );
  }

  renderCard(icon2) {
		  
		return  <div className="card_list"> 
		{
		  //this.props.resource.sort((a, b) => b.id - a.id)
		  this.state.resource.sort((a, b) => b.id - a.id)
		  .map((item, index) => {
				let paramsString = this.props.location.search;
				if(this.state.resource.length==1){
					//this.props.history.push('/studyResource/' + this.props.match.params.typeId + '/' + this.props.match.params.subTypeId + '/details/' + item.id +'?item=1&back=1');
					this.displaySingleResource(item)
				}
				return ( 
					<Card key={index} onClick={() => this.displayStudyResource(item)}>
						<Card.Body>
							<div className="cardbody">
							<img src={icon2} alt={item.name} />
							<h4 className="head">{item.name}</h4>
							<FontAwesomeIcon icon={ faArrowRight }  />
							</div>
						</Card.Body>
					</Card>
				)
			  })
		}
    </div>
  }

    renderCardDesktop(typeId,icon2) {
		  
	 return  <div className="download_list card_list"> 
                <Card>
					<Card.Body>
					  <div className="cardbody head align-center">
			            <span className="sno">#</span>
						<h4 className="head">Name</h4>
						<p className="desc">Description</p>
						<span className="date">Date</span>
						<span>Action</span>
					  </div>
					</Card.Body>
				</Card>
				{
				this.state.resource.sort((a, b) => b.id - a.id)
				.map((item, index) => {
						var description = 'NA';
						if(item.description){
							description = item.description.replace(/<(.|\n)*?>/g, '');
							description = description.replace(/&nbsp;/g, '');
							description = description.replace(/&#39;/g, "'");
						}

						var link;
						if(typeId == 1 || typeId == 5){
							var youtube = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
							var url = item.url || ""
							if(url?.match(youtube)){
								link = <a className="" onClick={() => this.routeChange('/studyResource/' + this.props.match.params.typeId + '/' + this.props.match.params.subTypeId + '/details/' + item.id, this.props.location.state.portlet,item)} ><img src={icon2} alt={item.name} /></a>
							}else{
								link =  <a className="" onClick={() => this.openUrl(item.url)} ><img src={icon2} alt={item.name} /></a>
							}
						}

						return ( 
							<Card key={index} >
								<Card.Body>
								<div className="cardbody align-center">
									<span className="sno">{index+1}</span>
									<h4 className="head">{item.name}</h4>
									<p className="desc">
									  <div dangerouslySetInnerHTML={{ __html:description}} />
									</p>
	
									<span className="date">{item.creationDate}</span>
									{
										typeId == 1 || typeId == 5 ? link
										: typeId == 16 || typeId == 31 || typeId == 3 ?
                                        <a className={`custom_icon ${this.props.location.state.portlet.class}`} onClick={() => this.routeChange('/studyResource/' + this.props.match.params.typeId + '/' + this.props.match.params.subTypeId + '/details/' + item.id, this.props.location.state.portlet,item)} ><FontAwesomeIcon icon={ faVideo }  /></a>
										:
                                        <a className={`custom_icon ${this.props.location.state.portlet.class}`} onClick={() => this.routeChange('/studyResource/' + this.props.match.params.typeId + '/' + this.props.match.params.subTypeId + '/pdf/' + item.id)} ><FontAwesomeIcon icon={ faSearch }  /></a>	
									}
								</div>
								</Card.Body>
							</Card>
						)
					})
				}
			</div>
	}
	
	renderCardDesktop2(typeId,icon2) {
		  
		return  <div className="download_list zoom_video_list card_list"> 
				   <Card>
					   <Card.Body>
						 <div className="cardbody head align-center">
						   <span className="sno">#</span>
						   <h4 className="head">Name</h4>
						   <span className="date">Start Date</span>
						   <span className="date">End Date</span>
						   <span>Action</span>
						 </div>
					   </Card.Body>
				   </Card>
				   {
				   this.state.resource.sort((a, b) => b.id - a.id)
				   .map((item, index) => {
						   return ( 
							   <Card key={index} >
								   <Card.Body>
								   <div className="cardbody align-center">
									   <span className="sno">{index+1}</span>
									   <h4 className="head">{item.name}</h4>
									   <span className="date">{item.startDateTime}</span>
									   <span className="date">{item.endDateTime}</span>
									   <a className={`custom_icon ${this.props.location.state.portlet.class}`} onClick={() => this.openUrl(item.url)}><FontAwesomeIcon icon={ faVideo }  /></a>
								   </div>
								   </Card.Body>
							   </Card>
						   )
					   })
				   }
			   </div>
	}

}

/*const mapStateToProps = state => ({
  resource: state.resource.resource,
  loading: false
});

const mapDispatchToProps = {
  getResource: getResource,
};*/
//export default connect(mapStateToProps,mapDispatchToProps) (Resource);

export default Resource;
