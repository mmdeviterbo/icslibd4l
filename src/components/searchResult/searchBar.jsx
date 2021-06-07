import React from 'react';

export default function SearchBar({searchFilter, setSearchFilter}){
    return (
        <input type='search' 
        className='form-control removeOutline'
        placeholder= {"Search"}
        style={searchInput}
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        />
    )
}

const searchInput = {
    border: "0",
    borderRadius: "10px",
    padding: "0.38vw",
    textIndent: "0.76vw",
    width: "95.3%",
    position:"relative",
    left:"-4vw"
}