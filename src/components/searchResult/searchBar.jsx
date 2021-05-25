import React from 'react';
// import styled from 'styled-components';

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
    padding: "5px",
    textIndent: "10px",
    width: "80%",
}