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

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  A single-page form to be filled up by the user with
 *  relevant SP/Thesis attributes
 *
 ******************************************************/

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

  /****************************************************
   * Type: Function
   *
   * Summary:
   *  Stores all user inputs to an object containing SP/
   *  Thesis attributes and make a POST request.
   *  Shows a modal to confirm if request is successful or
   *  not.
   *  Adds the SP/Thesis in the database if successful.
   *
   ******************************************************/
  const handleSubmit = async (event) => {
    // console.log("meow");
    event.preventDefault();

    if (
      authorList === null ||
      adviserList === null ||
      keywords === null ||
      authorList.length === 0 ||
      adviserList.length === 0 ||
      keywords.length === 0
    ) {
      return ToastNotification({
        content: "Please enter all required fields",
      });
    }

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
      await ResourceServices.addSpThesis(userInput);
      setSuccess("success");
      setShow(true);
      event.target.reset();
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

  // creates an array of adviser names from the user input
  const handleAdviserChange = (adviserList) => {
    const adviser = [...adviserList].map((obj) => obj.value);
    // setCourses(values);
    setAdviserList(adviser);
  };

  return (
    <div className="add-res-form-cont">
      <form
        className="main-form"
        id="addSPTForm"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-columns">
          <div className="form-left-column">
            {/* Title */}
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
            {/* Date Published */}
            <div className="primaryfields">
              <label htmlFor="datePublished">Year Published: &nbsp; </label>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                id="sptYear"
                required
                min={1908}
                max={9999}
                // defaultValue={year}
                onChange={(event) => {
                  if (event.target.value < 0) {
                    event.target.value = event.target.defaultValue;
                  }
                  setYear(event.target.value);
                }}
                // onMouseEnter={(e) => e.target.focus()}
              />
            </div>
            {/* Author fields */}
            <div className="authors-group">
              <h4 style={{ fontWeight: "normal" }}>Author(s):</h4>

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
                    </div>{" "}
                    {/* closing div for authorname-cont */}
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
                      style={{ marginTop: "3%" }}
                    >
                      Delete Author
                    </button>
                  </div> //closing for authorfields
                );
              })}
              {/* for testing only: */}
              {/* <div className = "testdiv">
                                                {JSON.stringify(authorList, null, 2)}
                                            </div> */}
            </div>{" "}
            {/* authors-group close */}
          </div>{" "}
          {/*closing for left column  */}
          <div className="form-mid-column">
            {/* Classification */}
            <div className="classifSelect">
              Classification:
              <Select
                id="resClassification"
                required
                // defaultValue={"Select..."}
                options={classificationOptions}
                value={classificationOptions.find((obj) => obj.value === type)}
                onChange={handleTypeChange}
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

            {/* Adviser Dropdown Multi */}
            <div className="select-advisers">
              <label htmlFor="advsel">Advisers:</label>
              <Select
                id="advsel"
                required
                options={adviserchoices}
                value={adviserchoices.find((obj) => obj.value === adviser)}
                onChange={handleAdviserChange}
                isMulti
                styles={{
                  control: (base) => ({
                    ...base,
                    "&:hover": { borderColor: "#778899" }, // border style on hover
                    border: "2px solid #afbcc9",
                    boxShadow: "none",
                  }),
                }}
              ></Select>
            </div>
            <br></br>
            {/* Abstract TextArea */}
            <div className="abstract-div">
              <label htmlFor="abstractText">Abstract:</label>
              <textarea
                required
                id="abstractText"
                onChange={(event) => {
                  setAbstract(event.target.value);
                }}
              />
            </div>
          </div>{" "}
          {/* mid column close */}
          <div className="form-right-column">
            <div className="primaryfields">
              <label htmlFor="">Source Code Link:</label>
              <input
                type="url"
                className="resourcefiles"
                id="spt-sourcecode"
                placeholder={"https://drive.google.com/file/d/_id/view"}
                onChange={(event) => {
                  setSourceCode(event.target.value);
                }}
              />
            </div>

            <div className="primaryfields">
              <label htmlFor="">Manuscript Link:</label>
              <input
                type="url"
                className="resourcefiles"
                id="spt-manuscript"
                placeholder={"https://drive.google.com/file/d/_id/view"}
                onChange={(event) => {
                  setManuscript(event.target.value);
                }}
              />
            </div>

            <div className="primaryfields">
              <label htmlFor="">Journal Link:</label>
              <input
                type="url"
                className="resourcefiles"
                id="spt-journal"
                placeholder={"https://drive.google.com/file/d/_id/view"}
                onChange={(event) => {
                  setJournal(event.target.value);
                }}
              />
            </div>

            <div className="primaryfields">
              <label htmlFor="">Poster Link:</label>
              <input
                type="url"
                className="resourcefiles"
                id="spt-poster"
                placeholder={"https://drive.google.com/file/d/_id/view"}
                onChange={(event) => {
                  setPoster(event.target.value);
                }}
              />
            </div>

            <div className="primaryfields">
              <label htmlFor="keywords-field">Keywords: &nbsp; </label>
              <ChipInput
                id="keywords-field"
                onChange={(chips) => handleChips(chips)}
                color="primary"
                style={{
                  border: "2px solid #afbcc9",
                  padding: "0.5rem",
                  paddingBottom: "0rem",
                  borderRadius: "0.3rem",
                }}
              />
            </div>

            <button type="submit" id="saveResource">
              Save
            </button>
          </div>{" "}
          {/* right form close */}
        </div>{" "}
        {/* form-columns close */}
      </form>{" "}
      {/* main form close */}
      {/* modal that shows confirmation upon form submission */}
      <StatusModal
        message={success}
        name={"Sp/Thesis"}
        show={show}
        setShow={setShow}
        operation={"add"}
        pathAfter={"/add-new-spt/"}
      />
    </div> //add-res-form-cont close
  );
};

export default AddNewSPThesisForm;
