import React, { useState, useEffect } from "react";
import Select from "react-select";
import ResourceServices from "../../services/resourceService";
import AddResourcesHeader from './addResourcesHeader';
import { nanoid } from 'nanoid'
import { produce } from 'immer'

const courseList = [
    { value: "CMSC 12", label: "CMSC 12" },
    { value: "CMSC 21", label: "CMSC 21" },
    { value: "CMSC 22", label: "CMSC 22" },
    { value: "CMSC 23", label: "CMSC 23" },
    { value: "CMSC 56", label: "CMSC 56" },
    { value: "CMSC 57", label: "CMSC 57" },
    { value: "CMSC 123", label: "CMSC 123" },
    { value: "CMSC 124", label: "CMSC 124" },
    { value: "CMSC 125", label: "CMSC 125" },
    { value: "CMSC 127", label: "CMSC 127" },
    { value: "CMSC 128", label: "CMSC 128" },
    { value: "CMSC 130", label: "CMSC 130" },
    { value: "CMSC 131", label: "CMSC 131" },
    { value: "CMSC 132", label: "CMSC 132" },
    { value: "CMSC 141", label: "CMSC 141" },
    { value: "CMSC 142", label: "CMSC 142" },
    { value: "CMSC 150", label: "CMSC 150" },
    { value: "CMSC 170", label: "CMSC 170" },
    { value: "CMSC 173", label: "CMSC 173" },
    { value: "CMSC 180", label: "CMSC 180" },
    { value: "CMSC 190", label: "CMSC 190" },
    { value: "CMSC 191", label: "CMSC 191" },
];

