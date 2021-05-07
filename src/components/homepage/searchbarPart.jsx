import React from 'react'
import searchBg from '../../assets/searchBg.jpg';

export default function SearchbarPart() {
    return (
        <div style={advanceSearch} className="searchMainContainer">
            <img src={searchBg} style={searchBgStyle} alt="#"/>
            <div style={searchBoxContainer}  className="searchBoxContainer">
                <div className="input-group">
                    <input style={inputSearch} type="text" className="form-control" 
                    placeholder="Search for Books, Theses, and Special Problems"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" style={searchIcon}>
                            <i className="fa fa-lg fa-search"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const advanceSearch = {
    position:"relative",
    fontFamily: 'Montserrat',
    "height":"100vh",
    "display":"flex",
    flexDirection:"column",
    "justifyContent":"center",
    "AlignItems":"center",
    "padding":0,
    overflowX:"hidden",
    transition:"1s"
}
const searchBoxContainer = {
    width:"100%",
    height:"100%",
    transition:"1s",
    display:"grid",
    placeItems:"center",
    padding:"0px 20vw",
    margin:"0"
}
const inputSearch={
    padding:"30px 25px 30px 25px",
    borderRadius:"5px 0 0 5px",
    backgroundColor:"rgba(255,255,255,0.6)",
    boxShadow:"15px 20px 30px black"
}
const searchIcon = {
    backgroundColor:"#0067A1",
    borderRadius:"0 5px 5px 0",
    boxShadow:"10px 10px 20px black"
}

const searchBgStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:"-1"
}

