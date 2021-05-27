import { SignalCellularNoSimOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import Select from "react-select";
import { ItemGroup } from "semantic-ui-react";
import ResourceServices from "../../services/resourceService";
import ChipInput from "material-ui-chip-input";

const classificationOptions = [
  { value: "Special Problem", label: "Special Problem" },
  { value: "Thesis", label: "Thesis" },
];

// !!! Should receive an sp/thesis object
export default function AddResFormContainer(props) {
  const [resourceData, setResourceData] = useState({});

  const [old_sp_thesis_id, setOld_sp_thesis_id] = useState();
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
  const location = useLocation();
  
  // return ALL resources (dahil walang search na gumagamit ng id)
  const [spThInfoArr, setSpThInfoArr] = useState([]); //all sp/thesis array
  const [idSource, setIdSource] = useState();   //unique key to identify to which specific sp/thesis

  useEffect(()=>{
    try{
        setIdSource(props.location.state.id);
        setSpThInfoArr(props.location.state.sourceInfo);
    }catch(err){
      window.location="/not-found"
    }
  },[])

  useEffect(()=>{
    try{ 
      for(let sourceItem of spThInfoArr){
          if(sourceItem.sp_thesis_id === idSource.id){
            const {type, title, year, sp_thesis_id, journal, manuscript, poster, source_code, abstract,
              author, adviser, keywords} = sourceItem;
            setType(type);
            setTitle(title);
            setYear(year);
            setId(sp_thesis_id);
            setOld_sp_thesis_id(sp_thesis_id);
            setJournal(journal);
            setManuscript(manuscript);
            setPoster(poster);
            setSourceCode(source_code);
            setAbstract(abstract);
            
            setAdviser({fname:adviser[0]?.adviser_fname, lname:adviser[0]?.adviser_lname});
            setAuthor({fname:author[0]?.author_fname, lname:author[0]?.author_lname});

            console.log("fsdfsdfd");
            console.log(sourceItem);

            const tempKeyword=[]
            keywords.map((keyword)=>tempKeyword.push(keyword.sp_thesis_keyword))
            setKeyword(tempKeyword);
            break;
          }
        }
    }catch(err){
        console.log("Error 85: edit-res-page-form");
    }
  },[idSource,resourceData])
  
  
  
  
  useEffect(() => {
    function updateList() {
      if (adviser.fname && adviser.lname) {
        if (adviserList.indexOf(adviser) !== -1) {
          console.log("here2");
          setAdviserList([...adviserList, adviser]);
        }
    }
    else if (author.fname && author.lname) {
        if (authorList.indexOf(author) !== -1) {
          console.log("here1");
          setAuthorList([...authorList, author]);
        }
      }
    }
    updateList();
  }, [author, adviser]);
  
  const addAuthor = (e) => {
    const {name, value} = e.target
    setAuthor({...author, [name]:value});
  };

  const addAdviser = (e) => {
    const {name, value} = e.target
    setAdviser({...adviser, [name]:value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        // advisers: adviserList,
        // authors: authorList,
        advisers:[adviser],
        authors: [author],
        keywords: keywords,
      };
      console.log(userInput);
      const { data } = await ResourceServices.editSpThesis(userInput);
      alert(`${id} has been successfully updated.`)
      window.location="/manage-resources";
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
    setKeyword([...keywords,chip[chip.length-1]]);
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
          <div className="primaryfields">
            <label htmlFor="resAuthor">
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

          <div className="primaryfields">
            <label htmlFor="resAuthor">
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
              className="bi bi-plus"
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
          <div className="primaryfields">
            <label htmlFor="resId">Abstract: &nbsp; </label>
            <input
              type="text"
              id="resId"
              value={abstract}
              onChange={(event) => {
                setAbstract(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resId">Manuscript: &nbsp; </label>
            <input
              type="text"
              id="resId"
              value={manuscript}
              onChange={(event) => {
                setManuscript(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resId">Journal: &nbsp; </label>
            <input
              type="text"
              id="resId"
              value={journal}
              onChange={(event) => {
                setJournal(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resId">Poster: &nbsp; </label>
            <input
              type="text"
              id="resId"
              value={poster}
              onChange={(event) => {
                setPoster(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resId">Publication Year: &nbsp; </label>
            <input
              type="number"
              id="resId"
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resId">Source Code: &nbsp; </label>
            <input
              type="text"
              id="resId"
              value={source_code}
              onChange={(event) => {
                setSourceCode(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resId">Keywords: &nbsp; </label>
            <ChipInput
              style={{display:"flex", maxWidth:"180px",justifyContent:"center", flexWrap:"wrap", flexDirection:"column"}}
              onChange={(chips) => handleChips(chips)}
              value={keywords}
              InputProps={{ borderbottom: "none" }}
            />
          </div>

          {/* Uncomment this pag okay na yung file attachments for the backend part*/}
          {/* <div class = "spthesisfiles">
                             <h5>Upload Abstract</h5>
                             <input type="file" className="resourcefiles" id="spthesisAbstract"/>
                         </div>
                        
                         <div class = "spthesisfiles">
                             <h5>Upload Manuscript</h5>
                             <input type="file" className="resourcefiles" id="spthesisManuscript"/>
                         </div>
    
                         <div class = "spthesisfiles">
                             <h5>Upload Journal</h5>
                             <input type="file" className="resourcefiles" id="spthesisJournal"/>
                         </div>
    
                         <div class = "spthesisfiles">
                             <h5>Upload Poster</h5>
                             <input type="file" className="resourcefiles" id="spthesisPoster"/>
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

          <div className="primaryfields">
            <label htmlFor="resId">ID/ISBN: &nbsp; </label>
            <input
              type="text"
              id="resId"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </div>

          <div className="primaryfields">
            <label htmlFor="resTitle">Title: &nbsp; </label>
            <input
              type="text"
              id="resTitle"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          {/* <AddAuthorField/> */}
          <h5>Author(s):</h5>
          <div className="primaryfields">
            <label htmlFor="resAuthor">
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

          <div className="primaryfields">
            <label htmlFor="resAuthor">
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
          <div className="resClassification-container">
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