const AddBookFormContainer = () => {
    // functionalities:
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [datePublished, setDatePublished] = useState(0);
    const [dateAcquired, setDateAcquired] = useState(0);
    const [id, setId] = useState("");
    // const [journal, setJournal] = useState("");
    // const [manuscript, setManuscript] = useState("");
    // const [poster, setPoster] = useState("");
    // const [source_code, setSourceCode] = useState("");
    // const [abstract, setAbstract] = useState("");
    const [keywords, setKeyword] = useState();
    // multiple authors should be possible
   const [author, setAuthor] = useState({
        authorid:"",
        fname: "",
        lname: "",
    });
    // const [adviser, setAdviser] = useState({
    //     fname: "",
    //     lname: "",
    // });
    const [authorList, setAuthorList] = useState([
        {
            authorid:nanoid(5), 
            fname:"", 
            lname:""
        }
        ]);
    // const [adviserList, setAdviserList] = useState([]);

    const [courses, setCourses] = useState([]);
    const [publisher, setPublisher] = useState("");
    const [numOfCopies, setNumOfCopies] = useState(0);
    const [description, setDescription] = useState("");

    // useEffect(() => {
    //     function updateList() {
    //     if (author.fname && author.lname) {
    //         setAuthorList([...authorList, author]);
    //     }
    //     }
    //     updateList();
    // }, [author]);

    // const addAuthor = (e) => {
    //     setAuthor({
    //         ...author,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const addAdviser = (e) => {
    //     setAdviser({
    //         ...adviser,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userInput = {
                bookId: id,
                title,
                datePublished,
                dateAcquired,
                authors: authorList,
                subjects: courses,
                physicalDesc: description,
                publisher,
                numberOfCopies: numOfCopies,
            };

            const { data } = await ResourceServices.addBook(userInput);
            alert("New book has been successfully added to the library");
            window.location = "/add-new-resource";
        } catch (err) {
            if (err.response && err.response.data) {
                alert(err.response.data.errorMessage); // some reason error message
            }
        }
    };

    // get input from type selection
    const handleChange = (e) => {
        setType(e.value);
    };

    // adds the courses on array
    const handleCourseChange = (newCourse) => {
        setCourses(newCourse);
    };

    // creates an array of keywords from theh user input
    const handleChips = (chip) => {
        setKeyword(chip);
    };

    return (
        <div className="add-res-form-cont">
            <form id="addBookForm" onSubmit={handleSubmit} autocomplete="off">
                <div className = "form-container">

                    <div className="res-primary-info">
                        <h2>
                            <b>Primary Info</b>
                        </h2>
                        <hr />

                        {/* ID Field */}
                        {/* Disabled, uneditable */}
                        {/* how to get generated ID? */}
                        {/* <div class="primaryfields">
                            <label for="resId">ID: &nbsp; </label>
                            <input
                                type="text"
                                id="resId" 
                                value = "tempId00001" // get autogenerated id here 
                                disabled
                                onChange={(event) => {
                                    setId(event.target.value);
                                }}
                            />
                        </div> */}

                        <div class="primaryfields">
                            <label for="resTitle">Title: &nbsp; </label>
                            <input
                                type="text"
                                id="resTitle"
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </div>

                        <div class="primaryfields">
                            <label for="publisher">Publisher: &nbsp; </label>
                            <input
                                type="text"
                                id="publisher"
                                onChange={(event) => {
                                    setPublisher(event.target.value);
                                }}
                            />
                        </div>

                        <div className="primaryfields">
                            <label htmlFor="datePublished">Date Published: &nbsp; </label>
                            <input
                            type="date"
                            id="datePublished"
                            required
                            onChange={(event) => {
                                setDatePublished(event.target.value);
                            }}
                            />
                        </div>

                        <div className="primaryfields">
                            <label htmlFor="dateAcquired">Date Acquired: &nbsp; </label>
                            <input
                            type="date"
                            id="dateAcquired"
                            required
                            onChange={(event) => {
                                setDateAcquired(event.target.value);
                            }}
                            />
                        </div>

                        {/* Author fields */}
                        <div className= "authors-group">
                            <h5>Author(s):</h5>
                            {/* button adds fields for author */}
                            <button 
                                id="addAuthor"
                                onClick = {() =>{
                                setAuthorList(currentAuthors => [...currentAuthors, {
                                    // author needs to generate ID para di madelete lahat ng fields in one button click
                                    authorid:nanoid(5),
                                    fname: "",
                                    lname:"",
                                    }])
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-plus"
                                    viewBox="0 0 16 16"
                                >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                Add Author
                            </button>

                            <br/><br/><br/>
                            {authorList.map((p, index) => {
                                return(
                                    <div key = {p.authorid}>
                                        
                                        {/* AUTHOR FIRST NAME FIELD */}
                                        <div className="primaryfields">
                                            <label htmlFor="resAuthorFN">
                                                &nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp;{" "}
                                            </label>

                                            <input
                                                type="text"
                                                id="resAuthorFN"
                                                // name="fname"
                                                required
                                                value={p.fname}
                                                onChange={e => {
                                                    const fname = e.target.value;
                                                    setAuthorList(currentAuthors => 
                                                        produce(currentAuthors, (v) => {
                                                            v[index].fname = fname;
                                                        })
                                                    )
                                                    // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                                                }}
                                                
                                            />
                                        </div>

                                        {/* AUTHOR LAST NAME FIELD */}
                                        <div className="primaryfields">
                                            <label htmlFor="resAuthorLN">
                                            &nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp;{" "}
                                            </label>
                                            <input
                                            type="text"
                                            id="resAuthorLN"
                                            required
                                            // name="lname"
                                            value={p.lname}
                                            onChange={e => {
                                                    const lname = e.target.value;
                                                    setAuthorList(currentAuthors => 
                                                        produce(currentAuthors, (v) => {
                                                            v[index].lname = lname;
                                                        })
                                                    )
                                                    // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                                                }}
                                            />
                                        </div>

                                        {/* button deletes author fields */}
                                        <button
                                        id = "deleteAuthor"
                                        onClick = { () => {
                                            setAuthorList(currentAuthors =>
                                                currentAuthors.filter(x => (x.authorid)!== (p.authorid) ))
                                                // function checks if Author-To-Be-Deleted exists. 
                                                // function deletes ALL instances of same author to be deleted
                                                // we generate a random id so no 2 author fields are the same
                                                // hence no faulty deleting
                                                // wag nalang istore si author id sa db
                                        }}
                                        >
                                        Delete Author
                                        </button>
                                        <br/><br/><br/>
                                    </div>
                                )
                            })}

                            {/* for testing only: */}
                            {/* <div className = "testdiv">
                                {JSON.stringify(authorList, null, 2)}
                            </div> */}

                        </div> {/* closing tag for authors group */}
                    
                    </div>  {/* Primary Info closing tag */}

                    <div className="res-primary-info">
                        <h2> <b>Book</b> </h2>
                        <hr />
                    
                        <div class="primaryfields">
                            <label for="bookISBN">ISBN: &nbsp; </label>
                            <input type="text" id="bookISBN" />
                        </div>

                        <div class="primaryfields">
                            <label for="physDescription">
                                Physical Description: &nbsp;{" "}
                            </label>
                            <textarea id="physDescription" />
                        </div>

                        ...or upload description file:
                        <input type="file" class="resourcefiles" id="uploadDesc" />

                        <br />
                        <br />
                        <br />
                        <br />

                        <div class="primaryfields">
                            <label htmlFor="availBookCopies">
                               No. of copies available:
                            </label>
                            <input type="number" id="availBookCopies" />
                        </div>

                        <div className="bookRelatedCourses">
                            <br />
                            Related Courses:
                            <Select
                                id="relatedCourses"
                                isMulti
                                placeholder={"Courses..."}
                                value={courseList.find((obj) => obj.value === courses)}
                                options={courseList}></Select>
                        </div>

                    <br/>
                    <button type="submit" id="saveResource">
                    Save
                    </button>

                    </div>

                </div>
            </form>
                
           
        </div>
    );
};

export default AddBookFormContainer;
