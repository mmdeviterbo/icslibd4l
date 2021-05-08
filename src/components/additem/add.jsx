import { useState, useEffect } from 'react';
import React from 'react';
import http from '../../services/httpService';
import {apiEndpoint} from '../../config.json';

export default function AddItem() {
    const [format, setFormat] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState(0)

    const [thesisList, setThesisList] = useState([])

    // useEffect(() => {
    //     http.get(apiEndpoint+'/ViewThesis').then((response) => {
    //       setThesisList(response.data)
    //     })
    //   }, [])

    const addItem = (event) => {
        event.preventDefault()
        http.post(apiEndpoint+'/addSPThesis', {
          title: title,
          author: author,
          year: year
        })
        console.log(format+','+title+','+author+','+year)
      }

    return (
        <div className="additem-container">
            <form onSubmit={addItem}>
                <h6>Format</h6>
                <select value={format}>
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
            
            <h1>Sp/Thesis</h1>
            {thesisList.map((val, key) => {
                return <div>
                <h1>{val.title}</h1>
                <h1>{val.author}</h1>
                
                </div>
            })}
        </div>
    );
}

const additemContainer = {
    fontFamily: 'Montserrat',
    // "minHeight": "45vh",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
    // "filter": "brightness(1)",
    // transition:"0.8s"
}

const styles = {
    select:{
        width:'100%',
        maxWidth:600
    },
}