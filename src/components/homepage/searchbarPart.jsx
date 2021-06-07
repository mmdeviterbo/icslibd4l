import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import searchBg from '../../assets/searchBg_4.png';
import homepageBg from '../../assets/homepage/homepage-bg.png';
import homeItem2 from '../../assets/homepage/homeItem-2.png';

import { gsap } from 'gsap';

export default function SearchbarPart({newsRef, latestAcqRef, browseRef}){
    const [localSearch, setLocalSearch] = useState("");
    const [filterTag, setFilterTag] = useState("any");
    const history = useHistory();

    useEffect(()=>{
        animateSearchBox();
    },[]);

    const handleForm=(e)=>{
        e.preventDefault();
        let tempStr = localSearch.trim();
    
        if(tempStr.length!==0  && (localSearch.replace(/^\s+/, '').replace(/\s+$/, '')!=='')){
            history.push(`/search?type=${filterTag}&search=${tempStr}`);
        }
    }

    const scrollIntoBrowse=()=> history.push('/browse-special-problems');
    const scrollIntoLatestAcq=()=> latestAcqRef.current && latestAcqRef.current.scrollIntoView({behavior:"smooth",block:"start"});
    const scrollIntoNews=()=> newsRef.current && newsRef.current.scrollIntoView({behavior:"smooth",block:"start"});

    return (
        <form onSubmit={handleForm} style={advanceSearch} className="searchMainContainer">
            <img draggable="false" src={searchBg} style={mainBgSearchStyle} alt="#"/>
            <div style={titleSearchContainer} className="titleSearchContainer">
                <h2>insert our logo here and/or projectName</h2>
                <button type="button" style={buttonSelect} className="btn btn-warning homeBtn" onClick={scrollIntoBrowse}>
                    <i className="fa fa-lg fa-list-ul mr-2"/>
                    BROWSE
                </button>
                <button type="button" style={buttonSelect} className="btn btn-warning homeBtn" onClick={scrollIntoLatestAcq}>
                    <i className="fa fa-lg fa-file mr-2"/>
                    LATEST ACQUISITIONS</button>
                <button type="button" style={buttonSelect} className="btn btn-warning homeBtn" onClick={scrollIntoNews}>
                    <i className="fa fa-lg fa-globe mr-2"/>
                    NEWS
                </button>
            </div>

            <div style={searchBoxContainer}  className="searchBoxContainer">

                <div style={inputCaptionContainer} className="hoverForImagesVector">
                    <div style={alignSearchIcon} className="formSearchHomepage">
                        <input style={inputSearch} type="text" className="form-control removeOutline" 
                            placeholder="Search for Books, Theses, and Special Problems" autoFocus
                            value={localSearch} onChange={e=>setLocalSearch(e.currentTarget.value)}/>
                        <div style={dropDownFilter}><DropdownFilter setFilterTag={setFilterTag} filterTag={filterTag}/></div>
                    </div>
                    <p style={{color:"white", fontSize:"calc(11px + 0.2vw)", zIndex:1, textAlign:"center"}} className="searchCaption">
                        Search a collection of books, thesis, or SP using keywords
                    </p>
                </div>
                
                <div style={homepageBgParent} className="homepageBgParent">
                    <img draggable="false" className="homeItem homeItem2" src={homeItem2} style={homeItems} alt="#"/> 
                    <img draggable="false" src={homepageBg} style={homepageBgStyle} alt="#"/> 
                </div>
            </div>
        </form>
    )
}

const DropdownFilter = ({setFilterTag, filterTag}) =>{ 
    const options = [
        { key: 1, text: 'Any', value: 'any'},
        { key: 2, text: 'Books', value: 'books' },
        { key: 3, text: 'Special Problem', value: 'special problem' },
        { key: 4, text: 'Thesis', value: 'thesis' },
    ]
    const handleChange=(e, data)=>setFilterTag(data.value);
    return(
        <Dropdown text='' button style={{"whiteSpace": "nowrap", padding:"19px", borderRadius:"0px", backgroundColor:"white"}}
        onChange={handleChange} options={options} value={filterTag}/>
    )
}
const dropDownFilter = {
    height:"100%",
    width:"calc(100px + 1vw)",
    margin:0,
    padding:0,
    zIndex:1000
}
const alignSearchIcon = {
    zIndex:100,
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
    overflow:"hidden",
    transition:"1s",
    "WebkitTouchCallout": "none",  
	"WebkitUserSelect": "none", 
	"KhtmlUserSelect": "none", 
	"MozUserSelect": "none",
	"MsUserSelect": "none",  
	"userSelect": "none", 
}
const titleSearchContainer ={
    border:"1px solid black",
    position:"relative",
    width:"45%",
    height:"90%",
    background: "rgb(0, 103, 161)",
    boxShadow:"4px 4px 7px 0 rgba(0, 0, 0, 0.55),-1px -2px 4px 0 rgba(255, 255, 255, 0.3)",
    borderRadius: "10px  0px  0px  10px",    
    transition:"1s",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    padding:"0 9%",
    gap:"4%"
}

const searchBoxContainer = {
    position:"relative",
    width:"45%",
    height:"90%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"center",
    background:"rgba(0,0,0,0.90)",          
    transition:"1s",
    borderRadius: "2px",
    boxShadow:"1px 1px 4px black"    
}

const inputCaptionContainer = {
    width:"100%",
    height:"40%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    gap:"3%"
}

const inputSearch={
    width:"100%",
    padding:"26px 25px",
    margin:0,
    borderRadius:"5px 0 0 5px",
    backgroundColor:"rgba(255,255,255,0.98)",
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

const buttonSelect = {
    background: "#e0e0e0",
    border:"none",
    color:"black",
    borderRadius:"7px",
    fontSize:"calc(13px + 0.2vw)",
    padding:"calc(15px + 0.3vw)",
    transition:"0.5s",
    zIndex:1000,
    boxShadow: "1px 1px 2px black"
}

const animateSearchBox=()=>{
    gsap.from('.formSearchHomepage',{opacity:0,yPercent:200, duration:0.6,scale:0.1});
    gsap.from('.homepageBgParent',{duration:0.8,scale:0.85});
    gsap.from('.homeItem2',{duration:0.6,scale:4, opacity:0.8});
}
