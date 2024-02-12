import React, {Component} from 'react';
import './styles.css';
import {Link} from 'react-router-dom'
import useGetData from '../../../_services/useGetData';
import Config from '../../../_config/config';
import { ILoader } from '../../../_components/iloader/iloader';
import NoData from '../../../common/NoData';
import { useState } from 'react';
import { useEffect } from 'react';
import { BusinessUnitIndex, DesignationIndex, GradeIndex, LocationIndex } from '../../../_constants/variables';

const UpcomingGameDetails = ({color,enquiryId}) => {
    const [message,setMessage] = useState('')
    const [batchIds,setBatchIds] = useState('0')
    const {data,loading,error} = useGetData(Config.getBatchforEnquiry+enquiryId+'/batches/v2?includeNoOfStudents=true',setMessage);
    const [remainingLearners,setRemainingLearners] = useState()
    const {data:LearnersData,loading:loading1,error:LearnersError} = useGetData(Config.getLearnersforBatchId+batchIds+'/students')

    useEffect(() => {
        data && data?.length > 0 && setBatchIds(data.map(d => d.id))
    },[data])
        
    // useEffect(() => {
    //         const remainingLearners1 = []
    //         LearnersData && enquiryId?.length > 0 && remainingLearners1.push(...remainingLearners1,...LearnersData.filter(a=> String(enquiryId) !== a.enquiryId));
    //         remainingLearners1 &&  setRemainingLearners(remainingLearners1)
    //         console.log('------------')
    //         console.log(LearnersData)
    //         console.log(enquiryId)
    //         console.log(remainingLearners1)
    //         console.log('------------')
    // },[LearnersData,enquiryId])
    const renderBody = () => {

            if(data.length > 0)
            {

                return data.map((d,i) => (
                    <tr key={i}>
                        <td >{d.schoolName}</td>
                        <td>{d.courseName}</td>
                        <td>{d?.instructors.map((i,j) => <p key={j}>{i.name}</p>)}</td>
                        <td>{d.startDate}</td>
                        <td>{d.noOfStudents}</td>
                    </tr>
                ))
            
            }
            else return <NoData/>
        }
    const renderLearnerDetails = () => {
        if(LearnersData.length > 0)
        {
            return LearnersData.map((r,i) => {
                const Grade = r?.customFields?.find(c => c.index === GradeIndex)?.value
                const Designation = r?.customFields?.find(c => c.index ===  DesignationIndex)?.value
                const Location = r?.customFields?.find(c => c.index === LocationIndex)?.value
                const BusinessUnit = r?.customFields?.find(c => c.index === BusinessUnitIndex)?.value
                return( 
                    <tr key={i}>
                        <td>{r?.name}</td>
                        <td>{Grade}</td>
                        <td>{Designation}</td>
                        <td>{Location}</td>
                        <td>{BusinessUnit}</td>
                        <td>{r?.email}</td>
                        <td>{r?.mobile}</td>
                        <td><button className="decline">Give FeedBack</button></td>

                    </tr>
                )
            })
        }
        else return <NoData/>
    }
         return ( 
            <div className="games">
                <ILoader
                loadingText="Please Wait"
                isShow={loading}
                loaderStyle= ''
                color={color}
                >
                </ILoader>
                {error && <div>Error while fetching gameplay details: {error}</div>}
                {!loading && !error && 
                <div className="blur">
                <div className="top-buttons reverse">
                    {/* <button className="brochure back1"><Link to='/'>Back</Link></button> */}
                
                </div>
                <div className="top-buttons">
                    <h2>Details of Upcoming Game Plays</h2>
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
                <table className="styled-table long-table blue-table">
                    <thead>
                        <tr>
                            <th>Learner</th>
                            <th>Grade</th>
                            <th>Designation</th>
                            <th>Location</th>
                            <th>Business</th>
                            <th>Email Id</th>
                            <th>Mobile</th>
                            <th>Feedback</th>
                            {/* <th>Fecilitator Feedback</th> */}
                        </tr>
                    </thead>
                    <tbody>
                     {LearnersData && renderLearnerDetails()}
                    </tbody>
                </table>
                <div className="top-buttons bottom-buttons">
                    <button className={`accept ${color}`}><Link to='/pre-play'>Pre-play learnings</Link></button>
                    <button className={`accept ${color}`}><Link to='/post-play'>Post-play learnings</Link></button>
                    <button className={`accept ${color}`}><Link to='/video-recordings'>Video recordings</Link></button>
                    <button className={`accept ${color}`}><Link to='/actionable'>Your Actionable</Link></button>
                    <button className={`accept ${color}`}><Link to='/feedback'>Your Feedback</Link></button>
                </div>
                </div>
                }
            </div>
        );

}
export default UpcomingGameDetails;
