import { useState, useEffect } from 'react';
import React from 'react';
import ResourceServices from '../../services/resourceService';
import ViewResource from './view';

export default function AddResource() {
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState(0)
    const [sp_thesis_id, setId] = useState('')
    const [journal, setJournal] = useState('')
    const [manuscript, setManuscript] = useState('')
    const [poster, setPoster] = useState('')
    const [source_code, setSourceCode] = useState('')
    const [abstract, setAbstract] = useState('')
    const [sp_thesis_keyword, setKeyword] = useState('')

    const [author_fname, setAuthorFname] = useState('')
    const [author_lname, setAuthorLname] = useState('')
    const [adviser_fname, setAdviserFname] = useState('')
    const [adviser_lname, setAdviserLname] = useState('')
    
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const userInput = {
            sp_thesis_id,
            type,
            title,
            abstract,
            year,
            source_code,
            manuscript,
            journal,
            poster
        }

        const authorName = {
            sp_thesis_id,
            author_fname, 
            author_lname
        }

        const adviserName = {
            sp_thesis_id,
            adviser_fname, 
            adviser_lname
        }

        const keyWord = {
            sp_thesis_id,
            sp_thesis_keyword
        }

        const {resourceData} = await ResourceServices.addResource(userInput)
        const {authorFullName} = await ResourceServices.addAuthor(authorName)
        const {adviserFullName} = await ResourceServices.addAdviser(adviserName)
        const {resourceKeyword} = await ResourceServices.addKeyword(keyWord)
        // console.log(resourceData)
    }


    return (
        <div className="additem-container">
            <form onSubmit={handleSubmit}>
                <h6>Type</h6>
                <select onChange = {(event) => {
                        setType(event.target.value)
                    }}>
                    <option value="sp">SP</option>
                    <option value="thesis">Thesis</option>
                    <option value="book">Book</option>
                </select>

                <h6>Title</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setTitle(event.target.value)
                    }}
                />
                <br />
                <br />
                <h6>Author</h6>
                First Name <input 
                    type="text"
                    onChange = {(event) => {
                        setAuthorFname(event.target.value)
                    }}
                />
                Last Name <input 
                    type="text"
                    onChange = {(event) => {
                        setAuthorLname(event.target.value)
                    }}
                />
                <br />
                <br />
                <h6>Adviser</h6>
                First Name <input 
                    type="text"
                    onChange = {(event) => {
                        setAdviserFname(event.target.value)
                    }}
                />
                Last Name <input 
                    type="text"
                    onChange = {(event) => {
                        setAdviserLname(event.target.value)
                    }}
                />
                <br />
                <br />
                <h6>Publication Year</h6>
                <input 
                    type="number" 
                    onChange = {(event) => {
                        setYear(event.target.value)
                    }}
                />

                <h6>ID</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setId(event.target.value)
                    }}
                />

                <h6>Source Code</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setSourceCode(event.target.value)
                    }}
                />

                <h6>Abstract</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setAbstract(event.target.value)
                    }}
                />

                <h6>Manuscript</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setManuscript(event.target.value)
                    }}
                />

                <h6>Journal</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setJournal(event.target.value)
                    }}
                />

                <h6>Poster</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setPoster(event.target.value)
                    }}
                />

                <h6>Keywords</h6>
                <input 
                    type="text"
                    onChange = {(event) => {
                        setKeyword(event.target.value)
                    }}
                />
                <button>Add Item</button>
            </form>            
        </div>

    );
}