import React, { useState, useEffect } from 'react'
import Select from 'react-select'
// import { ItemGroup } from 'semantic-ui-react'
import ResourceServices from '../../services/resourceService'
import ChipInput from "material-ui-chip-input";
// import AddResSidebar from './addResHeader';
// import ChipInput from "material-ui-chip-input";

const classificationOptions = [
    {value:'Special Problem', label:'Special Problem'},
    {value:'Thesis', label:'Thesis'},
];


// TO DO: COMPLETE CHOICES FOR ADVISERS
const adviserchoices = [
    {value:{fname:'Eliezer A.', lname:'Albacea'}, label: 'Albacea, Aliezer A.'},
    {value:{fname:'Maria Art Antonette D.', lname:'Clariño'}, label: 'Clariño, Maria Art Antonette D.'},
    {value:{fname:'Lailanie R.', lname:'Danila'}, label: 'Danila, Lailanie R.'},
    {value:{fname:'Joseph Anthony C.', lname:'Hermocilla'}, label: 'Hermocilla, Joseph Anthony C.'},
    {value:{fname:'Arian J.', lname:'Jacildo'}, label: 'Jacildo, Arian J.'},
    {value:{fname:'Concepcion L.', lname:'Khan'}, label: 'Khan, Concepcion L.'},
    {value:{fname:'Fermin Roberto G', lname:'Lapitan'}, label: 'Lapitan, Fermin Roberto G.'}, //hi ser
    {value:{fname:'Val Randolf M.', lname:'Madrid'}, label: 'Madrid, Val Randolf M.'},
    {value:{fname:'Katrina Joy H', lname:'Magno'}, label: 'Magno, Katrina Joy H.'},
    {value:{fname:'Rozano S.', lname:'Maniaol'}, label: 'Maniaol, Rozano S.'},
    {value:{fname:'Danilo J.', lname:'Mercado'}, label: 'Mercado, Danilo J.'},
    {value:{fname:'Rizza DC', lname:'Mercado'}, label: 'Mercado, Rizza DC.'},
    {value:{fname:'Toni-Jan Keith P.', lname:'Monserrat'}, label: 'Monserrat, Toni-Jan Keith P.'},
    {value:{fname:'Jaderick P.', lname:'Pabico'}, label: 'Pabico, Jaderick P.'},
    {value:{fname:'Margarita Carmen S.', lname:'Paterno'}, label: 'Paterno, Margarita Carmen S.'},
    {value:{fname:'Reginald Neil C.', lname:'Recario'}, label: 'Recario, Reginald Neil C.'},
    {value:{fname:'Samaniego, Jaime M.', lname:'Samaniego'}, label: 'Samaniego, Jaime M.'},

    ]   

const AddNewSPThesisForm = ({props}) => {    

    // functionalities:
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [datePublished, setDatePublished] = useState(0);
    const [dateAcquired, setDateAcquired] = useState(0);
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

    // const [courses, setCourses] = useState([]);
    // const [publisher, setPublisher] = useState("");
    // const [numOfCopies, setNumOfCopies] = useState(0);
    // const [description, setDescription] = useState("");

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userInput = {
                sp_thesis_id: id,
                type,
                title,
                abstract,
                datePublished,
                dateAcquired,
                source_code,
                manuscript,
                journal,
                poster,
                advisers: adviserList,
                authors: authorList,
                keywords: keywords,
            };
                
            const { data } = await ResourceServices.addSpThesis(userInput);
            console.log(data);
            alert(`New Sp/Thesis has been successfully added to the library`);
            window.location="/add-new-resource";
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
    // const handleCourseChange = (newCourse) => {
    //     setCourses(newCourse);
    // };

    // creates an array of keywords from theh user input
    const handleChips = (chip) => {
        setKeyword(chip);
    };

    const handleSourceCode = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const formData = { file: e.target.result };
      // sourceCode.append("File", source_code);
      setSourceCode(formData);
    };
    // setSourceCode(e.target.files[0]);
  };

  const handleManuscript = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const formData = { file: e.target.result };
      setManuscript(formData);
    };
  };

  const handleJournal = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const formData = { file: e.target.result };
      setJournal(formData);
    };
  };

  const handlePoster = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const formData = { file: e.target.result };
      setPoster(formData);
    };
  };


    // ==============================================================

    return(
        <div className = "add-res-form-cont">
            <form id = "mainForm" onSubmit = {handleSubmit}>
                <div className = "form-container">
                    <div className="res-primary-info">
                    
                        <h2>
                            <b>Primary Info</b>
                        </h2>
                        <hr/> 

                        <div className="primaryfields">
                            <label htmlFor="resId">ID: &nbsp; </label>
                            <input
                            required
                            type="text"
                            id="resId"
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
                            required
                            onChange={(event) => {
                                setTitle(event.target.value);
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
                            required
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
                            required
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
                    </div>

                    <div className = "spthesisform">
                        <h2><b>SP / Thesis</b></h2>
                        <hr/>

                        <div className = "classifSelect">
                                <br/>
                                Classification:
                                <Select id="resClassification"
                                        // defaultValue={"Select..."}
                                        options={classificationOptions}
                                        value={classificationOptions.find((obj) => obj.value === type)}
                                        onChange={handleChange}>
                                </Select>
                        </div>

                        <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>
                        Adviser(s):</h5>
                        
                        <div className="selectadvisers">
                            <Select id ="advsel"
                                    options={adviserchoices}
                                    value={adviserchoices.find((obj)=>obj.value===adviser)}
                                    onChange={handleChange}
                                    isMulti>
                            </Select>
                        </div>

                        <br/>
                                        
                        <div className = "spthesisfiles">
                            <h5>Upload Abstract</h5>
                            <input type="file" className="resourcefiles" id="spthesisAbstract"/>
                        </div>

                        <div>
                            <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>... or enter Abstract here:</h5>
                            <textarea
                                id = "abstractText"
                                onChange = {
                                    (event) => {
                                        setAbstract(event.target.value);
                                    }
                                }
                            />

                        </div>
                        
                        <div className="spthesisfiles">
                            <h5>Upload Source Code</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisJournal"
                            onChange={(e) => {
                                handleSourceCode(e);
                            }}
                            />
                        </div>

                        <div className="spthesisfiles">
                            <h5>Upload Manuscript</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisManuscript"
                            onChange={(e) => {
                                handleManuscript(e);
                            }}
                            />
                        </div>

                        
                        <div className="spthesisfiles">
                            <h5>Upload Journal</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisJournal"
                            onChange={(e) => {
                                handleJournal(e);
                            }}
                            />
                        </div>

                        <div className="spthesisfiles">
                            <h5>Upload Poster</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisPoster"
                            onChange={(e) => {
                                handlePoster(e);
                            }}
                            />
                        </div>
                        

                        <div class="primaryfields">
                            <label for="resId">Keywords: &nbsp; </label>
                            <ChipInput
                                id = "keywords-field"
                                onChange={(chips) => handleChips(chips)}
                                InputProps={{ borderbottom: "none" }}
                            />
                        </div>

                        <button type="submit" id="saveResource">
                        Save
                        </button>
                    </div>

                    
                </div>
            
            </form>
        </div>
        
    )
}

export default AddNewSPThesisForm