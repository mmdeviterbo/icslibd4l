import { SignalCellularNoSimOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import Select from "react-select";
import { ItemGroup } from "semantic-ui-react";
import ResourceServices from "../../services/resourceService";
import ChipInput from "material-ui-chip-input";

const classificationOptions = [
  { value: "sp", label: "Special Problem" },
  { value: "thesis", label: "Thesis" },
];

// !!! Should receive an sp/thesis object
export default function AddResFormContainer() {
  const [resourceData, setResourceData] = useState({
    sp_thesis_id: "",
    type: "",
    title: "",
    abstract: "",
    year: 0,
    source_code: "",
    manuscript: "",
    journal: "",
    poster: "",
    advisers: [],
    authors: [],
    keywords: [],
  });

  const location = useLocation();
  const { res_id } = location.state.id;
  console.log("Editing...");
  console.log(res_id);

  const old_sp_thesis_id = res_id; // EDIT THIS ACCORDINGLY
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [id, setId] = useState("");
  const [journal, setJournal] = useState("");
  const [manuscript, setManuscript] = useState("");
  const [poster, setPoster] = useState("");
  const [source_code, setSourceCode] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeyword] = useState();
  // multiple authors should be possible
  const [author, setAuthor] = useState({
    fname: "",
    lname: "",
  });
  const [adviser, setAdviser] = useState({
    fname: "",
    lname: "",
  });
  const [authorList, setAuthorList] = useState([]);
  const [adviserList, setAdviserList] = useState([]);

  useEffect(() => {
    function isInArray(arr, item) {
      if (arr.indexOf(item) > -1) {
        console.log("true");
      } else {
        console.log("false");
      }
    }
    function updateList() {
      if (adviser.fname && adviser.lname) {
        // console.log('adding', adviser.fname, adviser.lname);
        // isInArray(adviserList, adviser)
        if (adviserList.indexOf(adviser)) {
          setAdviserList([]);
          setAdviserList([...adviserList, adviser]);
        }
      } else if (author.fname && author.lname) {
        // console.log('adding', author.fname, author.lname);
        // isInArray(authorList, author)
        if (authorList.indexOf(author)) {
          setAuthorList([]);
          setAuthorList([...authorList, author]);
        }
      }
    }
    updateList();
  }, [author, adviser]);

  const addAuthor = (e) => {
    setAuthor({
      ...author,
      [e.target.name]: e.target.value,
    });
  };

  const addAdviser = (e) => {
    setAdviser({
      ...adviser,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(authorList)
  // console.log(adviserList)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(authorList)
    // console.log(adviserList)
    // console.log(keywords)
    try {
      const userInput = {
        old_sp_thesis_id,
        sp_thesis_id: id,
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
        keywords: keywords,
      };
      const { data } = await ResourceServices.editSpThesis(userInput);
      console.log(data);
      // alert(`${id} has been successfully updated.`)
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

  // creates an array of keywords from theh user input
  const handleChips = (chip) => {
    setKeyword(chip);
  };

  const SPThesisInfoForm = () => {
    return (
      <div className="res-primary-info">
        <h2>
          <b>SP / Thesis</b>
        </h2>
        <hr />

        <form>
          {/* <AddAuthorField/> */}
          <h5>Adviser(s):</h5>
          <div class="primaryfields">
            <label for="resAuthor">
              &nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp;{" "}
            </label>
            <input
              type="text"
              id="resAuthorFN"
              name="fname"
              value={adviser.fname}
              onChange={addAdviser}
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
              value={adviser.lname}
              onChange={addAdviser}
            />
            {/* {updateAuthorList()} */}
          </div>
          <button id="addAdviser">
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
            Add Adviser
          </button>

          <br />
          <br />
          <br />

          {/* String inputs muna kasi yun yung nakalagay sa backend na part ngayon. Di pa nila nafi-figure out yung
                        file attachments as input. */}
          <div class="primaryfields">
            <label for="resId">Abstract: &nbsp; </label>
            <input
              type="text"
              id="resId"
              onChange={(event) => {
                setAbstract(event.target.value);
              }}
            />
          </div>

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
            <label for="resId">Publication Year: &nbsp; </label>
            <input
              type="number"
              id="resId"
              onChange={(event) => {
                setYear(event.target.value);
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

          <div class="primaryfields">
            <label for="resId">Keywords: &nbsp; </label>
            <ChipInput
              onChange={(chips) => handleChips(chips)}
              InputProps={{ borderbottom: "none" }}
            />
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
  };

  // Main add resource form container
  return (
    <div className="add-res-form-cont">
      {/* Primary  Info */}
      <div className="res-primary-info">
        <form id="createForm" onSubmit={handleSubmit}>
          <h2>
            <b>Primary Info</b>
          </h2>
          <hr />

          <div class="primaryfields">
            <label for="resId">ID/ISBN: &nbsp; </label>
            <input
              type="text"
              id="resId"
              onChange={(event) => {
                setId(event.target.value);
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
          <br />
          <br />
          <br />
          <div class="resClassification-container">
            <p>Classification: &nbsp; </p>
            <Select
              id="resClassification"
              defaultValue={"Select..."}
              options={classificationOptions}
              value={classificationOptions.find((obj) => obj.value === type)}
              onChange={handleChange}
            ></Select>
          </div>
          {/* {renderForm()} */}
          <br />
          <br />
          <button type="submit" id="saveResource">
            Update
          </button>
        </form>
      </div>
      {SPThesisInfoForm()}

      {/* <div className="res-primary-info">
            </div>           */}
    </div>
  );
}
