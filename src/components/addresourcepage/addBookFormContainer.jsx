import React, { useState, useEffect } from "react";
import Select from "react-select";
import ResourceServices from "../../services/resourceService";
// import { ItemGroup } from 'semantic-ui-react'

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
  const [datePublished, setDatePublished] = useState();
  const [dateAcquired, setDateAcquired] = useState();
  const [isbn, setISBN] = useState("");
  // multiple authors should be possible
  const [author, setAuthor] = useState({
    fname: "",
    lname: "",
  });
  const [authorList, setAuthorList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [numOfCopies, setNumOfCopies] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    function updateList() {
      if (author.fname && author.lname) {
        // console.log('adding', author.fname, author.lname);
        // isInArray(authorList, author)
        if (authorList.indexOf(author)) {
          setAuthorList([]);
          setAuthorList([...authorList, author]);
        }
      }
    }
    updateList();
  }, [author]);

  const addAuthor = (e) => {
    setAuthor({
      ...author,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userInput = {
        bookId: isbn,
        title,
        datePublished,
        dateAcquired,
        authors: authorList,
        subjects: courses,
        physicalDesc: description,
        publisher,
        numberOfCopies: numOfCopies,
      };
      console.log(userInput);
      console.log(typeof dateAcquired);
      console.log(typeof datePublished);
      const { data } = await ResourceServices.addBook(userInput);
      alert("New book has been successfully added to the library");
      window.location = "/add-new-resource";
    } catch (err) {
      if (err.response && err.response.data) {
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
    var date = new Date(date).toJSON();
    // var date = new Date(date);
    return date;
    // console.log(date);
    // setDateAcquired(date);
  };

  return (
    <div className="add-res-form-cont">
      <form id="createForm" autocomplete="off" onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="res-primary-info">
            <h2>
              <b>Primary Info</b>
            </h2>
            <hr />

            <div class="primaryfields">
              <label for="bookISBN">ISBN: &nbsp; </label>
              <input
                type="text"
                id="bookISBN"
                onChange={(event) => {
                  setISBN(event.target.value);
                }}
              />
            </div>

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
              <label for="resTitle">Publisher: &nbsp; </label>
              <input
                type="text"
                id="resTitle"
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
                  setDatePublished(handleDate(event.target.value));
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
                  setDateAcquired(handleDate(event.target.value));
                }}
              />
            </div>

            {/* <AddAuthorField/> */}
            <h5>Author(s):</h5>
            <div class="primaryfields">
              <label for="resAuthor">
                &nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp;{" "}
              </label>

              <input
                type="text"
                id="resAuthorFN"
                name="fname"
                value={author.fname}
                onChange={addAuthor}
              />
            </div>

            <div class="primaryfields">
              <label for="resAuthor">
                &nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp;{" "}
              </label>
              <input
                type="text"
                id="resAuthorLN"
                name="lname"
                value={author.lname}
                onChange={addAuthor}
              />
            </div>

            <button id="addAuthor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              Add Author
            </button>
          </div>{" "}
          {/* Primary Info closing tag */}
          <div className="res-primary-info">
            <h2>
              {" "}
              <b>Book</b>{" "}
            </h2>
            <hr />
            <div class="primaryfields">
              <label for="physDescription">Physical Description: &nbsp; </label>
              <textarea
                id="physDescription"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>

            <div class="primaryfields">
              <label for="availBookCopies">
                No. of copies available: &nbsp;{" "}
              </label>
              <input
                type="number"
                id="availBookCopies"
                onChange={(event) => {
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
