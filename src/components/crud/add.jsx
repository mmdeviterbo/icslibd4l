import { useState } from 'react';
import React from 'react';
import ResourceServices from '../../services/resourceService';

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
    // multiple authors should be possible
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
            poster,
            adviser_fname, 
            adviser_lname,
            author_fname, 
            author_lname,
            sp_thesis_keyword
        }
        try{
            const {resourceData} = await ResourceServices.addResource(userInput)
            alert('New', type, ' has been added to the library.')
        } catch(err){
            console.log(err);
            alert("Please enter all required fields.")
        }
    }

    // gawing component to
    return (
        <div className="additem-container">
            <form onSubmit={handleSubmit}>
                <h6>Type</h6>
                <select onChange = {(event) => {
                        setType(event.target.value)
                    }}>
                    <option value="Special Problem">SP</option>
                    <option value="Thesis">Thesis</option>
                    {/* <option value="book">Book</option> */}
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

// const handleSubmit = (event) => {
//     console.log('HELLo')
//     event.preventDefault()
//     const submitBook = async (event) => {
//         console.log('submit book')
//         const userInput = {
//             book_id:id,
//             title,
//             abstract,
//             year,
//             author_fname, 
//             author_lname,
//             book_keyword : keyword
//         }
//         try{
//             const {bookData} = await ResourceServices.addResource(userInput)
//         } catch(err){
//             console.log(err);
//             alert("Please enter all required fields.")
//         }
//     }

//     const submitSpThesis = async (event) => {
//         console.log('submit sp')
//         event.preventDefault()
//         const userInput = {
//             sp_thesis_id : id,
//             type,
//             title,
//             abstract,
//             year,
//             source_code,
//             manuscript,
//             journal,
//             poster,
//             adviser_fname, 
//             adviser_lname,
//             author_fname, 
//             author_lname,
//             sp_thesis_keyword : keyword
//         }
//         try{
//             const {resourceData} = await ResourceServices.addResource(userInput)
//         } catch(err){
//             console.log(err);
//             alert("Please enter all required fields.")
//         }
//     }
//     const type = 'book' ? submitBook : submitSpThesis
// }