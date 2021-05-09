import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import searchBg from '../../assets/searchBg_4.png';

export default function SearchbarPart({onSearch}){
    const [localSearch, setLocalSearch] = useState("");
    const history = useHistory();

    const handleForm=(e)=>{
        e.preventDefault();
        if(localSearch.length!==0){
            onSearch(localSearch);
            history.push("/parallax");
        }
    }
    return (
        <form onSubmit={handleForm} style={advanceSearch} className="searchMainContainer">
            <img src={searchBg} style={searchBgStyle} alt="#"/>
                <div style={searchBoxContainer}  className="searchBoxContainer">
                    <div style={inputSearchContainer}>
                        <div className="input-group">
                            <input style={inputSearch} type="text" className="form-control formSearchHomepage" 
                            placeholder="Search for Books, Theses, and Special Problems" 
                            value={localSearch}
                            onChange={e=>setLocalSearch(e.currentTarget.value)}/>
                    </div>
                </div>
            </div>
        </form>
    )
}

const advanceSearch = {
    position:"relative",
    "height":"100vh",
    "display":"flex",
    flexDirection:"column",
    "justifyContent":"center",
    "alignItems":"flex-start",
    "padding":0,
    overflowX:"hidden",
    transition:"1s",
}
const searchBoxContainer = {
    marginLeft:"3%",
    border:"5px solid black",
    width:"80%",
    height:"85%",

    display:"grid",
    placeItems:"center",

    background:"#0067A1",
    borderRadius:"10px",
    boxShadow: "3px 3px 10px 0 rgba(0, 0, 0, 0.6),-8px -8px 12px 0 rgba(255, 255, 255, 0.7)",
    transition:"1s",
}
const inputSearchContainer = {
    width:"100%",
    borderRadius:"15px",
    boxShadow: "inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5)",
}

const inputSearch={
    padding:"30px 25px 30px 25px",
    borderRadius:"15px",
    backgroundColor:"rgba(255,255,255,0.8)",
}
const searchBgStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:"-1",
}

