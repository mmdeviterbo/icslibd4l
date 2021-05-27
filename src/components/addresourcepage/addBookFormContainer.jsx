import React, { Component, useState } from 'react'
import Select from 'react-select'
import ResourceServices from '../../services/resourceService'
import { ItemGroup } from 'semantic-ui-react'
import ResourcePrimaryInfo from './primaryInfoForm'
import SaveResourceButton from './saveResourceButton'

const courseList = [
    {value:'cmsc12', label:'CMSC 12'},
    {value:'cmsc21', label:'CMSC 21'},
    {value:'cmsc22', label:'CMSC 22'},
    {value:'cmsc23', label:'CMSC 23'},
    {value:'cmsc56', label:'CMSC 56'},
    {value:'cmsc57', label:'CMSC 57'},
    {value:'cmsc123', label:'CMSC 123'},
    {value:'cmsc124', label:'CMSC 124'},
    {value:'cmsc125', label:'CMSC 125'},
    {value:'cmsc127', label:'CMSC 127'},
    {value:'cmsc128', label:'CMSC 128'},
    {value:'cmsc130', label:'CMSC 130'},
    {value:'cmsc131', label:'CMSC 131'},
    {value:'cmsc132', label:'CMSC 132'},
    {value:'cmsc141', label:'CMSC 141'},
    {value:'cmsc142', label:'CMSC 142'},
    {value:'cmsc150', label:'CMSC 150'},
    {value:'cmsc170', label:'CMSC 170'},
    {value:'cmsc173', label:'CMSC 173'},
    {value:'cmsc180', label:'CMSC 180'},
    {value:'cmsc190', label:'CMSC 190'},
    {value:'cmsc191', label:'CMSC 191'},
]

const AddBookFormContainer = () => {
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState(0)
    const [id, setId] = useState()
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

    // const handleIdChange = (evt) => {
    //     setTitle(evt.target.value)
    // }

    // const [primaryInfo, setPrimaryInfo] = useState()
    
    // const callbackFunction = (info) => {
    //     setPrimaryInfo(info)
    // }

    // setPrimaryInfo(ResourcePrimaryInfo.sendData)

    // console.log(primaryInfo)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userInput = {
        }
        try{
            const {resourceData} = await ResourceServices.addResource(userInput)
            alert('New book has been added to the library.')
        } catch(err){
            console.log(err);
            alert("Please enter all required fields.")
        }
    }

    const BookInfoForm = () => {
        return(
            <>
                <h2><b>Book</b></h2>
                <hr/>

                {/* <form id = "bookForm"> */}
                    <div class = "primaryfields">
                            <label for="bookISBN">ISBN: &nbsp; </label>
                            <input type = "text" id = "bookISBN" />
                    </div>
                    <div class = "primaryfields">
                            <label for="physDescription">Physical Description: &nbsp; </label>
                            <textarea id = "physDescription"/>
                    </div>
                    ...or upload description file:
                    <input type = "file" class="resourcefiles" id="uploadDesc"/>
                    <br/><br/><br/><br/>
                    <div class = "primaryfields">
                            <label for="availBookCopies">No. of copies available: &nbsp; </label>
                            <input type = "number" id ="availBookCopies"/>
                    </div>

                    <div className = "bookRelatedCourses">
                        <br/>
                        Related Courses:
                        <Select id = "relatedCourses"
                                isMulti
                                placeholder={"Courses..."}
                                options = {courseList}>
                        </Select>
                    </div>

                {/* </form> */}
            </>
        );
    }

    return(
        <div className = "add-res-form-cont">

            <form id="mainAddBookForm" onSubmit ={handleSubmit}>
            {/* Primary  Info */}
                <div className = "res-primary-info">
                    <ResourcePrimaryInfo/>
                </div>
                
                <div className = "popupForm" id="bookForm">
                    <BookInfoForm/>
                    <br/><br/>
                    <SaveResourceButton/>
                </div>
            </form>

        </div>
    );
}

export default AddBookFormContainer
