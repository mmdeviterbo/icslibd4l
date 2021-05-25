<<<<<<< HEAD
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
=======
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
>>>>>>> a0b5063ab401ce4ac3fe318e93aee75a547a07bd
}