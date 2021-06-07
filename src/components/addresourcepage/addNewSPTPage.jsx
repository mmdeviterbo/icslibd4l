import React, { useState } from "react";
import Select from "react-select";
// import { ItemGroup } from 'semantic-ui-react'
import ResourceServices from "../../services/resourceService";
import ChipInput from "material-ui-chip-input";
// import AddResourcesHeader from "./addResourcesHeader";
// import ChipInput from "material-ui-chip-input";
import { nanoid } from "nanoid";
import { produce } from "immer";
import StatusModal from "../modal/operationStatusModal";
import ToastNotification from "../toastNotification";
import "react-toastify/dist/ReactToastify.css";

const classificationOptions = [
  { value: "Special Problem", label: "Special Problem" },
  { value: "Thesis", label: "Thesis" },
];

// TO DO: COMPLETE CHOICES FOR ADVISERS
const adviserchoices = [
  {
    value: { fname: "Eliezer A.", lname: "Albacea" },
    label: "Albacea, Aliezer A.",
  },
  {
    value: { fname: "Maria Art Antonette D.", lname: "Clariño" },
    label: "Clariño, Maria Art Antonette D.",
  },
  {
    value: { fname: "Lailanie R.", lname: "Danila" },
    label: "Danila, Lailanie R.",
  },
  {
    value: { fname: "Joseph Anthony C.", lname: "Hermocilla" },
    label: "Hermocilla, Joseph Anthony C.",
  },
  {
    value: { fname: "Arian J.", lname: "Jacildo" },
    label: "Jacildo, Arian J.",
  },
  {
    value: { fname: "Concepcion L.", lname: "Khan" },
    label: "Khan, Concepcion L.",
  },
  {
    value: { fname: "Fermin Roberto G", lname: "Lapitan" },
    label: "Lapitan, Fermin Roberto G.",
  },
  {
    value: { fname: "Val Randolf M.", lname: "Madrid" },
    label: "Madrid, Val Randolf M.",
  },
  {
    value: { fname: "Katrina Joy H", lname: "Magno" },
    label: "Magno, Katrina Joy H.",
  },
  {
    value: { fname: "Rozano S.", lname: "Maniaol" },
    label: "Maniaol, Rozano S.",
  },
  {
    value: { fname: "Danilo J.", lname: "Mercado" },
    label: "Mercado, Danilo J.",
  },
  {
    value: { fname: "Rizza DC", lname: "Mercado" },
    label: "Mercado, Rizza DC.",
  },
  {
    value: { fname: "Toni-Jan Keith P.", lname: "Monserrat" },
    label: "Monserrat, Toni-Jan Keith P.",
  },
  {
    value: { fname: "Jaderick P.", lname: "Pabico" },
    label: "Pabico, Jaderick P.",
  },
  {
    value: { fname: "Margarita Carmen S.", lname: "Paterno" },
    label: "Paterno, Margarita Carmen S.",
  },
  {
    value: { fname: "Reginald Neil C.", lname: "Recario" },
    label: "Recario, Reginald Neil C.",
  },
  {
    value: { fname: "Samaniego, Jaime M.", lname: "Samaniego" },
    label: "Samaniego, Jaime M.",
  },
];

