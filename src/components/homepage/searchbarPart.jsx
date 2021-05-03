import React from 'react'


export default function SearchbarPart() {
    return (
        <div style={advanceSearch}>
            <div style={searchBoxContainer}>
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
    "height":"50vh",
    "display":"grid",
    "placeItems":"center",
    "padding":0,
}
const searchBoxContainer = {
    width:"45vw",
}
const inputSearch={
    padding:"30px 25px 30px 25px",
    borderRadius:"10px 0 0 10px"
}
const searchIcon = {
    backgroundColor:"#0067A1",
    borderRadius:"0 10px 10px 0"
}



