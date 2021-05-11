import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import searchBg from '../../assets/searchBg_4.png';
import homepageBg from '../../assets/homepage/homepage-bg.png';
import homeItem1 from '../../assets/homepage/homeItem-1.png';
import homeItem2 from '../../assets/homepage/homeItem-2.png';
import homeItem3 from '../../assets/homepage/homeItem-3.png';
import homeItem4 from '../../assets/homepage/homeItem-4.png';

import {gsap} from 'gsap';

export default function SearchbarPart({searchRef}){
    const [localSearch, setLocalSearch] = useState("");
    const history = useHistory();

    useEffect(()=>{
        animateSearchBox();
    },[]);

    const handleForm=(e)=>{
        e.preventDefault();
        if(localSearch.length!==0){
            // history.push("/parallax");
        }
    }


    return (
        <form onSubmit={handleForm} style={advanceSearch} className="searchMainContainer" ref={searchRef}>
            <img draggable="false" src={searchBg} style={mainBgSearchStyle} alt="#"/>
            <div style={titleSearchContainer} className="titleSearchContainer">
                
            </div>

            <div style={searchBoxContainer}  className="searchBoxContainer">
                <div className="input-group searchInputGroup" style={inputSearchContainer}>
                    <input style={inputSearch} type="text" className="form-control formSearchHomepage" 
                    placeholder="Search for Books, Theses, and Special Problems" 
                    value={localSearch}
                    onChange={e=>setLocalSearch(e.currentTarget.value)}/>
                </div>
                <div style={homepageBgParent} className="homepageBgParent">
                    <img draggable="false" className="homeItem homeItem1" src={homeItem1} style={homeItems} alt="#"/> 
                    <img draggable="false" className="homeItem homeItem2" src={homeItem2} style={homeItems} alt="#"/> 
                    <img draggable="false" className="homeItem homeItem3" src={homeItem3} style={homeItems} alt="#"/> 
                    <img draggable="false" className="homeItem homeItem4" src={homeItem4} style={homeItems} alt="#"/> 
                    <img draggable="false" src={homepageBg} style={homepageBgStyle} alt="#"/> 
                </div>
            </div>

        </form>
    )
}

const advanceSearch = {
    position:"relative",
    height:"90vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"0px 2vw",
    overflowX:"hidden",
    transition:"1s",
    "WebkitTouchCallout": "none",  
	"WebkitUserSelect": "none", 
	"KhtmlUserSelect": "none", 
	"MozUserSelect": "none",
	"MsUserSelect": "none",  
	"userSelect": "none", 
}
const titleSearchContainer ={
    width:"40%",
    height:"80%",
    background:"#0067A1",
    borderRadius: "7px  0px  0px  7px",    
    boxShadow: "6px 6px 10px 0 rgba(0, 0, 0, 0.35), -6px -6px 10px 0 rgba(255, 255, 255, 0.5)",
    zIndex:0
}
const searchBoxContainer = {
    position:"relative",
    width:"52%",
    height:"90%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#0067A150",         
    transition:"1s",
    borderRadius: "2px  7px  7px  2px",    
    boxShadow: "6px 6px 10px 0 rgba(0, 0, 0, 0.40), -6px -6px 10px 0 rgba(255, 255, 255, 0.05)",
}
const inputSearchContainer = {
    height:"70%",
    width:"90%",
    padding:"0 15%"
}

const inputSearch={
    width:"40%",
    padding:"30px 25px 30px 25px",
    borderRadius:"50px",
    backgroundColor:"rgba(255,255,255,0.9)",
    boxShadow: "inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5)",
    zIndex:10
}
const mainBgSearchStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:"-1",
}
const homepageBgParent = {
    position:"absolute",
    height:"100%",
    width:"100%",
    display:"flex",
    justifyContent:"center", 
    alignItems:"flex-end",
    overflow:"hidden"
}

const homepageBgStyle = {
    maxHeight:"70%",
    maxWidth:"70%",
}

const homeItems = {
    position:"absolute",
    maxHeight:"70%",
    maxWidth:"70%", 
    opacity:0.5, 
    zIndex:1,
    transition:"0.4s",
    transform:"scale(1)"
};

const animateSearchBox=()=>{
    gsap.from('.formSearchHomepage',{opacity:0,yPercent:200, duration:0.6,scale:0.1});
    gsap.from('.homepageBgParent',{duration:0.8,scale:0.85});
    gsap.from('.homeItem1',{duration:0.6,scale:4, opacity:0.8});
    gsap.from('.homeItem2',{duration:0.6,scale:4, opacity:0.8});
    gsap.from('.homeItem3',{duration:0.6,scale:3, opacity:0.8});
    gsap.from('.homeItem4',{duration:0.6,scale:3, opacity:0.8});
}