import React, {useEffect} from 'react'
import '../../styles/aboutStyle/aboutStyle.css';
import {gsap} from 'gsap';
import uplogo from '../../assets/uplogo.png';
import icslogo from '../../assets/icslogo.png';
import logo from '../../assets/mainlogo/icslibd4l.png';


export default function About({appRef}) {
  useEffect(()=>{
    appRef.current && appRef.current.scrollIntoView({behavior:"smooth",block:"start"});
    gsap.from('.paragraphContainer', {y:20,duration:1, opacity:0.5});
  },[appRef]);


  return (
    <div style={aboutMainContainer} className="aboutContainer">
        <div style={containersImg}>
          <div style={logoContainer}><img src={uplogo} style={imgStyle} alt="#" draggable={false}/></div>
          <div style={logoContainer}><img src={logo} style={imgStyle} alt="#" draggable={false}/></div>
          <div style={logoContainer}><img src={icslogo} style={imgStyle} alt="#" draggable={false}/></div>
        </div>
        <div style={paragraphContainer} className="paragraphContainer">
          <p style={paragraphStyle} className="aboutCaption">
            The <strong>Analytica Digital Library</strong> is made for educational purposes only. Unoticed duplication or reproduction of materials is probihited without any permission from the UPLB ICS faculty.   
          </p>
          <p style={namesStyle}>
            &#169; CMSC 128. Introduction to Software Engineering. Section D-4L 2021
          </p>
        </div>
    </div>
  )
}

const aboutMainContainer = {
  overflow:"hidden",
  position:"relative",
  height:"90vh",
  width:"100vw",
  padding:"0 20vw",
  margin:"auto",
  display:"flex",
  justifyContent:"center",
  alignItems:"flex-start",
  background:"black",
  flexDirection:"column",
}

const logoContainer = {
  position:"relative",
  height:"100%",
  width:"50%",
  display:"flex",
}
const containersImg = {
  display:"flex",
  height:"30%",
  margin:0,
  padding:0,
}
const paragraphContainer = {

}
const paragraphStyle = {
  color:"white",
  fontSize:"calc(10px + 0.5vw)",
  textAlign:"justify",
  margin:"100px 40px 0px 40px",
}

const imgStyle = {
  height:"100%",
  width:"100%",
  objectFit:"contain",
}

const namesStyle = {
  color:"white",
  margin:"100px 40px 0px 40px",

}
