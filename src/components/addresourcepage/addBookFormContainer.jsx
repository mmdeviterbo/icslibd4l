import React, { useState } from "react";
import Select from "react-select";
import ResourceServices from "../../services/resourceService";
// import AddResourcesHeader from "./addResourcesHeader";
import { nanoid } from "nanoid";
import { produce } from "immer";
import StatusModal from "../modal/operationStatusModal";
// import { toast } from "react-toastify";
import ToastNotification from "../toastNotification";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  A single-page form to be filled up by the user with
 *  relevant book attributes
 *
 ******************************************************/

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
  const [title, setTitle] = useState("");
  const [isbn, setISBN] = useState("");
  const [datePublished, setDatePublished] = useState();
  const [dateAcquired, setDateAcquired] = useState();
  // multiple authors should be possible
  const [authorList, setAuthorList] = useState([
    {
      authorid: nanoid(5),
      fname: "",
      lname: "",
    },
  ]);
  const [courses, setCourses] = useState(null);
  const [publisher, setPublisher] = useState("");
  const [numOfCopies, setNumOfCopies] = useState(0);
  const [description, setDescription] = useState("");
  const [bookCoverLink, setBookCoverLink] = useState("");

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");

  /****************************************************
   * Type: Function
   *
   * Summary:
   *  Stores all user inputs to an object containing book
   *  attributes and make a POST request.
   *  Shows a modal to confirm if request is successful or
   *  not.
   *  Adds the book in the database if successful.
   *
   ******************************************************/

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      authorList === null ||
      authorList.length === 0 ||
      courses === null ||
      courses.length === 0
    ) {
      return ToastNotification({
        content: "Please enter all required fields",
      });
    }
    try {
      const userInput = {
        title,
        ISBN: isbn,
        authors: authorList,
        subjects: courses,
        physicalDesc: description,
        publisher,
        numberOfCopies: numOfCopies,
        bookCoverLink,
        datePublished,
        dateAcquired,
      };
    //   console.log(userInput);
      await ResourceServices.addBook(userInput);

      setSuccess("success");
      setShow(true);
      // event.target.reset();
      window.location = "/manage-resources";
    } catch (err) {
      if (err.response && err.response.data) {
        ToastNotification({ content: err.response.data.errorMessage });
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
    // setDateAcquired(date);
  };

  return (
    <div className="add-res-form-cont">
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
                required
                type="text"
                id="resTitle"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            {/* Publisher Field */}
            <div className="primaryfields">
              <label htmlFor="publisher">Publisher: &nbsp; </label>
              <input
                required
                type="text"
                id="publisher"
                onChange={(event) => {
                  setPublisher(event.target.value);
                }}
              />
            </div>
            <div className="dates-group">
              {/* Date Published */}
              <div className="primaryfields-date">
                <label htmlFor="datePublished">Date Published: &nbsp; </label>
                <input
                  type="date"
                  id="datePublished"
                  onChange={(event) => {
                    setDatePublished(handleDate(event.target.value));
                  }}
                  style={{ marginRight: "5%" }}
                />
              </div>

              {/* Date Acquired */}
              <div className="primaryfields-date">
                <label htmlFor="dateAcquired">Date Acquired: &nbsp; </label>
                <input
                  type="date"
                  id="dateAcquired"
                  onChange={(event) => {
                    setDateAcquired(handleDate(event.target.value));
                  }}
                />
              </div>
            </div>
            {/* Author fields */}
            <div className="authors-group">
              <h4 style={{ fontWeight: "normal" }}>Author(s):</h4>

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

              {authorList.map((p, index) => {
                return (
                  <div className="authorfields" key={p.authorid}>
                    {/* AUTHOR FIRST NAME FIELD */}

                    <div className="authorname-cont">
                      <div
                        className="author-name"
                        style={{ marginRight: "3%" }}
                      >
                        <label htmlFor="resAuthorFN">First Name:</label>

                        <input
                          type="text"
                          id="resAuthorFN"
                          // name="fname"
                          required
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
                          style={{ marginRight: "5%" }}
                        />
                      </div>

                      {/* AUTHOR LAST NAME FIELD */}
                      <div className="author-name">
                        <label htmlFor="resAuthorLN">Last Name:</label>
                        <input
                          type="text"
                          id="resAuthorLN"
                          required
                          // name="lname"
                          value={p.lname}
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
                  </div>
                );
              })}

              {/* for testing only: */}
              {/* <div className = "testdiv">
                  {JSON.stringify(authorList, null, 2)}
              </div> */}

              {/* closing tag for authors group */}
            </div>{" "}
            {/* left column div close: */}
          </div>

          <div className="form-mid-column">
            <div className="primaryfields">
              <label htmlFor="bookISBN">ISBN: &nbsp; </label>
              <input
                type="text"
                id="bookISBN"
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
                required
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>

            {/* middle container close */}
          </div>

          <div className="form-right-column">
             <div className="primaryfields">
                        <label htmlFor="availBookCopies">
                            No. of copies available:
                        </label>
                        <input
                            type="number"
                            pattern="[1-9]*"
                            inputMode = "numeric"
                            min = {1}
                            placeholder="1-999"
                            required
                            id="availBookCopies"
                             onChange={(event) => {
                                if (isNaN(Number(event.target.value))) {
                                    return;
                                } else {
                                    setNumOfCopies(event.target.value);
                                }
                            }}
                            onMouseEnter={e=>e.target.focus()}
                        />
                    </div>

            <div className="bookRelatedCourses">
              Related Courses:
              <Select
                id="relatedCourses"
                isMulti
                required
                placeholder={"Courses..."}
                options={courseList}
                value={courseList.find((obj) => obj.value === courses)}
                onChange={(courses) => handleCourses(courses)}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    "&:hover": { borderColor: "#778899" }, // border style on hover
                    border: "2px solid #afbcc9", // default border color
                    boxShadow: "none", // no box-shadow
                    marginTop: "0.4rem",
                  }),
                }}
              ></Select>
            </div>

            <div className="primaryfields">
              Book cover link:
              <input
                type="url"
                placeholder={"https://www.example.com/"}
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

            {/* right container close */}
          </div>

          {/* columns container close */}
        </div>

        {/* main form close: */}
      </form>

      <StatusModal
        message={success}
        name={"Book"}
        show={show}
        setShow={setShow}
        operation={"add"}
        pathAfter={"/add-new-book/"}
      />
    </div>
  );
};

export default AddBookFormContainer;
