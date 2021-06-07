// import { SignalCellularNoSimOutlined } from "@material-ui/icons";
// import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { ItemGroup } from "semantic-ui-react";
import ResourceServices from "../../services/resourceService";
import { nanoid } from 'nanoid'
import { produce } from 'immer'
import EditResourceHeader from "./editResourceSideHeader"

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

// !!! Should receive an sp/thesis object
export default function EditBookFormContainer(props) {
        // functionalities:
    const [title, setTitle] = useState("");
    // const [type, setType] = useState("");
    const [datePublished, setDatePublished] = useState();
    const [dateAcquired, setDateAcquired] = useState();
    const [isbn, setISBN] = useState("");
    const [bookId, setBookId] = useState("");
    const [author, setAuthor] = useState("");
    // multiple authors should be possible
    const [authorList, setAuthorList] = useState([
        {
        authorid: nanoid(5),
        fname: "",
        lname: "",
        },
    ]);
    const [courses, setCourses] = useState(null); // why null??
    const [publisher, setPublisher] = useState("");
    const [numberOfCopies, setNumOfCopies] = useState(0);
    const [physicalDesc, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const FormData = require("form-data");
    const formData = new FormData();

    // return ALL resources (dahil walang search na gumagamit ng id)
    const [bookInfoArr, setBookInfoArr] = useState([]); //all sp/thesis array
    const [idSource, setIdSource] = useState(); //unique key to identify to which specific sp/thesis

    useEffect(() => {
        try {
            setIdSource(props.location.state.id);
            setBookInfoArr(props.location.state.sourceInfo);  //all objects from table
        } catch (err) {
            // window.location = "/not-found";
        }
    }, []);

    console.log(idSource)           //object id is received
    console.log(bookInfoArr);       //info of all res is received

    // iterate through array to match id
    useEffect(() => {
        try {
            for (let sourceItem of bookInfoArr) {
                if (sourceItem.bookId=== idSource.id) {
                    const {
                        bookId,
                        title,
                        publisher,
                        datePublished,
                        dateAcquired,
                        author,
                        isbn,
                        physicalDesc,
                        numberOfCopies,
                        courses,
                        image

                    } = sourceItem;
                    // setType(type);
                    setBookId(bookId);
                    setTitle(title);
                    setPublisher(publisher)
                    setDatePublished(datePublished);
                    setDateAcquired(dateAcquired);
                    setAuthor(author);
                    // setAuthorList(author);
                    setISBN(isbn);
                    setDescription(physicalDesc);
                    setNumOfCopies(numberOfCopies);
                    setCourses(courses);
                    setImage(image)


                    // setAdviser({
                    //     fname: adviser[0]?.adviser_fname,
                    //     lname: adviser[0]?.adviser_lname,
                    // });
                    // setAuthor({
                    //     fname: author[0]?.author_fname,
                    //     lname: author[0]?.author_lname,
                    // });

                    // console.log("fsdfsdfd");
                    // console.log(sourceItem);

                    // const tempKeyword = [];
                    // keywords.map((keyword) =>
                    //     tempKeyword.push(keyword.sp_thesis_keyword)
                    // );
                    // setKeyword(tempKeyword);
                    break;
                }
            }
        } catch (err) {
            console.log("Error 85: edit-res-page-form");
        }
    }, [idSource]);

    useEffect(() => {
        function updateList() {
            if (author.fname && author.lname) {
                if (authorList.indexOf(author) !== -1) {
                    // console.log("here1");
                    setAuthorList([...authorList, author]);
                }
            }
        }
        updateList();
    }, [author]);

    // const addAuthor = (e) => {
    //     const { name, value } = e.target;
    //     setAuthor({ ...author, [name]: value });
    // };

    // const addAdviser = (e) => {
    //     const { name, value } = e.target;
    //     setAdviser({ ...adviser, [name]: value });
    // };

    // get input from type selection

    // const handleChange = (e) => {
    //     setType("Book");
    // };


     const handleImage = (e) => {
    // let file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("file", file);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // setImage(formData);
    // return  post(url, formData,config)

    let file = e.target.files[0];
    let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // const formData = { file: e.target.result };
                // formData.append("file", file);
                setImage(file);
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const userInput = {
            // oldBookId,
            // bookId, 
            isbn,
            title,
            datePublished,
            dateAcquired,
            authors: authorList,
            subjects: courses,
            physicalDesc,
            publisher,
            numberOfCopies,
        };
        console.log(userInput);
        console.log(courses);
        console.log(image);
        formData.append("body", JSON.stringify(userInput));
        formData.append("file", image);
        const { data } = await ResourceServices.editBook(formData);
        alert("Successfully updated book.");
        // window.location = "/add-new-resource";
        } catch (err) {
        if (err.response && err.response.data) {
            // alert("unsuccessful")
            alert(err.response.data.errorMessage); // some reason error message
        }
        }
    };

    // adds the courses on array
    const handleCourses = (courses) => {
        const values = [...courses].map((opt) => opt.value);
        setCourses(values);
    };

    const handleDate = (date) => {
        var newDate = new Date(date).toJSON();
        // var date = new Date(date);
        return newDate;
        // console.log(date);
        // setDateAcquired(date);
    };

    return (
        <div className="add-res-form-cont">
        <EditResourceHeader/>
        <form id="addBookForm" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-container">
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
                        // defaultValue = {bookId} // get autogenerated id here 
                        disabled
                        // onChange={(event) => {
                        //     setId(event.target.value);
                        // }}
                    />
                </div> */}

                {/* Title */}
                <div className="primaryfields">
                <label htmlFor="resTitle">Title: &nbsp; </label>
                <input
                    type="text"
                    id="resTitle"
                    defaultValue = {title}
                    onChange={(event) => {
                    setTitle(event.target.value);
                    }}
                />
                </div>

                {/* Publisher */}
                <div className="primaryfields">
                <label htmlFor="publisher">Publisher: &nbsp; </label>
                <input
                    type="text"
                    id="publisher"
                    defaultValue = {publisher}
                    onChange={(event) => {
                    setPublisher(event.target.value);
                    }}
                />
                </div>

                {/* Publish Date */}
                <div className="primaryfields">
                <label htmlFor="datePublished">Date Published: &nbsp; </label>
                <input
                    type="date"
                    id="datePublished"
                    defaultValue = {datePublished}
                    required
                    onChange={(event) => {
                    setDatePublished(handleDate(event.target.value));
                    }}
                />
                </div>

                {/* Acquisition Date */}
                <div className="primaryfields">
                <label htmlFor="dateAcquired">Date Acquired: &nbsp; </label>
                <input
                    type="date"
                    id="dateAcquired"
                    defaultValue = {dateAcquired}
                    required
                    onChange={(event) => {
                    setDateAcquired(handleDate(event.target.value));
                    }}
                />
                </div>
                {/* Author fields */}
                <div className="authors-group">
                <h5>Author(s):</h5>
                {/* button adds fields for author */}
                <button
                    id="addAuthor"
                    onClick={() => {
                    setAuthorList((currentAuthors) => [
                        ...currentAuthors,
                        {
                        // author needs to generate ID para di madelete lahat ng fields in one button click
                        authorid: nanoid(5),
                        fname: "",
                        lname: "",
                        },
                    ]);
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

                <br />
                <br />
                <br />
                {authorList.map((p, index) => {
                    return (
                    <div key={p.authorid}>
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
                            defaultValue={author.author_fname}
                            value={p.fname}
                            onChange={(e) => {
                            const fname = e.target.value;
                            setAuthorList((currentAuthors) =>
                                produce(currentAuthors, (v) => {
                                v[index].fname = fname;
                                })
                            );
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
                            defaultValue={author.author_lname}
                            // name="lname"
                            // value={p.lname}
                            onChange={(e) => {
                            const lname = e.target.value;
                            setAuthorList((currentAuthors) =>
                                produce(currentAuthors, (v) => {
                                v[index].lname = lname;
                                })
                            );
                            // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                            }}
                        />
                        </div>

                        {/* button deletes author fields */}
                        <button
                        id="deleteAuthor"
                        
                        onClick={() => {
                            setAuthorList((currentAuthors) =>
                            currentAuthors.filter(
                                (x) => x.authorid !== p.authorid
                            )
                            );
                            // function checks if Author-To-Be-Deleted exists.
                            // function deletes ALL instances of same author to be deleted
                            // we generate a random id so no 2 author fields are the same
                            // hence no faulty deleting
                            // wag nalang istore si author id sa db
                        }}
                        >
                        Delete Author
                        </button>
                        <br />
                        <br />
                        <br />
                    </div>
                    );
                })}

                        {/* for testing only: */}
                    {/* <div className = "testdiv">
                        {JSON.stringify(author, null, 2)}
                    </div> */}

                </div>
                {/* closing tag for authors group */}
            </div>
            {/* Primary Info closing tag */}
            <div className="res-primary-info">
                <h2>
                {" "}
                <b>Book</b>{" "}
                </h2>
                <hr />
                <div className="primaryfields">
                <label htmlFor="bookISBN">ISBN: &nbsp; </label>
                <input
                    type="text"
                    defaultValue ={bookId}
                    id="bookISBN"
                    onChange={(event) => {
                    setISBN(event.target.value);
                    }}
                />
                </div>
                <div className="primaryfields">
                <label htmlFor="physDescription">
                    Physical Description: &nbsp;{" "}
                </label>
                <textarea
                    id="physDescription"
                    defaultValue = {physicalDesc}
                    onChange={(event) => {
                    setDescription(event.target.value);
                    }}
                />
                </div>
                <div className="primaryfields">
                <label htmlFor="availBookCopies">
                    No. of copies available: &nbsp;{" "}
                </label>
                <input
                    type="number"
                    id="availBookCopies"
                    defaultValue={numberOfCopies}
                    onChange={(event) => {
                    if (event.target.value < 0 || !event.target.value) {
                        event.target.value = event.target.defaultValue;
                    }
                    setNumOfCopies(event.target.value);
                    }}
                />
                </div>
                <div className="bookRelatedCourses">
                <br />
                Related Courses:
                <Select
                    id="relatedCourses"
                    isMulti
                    placeholder={"Courses..."}
                    options={courseList}
                    value={courseList.find((obj) => obj.value === courses)}
                    onChange={(courses) => handleCourses(courses)}
                ></Select>
                </div>
                <br />
                <div className="bookCover">
                <h5>Upload Book Cover</h5>
                <input
                    type="file"
                    className="resourcefiles"
                    id="bookCoverPage"
                    onChange={(e) => {
                    handleImage(e);
                    }}
                />
                </div>
                <br/><br/><br/><br/>
                <button type="submit" id="saveResource">
                Save
                </button>
            </div>
            </div>
        </form>
        </div>
    );
}
