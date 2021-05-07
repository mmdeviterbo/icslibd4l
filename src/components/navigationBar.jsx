import personService from '../services/personService'
import mainBgUp from '../assets/icslib.jpg';
import React, {useEffect} from 'react'
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import '../styles/homepageStyle.css';
import icsLogoImg from '../assets/icslogo.png';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)



export default function NavigationBar({loginRegisterUser}) {
    useEffect(()=>{
        navBarAnimation();
    },[])
    
    const responseGoogle=(response)=>{
        const {googleId, email, name, familyName} = response.profileObj
        const userInfo = {googleId: googleId, email: email, fullname: name, surname: familyName}
        loginRegisterUser(userInfo);
    }   

    return (
        <div className="navbar-container">
            <div style={mainBgStyleContainer}>
                <img src={mainBgUp} style={mainBgStyleImg} className="mainBgStyle-navbar" alt="#"/>
            </div>
            <ul className="navbar-elements">
                <div className="left-half">
                        <Link to="/home">
                            <img draggable="false" src={icsLogoImg} className="icslogo-img" alt="#"/>
                        </Link>
                        <Link draggable="false" className="ics-uplb-caption" to="/home">
                            <span className="ics-caption">Institute of Computer Science Online Library</span>
                            <span className="uplb-caption">University of the Philippines Los Baños</span>
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
    )
}

const navBarAnimation=()=>{
    // whole navbar container
    gsap.timeline({
        scrollTrigger: {trigger: ".navbar-container", start:"10px top", end:"bottom 10px", scrub:0}    
    }).to('.navbar-container',{yPercent:"-61"})

    gsap.timeline({
        scrollTrigger: {trigger: ".navbar-container", start:"10px top", end:"bottom 10px", scrub:0}    
    }).to('.mainBgStyle-navbar',{filter:"blur(0px) brightness(50%)", opacity:0.3})

    gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"10px top", end:"bottom 10px", scrub:0,}}).from('.icslogo-img',{opacity:0})
    
    gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"10px top", end:"bottom 10px", scrub:0,}}).from('.ics-caption',{fontSize:"30px", fontWeight:"700"})


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