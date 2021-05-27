import React, { useState } from 'react';

const ResourcePrimaryInfoForm = () =>{
    const [title, setTitle] = useState('')
    const [year, setYear] = useState(0)
    const [id, setId] = useState('')
    const [author_fname, setAuthorFName] = useState('')
    const [author_lname, setAuthorLName] = useState('')

    const primaryInfo = {
        title,
        year,
        id,
        author_fname,
        author_lname
    }

    // callback = primaryInfo

    // const sendData = (primaryInfo) => {
    //     return primaryInfo
    // }    

    // sendData(primaryInfo)

        return(
            <div id = "res-primary-info">
                    <h2><b>Primary Info</b></h2>
                    <hr/> 

                    <div class = "primaryfields">
                        <label for="resId">ID: &nbsp; </label>
                        <input type = "text" id = "resId" onChange = {(event) => {setId(event.target.value)}}/>
                        {/* <input type = "text" id = "resId" onChange = {props.onIdChange} value={props.id}/> */}
                    </div>

                    <div class = "primaryfields">
                        <label for="resTitle">Title: &nbsp; </label>
                        <input type = "text" id = "resTitle" onChange = {(event) => {setTitle(event.target.value)}}/>
                    </div>
                    
                    <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>Author(s):</h5>
                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorFN" onChange = {(event) => {setAuthorFName(event.target.value)}}/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorLN" onChange = {(event) => {setAuthorLName(event.target.value)}}/>
                    </div>

                    <button id="addAuthor">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Author
                    </button>
                    <br/><br/><br/>

                    <div class = "primaryfields">
                        <label for="resAuthor">Year Published: &nbsp; </label>
                        <input type = "number" id = "resAuthorLN" onChange = {(event) => {setYear(event.target.value)}}/>
                    </div>
            </div>
        )
        
    }

export default ResourcePrimaryInfoForm