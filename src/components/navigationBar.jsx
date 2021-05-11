import personService from '../services/personService'
import React, {useEffect, useState} from 'react'
import GoogleLogin from 'react-google-login';
import {Link, useHistory} from 'react-router-dom';
import '../styles/homepageStyle.css';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)


export default function NavigationBar({loginRegisterUser, browseRef}) {
    const [classNavBar, setClassNavBar] = useState("navbar-container");
    const history = useHistory(); 

    useEffect(()=>{
        animationTitle(classNavBar);
    },[classNavBar])

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
        console.log(userInfo);
        // loginRegisterUser(userInfo);
    }   
    const responseGoogleFail=(response)=>{
        console.log("Fail: ");
        console.log(response.profileObj);
    } 
    const scrollToBrowse=()=> browseRef.current && browseRef.current.scrollIntoView({behavior:"smooth",block:"start"});

    // var provider = new firebase.auth.GoogleAuthProvider();

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
                    <div className="navItem" onClick={scrollToBrowse} style={{cursor:"pointer"}}>BROWSE</div>
                    <Link to="/browse" className="navItem">ABOUT</Link>                    
                    <GoogleLogin
                        clientId="157703212486-qm8nb25m86guqvsg4fhbtc9kl3sk6ubp.apps.googleusercontent.com"
                        clientSecret="u06bcQiePSj-3fbkdTxS0VUd"
                        buttonText="LOGIN"
                        onSuccess={responseGoogleSuccess}
                        onFailure={responseGoogleFail}
                        cookiePolicy={'single_host_origin'}
                        className="login-link"
                        hostedDomain={'up.edu.ph'}
                        icon={false}
                        style={false}/>
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

const animationTitle=(classNavBar)=>{
    gsap.from('.ics-caption',{xPercent:-20, duration:1});
    gsap.from('.uplb-caption',{xPercent:-20, duration:1.5});

    let tempClassName = "." + classNavBar;
    gsap.from(tempClassName,{yPercent:-50, duration:0.5});
}
