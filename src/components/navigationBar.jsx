import personService from '../services/personService'
import React, {useEffect, useState} from 'react'
import GoogleLogin from 'react-google-login';
import {Link, useHistory} from 'react-router-dom';
import '../styles/homepageStyle.css';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)



export default function NavigationBar({loginRegisterUser}) {
    const [classNavBar, setClassNavBar] = useState("navbar-container");
    const history = useHistory(); 

    useEffect(()=>{
        animationTitle();
    },[])

    // if not found, hide the navbar component
    useEffect(() => { return history.listen((location) => {
          if(location.pathname==="/not-found") setClassNavBar("navbar-container-none");
          else setClassNavBar("navbar-container");
    })},[history]);

    useEffect(()=>{
        if(window.location.pathname==="/not-found") setClassNavBar("navbar-container-none");
        else setClassNavBar("navbar-container");
    },[classNavBar]);

    const responseGoogleSuccess=(response)=>{
        const {googleId, email, name, familyName} = response.profileObj
        const userInfo = {googleId: googleId, email: email, fullName: name, surname: familyName}
        loginRegisterUser(userInfo);
    }   
    const responseGoogleFail=(response)=>{} 

    return (
        <div className={classNavBar}>
            <div style={mainBgStyleContainer} className="mainBgStyle-navbar"></div>
            <ul className="navbar-elements">
                <Link className="left-half" to="/home">
                        <div draggable="false" className="ics-uplb-caption" to="/home">
                            <span className="ics-caption">Institute of Computer Science Online Library</span>
                            <span className="uplb-caption">University of the Philippines Los Baños</span>
                        </div>
                </Link>
                <div className="right-half">
                    <div className="loginIconContainer">
                        <div>
                            <i className="fa fa-lg fa-sign-in" style={{color:"white"}} aria-hidden="true"/>
                        </div>
                        <GoogleLogin
                            clientId="956873967748-7k3coalelv8ko21id2tsh4ij00k3582d.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleFail}
                            cookiePolicy={'single_host_origin'}
                            className="login-link"
                            icon={false}/>
                    </div>
                </div>
            </ul>     
        </div>
    )
}

const mainBgStyleContainer = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:-1,
    overflow:"hidden",
}

const animationTitle=()=>{
    gsap.from('.ics-caption',{xPercent:-20, duration:1});
    gsap.from('.uplb-caption',{xPercent:-20, duration:1.5});

}
