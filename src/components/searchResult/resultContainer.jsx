import React from 'react'
import {Link} from 'react-router-dom'

export default function ResultContainer({title, authors, id, publishDate}){//  
    //====================================
    // making url for a specific resource
    let urlHolder='';
    if(id.slice(0,3)==="SPT"){ 
        //sp/thesis resource
        urlHolder="/sp-thesis/"+id
    }else{ 
        //book resource
        urlHolder="/book/"+id
    }
    //====================================


    //===================================================
    // for getting needed data in authors array
    let authorString = '';
    for (let i=0; i < authors.length; i++) {
        if(i!==(authors.length)-1)
            authorString+=authors[i].author_name + ", ";
        else
            authorString+=authors[i].author_name;
    }
    //===================================================

    return (
        <div style={resultMainContainer} className="resultMainContainer">
            <Link to={urlHolder} style={resultLinkContainer}>
                <h3 style={resultTitle}>{title}</h3>
                <p style={authAdv}>{authorString}</p><br/>
                <p style={resultBottomText}>Published in {publishDate.toString().length === 4 ? publishDate.toString() : publishDate.toString().slice(0,4)}</p>
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