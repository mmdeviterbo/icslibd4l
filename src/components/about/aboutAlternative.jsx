import React, {useEffect} from 'react'
import logo from '../../assets/mainlogo/icslibd4l.webp'
import {gsap} from 'gsap';
import '../../styles/aboutStyle/aboutStyle.css';

export default function AboutAlternative() {

    useEffect(()=>{
        gsap.from('.logoAboutClass',{
            duration:0.8,
            scale:0.9,
        })
    },[])

    return (
        <div className="aboutMainContainer">
            <div className="bookContainer">
                <div className="leftHalfContainer">
                    <img className="logoAboutClass" src={logo} alt="#"/>
                    <div className="textHolders">
                        <h1 style={{letterSpacing:"2px"}}>Analytica</h1>
                        <p>A Digital Library</p>
                    </div>
                </div>
                <div className="rightHalfContainer">
                    <img className="logoBgClass" src={logo} alt="#"/>
                    <div className="aboutTextContainer">
                        <p className="paragraphTextStyle">
                            The <strong>Analytica Digital Library</strong> is made for educational purposes only. Unoticed duplication or reproduction of materials is probihited without any permission from the UPLB ICS faculty.   
                        </p>
                        <p className="footerTextStyle">
                            &#169; CMSC 128. Introduction to Software Engineering. <br/>Section D-4L 2021
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
