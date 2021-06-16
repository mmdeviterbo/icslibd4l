import React, {useState, useEffect} from 'react'
import logo from '../assets/mainlogo/icslibd4l.png';
import {Link, useHistory} from 'react-router-dom';

export default function Footer() {
    const [classFooter, setClassNavBar] = useState("footer-container");
    const history = useHistory(); 
    useEffect(() => {
      return history.listen((location) => {
          if(["/not-found", "/unauthorized"].includes(location.pathname)) setClassNavBar("footer-container-none");
          else setClassNavBar("footer-container");
       }) 
    },[history]) 

    useEffect(()=>{
        if(["/not-found", "/unauthorized"].includes(window.location.pathname)) setClassNavBar("footer-container-none");
        else setClassNavBar("footer-container");
    },[])

    return (
        <div className={classFooter} style={footerContainer}>
            <div className="left-footer-container" style={leftFooterContainer}>
                <div style={avoidCopyText}>
                    <p style={icsTextFooter}><strong>Institute of Computer Science</strong></p>
                    <p style={textFooter}>College of Arts and Sciences</p>
                    <p style={textFooter}>University of the Philippines Los Baños</p>
                    <div>
                        <i style={icons} className="fa fa-lg fa-facebook"
                        onClick={() => openInNewTab('https://www.facebook.com/ICS.UPLB')}
                        />
                        <i style={icons} className="fa fa-lg fa-twitter-square"
                        onClick={() => openInNewTab('https://twitter.com/ics_uplb')}
                        />
                    </div>
                </div>
            </div>
            <div style={{flexGrow:1, display:"flex", alignItems:"center", flexDirection:"column"}}>
                <img className="logoFooter" draggable="false" src={logo} style={logoFooter} alt="#" onClick={()=>history.push("/about")}/>
                <p><Link to="/about" style={{color:"white"}}><strong>ABOUT</strong></Link></p>
                <p>ICS Online Library D4L 2021</p>
            </div>

        </div>
    )
}

const footerContainer={
    minHeight:"220px",
    width:"100%",
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center",
    color:"white",
    backgroundColor:"black",
    padding:"0 5%"
}

const leftFooterContainer = {
    "flexGrow":"1",
    "display":"flex",
    "flexDirection":"column",
    "justifyContent":"center",
    "alignItems":"center",
    "lineHeight":"0.3"
}

const icsTextFooter={
    "fontSize":"24px",
    "fontWeight":"550"
}
const textFooter={
    "fontSize":"14px",
}
const logoFooter={
    height:"90px",
    width:"100px",
    margin:"8px",
    cursor:"pointer",
    transition:"0.4s"
}
const icons = {
    margin:"6px",
    cursor:"pointer",
    transition:"0.3s"
}

//opening external links on ICS facebook and ICS twitter
const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

const avoidCopyText = {
    "WebkitTouchCallout": "none",  
	"WebkitUserSelect": "none", 
	"KhtmlUserSelect": "none", 
	"MozUserSelect": "none",
	"MsUserSelect": "none",  
	"userSelect": "none", 
}


//responsive to mobile devices - located on homepageStyle.css