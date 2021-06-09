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
    const [authors, setAuthor] = useState({
        fname: "",
        lname: "",
    });
    const [advisers, setAdviser] = useState({
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
            window.location = "/not-found";
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
                        authors,
                        advisers,
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

                    setAdviser({
                        fname: advisers[0]?.adviser_fname,
                        lname: advisers[0]?.adviser_lname,
                    });
                    setAuthor({
                        fname: authors[0]?.author_fname,
                        lname: authors[0]?.author_lname,
                    });

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
                authors:authorList,
                advisers:adviserList,
                keywords,
            };
            console.log(userInput)
            await ResourceServices.editSpThesis(userInput);
            alert(`${id} has been successfully updated.`);
            window.location = "/manage-resources";
        } catch (err) {
            if (err.response && err.response.data) {
                alert(err.response.data.errorMessage); // some reason error message
            }
        }
    };

    // const handleAdviserChange = (adviser) => {
    //     const vals = [...advisers].map((opt) => opt.value);
    //     setAdviser(vals);
    // }

    const handleAdviserChange = (adviserList) => {
        const adviser = [...adviserList].map((obj) => obj.value);
        // setCourses(values);
        setAdviserList(adviser);
  };

    // get input from type selection
    // const handleChange = (e) => {
    //     setType(e.value);
    // };

    // creates an array of keywords from theh user input
    const handleChips = (chip) => {
        setKeyword([...keywords, chip[chip.length - 1]]);
    };

    const renderAuthorFields  = () =>   {
        setAuthorList((currentAuthors) => [
            ...currentAuthors,
            {
            // author needs to generate ID para di madelete lahat ng fields in one button click
            authorid: nanoid(5),
            fname: "",
            lname: "",
            },
        ]);
    }



    // console.log(authors)
    // console.log(authors.fname)

    return (
        <div className="add-res-form-cont">
            <EditResourceHeader/>

            <form className = "main-form" id="addSPTForm" onSubmit={handleSubmit} autoComplete="off">
                
                <div className = "form-columns">

                    <div className = "form-left-column">

                        {/* Title */}
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

                        {/* Date Published */}
                        <div className="primaryfields">
                            <label htmlFor="sptYear">Year Published: &nbsp; </label>
                            <input
                                type="number"
                                id="sptYear"
                                required
                                key={`${Math.floor((Math.random() * 1000))}-min`} 
                                min={1908}
                                max={9999}
                                defaultValue={year}
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
                            <h4 style = {{fontWeight:"normal"}}
                            >Author(s):</h4>

                            {/* button adds fields for author */}
                            <button
                                id="addAuthor"
                                onClick={renderAuthorFields}
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
                                <div className = "authorfields" key={p.authorid}>
                                        {/* AUTHOR FIRST NAME FIELD */}
                                        <div className = "authorname-cont">

                                            <div className="author-name">
                                                <label htmlFor="resAuthorFN">
                                                    First Name:
                                                </label>

                                                <input
                                                    type="text"
                                                    id="resAuthorFN"
                                                    // name="fname"
                                                    required
                                                    value={p.fname}
                                                    defaultValue={authors.fname}
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
                                                <label htmlFor="resAuthorLN">
                                                    Last Name: 
                                                </label>
                                                <input
                                                    type="text"
                                                    id="resAuthorLN"
                                                    required
                                                    // name="lname"
                                                    defaultValue={authors.lname}
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
                                            
                                        </div> {/* closing div for authorname-cont */}

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
                                    
                                    
                                </div> //closing for authorfields
                                );
                            })}
                                    {/* for testing only: */}
                                    {/* <div className = "testdiv">
                                                    {JSON.stringify(authorList, null, 2)}
                                                </div> */}    
                        </div> {/* authors-group close */}
                    
                    </div>  {/*closing for left column  */}

                    <div className = "form-mid-column">

                        {/* Classification */}
                        <div className="classifSelect">
                            Classification:
                            <Select
                                id="resClassification"
                                // defaultValue={"Select..."}
                                options={classificationOptions}
                                value={classificationOptions.find((obj) => obj.value === type)}
                                // onChange={handleTypeChange}
                            ></Select>
                        </div>

                        {/* Adviser Dropdown Multi */}
                        <div className="select-advisers">
                        <label 
                            htmlFor= "advsel"
                            >Advisers:</label>
                        <Select
                            id="advsel"
                            options={adviserchoices}
                            defaultValue = {advisers}
                            // defaultValue={adviserchoices.find((obj) => obj.value === adviser)}
                            onChange={handleAdviserChange}
                            isMulti
                        ></Select>
                        </div>

                        {/* Abstract TextArea */}
                        <div className = "abstract-div">
                            <label htmlFor= "abstractText">Abstract:</label>
                            <textarea
                                id="abstractText"
                                defaultValue = {abstract}
                                onChange={(event) => {
                                setAbstract(event.target.value);
                                }}
                            />
                        </div>

                    </div> {/* mid column close */}

                    <div className ="form-right-column">

                        <div className = "primaryfields">
                            <label htmlFor="">Source Code Link:</label>
                            <input
                                type = "url"
                                className="resourcefiles"
                                id="spt-sourcecode"
                                defaultValue={source_code}
                                placeholder ={"https://www.example.com/"}
                                onChange={(event) => 
                                    {
                                    setSourceCode(event.target.value);
                                    }
                                }
                            />
                        </div>

                        <div className = "primaryfields">
                            <label htmlFor="">Manuscript Link:</label>
                            <input
                                type = "url"
                                className="resourcefiles"
                                id="spt-manuscript"
                                placeholder ={"https://www.example.com/"}
                                // onClick={(e) => (e.target.value = null)}
                                defaultValue = {manuscript}
                                onChange={(event) => 
                                    {
                                    setManuscript(event.target.value);
                                    }
                                }
                            />
                        </div>

                        <div className = "primaryfields">
                            <label htmlFor="">Journal Link:</label>
                            <input
                                type = "url"
                                className="resourcefiles"
                                id="spt-journal"
                                defaultValue = {journal}
                                placeholder ={"https://www.example.com/"}
                                onChange={(event) => 
                                    {
                                    setJournal(event.target.value);
                                    }
                                }
                            />
                        </div>

                        <div className = "primaryfields">
                            <label htmlFor="">Poster Link:</label>
                            <input
                                type = "url"
                                className="resourcefiles"
                                id="spt-poster"
                                defaultValue={poster}
                                placeholder ={"https://www.example.com/"}
                                onChange={(event) => 
                                    {
                                    setPoster(event.target.value);
                                    }
                                }
                            />
                        </div>

                        <div className="primaryfields">
                            <label htmlFor="keywords-field">Keywords: &nbsp; </label>
                            <ChipInput
                                id="keywords-field"
                                defaultValue = {keywords}
                                onChange={(chips) => handleChips(chips)}
                            />
                        </div>

                        <button type="submit" id="saveResource">
                            Save
                        </button>

                    </div> {/* right form close */}
                
                </div> {/* form-columns close */}
            
            </form> {/* main form close */}

        {/* <StatusModal
            message={success}
            name={"Sp/Thesis"}
            show={show}
            setShow={setShow}
            operation={"add"}
            pathAfter={"/add-new-spt/"}
        /> */}
    </div> //add-res-form-cont close
        
    );
}
