import React, {useState, useEffect} from 'react'
import icsLogo from '../assets/icslogo.png'
import {Link, useHistory} from 'react-router-dom';

export default function Footer() {
    const [classFooter, setClassNavBar] = useState("footer-container");
    const history = useHistory(); 
    useEffect(() => {
      return history.listen((location) => {
          if(location.pathname==="/not-found") setClassNavBar("footer-container-none");
          else setClassNavBar("footer-container");
       }) 
    },[history]) 

    useEffect(()=>{
        if(window.location.pathname==="/not-found") setClassNavBar("footer-container-none");
        else setClassNavBar("footer-container");
    },[])

    return (
        <div className={classFooter} style={footerContainer}>
            <div className="left-footer-container" style={leftFooterContainer}>
                <div style={avoidCopyText}>
                    <p style={icsTextFooter}><strong>Institute of Computer Science</strong></p>
                    <p style={textFooter}>College of Arts and Sciences</p>
                    <p style={textFooter}>University of the Philippines Los Baños</p>
                </div>
            </div>
            <div className="right-footer-container" style={rightFooterContainer}>
                <img draggable="false" src={icsLogo} style={icslogo} alt="#"/>
                <p>FOLLOW US</p>
                <div>
                    <i style={icons} className="fa fa-lg fa-facebook"
                    onClick={() => openInNewTab('https://www.facebook.com/ICS.UPLB')}
                    />
                    <i style={icons} className="fa fa-lg fa-twitter-square"
                    onClick={() => openInNewTab('https://twitter.com/ics_uplb')}
                    />
                </div>
            </div>
            <div style={{flexGrow:1}}>
                <Link to="/about" style={{color:"white"}}><strong>ABOUT</strong></Link>
                <p>ICS Online Library D4L 2021</p>
            </div>

        </div>
    )
}

const footerContainer={
    "minHeight":"220px",
    "width":"100%",
    "display":"flex",
    "justifyContent":"space-around",
    "alignItems":"center",
    "color":"white",
    "backgroundColor":"black",
    "fontFamily": 'Montserrat',
    "boxShadow": "1px 1px 4px 0 rgba(255, 255, 255, 0.2) inset,-8px -8px 12px 0 rgba(0, 0, 0, .25) inset"
}

const leftFooterContainer = {
    "flexGrow":"1",
    "display":"flex",
    "flexDirection":"column",
    "justifyContent":"center",
    "alignItems":"center",
    "lineHeight":"0.3"
}
const rightFooterContainer = {
    "flexGrow":"2",
    "display":"flex",
    "justifyContent":"center",
    "flexDirection":"column",
    "alignItems":"center",
}
const icsTextFooter={
    "fontSize":"24px",
    "fontWeight":"550"
}
const textFooter={
    "fontSize":"14px",
}
const icslogo={
    "height":"100px",
    "width":"100px",
    "margin":"8px"
}
const icons = {
    "margin":"6px",
    "cursor":"pointer",
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