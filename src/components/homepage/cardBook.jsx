import React from 'react'
import {Link} from 'react-router-dom'

export default function CardBook({imageSrc, title, linkTo}) {
    return (
            <Link to={linkTo} className="cardContainer" style={cardContainer}>
                <div className="imgContainer" src={imageSrc} style={imgContainer}>
                    <img src={imageSrc} style={imgSrcStyle} alt="#"/>
                </div>
                <p style={{fontSize:"15px",padding:"7px"}}>{title}</p>
            </Link>
    )
}

const cardContainer = {
    height:"100%",
    width:"150px",   
    padding:0,
    color:"black",
    marginRight:"10px",
    transition:"0.3s",
    transform:"scale(1)",

}
const imgContainer = {
    height:"90%",
}
const imgSrcStyle={
    height:"100%",
    width:"100%",
    boxShadow:"1px 1px 5px 1px black"
}
