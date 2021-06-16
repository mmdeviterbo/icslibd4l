import React from 'react';

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 * Custom Filter Searchbar
 *
 * props:
 * - searchFilter = variable for the value of the filter
 * - setSearchFilter = fxn to set the state of searchFilter
 ******************************************************/

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
    width: "100%",
    position:"relative",
    left:"-4vw"
}