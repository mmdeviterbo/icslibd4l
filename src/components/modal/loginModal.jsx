import React, {useState, useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import GoogleLogin from "react-google-login";
import {gsap} from 'gsap';
import PersonService from '../../services/personService';
import {jwtPrivateKey} from '../../config.json'

export default function LoginModal() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    useEffect(()=>{
        gsap.from('.animationLabel',{ duration:1, x:-50});
        gsap.from('.signInLabel',{duration:1.3, x:-100});
        gsap.from('.circleOne',{duration:1, x:-50,y:60, scale:0.5});
        gsap.from('.circleTwo',{duration:1, x:50,y:-60, scale:2});
    },[])

    const responseGoogleSuccess = async(response) => {
        const { googleId, email, name, familyName } = response.profileObj;
        const userInfo = {
            googleId: googleId,
            email: email,
            fullName: name,
            surname: familyName,
        };
        try{
            const { data } = await PersonService.loginRegisterUser(userInfo);
            localStorage.setItem(jwtPrivateKey, data); //set token
            
            // get current param, it must stay on where the user's current path
            window.location = window.location.pathname;
        }catch(err){}
    };
    const responseGoogleFail = (response) => {};

    const logInButton = () => {
        return (
            <GoogleLogin
                clientId="157703212486-qm8nb25m86guqvsg4fhbtc9kl3sk6ubp.apps.googleusercontent.com"
                clientSecret="u06bcQiePSj-3fbkdTxS0VUd"
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFail}
                cookiePolicy={"single_host_origin"}
                className="loginModal"
                hostedDomain={"up.edu.ph"}
                icon={false}>
                <div className="animationLabel">
                    <i className="fa fa-lg fa-sign-in mr-2" />
                    <span className="login-link-label">Login</span>
                </div>
            </GoogleLogin>
        );
    };

      return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered

        >
            <Modal.Body style={{padding:"5%", minHeight:"35vh", display:"grid", placeItems:"center", position:"relative", overflow:"hidden"}}>
                <h1 className="signInLabel" style={{zIndex:10}}>Sign in to continue ...</h1>
                {logInButton()}
                <div className="circleOne" style={circleOneStyle}></div>
                <div className="circleTwo" style={circleTwoStyle}></div>
            </Modal.Body>
        </Modal>
        </>
    )
}

const circleOneStyle = {
    background: "#0067a1",  
    borderRadius:"10%", 
    height:"60%", 
    width:"40%", 
    position:"absolute", 
    zIndex:0,
    opacity:0.09,
    left:"-5%",
    bottom:"-5%"  
}
const circleTwoStyle = {
    ...circleOneStyle,
    left:"80%",
    bottom:"60%"
}