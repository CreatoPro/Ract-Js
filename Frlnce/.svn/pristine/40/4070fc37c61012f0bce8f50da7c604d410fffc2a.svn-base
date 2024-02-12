import React, { Component } from "react";
import "./timetable.css";
import { Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faVideo} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import UserService from '../../_services/UserService';
import {ILoader} from './../../_components/iloader/iloader';
import HorizontalDatePicker from './../../_components/horizontal-date-picker/HorizontalDatePicker';
import DatePicker from 'react-mobile-datepicker';
import list from "../../_assets/imgs/calendar.svg";
import swal from 'sweetalert';

class TimeTable extends Component { 

	constructor(props) {
        super(props);
        this.state = {
            message: null,
            showLoading: false,
            timeTableData: null,
            selectedTimeTable: null,
            portlet: this.props?.location?.state?.portlet,
            showCalendar: false,
            time: new Date(),
            currentDate: new Date(),
            showVideo: false,
            videoDetails: null,
        };
    }
    
    componentDidMount() {
        this.payCheck();
    }


    payCheck() {
        this.setState({ showLoading: true }, () => {
          let payLoad = {
            "type": "lms",
          };
          ApiService.studentPayCheck(payLoad)
          .then((res) => {
              this.setState({
                showLoading: false,
                payType : res.data.type,
                payMessage : res.data.message
              });
              this.init();
          });
        });	
    }

