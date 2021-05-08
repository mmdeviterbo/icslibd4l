import personService from '../services/personService'
import mainBgUp from '../assets/icslib.jpg';
import React, {useEffect} from 'react'
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import '../styles/homepageStyle.css';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)



export default function NavigationBar({loginRegisterUser}) {
    useEffect(()=>{
        navBarAnimation();
    },[])
    
    const responseGoogleSuccess=(response)=>{
        const {googleId, email, name, familyName} = response.profileObj
        const userInfo = {googleId: googleId, email: email, fullName: name, surname: familyName}
        loginRegisterUser(userInfo);
    }   
    const responseGoogleFail=(response)=>{} 

    return (
        <div className="navbar-container">
            <div style={mainBgStyleContainer}>
                <img src={mainBgUp} style={mainBgStyleImg} className="mainBgStyle-navbar" alt="#"/>
            </div>
            <ul className="navbar-elements">
                <div className="left-half">
                        <Link draggable="false" className="ics-uplb-caption" to="/home">
                            <span className="ics-caption">Institute of Computer Science Online Library</span>
                            <span className="uplb-caption">University of the Philippines Los Baños</span>
                        </Link>
                </div>
                <div className="right-half">
                    <div className="loginIconContainer">
                        <div>
                            <i className="fa fa-lg fa-sign-in" aria-hidden="true"/>
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

const navBarAnimation=()=>{
    // whole navbar container
    gsap.timeline({
        scrollTrigger: {trigger: ".navbar-container", start:"top top", end:"bottom 10px", scrub:0}    
    }).to('.navbar-container',{yPercent:"-55",backgroundColor:"#e0e0e0",
    boxShadow: "4px 4px 8px 0 rgba(0, 0, 0, 0.65),-8px -8px 12px 0 rgba(255, 255, 255, 0.8)",borderRadius:"5px"
    })
    
    gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"top top", end:"bottom 10px", scrub:0}    
    }).to('.left-half',{boxShadow: "4px 4px 5px 0 rgba(0, 0, 0, 0.45),-8px -8px 12px 0 rgba(255, 255, 255, 0.8)"})
    
    gsap.timeline({
        scrollTrigger: {trigger: ".navbar-container", start:"top top", end:"bottom 10px", scrub:0}    
    }).to('.mainBgStyle-navbar',{opacity:0})
    
    gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"top top", end:"bottom 10px", scrub:0,}}).from('.ics-caption',{fontSize:"30px", color:"white"})

    gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"top top", end:"bottom 10px", scrub:0,}}).from('.uplb-caption',{color:"white"})
    gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"top top", end:"bottom 10px", scrub:0,}}).from('.loginIconContainer',{
    boxShadow:"none",
    })

}


const mainBgStyleContainer = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:-1,
    overflow:"hidden"
}

const mainBgStyleImg = {
    position:"relative",
    height:"100%",
    width:"100%",
    objectFit:"cover",
    filter:"blur(3px) brightness(100%)",
    transform:"scale(1.02)",
}