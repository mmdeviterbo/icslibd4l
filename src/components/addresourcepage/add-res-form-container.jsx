import { SignalCellularNoSimOutlined } from '@material-ui/icons'
import React, { Component, useState, useEffect } from 'react'
import Select from 'react-select'
import { ItemGroup } from 'semantic-ui-react'
import ResourceServices from '../../services/resourceService'

// LAST PUSH FROM MY BRANCH QWQ
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

export default function AddResFormContainer() {
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState(0)
    const [id, setId] = useState('')
    const [journal, setJournal] = useState('')
    const [manuscript, setManuscript] = useState('')
    const [poster, setPoster] = useState('')
    const [source_code, setSourceCode] = useState('')
    const [abstract, setAbstract] = useState('')
    const [keywords, setKeyword] = useState('')
    // multiple authors should be possible
    const [author, setAuthor] = useState({
        fname: '',
        lname: ''
    })
    const [adviser, setAdviser] = useState({
        fname: '',
        lname: ''
    })
    const [authorList, setAuthorList] = useState([])
    const [adviserList, setAdviserList] = useState([])

    const [courses, setCourses] = useState([])
    const [publisher, setPublisher] = useState('')
    const [numOfCopies, setNumOfCopies] = useState(0)
    const [description, setDescription] = useState('')

    useEffect(() => {
        function isInArray(arr, item) {
            if(arr.indexOf(item) > -1){
                console.log('true')
            } else {
                console.log('false')
            }
        }
        function updateList() {
            if(adviser.fname && adviser.lname){
                // console.log('adding', adviser.fname, adviser.lname);
                // isInArray(adviserList, adviser)
                console.log(adviserList.indexOf(adviser))
                setAdviserList([...adviserList, [adviser]])
            } else if(author.fname && author.lname){
                // console.log('adding', author.fname, author.lname);
                // isInArray(authorList, author)
                console.log(authorList.indexOf(author))
                setAuthorList([...authorList, [author]])
            }
        };
        updateList()
    }, [author, adviser])
    
    // console.log('author/s: ', authorList)
    // console.log('adviser/s: ', adviserList)
    const updateAdviserList = () => {
        if(adviser.fname && adviser.lname){
            console.log('adding', adviser.fname, adviser.lname);
            setAdviserList([...adviserList, [adviser]])
        }
    };

    const updateAuthorList = () => {
        if(author.fname && author.lname){
            console.log('adding', author.fname, author.lname);
            setAuthorList([...authorList, [author]])
        }
    };      
    
    const updateLists = () => {
        // e.preventDefault();
        updateAuthorList()
        updateAdviserList()
      };

    const addAuthor = e => {
        setAuthor({
          ...author,
          [e.target.name]: e.target.value
        })     
    };

    const addAdviser = e => {
        setAdviser({
          ...adviser,
          [e.target.name]: e.target.value
        })     
    };

    // console.log(authorList)
    // console.log(adviserList)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(authorList)
         console.log(adviserList)
        try{
            if(type == 'book') {
                const userInput = {
                    bookId : id,
                    title,
                    author,
                    subjects : courses,
                    physicalDesc : description,
                    publisher,
                    numberOfCopies : numOfCopies
                }
                const {resourceData} = await ResourceServices.addBook(userInput)
                alert("New book has been successfully added to the library")
            } else {
                const userInput = {
                    sp_thesis_id : id,
                    type,
                    title,
                    abstract,
                    year,
                    source_code,
                    manuscript,
                    journal,
                    poster,
                    advisers : adviserList,
                    authors : authorList,
                    keywords : keywords
                }
                const {data} = await ResourceServices.addSpThesis(userInput)
                // console.log(resourceData)
                alert("New", {type}, " has been successfully added to the library")
            }
        } catch(err){
            if (err.response && err.response.data) {
                alert(err.response.data.errorMessage) // some reason error message
            }
        }
    }

    // get input from type selection
    const handleChange = (e) => {
        setType(e.value)
    }
    // adds the courses on array
    const handleCourseChange = (newCourse) => {
        setCourses(newCourse)
    }

    const BookInfoForm = () => {
        return(
            <div className = "res-primary-info">
             <h2><b>Book</b></h2>
                    <hr/>
    
                    <form id = "bookForm" >
                        <div class = "primaryfields">
                                <label for="bookISBN">Publisher: &nbsp; </label>
                                <input type = "text" id = "bookpublisher" onChange = {(event) => {setPublisher(event.target.value)}}/>
                        </div>

                        <div class = "primaryfields">
                                <label for="physDescription">Physical Description: &nbsp; </label>
                                <textarea id = "physDescription" onChange = {(event) => {setDescription(event.target.value)}}/>
                        </div>
                        ...or upload description file:
                        <input type = "file" class="resourcefiles" id="uploadDesc"/>
                        <br/><br/><br/><br/>
                        <div class = "primaryfields">
                                <label for="availBookCopies">No. of copies available: &nbsp; </label>
                                <input type = "number" id ="availBookCopies" onChange = {(event) => {setNumOfCopies(event.target.value)}}/>
                        </div>
                        <div className = "bookRelatedCourses">
                            <br/>
                            Related Courses:
                            <Select id = "relatedCourses"
                                    isMulti
                                    defaultValue={"Courses..."}
                                    options = {courseList}
                                    onChange = {handleCourseChange}>
                            </Select>
                        </div>
    
                    </form>
            </div>
        );
    }
    
    const SPThesisInfoForm = () => {
        return(
            <div className = "res-primary-info">
             <h2><b>SP / Thesis</b></h2>
                    <hr/>
    
                    <form>
                        {/* <AddAuthorField/> */}
                        <h5>Adviser(s):</h5>
                        <div class = "primaryfields">
                            <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
                            <input 
                                type = "text" 
                                id = "resAuthorFN" 
                                name = "fname"
                                value = {adviser.fname}
                                onChange = {addAdviser}/>
                        </div>
    
                        <div class = "primaryfields">
                            <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
                            <input 
                                type = "text" 
                                id = "resAuthorLN" 
                                name = "lname"
                                value = {adviser.lname}
                                onChange = {addAdviser}/>
                                {/* {updateAuthorList()} */}
                        </div>
                        <button id="addAdviser">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            Add Adviser
                        </button>
    
                        <br/><br/>
    
                        {/* String inputs muna kasi yun yung nakalagay sa backend na part ngayon. Di pa nila nafi-figure out yung
                        file attachments as input. */}
                        <div class = "primaryfields">
                            <label for="resId">Abstract: &nbsp; </label>
                            <input type = "text" id = "resId" onChange = {(event) => {setAbstract(event.target.value)}}/>
                        </div>
    
                        <div class = "primaryfields">
                            <label for="resId">Manuscript: &nbsp; </label>
                            <input type = "text" id = "resId" onChange = {(event) => {setManuscript(event.target.value)}}/>
                        </div>
    
                        <div class = "primaryfields">
                            <label for="resId">Journal: &nbsp; </label>
                            <input type = "text" id = "resId" onChange = {(event) => {setJournal(event.target.value)}}/>
                        </div>
    
                        <div class = "primaryfields">
                            <label for="resId">Poster: &nbsp; </label>
                            <input type = "text" id = "resId" onChange = {(event) => {setPoster(event.target.value)}}/>
                        </div>

                        <div class = "primaryfields">
                            <label for="resId">Publication Year: &nbsp; </label>
                            <input type = "number" id = "resId" onChange = {(event) => {setYear(event.target.value)}}/>
                        </div>
                        
                        <div class = "primaryfields">
                            <label for="resId">Source Code: &nbsp; </label>
                            <input type = "text" id = "resId" onChange = {(event) => {setSourceCode(event.target.value)}}/>
                        </div>

                        <div class = "primaryfields">
                            <label for="resId">Keywords: &nbsp; </label>
                            <input type = "text" id = "resId" onChange = {(event) => {setKeyword(event.target.value)}}/>
                        </div>

                        {/* Uncomment this pag okay na yung file attachments for the backend part*/}
                         {/* <div class = "spthesisfiles">
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
                         </div> */}
                    </form>
            </div>
        );
    }

    // const ResourcePrimaryInfoForm = () =>{
    //     return(
    //         <div id = "res-primary-info">
    //                 <h2><b>Primary Info</b></h2>
    //                 <hr/> 

    //                 <div class = "primaryfields">
    //                     <label for="resId">ID/ISBN: &nbsp; </label>
    //                     <input type = "text" id = "resId" onChange = {(event) => {setId(event.target.value)}}/>
    //                     {/* <input type = "text" id = "resId" onChange = {props.onIdChange} value={props.id}/> */}
    //                 </div>

    //                 <div class = "primaryfields">
    //                     <label for="resTitle">Title: &nbsp; </label>
    //                     <input type = "text" id = "resTitle" onChange = {(event) => {setTitle(event.target.value)}}/>
    //                 </div>
                    
    //                 <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>Author(s):</h5>
    //                 <div class = "primaryfields">
    //                     <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
    //                     <input 
    //                         type = "text" 
    //                         id = "resAuthorFN"
    //                         name = "fname"
    //                         value = {author.fname}
    //                         onChange = {updateAuthorList}/>
    //                 </div>

    //                 <div class = "primaryfields">
    //                     <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
    //                     <input 
    //                         type = "text" 
    //                         id = "resAuthorLN"
    //                         name = "lname"
    //                         value = {author.lname}
    //                         onChange = {updateAuthorList}/>
    //                 </div>

    //                 <button id="addAuthor" >
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
    //                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    //                     </svg>
    //                     Add Author
    //                 </button>
    //                 <br/><br/><br/>

    //                 <div class = "primaryfields">
    //                     <label for="resAuthor">Year Published: &nbsp; </label>
    //                     <input type = "number" id = "resAuthorLN" onChange = {(event) => {setYear(event.target.value)}}/>
    //                 </div>
    //         </div>
    //     )      
    // }

    // Main add resource form container
    return(
        <div className = "add-res-form-cont">
            {/* Primary  Info */}
            <div className = "res-primary-info">
                <form id = "createForm" onSubmit={handleSubmit}>
                    <h2><b>Primary Info</b></h2>
                    <hr/> 

                    <div class = "primaryfields">
                        <label for="resId">ID/ISBN: &nbsp; </label>
                        <input type = "text" id = "resId" onChange = {(event) => {setId(event.target.value)}}/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resTitle">Title: &nbsp; </label>
                        <input type = "text" id = "resTitle" onChange = {(event) => {setTitle(event.target.value)}}/>
                    </div>
                    
                    {/* <AddAuthorField/> */}
                    <h5>Author(s):</h5>
                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
                        <input 
                            type = "text" 
                            id = "resAuthorFN" 
                            name = "fname"
                            value = {author.fname}
                            onChange = {addAuthor}/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
                        <input 
                            type = "text" 
                            id = "resAuthorLN"
                            name = "lname"
                            value = {author.lname}
                            onChange = {addAuthor}/>
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
                                value = {classificationOptions.find(obj => obj.value === type)}
                                onChange = {handleChange}
                        ></Select>
                    </div>
                    {/* {renderForm()} */}
                    <br/><br/>
                    <button type="submit" id="saveResource">
                    Save
                    </button>
                </form>
            </div>
            { type == ('book') ? (BookInfoForm()) : (SPThesisInfoForm())}

            {/* <div className="res-primary-info">
            </div>           */}

        </div>
    );
}