import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import searchBg from '../../assets/searchBg_4.png';
import homepageBg from '../../assets/homepage/homepage-bg.png';
import homeItem1 from '../../assets/homepage/homeItem-1.png';
import homeItem2 from '../../assets/homepage/homeItem-2.png';
import homeItem3 from '../../assets/homepage/homeItem-3.png';
import homeItem4 from '../../assets/homepage/homeItem-4.png';

import {gsap} from 'gsap';

export default function SearchbarPart({searchRef}){
    const [localSearch, setLocalSearch] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const history = useHistory();

    useEffect(()=>{
        animateSearchBox();
    },[]);

    const handleForm=(e)=>{
        e.preventDefault();
        const tempStr = localSearch.replace(/\s/g,'_'); 
        if(tempStr.length!==0){
            if(filterTag.length!==0){
                console.log(`/search/${filterTag}/${tempStr}`);
                history.push(`/search/${filterTag}/${tempStr}`);
            }else{
                console.log(`/search/any/${tempStr}`);
                history.push(`/search/any/${tempStr}`);
            }
        }
    }

    return (
        <form onSubmit={handleForm} style={advanceSearch} className="searchMainContainer" ref={searchRef}>
            <img draggable="false" src={searchBg} style={mainBgSearchStyle} alt="#"/>
            <div style={titleSearchContainer} className="titleSearchContainer"></div>

            <div style={searchBoxContainer}  className="searchBoxContainer">
                <div style={alignSearchIcon} className="formSearchHomepage">
                    <input style={inputSearch} type="text" className="form-control removeOutline" 
                        placeholder="Search for Books, Theses, and Special Problems" 
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
    alignItems:"flex-start",
    background:"#0067A150",         
    transition:"1s",
    borderRadius: "2px  7px  7px  2px",    
    boxShadow: "6px 6px 10px 0 rgba(0, 0, 0, 0.40), -6px -6px 10px 0 rgba(255, 255, 255, 0.05)",
}

const inputSearch={
    width:"100%",
    padding:"25px 25px",
    margin:0,
    borderRadius:"5px 0 0 5px",
    backgroundColor:"rgba(255,255,255,0.4)",
    border:"0",
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