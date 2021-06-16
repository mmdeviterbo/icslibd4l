// import { SignalCellularNoSimOutlined } from "@material-ui/icons";
// import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { ItemGroup } from "semantic-ui-react";
import { useHistory } from "react-router";
import ResourceServices from "../../services/resourceService";
import { nanoid } from "nanoid";
import { produce } from "immer";
import EditResourceHeader from "./editResourceSideHeader";
import ToastNotification from "../toastNotification";
import StatusModal from "../modal/operationStatusModal";
import PropagateLoader from "react-spinners/PropagateLoader";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";

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

export default function EditBookFormContainer(props) {
  const [loader, setLoader] = useState(true);
  const history = useHistory();

  const [title, setTitle] = useState("");
  // const [type, setType] = useState("");
  const [datePublished, setDatePublished] = useState();
  const [dateAcquired, setDateAcquired] = useState();
  const [ISBN, setISBN] = useState("");
  const [bookId, setBookId] = useState("");
  const [author, setAuthor] = useState([]);
  // multiple authors should be possible
  const [authorList, setAuthorList] = useState([
    {
      authorid: nanoid(5),
      fname: "",
      lname: "",
    },
  ]);
  const [subjects, setSubject] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [numberOfCopies, setNumOfCopies] = useState(0);
  const [physicalDesc, setDescription] = useState("");
  const [bookCoverLink, setBookCoverLink] = useState("");

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");

  const FormData = require("form-data");
  const formData = new FormData();

  // return ALL resources (dahil walang search na gumagamit ng id)
  const [bookInfoArr, setBookInfoArr] = useState([]); //all sp/thesis array
  const [idSource, setIdSource] = useState(); //unique key to identify to which specific sp/thesis

  useEffect(() => {
    try {
      setIdSource(props.location.state.id);
      setBookInfoArr(props.location.state.sourceInfo); //all objects from table
    } catch (err) {
      // window.location = "/not-found";
    }
  }, []);

  const accessPrivilege = () => {
    setTimeout(() => {
      try {
        const user = PersonService.decryptToken(
          localStorage.getItem(jwtPrivateKey)
        );
        if (!user || (user && user.userType !== 1))
          return history.push("/unauthorized");
      } catch (err) {
        return history.push("/unauthorized");
      }
    }, 700);
  };

  // iterate through array to match id
  useEffect(() => {
    try {
      for (let sourceItem of bookInfoArr) {
        if (sourceItem.bookId === idSource.id) {
          const {
            bookId,
            title,
            publisher,
            datePublished,
            dateAcquired,
            author,
            ISBN,
            physicalDesc,
            numberOfCopies,
            subjects,
            bookCoverLink,
          } = sourceItem;
          // setType(type);
          setBookId(bookId);
          setTitle(title);
          setPublisher(publisher);
          setDatePublished(datePublished);
          setDateAcquired(dateAcquired);
          setAuthor(author);
          // setAuthorList(author);
          setISBN(ISBN);
          setDescription(physicalDesc);
          setNumOfCopies(numberOfCopies);
          setSubject(subjects);
          setBookCoverLink(bookCoverLink);

          // console.log(sourceItem);
          break;
        }
      }
    } catch (err) {
      // console.log("Error 85: edit-res-page-form");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userInput = {
        // oldBookId,
        bookId,
        ISBN,
        title,
        datePublished,
        dateAcquired,
        author,
        subjects,
        physicalDesc,
        publisher,
        numberOfCopies,
        bookCoverLink,
      };
      console.log(userInput); //successfully stored object
      // console.log(subject);

      formData.append("body", JSON.stringify(userInput)); // y r we appending?

      // console.log(formData);

      const { data } = await ResourceServices.editBook(userInput);
      setSuccess("success");
      setShow(true);

      // window.location = "/manage-resources";
    } catch (err) {
      if (err.response && err.response.data) {
        ToastNotification({ content: err.response.data.errorMessage });
      }
    }
  };

  // adds the courses on array
  const handleSubject = (subject) => {
    const values = [...subject].map((opt) => opt.value);
    setSubject(values);
  };

  const handleDate = (date) => {
    var newDate = new Date(date).toJSON();
    // var date = new Date(date);
    return newDate;
    // console.log(date);
    // setDateAcquired(date);
  };

  const renderAuthorFields = () => {
    setAuthor((author) => [
      ...author,
      {
        // author needs to generate ID para di madelete lahat ng fields in one button click
        authorid: nanoid(5),
        bookId: bookId,
        author_fname: "",
        author_lname: "",
        // author_name:"chenes zathurna"
      },
    ]);
  };

  return (
    <div>
      {props.user && props.user.userType === 1 ? (
        <div className="add-res-form-cont">
          <EditResourceHeader />
          <form
            className="main-form"
            id="addBookForm"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {/* 
            <h2>Book</h2>
            <hr/> */}
            <div className="form-columns">
              <div className="form-left-column">
                {/* Title Field */}
                <div className="primaryfields">
                  <label htmlFor="resTitle">Title: &nbsp; </label>
                  <input
                    type="text"
                    id="resTitle"
                    defaultValue={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
                {/* Publisher Field */}
                <div className="primaryfields">
                  <label htmlFor="publisher">Publisher: &nbsp; </label>
                  <input
                    type="text"
                    id="publisher"
                    defaultValue={publisher}
                    onChange={(event) => {
                      setPublisher(event.target.value);
                    }}
                  />
                </div>

                {/* !!! TO-DO !!! Fix date magic in defaultValues */}
                <div className="dates-group">
                  {/* Date Published */}
                  <div className="primaryfields-date">
                    <label htmlFor="datePublished">
                      Date Published: &nbsp;{" "}
                    </label>
                    <input
                      type="date"
                      id="datePublished"
                      defaultValue={"2001-06-09"}
                      required
                      onChange={(event) => {
                        setDatePublished(handleDate(event.target.value));
                      }}
                    />
                  </div>

                  {/* Date Acquired */}
                  <div className="primaryfields-date">
                    <label htmlFor="dateAcquired">Date Acquired: &nbsp; </label>
                    <input
                      type="date"
                      id="dateAcquired"
                      required
                      defaultValue={"2016-07-23"}
                      onChange={(event) => {
                        setDateAcquired(handleDate(event.target.value));
                      }}
                    />
                  </div>
                </div>
                {/* Author fields */}
                <div className="authors-group">
                  <h4 style={{ fontWeight: "normal" }}>Author(s):</h4>

                  <button id="addAuthor" onClick={renderAuthorFields}>
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

                  {author.map((p, index) => {
                    return (
                      <div className="authorfields" key={p.authorid}>
                        <div className="authorname-cont">
                          {/* AUTHOR FIRST NAME FIELD */}
                          <div className="author-name">
                            <label htmlFor="resAuthorFN">First Name:</label>

                            <input
                              type="text"
                              id="resAuthorFN"
                              // name="fname"
                              required
                              value={p.author_fname}
                              // defaultValue = {author[0].author_fname}  //cant access?????
                              onChange={(e) => {
                                const author_fname = e.target.value;
                                setAuthor((author) =>
                                  produce(author, (v) => {
                                    v[index].author_fname = author_fname;
                                  })
                                );
                                // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                              }}
                            />
                          </div>
                          <div className="author-name">
                            <label htmlFor="resAuthorLN">Last Name:</label>
                            <input
                              type="text"
                              id="resAuthorLN"
                              required
                              // name="lname"
                              value={p.author_lname}
                              // defaultValue={author.author_lname}   //cant access?????
                              onChange={(e) => {
                                const author_lname = e.target.value;
                                setAuthor((author) =>
                                  produce(author, (v) => {
                                    v[index].author_lname = author_lname;
                                  })
                                );
                                // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                              }}
                            />
                          </div>{" "}
                          {/* last name close */}
                        </div>
                        {/* authorname-cont close */}

                        {/* button deletes author fields */}
                        <button
                          type="button"
                          id="deleteAuthor"
                          onClick={() => {
                            setAuthor((author) =>
                              author.filter((x) =>
                                x.authorid
                                  ? x.authorid !== p.authorid
                                  : x.author_name !== p.author_name
                              )
                            );
                            // function checks if Author-To-Be-Deleted exists.
                            // function deletes ALL instances of same author to be deleted
                            // we generate a random id so no 2 author fields are the same
                            // hence no faulty deleting
                            // wag nalang istore si author id sa db
                          }}
                        >
                          <span className="res-btn-txt">Delete Author</span>
                        </button>
                      </div> //authorfields end
                    );
                  })}
                </div>
                {/* closing tag for authors group */}
              </div>
              {/* left column div close: */}
              <div className="form-mid-column">
                <div className="primaryfields">
                  <label htmlFor="bookISBN">ISBN:</label>
                  <input
                    type="text"
                    id="bookISBN"
                    value={ISBN}
                    placeholder={"XXX-X-XXXXXXXXX"}
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
                    defaultValue={physicalDesc}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </div>
              </div>{" "}
              {/* middle container close */}
              <div className="form-right-column">
                <div className="primaryfields">
                  <label htmlFor="availBookCopies">
                    No. of copies available:
                  </label>
                  <input
                    id="availBookCopies"
                    type="number"
                    value={numberOfCopies}
                    min={1}
                    onChange={(e) => {
                      setNumOfCopies(e.target.value);
                    }}
                  />
                </div>

                <div className="bookRelatedCourses">
                  Related Courses:
                  <Select
                    id="relatedCourses"
                    isMulti
                    placeholder={"Courses..."}
                    options={courseList}
                    defaultValue={subjects}
                    onChange={(subjects) => handleSubject(subjects)}
                  ></Select>
                </div>

                <div className="primaryfields">
                  Book cover link:
                  <input
                    type="url"
                    placeholder={"https://www.example.com/"}
                    defaultValue={bookCoverLink}
                    className="resourcefiles"
                    id="bookcover"
                    onChange={(event) => {
                      setBookCoverLink(event.target.value);
                    }}
                  />
                </div>

                <button type="submit" id="saveResource">
                  Save
                </button>
              </div>{" "}
              {/* right container close */}
            </div>{" "}
            {/* columns container close */}
            {/* main form close: */}
          </form>

          <StatusModal
            message={success}
            name={"Book"}
            show={show}
            setShow={setShow}
            operation={"edit"}
            pathAfter={"/manage-resources"}
          />
        </div>
      ) : (
        <div
          style={{
            minHeight: "80vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <PropagateLoader
            color={"#0067a1"}
            speedMultiplier={2}
            loading={loader}
            size={20}
          />
          {accessPrivilege()}
        </div>
      )}
    </div>
  );
}
