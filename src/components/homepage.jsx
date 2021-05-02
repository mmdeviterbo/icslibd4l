import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/homepageStyle.css';
import icsLogoImg from '../assets/icslogo.png';

export default function Homepage() {
    return (
        <>
        <div className="navbar-container">
            <ul className="navbar-elements">
                <div className="left-half">
                        <Link to="/home">
                            <img draggable="false" src={icsLogoImg} className="icslogo-img"/>
                        </Link>
                        <Link className="ics-uplb-caption" to="/home">
                            <p className="ics-caption">Institute of Computer Science Online Library</p>
                            <p className="uplb-caption">University of the Philippines Los Baños</p>
                        </Link>
                </div>
                <div className="right-half">
                    {/* this is incomplete: change this if there's user logged in */}
                    <Link to="/login"><span className="login-link">Login</span></Link>
                </div>
            </ul>     
        </div>
        </>
    )
}
