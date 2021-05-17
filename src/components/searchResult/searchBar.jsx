import React from 'react';
// import styled from 'styled-components';

export default function SearchBar(){
    return (
        <input type='search' 
        className='search'
        placeholder= {"Search"}
        style={searchInput}
        //onChange = {} not yet getting inputs
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