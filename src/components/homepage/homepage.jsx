import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';


export default function Homepage() {
    return (
        <div className="homepage-container">
            <div style={advanceSearch}>
                        

                <div style={searchBoxContainer}>
                    <form>
                        <div className="form-group" style={searchBox}>
                            <input className="form-control input-lg" id="inputlg"
                            type="text" placeholder="Search for Books, Theses, and Special Problems"/>
                            {/* <span><i className="fa fa-lg fa-search"/></span> */}
                        </div>
                    </form>
                </div>
            </div>
            <div className="browseResources-homepage">
            </div>
        </div>
    )
}

const advanceSearch = {
    "height":"55vh",
    "display":"grid",
    "placeItems":"center",
    "padding":0
}
const searchBoxContainer = {
    width:"35vw",
    height:"100px",
}
const searchBox = {
    width:"100%",
}