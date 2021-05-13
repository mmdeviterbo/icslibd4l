import React,{useState} from 'react'
import {Link} from 'react-router-dom';

import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import searchBg from '../../assets/searchBg_4.png';
import ParallaxEffect from './parallaxEffect';
gsap.registerPlugin(ScrollTrigger)



export default function BrowsePart({browseRef}) {
    const [isHoverTitle,setIsHoverTitle] = useState("BROWSE");
    
    return (
        <div className="browsePartContainer" style={browsePartContainer} ref={browseRef}>
            <img src={searchBg} style={searchBgStyle} alt="#"/>
            <div style={colorBrowseContainer} className="colorBrowseContainer">
                <h1 style={titleOrientation}>{isHoverTitle}</h1>
            </div>
            <div style={designBoxContainer} className="designBoxContainer"><ParallaxEffect/></div>
            
            <div style={browseBoxContainer} className="browseBoxContainer">
                <Link className="browseBox browseboxBooks" style={browseBox} to='/home' draggable={false} 
                onMouseEnter={()=>setIsHoverTitle("BOOK")} onMouseLeave={()=>setIsHoverTitle("BROWSE")}>
                    <div style={imgContainer} className="imgBooksContainer">
                        <img src="https://img.icons8.com/ios/64/000000/book-stack.png" alt="#" draggable={false} 
                            style={imgStyle} className="imgBooksBefore"/>
                        <img src="https://img.icons8.com/ios-filled/64/000000/book-stack.png" alt="#" draggable={false} 
                            style={imgStyleHover} className="imgBooksHover"/>
                    </div>
                    <p style={titleSource}>Books</p>
                </Link>
                <Link className="browseBox browseboxTheses" style={browseBox} to='/home' draggable={false} 
                onMouseEnter={()=>setIsHoverTitle("THESIS")} onMouseLeave={()=>setIsHoverTitle("BROWSE")}>
                        <div style={imgContainer} className="imgThesesContainer">
                            <img src="https://img.icons8.com/ios/64/000000/agreement.png" alt="#" draggable={false} 
                                style={imgStyle} className="imgThesesBefore"/>
                            <img src="https://img.icons8.com/ios-filled/64/000000/agreement.png" alt="#" draggable={false} 
                                style={imgStyleHover} className="imgThesesHover"/>
                        </div>
                        <p style={titleSource}>Theses</p>
                </Link>
                <Link className="browseBox browseboxSP" style={browseBox} to='/home' draggable={false} 
                onMouseEnter={()=>setIsHoverTitle("SP")} onMouseLeave={()=>setIsHoverTitle("BROWSE")}>
                        <div style={imgContainer} className="imgSPContainer">
                            <img src="https://img.icons8.com/ios/50/000000/new-file.png" alt="#" draggable={false} 
                                style={imgStyle} className="imgSPBefore"/>
                            <img src="https://img.icons8.com/ios-filled/50/000000/new-file.png" alt="#" draggable={false} 
                                style={imgStyleHover} className="imgSPHover"/>
                        </div>
                        <p style={titleSource}>Special Problems</p>
                </Link>
            </div>
        </div>
    )
}

const browsePartContainer={
    position:"relative",
    minHeight:"100vh",
    display:"flex",
    transition: "0.5s",
    justifyContent:"center",
    alignItems:"center",
    "WebkitUserSelect": "none",
    "WebkitTouchCallout": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "UserSelect": "none",
}
const browseBoxContainer={
    width:"40%",
    overflow:"hidden",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
}
const colorBrowseContainer = {
    position:"absolute",
    height:"75%",
    width:"70%",
    right:"5%",
    background:"#0067A1",
    borderRadius:"7px",
    boxShadow: "2px 5px 30px 0 rgba(0, 0, 0, 0.8), -6px -6px 22px 0 rgba(255, 255, 255, 0.8)",
    display:"flex",
    justifyContent:"center",
}

const titleOrientation = {
    writingMode: "vertical-rl",
    textOrientation: "upright",
    color:"white",
    fontSize:"70px",
    fontWeight:900,
    height:"100%",
    background:"rgba(0,0,0,1)",
    textAlign:"center",
    margin:0,
}

const designBoxContainer = {
    width:"60%",
}

const searchBgStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:"-1",
    transform:"scaleY(-1)",
}
    

const browseBox = {
    borderRadius:"200px",
    height:"28vh",
    width:"28vh",
    cursor:"pointer",
    background: "#e0e0e0",
    boxShadow: "3px 3px 2px 0 rgba(0, 0, 0, 0.2), -3px -3px 2px 0 rgba(255, 255, 255, 0.3)",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    fontWeight:"700",
    fontSize:"16px",
    transition: "0.5s",
    margin:"8px",
    tranform:"scale(1)"
}
const imgContainer = {
    position:"relative",
    height:"40%",
    width:"41%",
}

const imgStyle = {
    height:"95%",
    width:"95%",
    position:"absolute",
}
const imgStyleHover = {
    height:"100%",
    width:"100%",
    position:"absolute",
    display:"none"
}
const titleSource = {
    color:"black", 
    padding:0,
    margin:0,
}