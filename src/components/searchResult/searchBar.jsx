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
    borderRadius: "0",
    borderTop: "0",
    borderRight: "0",
    borderLeft: "0",
    borderColor: "gray",
    padding: "0.38vw",
    width: "95.3%",
    position:"relative",
    left:"-4vw"
}