    showAlert = () => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.state.payMessage;
        swal({
          title: "Alert",
          content: wrapper,
          dangerMode: true,
          buttons: true,
          className: 'blue-card'
        })
        .then((willResume) => {
          if (willResume) {
             
          }
        });
	}


    onSelectedDay = (selectedDate) =>{
        //console.log("selectedDate : "+selectedDate);
        this.setState({
            selectedTimeTable : this.state.timeTableData[this.parseDate(selectedDate)],
            currentDate: selectedDate
        });
    };

    monthMap = {
        '1': 'Jan',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Apr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Aug',
        '9': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };

    dateConfig = {
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
        'month': {
            format: value => this.monthMap[value.getMonth()+1],
            caption: 'Month',
            step: 1,
        },
        'date': {
            format: 'DD',
            caption: 'Day',
            step: 1,
        },
        // 'hour': {
        //     format: 'hh',
        //     caption: 'Hour',
        //     step: 1,
        // },
        // 'minute': {
        //     format: 'mm',
        //     caption: 'Min',
        //     step: 1,
        // },
        // 'second': {
        //     format: 'hh',
        //     caption: 'Sec',
        //     step: 1,
        // },
    }

    handleClick = () => {
		this.setState({ showCalendar: true });
	}

	handleCancel = () => {
		this.setState({ showCalendar: false });
	}

	handleSelect = (time) => {
        //console.log("Time : ", time);
        this.setState({ time:time, currentDate: time, showCalendar: false }, () => {
            this.init();
        });        
	}
    
    init() {
        let prev_date = new Date(this.state.time);
        prev_date.setDate(this.state.time.getDate() - 1);

        let next_date = new Date(this.state.time);
        next_date.setDate(this.state.time.getDate()+29);
        let searchParams={
            "startDate": this.parseDate(prev_date),
            "endDate": this.parseDate(next_date),
            "enquiryId": localStorage.getItem('enquiryId')
        }
        //console.log("searchParams: "+JSON.stringify(searchParams));
        this.setState({ showLoading: true }, () => {
            ApiService.getTimeTables(searchParams)
            .then((res) => {
              this.parseTimeTableData(res?.data?.data?.timeTableDataBeans || []);              
            });
        });
    }

    parseTimeTableData(timeTableDataBeans) {
        let timetableJSON = {}; 
        for(let t=0; t < timeTableDataBeans.length; t++) {
            timetableJSON[timeTableDataBeans[t].dateString] = timeTableDataBeans[t];
        }
        this.setState({
            showLoading: false,
            timeTableData : timetableJSON,
            selectedTimeTable : timetableJSON[this.parseDate(this.state.currentDate)]
        });
        //console.log("timetableJSON : "+JSON.stringify(timetableJSON));
    }
    
    render() {
        return (  
            <>
                <div className="ilearn-full-height page-payments">
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody()}
                        {this.renderLoader()}                    
                    </Container>
                </div>
            </>           
              
        );       
    }

    renderHeader() {
        return (
            <div className={`ilearn-plain-header ${this.state?.portlet?.class}`}>
                <div className="back">
                <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props?.history?.goBack} />
                </div>
                <h4>{this.state?.portlet?.name}</h4>
                <div className="calendar" onClick={this.handleClick}>
                    <img alt="calendar" className="calendar-icon" src={list} />
                </div>
            </div>
        )
    }
    
    renderBody() {
        let timetable = this.state.selectedTimeTable;
        return (
            <>
            <HorizontalDatePicker selectedDay={this.onSelectedDay} enableScroll={true} enableDays={30} customSelectedDate={this.state.time}/> 
            <div className="ilearn-padding-both-sides ilearn-padding-top">
            <div class="card-columns">
                {
                   timetable && 
                   timetable.activitySlotDataBeans.map((activitySlot, index) => {
                    //alert(JSON.stringify(activitySlot?.studyResourceIds))
                    return ( 
                        <div key={index}  className="card bg-info">
                            <div className="card-body">
                                <div className="text-center text-white">
                                    <h3>{activitySlot.batchName}</h3>
                                    <h4>{activitySlot.topicName} </h4>
                                </div>
                                <span className="float-left text-white">{activitySlot.startTime+' - '+activitySlot.endTime}</span><br/>
                                <span className="float-left text-white">{activitySlot.instructorName}</span>
                                {
                                    activitySlot.showZoomMeeting ? 
                                        this.state.payType ==2 ?
                                        <a className="btn btn-primary float-right"  
                                            onClick={() => this.showAlert()} 
                                            style={{padding: '1px 5px '}}>
                                            <FontAwesomeIcon icon={ faVideo }  size = 'lg' color='#fff'/> &nbsp;
                                            Online Class
                                        </a>
                                        :
                                        <a className="btn btn-primary float-right"  
                                        href={activitySlot.zoomMeetingJoinUrl} 
                                        target="_blank"  
                                        style={{padding: '1px 5px '}}>
                                        <FontAwesomeIcon icon={ faVideo }  size = 'lg' color='#fff'/> &nbsp;
                                        Online Class
                                        </a>
                                        : ''
                                }
                                {
                                    !activitySlot.showZoomMeeting ? 
                                        activitySlot.zoomMeetingId ?
                                            this.state.payType ==2 ?
                                                <button className="btn btn-warning float-right" 
                                                    onClick={() => this.showAlert()} 
                                                    style={{padding: '1px 5px '}}>
                                                    <FontAwesomeIcon icon={ faVideo }  size = 'lg' color='#fff'/> &nbsp;
                                                    Recorded Video
                                                </button>
                                            : 
                                            activitySlot?.studyResourceIds==null ?
                                                <button className="btn btn-warning float-right" 
                                                    onClick={() => this.showRecordeVideo(activitySlot,null)} 
                                                    style={{padding: '1px 5px '}}>
                                                    <FontAwesomeIcon icon={ faVideo }  size = 'lg' color='#fff'/> &nbsp;
                                                    Recorded Video
                                                </button>
                                            :
                                            activitySlot?.studyResourceIds?.length && activitySlot?.studyResourceIds.map((studyResourceId, index) => {
                                                return ( 
                                                    <>
                                                    { index === 0 ? <br /> : '' }
                                                    <button className="btn btn-warning " 
                                                        onClick={() => this.showRecordeVideo(activitySlot,studyResourceId)} 
                                                        style={{padding: '1px 5px ', margin: '5px'}}>
                                                        <FontAwesomeIcon icon={ faVideo }  size = 'lg' color='#fff'/> &nbsp;
                                                        Recorded Video {index+1}
                                                    </button>
                                                    </>
                                                )
                                            })
                                        : ''
                                    :''
                                }
                            </div>
                        </div>
                    )
                    })
                }                
            </div>
                {
                    !timetable && !this.state.showLoading && 
                    <div class="alert alert-warning text-center">
                        <h4 class="alert-heading">Free Day!</h4>
                        <p>Yippie! No classes for today.</p>
                    </div>
                }
            </div>
            <DatePicker
                isOpen={this.state.showCalendar}
                theme={'android'}
                showHeader
                showCaption
                dateConfig={this.dateConfig}
                onSelect={this.handleSelect}
                onCancel={this.handleCancel} 
                confirmText={'SET'} 
                cancelText={'CANCEL'}
                value={this.state.currentDate}

            />
            {
                this.showVideoModal()
            }
            </>
        )
    }
    
    renderLoader() {
        const _loadingText = 'Please wait...';
        return (
            <ILoader
                loadingText={_loadingText}
                isShow={this.state.showLoading}
                >
            </ILoader>
        )
    }

    showVideoModal() {
        let videoDetails = this.state.videoDetails;
        //console.log(videoDetails);
        let content = '';
        if(videoDetails?.status==2) {
            content = videoDetails.message;
        }
        else { 
            if(videoDetails?.type=="vimeo"){
                let url = videoDetails.url;
                if(!url.includes("player")) {
                    url = new URL(url);
                    url = url.pathname.substring(1);
                    url = url.substring(0, url.lastIndexOf("/") + 1);
                    url = "https://player.vimeo.com/video/"+url;
                }
                content =   <iframe title={videoDetails.name} height="300" width="100%" src={url} allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe> 
            }
        }
        return (
            <>
            <Modal show={this.state.showVideo} size="lg" onHide={()=> this.handleClose()}>
                <Modal.Header closeButton className={`ilearn-plain-header text-white ${this.state?.portlet?.class}`}>
                <Modal.Title> {videoDetails?.name || 'Alert'} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        videoDetails?.status==2 ?
                            <div dangerouslySetInnerHTML={{ __html:content}} />
                        : content
                    }
                <br />
                </Modal.Body>
            </Modal>
            </>
        );
    }

    handleClose = () => 
    {
        this.setState(state => ({ showVideo: !this.state.showVideo}));        
    }

    showRecordeVideo(activitySlotBean,studyResourceId) {  
        //console.log('showRecordeVideo: ', activitySlotBean);
        let searchParams = {
            "activitySlotTemplateId": activitySlotBean.activitySlotId,
            "batchId": activitySlotBean.batchId,
            "userId": UserService.getUserId(),
            "studyResourceId":studyResourceId
        }
        this.setState({ showLoading: true }, () => {
            ApiService.getRecordedVideos(searchParams)
            .then((res) => {
                console.log(res)
                this.setState({
                    showLoading: false,
                    videoDetails : res.data,
                    showVideo: true,
                });           
            });
        });
    }

    parseDate(_date) {
        let dd = String(_date.getDate()).padStart(2, '0');
        let mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = _date.getFullYear();

        return dd + '/' + mm + '/' + yyyy;
    }

}
  
export {TimeTable};