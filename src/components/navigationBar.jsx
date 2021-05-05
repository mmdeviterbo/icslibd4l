import React, {useEffect} from 'react'
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import '../styles/homepageStyle.css';
import icsLogoImg from '../assets/icslogo.png';

export default function NavigationBar() {
    const responseGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
    }   

    return (
        <>
        <div className="navbar-container">
            <ul className="navbar-elements">
                <div className="left-half">
                        <Link to="/home">
                            <img draggable="false" src={icsLogoImg} className="icslogo-img" alt="#"/>
                        </Link>
                        <Link draggable="false" className="ics-uplb-caption" to="/home">
                            <p className="ics-caption">Institute of Computer Science Online Library</p>
                            <p className="uplb-caption">University of the Philippines Los Baños</p>
                        </Link>
                </div>
                <div className="right-half">
                    <GoogleLogin
                        clientId="6202802484-iccqejrjgf8i8ltf7ri1t12o0598509n.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="login-link"
                        icon={false}/>
                </div>
            </ul>     
        </div>
        </>
    )
}
