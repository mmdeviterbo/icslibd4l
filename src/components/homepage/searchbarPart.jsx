import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import searchBg from '../../assets/searchBg_4.png';
import { gsap, Power3 } from 'gsap';

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
            <div style={searchBoxContainer}  className="searchBoxContainer">
                <div style={barStyle} className="barStyle"></div>
                <div style={barStyleOne} className="barStyle1"></div>
                <div style={barStyleTwo} className="barStyle"></div>
                <div style={barStyleThree} className="barStyle1"></div>
                <div style={barStyleFour} className="barStyle"></div>
                <div style={barStyleFive} className="barStyle1"></div>
                <div style={barStyleSix} className="barStyle"></div>

                <div style={blueBox}>
                    <div style={logoContainer}>
                        <p>ourProjectName and/or logo</p>
                    </div>
                </div>
                <div style={inputCaptionContainer} className="hoverForImagesVector">
                    <div style={alignSearchIcon} className="formSearchHomepage">
                        <input style={inputSearch} type="text" className="form-control removeOutline" 
                            placeholder="Search for Books, Theses, and Special Problems" autoFocus
                            value={localSearch} onChange={e=>setLocalSearch(e.currentTarget.value)}/>
                        <div style={dropDownFilter}><DropdownFilter setFilterTag={setFilterTag} filterTag={filterTag}/></div>
                    </div>
                </div>
                <p style={{color:"white", position:"absolute", fontSize:"calc(18px + 0.5vw)", zIndex:1000, textAlign:"center", bottom:"15%"}} className="searchCaption">
                        Search a collection of books, thesis, or SP using keywords
                </p>
            </div>
        </form>
    )
}

const DropdownFilter = ({setFilterTag, filterTag}) =>{ 
    const options = [
        { key: 1, text: 'Any', value: 'any'},
        { key: 2, text: 'Books', value: 'books' },
        // TOUCHED: value changed from special problem to sp for uniform URL manipulation
        { key: 3, text: 'Special Problem', value: 'sp' },
        { key: 4, text: 'Thesis', value: 'thesis' },
    ]
    const handleChange=(e, data)=>setFilterTag(data.value);
    return(
        <Dropdown text='' button style={{"whiteSpace": "nowrap", padding:"19px", borderRadius:"0 10px 10px 0", backgroundColor:"white"}}
        onChange={handleChange} options={options} value={filterTag}/>
    )
}
const dropDownFilter = {
    height:"100%",
    width:"calc(100px + 1vw)",
    margin:0,
    padding:0,
    zIndex:1000,
    borderRadius:"10px",
}
const alignSearchIcon = {
    zIndex:100,
    width:"85%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"15px",
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

const searchBoxContainer = {
    overflow:"hidden",
    position:"relative",
    width:"95%",
    height:"90%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    background:"rgba(0,0,0,0.90)",          
    transition:"1s",
    borderRadius: "10px",
    boxShadow:"1px 1px 4px black",
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
    height:"100%",
    fontSize:"150%",
    width:"100%",
    padding:"26px 25px",    
    margin:0,
    borderRadius:"10px 0 0 10px",
    backgroundColor:"rgba(255,255,255)",
    zIndex:10,
    border:0,
}
const mainBgSearchStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:"-1",
}

const blueBox = {
    position:"absolute",
    height:"50%",
    width:"100%",
    margin:0,
    top:0,
    background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(231,231,231,1) 100%)",
}
const logoContainer = {
    height:"50%",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}
const barStyle = {
    left:0,
    top:"40%",
    height:"10%",
    width:"70%",
    borderRadius:"0 100px 100px 0",
    position:"absolute",
    backgroundColor:"rgb(0, 103, 161, 1)",
    zIndex:10
}
const barStyleOne = {
    ...barStyle,
    top:"30%",
    width:"60%",
    backgroundColor:"rgb(0, 103, 161,0.85)",
    boxShadow:"1px 1px 3px black"
}
const barStyleTwo = {
    ...barStyle,
    top:"50%",
    width:"60%",
    backgroundColor:"rgb(0, 103, 161,0.8)",
    boxShadow:"1px 1px 3px black"
    
}
const barStyleThree = {
    ...barStyle,
    top:"60%",
    width:"20%",
    backgroundColor:"rgb(0, 103, 135)",
    boxShadow:"1px 1px 3px black"
}
const barStyleFour = {
    ...barStyle,
    top:"20%",
    width:"30%",
    backgroundColor:"rgb(0, 103, 161,0.6)",
    boxShadow:"1px 1px 3px black"
}
const barStyleFive = {
    ...barStyle,
    boxShadow:"1px 1px 3px black",
    backgroundColor:"rgb(0, 103, 161,0.8)",
    width:"10%",
    top:"69.5%",
}
const barStyleSix = {
    ...barStyle,
    boxShadow:"1px 1px 3px black",
    backgroundColor:"rgb(0, 103, 161,0.8)",
    width:"45%",
    top:"35%",  
}


const animateSearchBox=()=>{
    gsap.from('.formSearchHomepage',{opacity:0,yPercent:10, duration:0.5,scale:0.8, ease:Power3});
    gsap.from('.barStyle',{xPercent:-50, duration:0.8});
    gsap.from('.barStyle1',{xPercent:-30, duration:1});
}
