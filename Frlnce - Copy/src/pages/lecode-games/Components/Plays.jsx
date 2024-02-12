import './styles.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Plays extends Component{
    render() {
        return ( 
            <div className="games">
                <div className="top-buttons reverse">
                    {/* <button className="brochure back1"><Link to='/'>Back</Link></button> */}
                    <button className="accept red"><Link to='/'>Download Report</Link></button>
                </div>
                <div className="top-buttons">
                    <h2>Completed Game Plays</h2>
                    <button className="decline"><a href="/gamePlaysCompleted">Details</a></button>
                </div>
                <table className="styled-table green-table">
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
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><Link to='/profile'>Profile</Link></td>
                            <td>12/12/2020</td>
                            <td>50</td> 
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                            {/* <td><button className="decline">Details</button></td> */}
                        </tr>
                    </tbody>
                </table>
                <div className="top-buttons">
                    <h2>Open Game Plays</h2>
                    <button className="decline"><a href="/gamePlaysOpen">Details</a></button>
                </div>
                <table className="styled-table  pink-table">
                    <thead>
                        <tr>
                            <th>Originator</th>
                            <th>Product Name</th>
                            <th>Facilitator</th>
                            <th>Game play Date</th>
                            <th>No of Participants</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><Link to='/profile'>Profile</Link></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        
                        </tr>
                    </tbody>
                </table>
                <div className="top-buttons">
                    <h2>Upcoming Game Plays</h2>
                    <button className="decline"><a href="/gamePlaysCompleted">Details</a></button>
                </div>
                <table className="styled-table  blue-table">
                    <thead>
                        <tr>
                            <th>Originator</th>
                            <th>Product Name</th>
                            <th>Facilitator</th>
                            <th>Game play Date</th>
                            <th>No of Participants</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><Link to='/profile'>Profile</Link></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                        
                        </tr>
                    </tbody>
                </table>
            </div>
        );
}
}