import personService from '../services/personService'
import React, {useEffect, useState} from 'react'
import GoogleLogin from 'react-google-login';
import {Link, useHistory} from 'react-router-dom';
import '../styles/homepageStyle.css';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)


export default function NavigationBar({loginRegisterUser, browseRef, user}) {
    const [classNavBar, setClassNavBar] = useState("navbar-container");
    const history = useHistory(); 

    useEffect(()=>{
        console.log("user: " + user);
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
        loginRegisterUser(userInfo);
    }   
    const responseGoogleFail=(response)=>{
        console.log("Fail: ");
    } 
    const scrollToBrowse=()=> browseRef.current && browseRef.current.scrollIntoView({behavior:"smooth",block:"start"});

    const logInButton=()=>{
        return(
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
        );
    }
    const profileDisplay = ()=>{
        return(
            <p className="login-link">
                <i className="fa fa-2x fa-user" aria-hidden="true"/>
                {user.fullName}
            </p>
        );
    }

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
                    <div className="navItem" onClick={scrollToBrowse} style={{cursor:"pointer"}}>
                        <i className="fa fa-2x fa-search" aria-hidden="true"/>
                        BROWSE
                    </div>
                    <Link to="/browse" className="navItem">
                        <i className="fa fa-2x fa-info-circle" aria-hidden="true"/>
                        ABOUT
                    </Link>
                    {(user && profileDisplay()) || logInButton()}
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
    gsap.from(tempClassName,{yPercent:-50, duration:0.8});
}
