import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {gsap} from 'gsap';

export default function BrowsePart() {
    useEffect(()=>{
        gsap.from('.browseboxBooks',{
            duration:0.6,
            x:-1000
        });
        gsap.from('.browseboxSP',{
            duration:0.6,
            x:1000
        });
    },[])

    const animateOnClick=(nameClass)=>{
        const tempNameClass = "." + nameClass;
        
    }

    
    return (
        <div className="browsePartContainer" style={browsePartContainer}>
            <Link className="browseBox browseboxBooks" style={browseBox} to='/home'
                onClick={()=>animateOnClick("browseboxBooks")}>Books</Link>
            <Link className="browseBox browseboxThesis" style={browseBox} to='/home'
                onClick={()=>animateOnClick("browseboxThesis")}>Thesis</Link>
            <Link className="browseBox browseboxSP" style={browseBox} to='/home'
                onClick={()=>animateOnClick("browseboxSP")}>Special Problem</Link>
        </div>
    )
}

const browsePartContainer={
    minHeight:"40vh",
    padding:"20px 10px",
    display:"flex",
    "gap":"20px",
    justifyContent:"center",
    alignItems:"center",
    background:"white",
    transition: "0.5s"

}
const browseBox = {
    borderRadius:"20px",
    height:"200px",
    width:"200px",
    border:"0.5px solid black",
    cursor:"pointer",
    background: "linear-gradient(90deg, rgba(252,252,252,1) 40%, rgba(255,255,255,1) 95%, rgba(255,244,244,1) 100%)",
    display:"grid",
    placeItems:"center",
    boxShadow:"2px 1px 4px 1px black",
    fontWeight:"700",
    fontSize:"18px",
    fontColor:"black",
    textDecoration:"none",
    transition: "0.5s"

}
