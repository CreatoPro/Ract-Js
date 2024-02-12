import React, {Component} from 'react';
import './styles.css';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

export default class RegisterGames extends Component{

    render() {
        return ( 
            <div className="games">
            <div className="top-buttons">
                    <h2> Game Play Registration</h2>
                    <button className="accept grey"><Link to='/'>Game Brochure</Link></button>
                </div>
                <table className="styled-table grey-table">
                    <thead>
                        <tr>
                            <th>Originator</th>
                            <th>Product Name</th>
                            <th>Facilitator</th>
                            <th>Game play Date</th>
                            <th>No of Participants</th>
                            <th>Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><Link to='/profile'>Profile</Link></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                            <td><FontAwesomeIcon icon={ faRupeeSign }/>&nbsp;2000</td>
                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                            <td><FontAwesomeIcon icon={ faRupeeSign }/>&nbsp;2000</td>

                        </tr>
                        <tr>
                            <td>Unreal Engine</td>
                            <td>PUBG</td>
                            <td><a href="/profile">Profile</a></td>
                            <td>12/12/2020</td>
                            <td>50</td>
                            <td><FontAwesomeIcon icon={ faRupeeSign }/>&nbsp;2000</td>


                        </tr>
                    </tbody>
                </table>
                <div className=" bottom-buttons register-buttons">
                    <button className="accept grey"><Link to='/pre-play'>Register</Link></button>
                    <button className="accept grey"><Link to='/post-play'>Recommend to your Network</Link></button>
                </div>
            </div>
        );
}
}
