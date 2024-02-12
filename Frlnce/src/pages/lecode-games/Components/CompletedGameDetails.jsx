import React, {Component} from 'react';
import './styles.css';
import {Link} from 'react-router-dom'
import useGetData from '../../../_services/useGetData';
import Config from '../../../_config/config';
import { ILoader } from '../../../_components/iloader/iloader';

const CompletedGameDetails = ({color,enquiryId}) => {

       const {data,loading,error} = useGetData(Config.getBatchforEnquiry+enquiryId);
       const renderBody = () => {
            return data.map((d,i) => (
                <tr key={i}>
                    <td>{d.schoolName}</td>
                    <td>{d.courseName}</td>
                    <td>{d.instructorName}</td>
                    <td>{d.startDate}</td>
                    <td className="dns">D.N.F</td>
                </tr>
            ))
        }   
        return ( 
            <div className="games">
                {loading && <ILoader
                loadingText="Please Wait"
                isShow={loading}
                loaderStyle= ''
                color={color}
                >
                </ILoader>}
                {error && <div>Error while fetching gameplay details: {error}</div>}
                {(!loading && !error) && 
                <div className="blur">
                <div className="top-buttons reverse">
                    {/* <button className="brochure back1"><Link to='/'>Back</Link></button> */}
                
                </div>
                <div className="top-buttons">
                    <h2>Details of Completed Game Plays</h2>
                    <button className={`accept ${color}`}><Link to='/'>Game Brochure</Link></button>
                </div>
                <table className={`styled-table ${color}-table`}>
                    <thead>
                        <tr>
                            <th>Originator</th>
                            <th>Product Name</th>
                            <th>Facilitator</th>
                            <th>Game play Date</th>
                            <th>No of Participants</th>
                            {/* <th colSpan={1}>&nbsp;</th> */}

                        </tr>
                    </thead>
                    <tbody>
                       {data && renderBody()}
                    </tbody>
                </table>
                <table className="styled-table long-table green-table">
                    <thead>
                        <tr>
                            <th>Learner</th>
                            <th>Grade</th>
                            <th>Designation</th>
                            <th>Location</th>
                            <th>Business</th>
                            <th>Email Id</th>
                            <th>Mobile</th>
                            <th>Business Style</th>
                            <th>Feedback</th>
                            {/* <th>Fecilitator Feedback</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AbhiramK</td>
                            <td>S+</td>
                            <td>Developer</td>
                            <td>Vskp</td>
                            <td>2</td>
                            <td>abhiram@ conceptwaves.com</td>
                            <td>999999999</td>
                            <td>Lucrative</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>AbhiramK</td>
                            <td>S+</td>
                            <td>Developer</td>
                            <td>Vskp</td>
                            <td>2</td>
                            <td>abhiram@ conceptwaves.com</td>
                            <td>999999999</td>
                            <td>Lucrative</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>AbhiramK</td>
                            <td>S+</td>
                            <td>Developer</td>
                            <td>Vskp</td>
                            <td>2</td>
                            <td>abhiram@ conceptwaves.com</td>
                            <td>999999999</td>
                            <td>Lucrative</td>
                            <td>Pending</td>
                        </tr>
                    </tbody>
                </table>
                <div className="top-buttons bottom-buttons">
                    <button className={`accept ${color}`}><Link to='/pre-play'>Pre-play learnings</Link></button>
                    <button className={`accept ${color}`}><Link to='/post-play'>Post-play learnings</Link></button>
                    <button className={`accept ${color}`}><Link to='/video-recordings'>Video recordings</Link></button>
                    <button className={`accept ${color}`}><Link to='/actionable'>Your Actionable</Link></button>
                    <button className={`accept ${color}`}><Link to='/feedback'>Your Feedback</Link></button>
                </div>
               </div>} 
            </div>
        );
    
}

export default CompletedGameDetails
