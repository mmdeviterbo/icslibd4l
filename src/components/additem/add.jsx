import { useState, useEffect } from 'react';
import React from 'react';
import Axios from 'axios'
import ItemDetails from './itemdetails'
import Select from "react-select";

// const options = [
//     { value: 'sp-thesis', label: 'Sp/Thesis' },
//     { value: 'books', label: 'Books' },
// ]
/* <h5>Item Format</h5>
<Select options={options} onChange={}/> */

export default function AddItem() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState(0)

    const [thesisList, setThesisList] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/ViewThesis').then((response) => {
          setThesisList(response.data)
        })
      }, [])

    const addItem = () => {
        Axios.post('https://localhost:3001/addThesis', {
          title: title,
          author: author,
          year: year
        })
      }

    return (
        <div className="additem-container">
            <h6>Format</h6>
            <select>
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

            {/* <h6>Adviser</h6>
            <input 
                type="text" 
                onChange = {(event) => {
                    setAdviser(event.target.value)
                }}
            /> */}

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

            <button onClick={addItem}>Add Item</button>
            
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