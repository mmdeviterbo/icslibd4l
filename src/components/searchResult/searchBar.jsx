import React, {useState} from 'react';

// import styled from 'styled-components';

export default function SearchBar(){

    return (
        <input type='search' 
        className='form-control removeOutline'
        placeholder= {"Search"}
        style={searchInput}
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