import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Parser from 'html-react-parser';
import Utils from "../../../_helpers/utils";
import ApiService from "../../../_services/ApiService";
import Config from '../../../_config/config'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faVideo,faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from "../../../_components/video-player";
import  { TimeTable } from "../../timetable/TimeTable";
import XAPIUtils from "../../xapi/xapiutils";

export default class Resource extends Component{
    constructor(props) {
        super(props);
	}

	routeChange(path) {
		this.props.history.push(path);
	}

	routeReplace = (path)=>{
		this.props.history.replace(path);
	}

	openLink = (url) => {
		window.open(url, 'Scorm Course', 'height=' + window.screen.height + ',width=' + window.screen.width);
	}

	downloadTest(testid) {
		//|| Utils.isMobileDevice()===false
		if(Utils.isMobileDevice()===true){
		  ApiService.fetchTest(testid)
		  .then((res) => {
			if(res.data.status==1 && res.data.data.tests[0].testJSONFile!="TestJSONNotFound"){
			  var studentPdfResponse = res.data.data.tests[0].studentPdfResponse;
			  ApiService.fetchTestJson(res.data.data.tests[0].testJSONFile)
			  .then((res) => {
				this.setState({tests: res.data});
				var oldTests = JSON.parse(localStorage.getItem('tests')) || [];
				if (oldTests.filter(test=> test.id == testid).length == 0){
				  res.data.resume=0;
				  res.data.studentPdfResponse=studentPdfResponse;
				  oldTests.push(res.data);  
				  localStorage.setItem('tests', JSON.stringify(oldTests));		
				  this.props.history.replace('/test-instructions/'+this.props.stepId+'/'+testid+'?lms=1&title=');
				}
			  });
			}else{
			  let portlet = JSON.parse(localStorage.getItem('portlet'));
			  swal({
				title: "Alert",
				text: "Online test not available. Please contact administrator",
				dangerMode: true,
				className: portlet.class ? portlet.class : 'orange-card'
			  });
			}
		  });
		}else{
		  //this.props.history.replace('/TestInstructions/'+testid+'?lms='+this.props.match.params.id,0,this.props.match.params.id)
		  window.open('/TestInstructions/'+testid+'?lms='+this.props.stepId, "Start Test", 'height=' + window.screen.height + ',width=' + window.screen.width);
		}
		
	  }
    
    render(){
		
		let item = this.props.data;
		let stepId = this.props.stepId || '';

		let content = "";

		if(item.type==="streaming"){
			//alert(item.url)
            content =  <div>
                         <div id="video_div"><VideoPlayer url={item.url} transcripts={item.transcripts || []} /> </div>
                         <div id="content">{item.description && Parser(item.description)}</div>
                       </div>;
        }else if(item.type==="message"){
            content =  <div>
                         <div id="content">{item.description && Parser(item.description)}</div>
                       </div>;
        }else if(item.type==="book" || item.type=="image" || item.type==="e-book"){
            if(item.typeName==="Download"){
				content = <div>
							<div id="content">{item.description && Parser(item.description)}</div>
							<div id="Attachment"><a href={item.url} >DOWNLOAD ATTACHMENT</a></div>
						  </div>;
            }else{
				this.routeReplace('/lesson/steps/attachments/pdf/'+ stepId + '/details/' + item.id)}
                // content = <div>
				// 			<div id="content">{item.description && Parser(item.description)}</div>
				// 			<div id="Attachment"><a onClick={() => this.routeChange('/lesson/steps/attachments/pdf/'+ stepId + '/details/' + item.id)}>VIEW ATTACHMENT</a></div>
				// 		  </div>;
            // }
            
        }else if(item.type==="url"){
			let url = item.url;
			if(url.match(/youtube\.com/)){
				content = <div id="video_div"><VideoPlayer url={item.url} transcripts={item.transcripts || []} /></div>
			}else{
				content = <div>
							<iframe title={item.name} class="url_iframe iframe100" height="76vh" width="100%" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" src={item.url}></iframe>
						</div>
			}
            
        }else if(item.type==="quiz" || item.type==="test"){
            content = <div>
						<div id="content">{item.name}</div>
						<div id="Attachment"><a onClick={() => this.downloadTest(item.id)}>Launch</a></div>
					  </div>;
        }else if(item.type=="vimeo"){
            var url = item.url;
            if(url.includes("player")){
              url = item.url;
            }else{
              url = new URL(item.url);
              url = url.pathname.substring(1);
              url = url.substring(0, url.lastIndexOf("/") + 1);
              url = "https://player.vimeo.com/video/"+url;
            }
			content =   <iframe className="vimeoPlayer" title={item.name} height="300" width="100%" src={url} allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe> 
			//content = <VideoPlayer url={url} transcripts={item.transcripts || []} />
			//XAPIUtils.track(item);
        }else if(item.type=="ppt"){
            var url = "https://view.officeapps.live.com/op/embed.aspx?src=" + item.url;
            content = <iframe className="pptIframe" title={item.name} height="500" width="100%" src={url} ></iframe> 
        }else if(item.typeName=="OnlineMeeting" || item.typeName=="ZoomMeeting"){
			    item.url ?
			      content =      <><br />
									<div class="card-columns">
										<div  className="card bg-info">
											<div className="card-body">
												<div className="text-center text-white">
													<h3>{item.name}</h3>
												</div>
												<span className="float-left text-white">{item.startDateTime+' - '+item.endDateTime}</span><br/><br /> 
												{
													item.url && 
													<a className="btn btn-primary float-right"  
														href={item.url} 
														target="_blank"  
														style={{padding: '1px 5px '}}>
														<FontAwesomeIcon icon={ faVideo }  size = 'lg' color='#fff'/> &nbsp;
														Online Class
													</a>
												}
											</div>
										</div>
									</div>
								</>
				:
				content = 
						<>
							<div className="learning_module_timetable"><TimeTable /></div>
						</>
		}else if(item.typeName=="ScormCourse"){

			let user = JSON.parse(localStorage.getItem('user')) || [];
			var tenant = localStorage.getItem('tenant') || Config.siteTitle
			content =      <>
			                   <br /><br /><br />
										{
											item.url && 
											<a className="btn btn-primary" onClick={() => this.openLink(Config.siteUrl + tenant +  item.url + '&token='+ user.token)}  
												style={{padding: '1px 5px '}}>
												<FontAwesomeIcon icon={ faExternalLinkAlt }  size = 'lg' color='#fff'/> &nbsp;
												Launch
											</a>
										}
							</>
		}
		XAPIUtils.track(item);

		return(
			<>
			    <Card>
                  <Card.Body style={{padding:'0.25rem', border: 'none' }}>
                      {content} 
                  </Card.Body>
                </Card>
				<br /> <br />  <br /> <br />
			</>
		);
    }
}