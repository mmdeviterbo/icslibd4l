import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import searchBg from '../../assets/searchBg_4.png';
import homepageBg from '../../assets/homepage/homepage-bg.png';
import homeItem1 from '../../assets/homepage/homeItem-1.png';
import homeItem2 from '../../assets/homepage/homeItem-2.png';
import homeItem3 from '../../assets/homepage/homeItem-3.png';
import homeItem4 from '../../assets/homepage/homeItem-4.png';

import {gsap, Power3} from 'gsap';

export default function SearchbarPart({newsRef, latestAcqRef, browseRef}){
    const [localSearch, setLocalSearch] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const history = useHistory();

    useEffect(()=>{
        animateSearchBox();
    },[]);

    const handleForm=(e)=>{
        e.preventDefault();
        const tempStr = localSearch.replace(/\s/g,'_'); 
        if(tempStr.length!==0 && (localSearch.replace(/^\s+/, '').replace(/\s+$/, '')!=='')){
            if(filterTag.length!==0) history.push(`/search/${filterTag}/${tempStr}`);
            else history.push(`/search/any/${tempStr}`);
        }
    }

    const scrollIntoBrowse=()=> browseRef.current && browseRef.current.scrollIntoView({behavior:"smooth",block:"start"});
    const scrollIntoLatestAcq=()=> latestAcqRef.current && latestAcqRef.current.scrollIntoView({behavior:"smooth",block:"start"});
    const scrollIntoNews=()=> newsRef.current && newsRef.current.scrollIntoView({behavior:"smooth",block:"start"});

    return (
        <form onSubmit={handleForm} style={advanceSearch} className="searchMainContainer">
            <img draggable="false" src={searchBg} style={mainBgSearchStyle} alt="#"/>
            <div style={titleSearchContainer} className="titleSearchContainer">
                <div style={textStylesContainer}>
                    <div style={uplbContainerStyle} className="searchUPanimation">
                        <p style={uplbStyle}>UNIVERSITY</p>
                        <p style={uplbStyle}>OF</p>
                        <p style={uplbStyle}>THE</p>
                        <p style={uplbStyle}>PHILIPPINES</p>
                        <p style={uplbStyle}>Los Baños</p>
                    </div>
                    <div style={icsStyle}><p className="searchAnimationICS">Institute of Computer Science Online Library</p></div>
                </div>
                <div style={buttonsContainer} className="buttonsSearchContainer">
                    <button style={buttonSelect} className="btn btn-warning" onClick={scrollIntoBrowse}>
                        <i className="fa fa-lg fa-list-ul mr-2"/>
                        BROWSE
                    </button>
                    <button style={buttonSelect} className="btn btn-warning" onClick={scrollIntoLatestAcq}>
                        <i className="fa fa-lg fa-file mr-2"/>
                        LATEST ACQUISITIONS</button>
                    <button style={buttonSelect} className="btn btn-warning" onClick={scrollIntoNews}>
                        <i className="fa fa-lg fa-globe mr-2"/>
                        NEWS
                    </button>
                </div>
            </div>

            <div style={searchBoxContainer}  className="searchBoxContainer">
                <div style={alignSearchIcon} className="formSearchHomepage">
                    <input style={inputSearch} type="text" className="form-control removeOutline" 
                        placeholder="Search for Books, Theses, and Special Problems" autoFocus
                        value={localSearch} onChange={e=>setLocalSearch(e.currentTarget.value)}/>
                    <div style={dropDownFilter}><DropdownFilter setFilterTag={setFilterTag} filterTag={filterTag}/></div>
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

const DropdownFilter = ({setFilterTag, filterTag}) =>{ 
    const options = [
        { key: 1, text: 'Any', value: 'any'},
        { key: 2, text: 'Title', value: 'title' },
        { key: 3, text: 'Author', value: 'author' },
        { key: 4, text: 'Call number', value: 'callnumber' },
        { key: 5, text: 'ISBN/ISSN', value: 'isbnissn' },
    ]
    const handleChange=(e, data)=>setFilterTag(data.value);
    return(
        <Dropdown text='' button style={{"whiteSpace": "nowrap", padding:"19px", borderRadius:"0px", backgroundColor:"rgba(255,255,255,0.7)"}}
        onChange={handleChange} options={options} value={filterTag}/>
    )
}
const dropDownFilter = {
    height:"100%",
    width:"calc(100px + 1vw)",
    margin:0,
    padding:0,
}
const alignSearchIcon = {
    zIndex:100,
    top:"15%",
    position:"absolute",
    width:"80%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"5px"
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
    position:"relative",
    width:"40%",
    height:"75%",
    background: "linear-gradient(90deg, rgba(0,103,161,1) 0%, rgba(0,101,158,1) 43%, rgba(0,74,116,1) 100%)",
    boxShadow:"4px 4px 7px 0 rgba(0, 0, 0, 0.55),-1px -2px 4px 0 rgba(255, 255, 255, 0.3)",
    borderRadius: "4px  0px  0px  4px",    
    transition:"1s",
}
const textStylesContainer = {
    position:"absolute",
    height:"100%",
    width:"100%",
}
const uplbContainerStyle={
    textAlign:"left",
    padding:"5%"
}
const uplbStyle={
    position:"relative",
    fontSize:"50px",
    color:"white",
    fontWeight:"900",
    lineHeight:0.9,
    margin:0,
    padding:0,
}
const icsStyle={
    overflowX:"hidden",
    padding:"5px",
    color:"black",
    textAlign:"center",
    fontSize:"18px",
    fontWeight:900,
    background:"white",
    boxShadow:" 2px 2px 5px 0 rgba(0, 0, 0, 0.45),-1px -1px 3px 0 rgba(255, 255, 255, 0.1)",

}

const searchBoxContainer = {
    position:"relative",
    width:"40%",
    height:"90%",
    display:"flex",
    justifyContent:"center",
    alignItems:"flex-start",
    background:"rgba(0,0,0,0.90)",          
    transition:"1s",
    borderRadius: "50px",    
}

const inputSearch={
    width:"100%",
    padding:"25px 25px",
    margin:0,
    borderRadius:"5px 0 0 5px",
    backgroundColor:"rgba(255,255,255,1)",
    zIndex:10,
    border:0,
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

const buttonsContainer ={
    height:"40%",
    bottom:"0%",
    position:"absolute",
    width:"100%",
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center",

}
const buttonSelect = {
    background:"none",
    border:"2px solid white",
    color:"white",
    fontSize:"15px",
    padding:"8px",
    transition:"0.1s"
}

const animateSearchBox=()=>{
    gsap.from('.formSearchHomepage',{opacity:0,yPercent:200, duration:0.6,scale:0.1});
    gsap.from('.homepageBgParent',{duration:0.8,scale:0.85});
    gsap.from('.homeItem1',{duration:0.6,scale:4, opacity:0.8});
    gsap.from('.homeItem2',{duration:0.6,scale:4, opacity:0.8});
    gsap.from('.homeItem3',{duration:0.6,scale:3, opacity:0.8});
    gsap.from('.homeItem4',{duration:0.6,scale:3, opacity:0.8});
    gsap.from('.searchAnimationICS',{duration:0.3,x:40, ease: Power3});
    gsap.from('.searchUPanimation',{duration:0.5,x:-30, ease: Power3});
    
}