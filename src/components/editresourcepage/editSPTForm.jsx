// import { SignalCellularNoSimOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { ItemGroup } from "semantic-ui-react";
import ResourceServices from "../../services/resourceService";
import ChipInput from "material-ui-chip-input";
import { nanoid } from 'nanoid'
import { produce } from 'immer'
import EditResourceHeader from "./editResourceSideHeader"

const classificationOptions = [
    { value: "Special Problem", label: "Special Problem" },
    { value: "Thesis", label: "Thesis" },
];

const adviserchoices = [
    {value:
        {fname:'Eliezer A.', lname:'Albacea'}, 
        label: 'Albacea, Aliezer A.'
    },
    // follow format 
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

// !!! Should receive an sp/thesis object
export default function EditSPTFormContainer(props) {
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

    // return ALL resources (dahil walang search na gumagamit ng id)
    const [spThInfoArr, setSpThInfoArr] = useState([]); //all sp/thesis array
    const [idSource, setIdSource] = useState(); //unique key to identify to which specific sp/thesis

    useEffect(() => {
        try {
            setIdSource(props.location?.state.id);
            setSpThInfoArr(props.location?.state.sourceInfo);  //all objects from table
        } catch (err) {
            // window.location = "/not-found";
        }
    }, []);

    // console.log(idSource)
    // console.log(spThInfoArr);

    useEffect(() => {
        try {
            for (let sourceItem of spThInfoArr) {
                if (sourceItem.sp_thesis_id === idSource.id) {
                    const {
                        type,
                        title,
                        year,
                        sp_thesis_id,
                        journal,
                        manuscript,
                        poster,
                        source_code,
                        abstract,
                        author,
                        adviser,
                        keywords,
                    } = sourceItem;
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

                    // setAdviser({
                    //     fname: adviser[0]?.adviser_fname,
                    //     lname: adviser[0]?.adviser_lname,
                    // });
                    // setAuthor({
                    //     fname: author[0]?.author_fname,
                    //     lname: author[0]?.author_lname,
                    // });

                    // console.log("fsdfsdfd");
                    console.log(sourceItem);

                    const tempKeyword = [];
                    keywords.map((keyword) =>
                        tempKeyword.push(keyword.sp_thesis_keyword)
                    );
                    setKeyword(tempKeyword);
                    break;
                }
            }
        } catch (err) {
            console.log("Error 85: edit-res-page-form");
        }
    }, [idSource, resourceData]);

    useEffect(() => {
        function updateList() {
            if (adviser.fname && adviser.lname) {
                if (adviserList.indexOf(adviser) !== -1) {
                    // console.log("here2");
                    setAdviserList([...adviserList, adviser]);
                }
            } else if (author.fname && author.lname) {
                if (authorList.indexOf(author) !== -1) {
                    console.log("here1");
                    setAuthorList([...authorList, author]);
                }
            }
        }
        updateList();
    }, [author, adviser]);

    // const addAuthor = (e) => {
    //     const { name, value } = e.target;
    //     setAuthor({ ...author, [name]: value });
    // };

    // const addAdviser = (e) => {
    //     const { name, value } = e.target;
    //     setAdviser({ ...adviser, [name]: value });
    // };

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
                advisers: [adviser],
                authors: [author],
                keywords,
            };
            await ResourceServices.editSpThesis(userInput);
            alert(`${id} has been successfully updated.`);
            window.location = "/manage-resources";
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
        setKeyword([...keywords, chip[chip.length - 1]]);
    };

    return (

        <div className = "add-res-form-cont">
            <EditResourceHeader/>
            {/* main form */}
            <form id = "addSPTForm" onSubmit = {handleSubmit} autoComplete="off"> 
                            
                <div className = "form-container">              {/* both parts of the form are inside this div for display:flex purposes */}
                    <div className="res-primary-info">          {/* left side of the form */}
                        <h2>
                            <b>Primary Info</b>
                        </h2>
                        <hr/> 

                        {/* ID Field */}
                        {/* Will delete this, just using if i can get access the data */}
                        {/* <div className="primaryfields">
                            <label htmlFor="resId">ID: &nbsp; </label>
                            <input
                            required
                            type="text"
                            id="resId"
                            defaultValue = {id}
                            disabled
                            // onchange = {(event => {
                            //     setId(event.target.value);
                            // })}
                            />
                        </div> */}

                        {/* Title Field */}
                        <div className="primaryfields">
                            <label htmlFor="resTitle">Title: &nbsp; </label>
                            <input
                            type="text"
                            id="resTitle"
                            defaultValue = {title}
                            required
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                            />
                        </div>

                        {/* Year Field */}
                        <div className="primaryfields">
                            <label htmlFor="sptYear">Year: &nbsp; </label>
                            <input
                            type="number"
                            id="sptYear"
                            defaultValue = {year}
                            min={1800}
                            max={9999}
                            // TO-DO: VALIDATE INPUT !!!
                            required
                            onChange={(event) => {
                                setYear(event.target.value);
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
                            <div className = "testdiv">
                                {JSON.stringify(type, null, 2)}
                            </div>

                        </div> {/* closing tag for authors group */}
                        
                    </div> {/* closing tag for left side of form */}


                    {/* Right side of the Form */}
                    <div className = "spthesisform">
                        <h2><b>SP / Thesis</b></h2>     {/* Header */}
                        <hr/>

                        {/* Dropdown for classification: either sp or thesis */}
                        <div className = "classifSelect">
                                <br/>
                                Type:
                                <Select id="resClassification"
                                        defaultValue={type}
                                        options={classificationOptions}
                                        onChange={handleChange}>
                                </Select>
                        </div>

                        {/* Adviser Dropdown Multi */}
                        <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>
                        Adviser(s):</h5>
                        
                        <div className="selectadvisers">
                            <Select id ="advsel"
                                    options={adviserchoices}
                                    // placeholder={adviser.adviser_fname}
                                    // value={adviserchoices.find((obj)=>obj.value===adviser)}
                                    onChange={handleChange}
                                    isMulti>
                            </Select>
                        </div>

                        <br/>

                        {/* Abstract TextArea */}
                        <div>
                            <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>Enter Abstract here:</h5>
                            <textarea
                                id = "abstractText"
                                value={abstract}
                                onChange = {
                                    (event) => {
                                        setAbstract(event.target.value);
                                    }
                                }
                            />

                        </div>
                        
                        {/* File uploads here */}
                        <div className="spthesisfiles">
                            <h5>Upload Source Code</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisJournal"
                            // onChange={(e) => {
                            //     // handleSourceCode(e);
                            // }}
                            />
                        </div>

                        <div className="spthesisfiles">
                            <h5>Upload Manuscript</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisManuscript"
                            // onChange={(e) => {
                            //     handleManuscript(e);
                            // }}
                            />
                        </div>

                        
                        <div className="spthesisfiles">
                            <h5>Upload Journal</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisJournal"
                            // onChange={(e) => {
                            //     handleJournal(e);
                            // }}
                            />
                        </div>

                        <div className="spthesisfiles">
                            <h5>Upload Poster</h5>
                            <input
                            type="file"
                            className="resourcefiles"
                            id="spthesisPoster"
                            // onChange={(e) => {
                            //     handlePoster(e);
                            // }}
                            />
                        </div>
                        

                        <div className="primaryfields">
                            <label htmlFor="keywords-field">Keywords: &nbsp; </label>
                            <ChipInput
                                id = "keywords-field"
                                value={keywords}
                                onChange={(chips) => handleChips(chips)}
                                InputProps={{ borderbottom: "none" }}
                            />
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
}
