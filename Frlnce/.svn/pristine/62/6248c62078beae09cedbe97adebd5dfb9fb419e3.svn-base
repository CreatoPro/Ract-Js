import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import list from "../../_assets/imgs/calendar.svg";
import styles from "./components/style.css"
// import JsonData from './components/data.json'
import { ExamTimeTable } from './ExamTimeTable';
import Utils from '../../_helpers/utils'
import tile from '../discussion/images/tile.svg'
import examtimetable_icon from './components/examtimetable.png'
import view_icon from './components/view_icon.png'
import upcoming_icon from "../../_assets/imgs/edit.png";
import completed_icon from "../../_assets/imgs/verify.png";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class ExamList extends Component { 

	constructor(props) {
        super(props);
        this.state = {
            message: null,
            showLoading: true,
            portlet: this.props?.location?.state?.portlet,
            examList : '',
            id:'',
            upcomingexam:[],
            prevExam: [],
        };
    }

    componentDidMount() {
        this.examTable();
    }

    examTable() {
        this.setState({ showLoading: true }, () => {
          ApiService.examList()
          .then((res) => {
              this.setState({
                showLoading: false,
                examList : res.data,
                id: res.data.id

            },()=>{
                this.countexam(this.examList)
            });

          });
        });	
    }

    countexam(examList){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        examList?.timeTables.map(
            (row)=>{
                if(row.endDate.slice(8,12)>yyyy || row.endDate.slice(8,12)==yyyy && this.monthConvert(row.endDate.slice(0,3))>mm || row.endDate.slice(8,12)==yyyy && this.monthConvert(row.endDate.slice(0,3))==mm && row.endDate.slice(4,6)>=dd){
                    this.state.upcomingexam.push(row);
                }
                else
                {
                    this.state.prevExam.push(row);
                }
            })         
    }

    render() {
        return (  
            <>
                <div>
                    <Container fluid >
                        {this.renderHeader()}
                        { this.state.examList && this.renderBody(this.state.examList) }
                        {/* {this.renderLoader()}                     */}
                    </Container>
                </div>
            </>           
              
        );       
    }

    monthConvert(month){
        if(month=='Jan')
            return '01';
        else if(month=='Feb')
            return '02';
        else if(month=='Mar')
            return '03';
        else if(month=='Apr')
            return '04';
        else if(month=='May')
            return '05';
        else if(month=='Jun')
            return '06';
        else if(month=='Jul')
            return '07';
        else if(month=='Aug')
            return '08';
        else if(month=='Sep')
            return '09';
        else if(month=='Oct')
            return '10';
        else if(month=='Nov')
            return '11';
        else if(month=='Dec')
            return '12';
    }

    renderHeader() {
        let isMobile = Utils.isMobileDevice()
        return (
          <div className='module-header'>
            <div className={`module-header-inner ${this.props.location.state.portlet.class}`}>
              <div className='back'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={this.props.history.goBack}
                />
              </div>
              <img src={examtimetable_icon} alt='exam timetable icon' />
            </div>
            <div className='arrow-set'>
                <h4>{this.state.portlet.name}</h4>
            </div>
          </div>
        )
      }
    
    renderBody(examList) {
        console.log(examList)
        const portlet = this.state.portlet;  
        const upcoming = <img src={upcoming_icon} />  
        const completed = <img src={completed_icon} />
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
        var yyyy = today.getFullYear();
        if(examList==null)
        {
            return(
                <h1>No Record Found</h1>
            )
        }

        if(examList?.timeTables?.length !== 0 )
        {
            return (
                
                this.state.showLoading ? this.renderLoader() : 
                <>
                <div>
                    <Tabs defaultActiveKey="Upcoming" id="uncontrolled-tab-example">
                        <Tab eventKey="Upcoming" className="upcoming" title={<span>{upcoming} Upcoming</span>}>
                            {this.state.upcomingexam.length>1?   
                            <table className={styles}> 
                                <thead>
                                    <tr className="green-card">
                                    <th className="col1">Dates</th>
                                    <th className='left col2'>Name</th>
                                    </tr>
                                </thead>
                                
                                    {examList?.timeTables.map(
                                        (row)=>{
                                            if(row.endDate.slice(8,12)>yyyy || row.endDate.slice(8,12)==yyyy && this.monthConvert(row.endDate.slice(0,3))>mm || row.endDate.slice(8,12)==yyyy && this.monthConvert(row.endDate.slice(0,3))==mm && row.endDate.slice(4,6)>=dd){
                                            return(
                                                <tbody>
                                                <tr>
                                                    <td className='whole'>
                                                        <div className='bold'>{row.startDate}</div>
                                                        <div className='small'>to</div>
                                                        <div className='bold'>{row.endDate}</div>
                                                    </td>
                                                    <td className='test' onClick={() => this.handleClick(row.id)} >
                                                        <span>{row.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        <span className="view">
                                                            <img src={view_icon} alt='view icon' />&nbsp;View&nbsp;
                                                        </span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            )}
                                        }
                                    )}
                                
                            </table>:<>
                            <div className="noexam">
                                Hooray! No upcoming exams scheduled
                            </div>
                            </>}
                        </Tab>
                        <Tab eventKey="Completed" className="completed" title={<span>{completed} Completed</span>}>
                        {this.state.prevExam? 
                        <table className={styles}>
                            <thead>
                                <tr className="green-card">
                                <th>Dates</th>
                                <th className='left'>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examList?.timeTables.map(
                                    (row)=>{
                                        if(row.endDate.slice(8,12)<yyyy || row.endDate.slice(8,12)==yyyy && this.monthConvert(row.endDate.slice(0,3))<mm || row.endDate.slice(8,12)==yyyy && this.monthConvert(row.endDate.slice(0,3))==mm && row.endDate.slice(4,6)<dd){
                                        return(
                                            <tr>
                                                <td className='whole'>
                                                    <div className='bold'>{row.startDate}</div>
                                                    <div className='small'>to</div>
                                                    <div className='bold'>{row.endDate}</div>
                                                </td>
                                                <td className='test' onClick={() => this.handleClick(row.id)} >
                                                    <span>{row.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <span className="view">
                                                        <img src={view_icon} alt='view icon' />&nbsp;View&nbsp;
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                    }
                                )}
                            </tbody>
                        </table>:<>
                        <div className="noexam">
                                No exams completed yet
                        </div>
                        </>}
                    </Tab>
                </Tabs> 
            </div>
        </>)
        } else {
            //this.handleClick(examList.timeTables[0].id)
        }
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
    
    handleClick(value){
        console.log(value);
        <ExamTimeTable id={value}/>
        window.open("/examtimetable?id="+value,"_self");
    }

}
  
export {ExamList};