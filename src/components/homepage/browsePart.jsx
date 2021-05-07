import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';

import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)



export default function BrowsePart() {
    useEffect(()=>{
        animateBrowse();
    })

    const animateOnClick=(nameClass)=>{
        const tempNameClass = "." + nameClass;
        
    }

    
    return (
        <div className="browsePartContainer" style={browsePartContainer}>
            <Link className="browseBox browseboxBooks" style={browseBox} to='/home'
                onClick={()=>animateOnClick("browseboxBooks")}>
                    <div style={imgContainer} className="imgBooksContainer">
                        <img src="https://img.icons8.com/ios/64/000000/book-stack.png" alt="#"
                            style={imgStyle} className="imgBooksBefore"/>
                        <img src="https://img.icons8.com/ios-filled/64/000000/book-stack.png" alt="#"
                            style={imgStyleHover} className="imgBooksHover"/>
                    </div>
                    <p style={titleSource}>Books</p>
            </Link>
            
            <Link className="browseBox browseboxTheses" style={browseBox} to='/home'
                onClick={()=>animateOnClick("browseboxTheses")}>
                    <div style={imgContainer} className="imgThesesContainer">
                        <img src="https://img.icons8.com/ios/64/000000/agreement.png" alt="#"
                            style={imgStyle} className="imgThesesBefore"/>
                        <img src="https://img.icons8.com/ios-filled/64/000000/agreement.png" alt="#"
                            style={imgStyleHover} className="imgThesesHover"/>
                    </div>
                    <p style={titleSource}>Theses</p>
            </Link>
            <Link className="browseBox browseboxSP" style={browseBox} to='/home'
                onClick={()=>animateOnClick("browseboxSP")}>
                    <div style={imgContainer} className="imgSPContainer">
                        <img src="https://img.icons8.com/ios/50/000000/new-file.png" alt="#"
                            style={imgStyle} className="imgSPBefore"/>
                        <img src="https://img.icons8.com/ios-filled/50/000000/new-file.png" alt="#"
                            style={imgStyleHover} className="imgSPHover"/>
                    </div>
                    <p style={titleSource}>Special Problem</p>
            </Link>
        </div>
    )
}

const animateBrowse=()=>{
        let t1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".browsePartContainer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }    
        })
        
        let t2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".browsePartContainer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }    
        })
        let t3 = gsap.timeline({
            scrollTrigger: {
                trigger: ".browsePartContainer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }    
        })
        t1.from('.browseboxBooks',{xPercent:-270});
        t2.from('.browseboxSP',{xPercent:270});    
        t3.from('.browseboxTheses',{yPercent:-150});    
}


const browsePartContainer={
    overflow:"hidden",
    fontFamily: 'Montserrat',
    minHeight:"100vh",
    padding:"20px 10px",
    display:"flex",
    "gap":"20px",
    justifyContent:"space-evenly",
    alignItems:"center",
    background:"white",
    transition: "0.5s",
}
const browseBox = {
    borderRadius:"20px",
    height:"40vh",
    width:"40vh",
    border:"2px solid black",
    cursor:"pointer",
    backgroundColor:"white",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center",
    boxShadow:"1px 1px 10px black",
    fontWeight:"700",
    fontSize:"18px",
    fontColor:"black",
    textDecoration:"none",
    transition: "0.5s"
}
const imgContainer = {
    position:"relative",
    height:"44%",
    width:"45%",
}

const imgStyle = {
    height:"100%",
    width:"100%",
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