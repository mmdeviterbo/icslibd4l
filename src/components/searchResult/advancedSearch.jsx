import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/searchResultStyle/advancedSearch.css';
import FilterSidebar from './filterSidebar';

export default function AdvancedSearch({appRef}){
    const [query, setQuery] = useState("");
    // const [filterTag, setFilterTag] = useState("");
    const history = useHistory();

    let url = window.location.href;
    let urlFilter = 'any';
    let urlQuery = '';

    url = url.replace('http://localhost:3000/search?',''); //edit before prod; url = url.replace(/\+/g,' ');

    if(url.split('&').length > 1){
        urlQuery = decodeURIComponent((url.split('&')[0]).replace('q=',''));
        urlFilter = (url.split('&')[1]).replace('f=','');
    }else
        urlQuery = decodeURIComponent((url.replace('q=','')));

    const handleForm=(e)=>{
        e.preventDefault();
        let tempStr = query.trim();
    
        if(tempStr.length!==0  && (query.replace(/^\s+/, '').replace(/\s+$/, '')!=='')){
            history.push(`/search?q=${tempStr}`);
            // if(filterTag.length!==0 && filterTag.length!==3) history.push(`/search?q=${tempStr}&filter=${filterTag}`);
            // else history.push(`/search?q=${tempStr}`);
        }
    }

    return (
        <form style={searchMainContainer} onSubmit={handleForm} className="searchMainContainer">
            <div style={topContainer} className="topContainer">
                <h3 style={textStyle}>Search results for:</h3>
                <div style={searchBarContainer} className="resultsSearchbar">
                    <i className="fa fa-search fa-2x" style={searchIcon} onClick={handleForm}></i>
                    <input style={inputSearch} type="text" className="form-control removeOutline" defaultValue={urlQuery} onChange={e=>setQuery(e.target.value)} placeholder="Search for Books, Theses, and Special Problems" />
                </div>
            </div>

            <div style={bottomContainer}>
                <div style={filtersContaner}>
                    <FilterSidebar/>
                </div>

                <div style={resultsContainer}>

                </div>
            </div>
        </form>
    )
}

const searchMainContainer = {
    overflow:"hidden",
    position:"relative",
    height:"90vh",
    width:"100vw",
    padding:"0 2vw",
    margin:"auto",
    display:"flex",
    alignItems:"flex-start",
    flexDirection:"column"
}

const topContainer = {
    position:"relative",
    height:"auto",
    width: "96vw",
    justifyContent:"center",
    alignItems:"center",
    padding:"2.5vw 5vw 0 5vw",
    overflow:"hidden",
    borderBottom:"2px solid gainsboro",
}

const searchBarContainer = {
    display:"flex",
}

const searchIcon = {
    marginTop:"0.5vw"
}

const inputSearch = {
    width:"100%",
    padding:"20px 20px",
    marginLeft:0,
    border:0,
}

const bottomContainer = { 
    width: "96vw",
    height:"10vw", //change to auto later
    display:"flex",
}

const filtersContaner = {
    width:"24vw",
    height:"auto"
}

const resultsContainer = {
    width:"72vw",
    height:"10vw",
    // background:"lightblue",
}

const textStyle = {
    "WebkitTouchCallout": "none",  
    "WebkitUserSelect": "none", 
    "KhtmlUserSelect": "none", 
    "MozUserSelect": "none",
    "MsUserSelect": "none",  
    "userSelect": "none",
}