import React from 'react'
import {Link} from 'react-router-dom'
export default function BrowsePart() {
    return (
        <div className="browsPart" style={browsePartContainer}>
            <Link className="browseBooks" style={browseBox} to='/home'>Books</Link>
            <Link className="browseThesis" style={browseBox} to='/home'>Thesis</Link>
            <Link className="browseSP" style={browseBox} to='/home'>Special Problem</Link>
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
    background:"white"
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
    textDecoration:"none"
}
