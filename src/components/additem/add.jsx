import { useState, useEffect } from 'react';
import React from 'react';
import {apiEndpoint} from '../../config.json';
import http from '../../services/httpService';
import ResourceService from '../../services/resourceService';
import ViewResource from './view';

export default function AddResource() {
    const [format, setFormat] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState(0)
    // const [thesisList, setThesisList] = useState([])

    // useEffect(() => {
    //     http.get(apiEndpoint+'/viewSPThesis').then((response) => {
    //     //   setThesisList(response.data)
    //         console.log('view data,,')
    //     })
    //   }, [])

    return (
        <div className="additem-container">
            <form onSubmit={ResourceService.addResource}>
                <h6>Format</h6>
                <select onChange = {(event) => {
                        setFormat(event.target.value)
                    }}>
                    <option value="sp-thesis">SP/Thesis</option>
                    <option value="book">Book</option>
                </select>
                <h6>Title</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setTitle(event.target.value)
                    }}
                />

                <h6>Author</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setAuthor(event.target.value)
                    }}
                />

                <h6>Publication Year</h6>
                <input 
                    type="text" 
                    onChange = {(event) => {
                        setYear(event.target.value)
                    }}
                />

                {/* <div className="textAreaContainer"> 
                    <textarea
                        // value={this.state.textAreaValue}
                        // onChange={this.handleChange}
                        rows={10}
                    />
                </div> */}

                <button>Add Item</button>
            </form>
            {/* <h1>Sp/Thesis</h1>
            {thesisList.map((val, key) => {
                return <div>
                <h1>{val.title}</h1>
                <h1>{val.author}</h1>
                
                </div>
            })} */}
            
        </div>

    );
}

const additemContainer = {
    fontFamily: 'Montserrat',
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
}

const styles = {
    select:{
        width:'100%',
        maxWidth:600
    },
}