import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {ILoader} from './../../_components/iloader/iloader';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Config from './../../_config/config'
import "./todaytests.css";
import upcoming_icon from "../../_assets/imgs/edit.png";
import completed_icon from "../../_assets/imgs/verify.png";
import ApiService from "../../_services/ApiService";
import swal from 'sweetalert';

class TodayTests extends Component { 

	constructor(props) {
        super(props);
        console.log("TodayTests -> constructor()... ");
        this.state = {
            message: null,
            showLoading: false,
            portlet: this.props.location.state.portlet,
            todayTests: null
        };
    }
    
    componentDidMount() {
        //console.log("TodayTests -> componentDidMount()... ");
        this.init();
    }

    openTest = (testID) => {
        const portlet = this.state.portlet;
        var url = '/TestInstructions/'+testID+'?cat='+portlet.testCategoryIds;
        window.open(url, 'Start Test', 'height=' + window.screen.height + ',width=' + window.screen.width);
    }

    routeChange(path,endDate) {
        const portlet = this.state.portlet;
        this.props.history.push( { pathname: path, state: {testEndDate: endDate, testCategory: portlet.testCategoryIds} } );
    }

    showAlert(msg) {
        swal({
              title: "Alert",
              text: msg,
              dangerMode: true,
         });
    }
    
    init() {
        //console.log("TodayTests -> init()... ");
        const portlet = this.state.portlet;
        Config.CURRENT_PORTLET = portlet;
        
        let todayTestsConfig = {
            "testCategoryIds": portlet.testCategoryIds,
            "numberOfPreviousDays": portlet.numberOfPreviousDays,
            "numberOfFutureDays": portlet.numberOfFutureDays,
            "referenceDate": portlet.referenceDate,
            "testIds": portlet.testIds
        }
        
        this.setState({ showLoading: true }, () => {
            ApiService.fetchTodayTests(todayTestsConfig)
            .then((res) => {
                this.setState({
                    showLoading: false,
                    todayTests: res.data.data
                });
            },error => {
				this.setState({
					showLoading: false,
				});
                console.log(error);
				alert(Config.CONNECTION_ERROR_MSG);
			});
          });
    }
    
    render() {
        //console.log("TodayTests -> render()... ");
        const portlet = this.state.portlet;  
        const upcoming = <img src={upcoming_icon} />  
        const completed = <img src={completed_icon} />    
        const todayTests = JSON.parse(this.state.todayTests);

        return (  
            <>
                <div className="today_tests">
                    {                    
                    <>
                    <div className={`module-header-step2 ${portlet.class ? portlet.class : 'orange-card'}`}>
                        <div className="back">
                            <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
                        </div>
                        <h4>{portlet.name}</h4>
                    </div>
                    {
                        this.state.showLoading ? this.renderLoader() : 
                        <div className="mt50">
                            <Tabs defaultActiveKey="Upcoming" id="uncontrolled-tab-example">
                                <Tab eventKey="Upcoming" className="upcoming" title={<span>{upcoming} Upcoming</span>}>
                                <ul className="list-group">
                                   {
                                    todayTests && 
                                    todayTests.upcomingTests?.map((item, index) => {
                                            return ( 
                                                <li className="list-group-item today-test-group ilearn-item-border">
                                                    <div className="ilearn-item-block ">
                                                        <div className="ilearn-item-inner">
                                                        <h4>{item.name}</h4>
                                                        {item.startDate &&
                                                            item.startDate !='--' ? <span >{item.startDate} to {item.endDate} </span> : ""
                                                        }
                                                        </div>
                                                        {
                                                        item.status=="Coming Soon" ?
                                                        <button onClick={() => this.showAlert("The test is available between "+item.startDate+" - "+item.endDate)} className={`ilearn-btn-right orange-card`} > {item.status} </button> 
                                                        : item.status=="Time Out" ? 
                                                        <button onClick={() => this.showAlert("The test is closed at  "+item.endDate)} className={`ilearn-btn-right orange-card`} > {item.status} </button> :
                                                        <button className={`ilearn-btn-right ilearn-blue-btn`} onClick={() => this.openTest(item.id)} >
                                                            {item.status}
                                                        </button>
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                </Tab>
                                <Tab eventKey="Completed" className="completed" title={<span>{completed} Completed</span>}>
                                    <ul className="list-group">
                                       {
                                        todayTests && 
                                        todayTests.completedTests?.map((item, index) => {
                                                return ( 
                                                    <li className="list-group-item today-test-group ilearn-item-border">
                                                        <div className="ilearn-item-block ">
                                                            <div className="ilearn-item-inner">
                                                            <h4>{item.name}</h4>
                                                            {item.startDate && 
                                                               item.startDate !='--' ? <span >{item.startDate} to {item.endDate} </span> : ""
                                                            }
                                                            </div>
                                                            <button 
                                                            className={`ilearn-btn-right ilearn-green-btn`}
                                                            onClick={() => this.routeChange('/test-result/'+portlet.testCategoryIds+'/'+item.id, item.endDate)}
                                                            >
                                                              {item.status}
                                                            </button>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Tab>
                            </Tabs>
                        </div>
                    }
                    </>
                    }
                </div>
            </>           
              
        );
    }
    
    renderLoader() {
        console.log("TodayTests -> renderLoader()... ");
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


  
export {TodayTests};