const AddNewSPThesisForm = () => {
  // functionalities:
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [journal, setJournal] = useState(null);
  const [manuscript, setManuscript] = useState(null);
  const [poster, setPoster] = useState(null);
  const [source_code, setSourceCode] = useState(null);
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeyword] = useState();
  // multiple authors should be possible
  // Bakit di nagagamit yung setter????
  const [adviser, setAdviser] = useState({
    fname: "",
    lname: "",
  });
  const [authorList, setAuthorList] = useState([
    {
      authorid: nanoid(5),
      fname: "",
      lname: "",
    },
  ]);
  const [adviserList, setAdviserList] = useState([]);

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    console.log("meow");
    event.preventDefault();

    try {
      const userInput = {
        type,
        title,
        abstract,
        year,
        source_code,
        manuscript,
        journal,
        poster,
        advisers: adviserList,
        authors: authorList,
        keywords,
      };

      console.log(userInput);
      const { data } = await ResourceServices.addSpThesis(userInput);
      console.log(data);

      setSuccess("success");
      setShow(true);
      event.target.reset();
      // window.location = "/add-new-resource/";
    } catch (err) {
      if (err.response && err.response.data) {
        ToastNotification({ content: err.response.data.errorMessage });
      }
    }
  };

  // get input from type selection
  const handleTypeChange = (e) => {
    setType(e.value);
  };

  // creates an array of keywords from the user input
  const handleChips = (chip) => {
    setKeyword(chip);
  };

  // FIX THIS
  const handleAdviserChange = (adviserList) => {
    const adviser = [...adviserList].map((obj) => obj.value);
    // setCourses(values);
    setAdviserList(adviser);
  };

  return (
    <div className="add-res-form-cont">
      {/* main form */}
      <form id="addSPTForm" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-container">
          {" "}
          {/* both parts of the form are inside this div for display:flex purposes */}
          <div className="res-primary-info">
            {" "}
            {/* left side of the form */}
            <h2>
              <b>Primary Info</b>
            </h2>
            <hr />
            {/* Title Field */}
            <div className="primaryfields">
              <label htmlFor="resTitle">Title: &nbsp; </label>
              <input
                type="text"
                id="resTitle"
                required
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            {/* Date Published Field */}
            <div className="primaryfields">
              <label htmlFor="datePublished">Year Published: &nbsp; </label>
              <input
                type="number"
                id="datePublished"
                required
                min={1908}
                max={9999}
                defaultValue={0}
                onChange={(event) => {
                  if (event.target.value < 0) {
                    event.target.value = event.target.defaultValue;
                  }
                  setYear(event.target.value);
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
                            {JSON.stringify(authorList, null, 2)}
                        </div> */}
            </div>{" "}
            {/* closing tag for authors group */}
          </div>{" "}
          {/* closing tag for left side of form */}
          {/* Right side of the Form */}
          <div className="spthesisform">
            <h2>
              <b>SP / Thesis</b>
            </h2>{" "}
            {/* Header */}
            <hr />
            {/* Dropdown for classification: either sp or thesis */}
            <div className="classifSelect">
              <br />
              Classification:
              <Select
                id="resClassification"
                // defaultValue={"Select..."}
                options={classificationOptions}
                value={classificationOptions.find((obj) => obj.value === type)}
                onChange={handleTypeChange}
              ></Select>
            </div>
            {/* Adviser Dropdown Multi */}
            <h5 style={{ fontWeight: "normal", fontFamily: "Montserrat" }}>
              Adviser(s):
            </h5>
            <div className="selectadvisers">
              <Select
                id="advsel"
                options={adviserchoices}
                value={adviserchoices.find((obj) => obj.value === adviser)}
                onChange={handleAdviserChange}
                isMulti
              ></Select>
            </div>
            <br />
            {/* Abstract TextArea */}
            <div>
              <h5 style={{ fontWeight: "normal", fontFamily: "Montserrat" }}>
                Enter Abstract here:
              </h5>
              <textarea
                id="abstractText"
                onChange={(event) => {
                  setAbstract(event.target.value);
                }}
              />
            </div>
            <div className="primaryfields">
              <label htmlFor="keywords-field">Keywords: &nbsp; </label>
              <ChipInput
                id="keywords-field"
                onChange={(chips) => handleChips(chips)}
              />
            </div>
            {/* Redirect links start here */}
            <div class="primaryfields">
              <label for="resId">Manuscript: &nbsp; </label>
              <input
                type="text"
                id="resId"
                onChange={(event) => {
                  setManuscript(event.target.value);
                }}
              />
            </div>
            <div class="primaryfields">
              <label for="resId">Journal: &nbsp; </label>
              <input
                type="text"
                id="resId"
                onChange={(event) => {
                  setJournal(event.target.value);
                }}
              />
            </div>
            <div class="primaryfields">
              <label for="resId">Poster: &nbsp; </label>
              <input
                type="text"
                id="resId"
                onChange={(event) => {
                  setPoster(event.target.value);
                }}
              />
            </div>
            <div class="primaryfields">
              <label for="resId">Source Code: &nbsp; </label>
              <input
                type="text"
                id="resId"
                onChange={(event) => {
                  setSourceCode(event.target.value);
                }}
              />
            </div>
            <br />
            <button type="submit" id="saveResource">
              Save
            </button>
          </div>
        </div>
      </form>
      <StatusModal
        message={success}
        name={"Sp/Thesis"}
        show={show}
        setShow={setShow}
        operation={"add"}
        pathAfter={"/add-new-spt/"}
      />
    </div>
  );
};

export default AddNewSPThesisForm;
