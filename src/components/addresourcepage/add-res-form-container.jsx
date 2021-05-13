import React, { Component } from 'react'
import Select from 'react-select'

const BookInfoForm = () => {
    return(
        <>
         <h2><b>Book</b></h2>
                <hr/>

                <form id = "bookForm">
                    <div class = "primaryfields">
                            <label for="bookISBN">ISBN: &nbsp; </label>
                            <input type = "text" id = "bookISBN"/>
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
                                defaultValue={"Courses..."}
                                options = {courseList}>
                        </Select>
                    </div>

                </form>
        </>
    );
}

const SPThesisInfoForm = () => {
    return(
        <>
         <h2><b>SP / Thesis</b></h2>
                <hr/>

                <form>
                    <h5>Adviser(s):</h5>
                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorFN"/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorLN"/>
                    </div>

                    <button id="addAdviser">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Adviser
                    </button>

                    <br/><br/>

                
                    <div class = "spthesisfiles">
                        <h5>Upload Abstract</h5>
                        <input type="file" class="resourcefiles" id="spthesisAbstract"/>
                    </div>
                    
                    <div class = "spthesisfiles">
                        <h5>Upload Manuscript</h5>
                        <input type="file" class="resourcefiles" id="spthesisManuscript"/>
                    </div>

                    <div class = "spthesisfiles">
                        <h5>Upload Journal</h5>
                        <input type="file" class="resourcefiles" id="spthesisJournal"/>
                    </div>

                    <div class = "spthesisfiles">
                        <h5>Upload Poster</h5>
                        <input type="file" class="resourcefiles" id="spthesisPoster"/>
                    </div>

                </form>
        </>
    );
}

const ResourcePrimaryInfoForm = () =>{
    return(
        <>
            <form id = "createForm">
                    <h2><b>Primary Info</b></h2>
                    <hr/> 

                    <div class = "primaryfields">
                        <label for="resId">ID: &nbsp; </label>
                        <input type = "text" id = "resId"/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resTitle">Title: &nbsp; </label>
                        <input type = "text" id = "resTitle"/>
                    </div>
                    
                    <h5>Author(s):</h5>
                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorFN"/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorLN"/>
                    </div>

                    <button id="addAuthor">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Author
                    </button>
                    <br/><br/><br/>
                    <div class = "resClassification-container">
                        <p>Classification: &nbsp;   </p>
                        <Select id = "resClassification"
                                defaultValue ={"Select..."} 
                                options = {classificationOptions}
                        ></Select>
                    </div>

                </form>
        </>
    )
}

const classificationOptions = [
    {value: 'sp', label: 'Special Problem'},
    {value: 'thesis', label:'Thesis'},
    {value: 'book', label: 'Book'}
]

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

const SaveResourceButton = () => {
    return(
        <button type="submit" id="saveResource">
                Save
        </button>
    )
}

export default function AddResFormContainer {
    return(
        <div className = "add-res-form-cont">

            {/* Primary  Info */}
            <div className = "res-primary-info">
                
                <ResourcePrimaryInfoForm/>
                <br/><br/>
                <SaveResourceButton/>
            </div>

            {/* SP/Thesis info or Book, pops up once selected */}
            <div className = "popupForm" id="bookForm">
                <SPThesisInfoForm/>
            </div>

            <div className = "popupForm" id="spthesisForm">
               <BookInfoForm/>
            </div>

        </div>
    );
}
