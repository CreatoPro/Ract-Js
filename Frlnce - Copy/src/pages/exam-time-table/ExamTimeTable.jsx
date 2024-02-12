import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import list from "../../_assets/imgs/calendar.svg";
import styles from "./components/style.css"
import { ExamList } from "./ExamList";
import queryString from 'query-string';
import Utils from '../../_helpers/utils'
// import tile from '../discussion/images/tile.svg'
import examtimetable_icon from './components/examtimetable.png'

class ExamTimeTable extends Component{ 

	constructor(props) {
        super(props);
        this.state = {
            message: null,
            showLoading: true,
            portlet: this.props?.location?.state?.portlet,
            examList : '',
            id: ''
        }
    }
    
    componentDidMount() {
        this.examTable();
    }


    examTable() {
        let params = queryString.parse(this.props.location.search)
        this.setState({ showLoading: true }, () => {
            console.log(params.id)
          ApiService.examTimetable(params.id)
          .then((res) => {
              this.setState({
                showLoading: false,
                examList : res.data,
              });
            console.log(this.state.examList)
          });
        });	
    }

    
    render() {
        return (  
            <>
                <div>
                    <Container fluid >
                        {this.renderHeader()}
                        {this.renderBody(this.state.examList)}
                        {/* {this.renderLoader()}                     */}
                    </Container>
                </div>
            </>           
              
        );       
    }

    renderHeader() {
        //console.log("DiscussionBoard -> renderHeader()... ");
        let isMobile = Utils.isMobileDevice()
        return (
          <div className='module-header'>
            <div className={`module-header-inner green-card`}>
              <div className='back'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={this.props.history.goBack}
                />
              </div>
              <img src={examtimetable_icon} alt='exam timetable icon' />
            </div>
            <div className='arrow-set'> 
                <h4>Exam Timetable</h4>
            </div>
          </div>
        )
      }
    
    renderBody(examList) {
        console.log(this.state.examList)
        return (
            this.state.showLoading ? this.renderLoader() : 
            <>
            {this.state.examList.id?
                <table className={styles}>
                    <thead>
                        <tr className="green-card">
                        <th >Date</th>
                        <th className='left'>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examList.timeTableTemplates.map(
                            (row)=>{
                                console.log(row)
                                return(
                                    <tr >
                                        <td className='whole' >
                                            <div className='inl'>
                                                <div className='date'>{row.dayOfMonth}</div>
                                            </div>
                                            <div className='inl'>
                                                <div className='day'>{row.dayOfweek}</div>
                                                <div className='smy' >{row.shortenedMonthYear}</div>
                                            </div>
                                        </td>
                                        <td className='test'>
                                            <span className='time '>{row.startTime} - {row.endTime}</span>
                                            <div className='tstn'>{row.eventName}</div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>:<>
                <div className="noexam">Oops! Could not fetch this exam timetable</div>
                </>}
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

}
  
export {ExamTimeTable};