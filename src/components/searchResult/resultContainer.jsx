import React from 'react'
import {Link} from 'react-router-dom'

export default function ResultContainer({title, author, adviser, linkTo, publishDate}){
    return (
        <div style={resultMainContainer} class="resultMainContainer">
            <Link to={linkTo} style={resultLinkContainer}>
                <h3 style={resultTitle}>{title}</h3>
                <p style={authAdv}>{author.toString().replace(/,+/g,', ')}</p>
                <p style={authAdv}>Adviser/s: {adviser.toString().replace(/,+/g,', ')}</p><br/>
                <p style={resultBottomText}>Published in {publishDate}</p>
            </Link>
        </div>
    )
}

const resultMainContainer = {
    borderBottom:"1px solid gray",
    marginBottom:"5vh"
}

const resultLinkContainer = {
    width:"60vw",
    height:"auto"
}

const resultTitle = {
    color:"#0067A1"
}

const authAdv = {
    color: "gray",
    margin:0
}

const resultBottomText = {
    color: "black",
    fontSize:"0.85em",
    paddingBottom:"2vh"
}