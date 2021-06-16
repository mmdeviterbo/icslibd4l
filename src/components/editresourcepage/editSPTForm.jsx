// import { SignalCellularNoSimOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
// import { ItemGroup } from "semantic-ui-react";
import ResourceServices from "../../services/resourceService";
import ChipInput from "material-ui-chip-input";
import { nanoid } from "nanoid";
import { produce } from "immer";
import EditResourceHeader from "./editResourceSideHeader";
import ToastNotification from "../toastNotification";
import StatusModal from "../modal/operationStatusModal";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/addresource/addResourceStyle.css";

const classificationOptions = [
    { value: "Special Problem", label: "Special Problem" },
    { value: "Thesis", label: "Thesis" },
];

const adviserchoices = [
    {
        value: { fname: "Eliezer A.", lname: "Albacea" },
        label: "Albacea, Eliezer A.",
    },
    // follow format
    {
        value: { fname: "Maria Art Antonette D.", lname: "Clariño" },
        label: "Clariño, Maria Art Antonette D.",
    },
    {
        value: { fname: "Lailanie R.", lname: "Danila" },
        label: "Danila, Lailanie R.",
    },
    {
        value: { fname: "Joseph Anthony", lname: "Hermocilla" },
        label: "Hermocilla, Joseph Anthony",
    },
    {
        value: { fname: "Arian", lname: "Jacildo" },
        label: "Jacildo, Arian",
    },
    {
        value: { fname: "Concepcion L.", lname: "Khan" },
        label: "Khan, Concepcion L.",
    },
    {
        value: { fname: "Fermin Roberto G.", lname: "Lapitan" },
        label: "Lapitan, Fermin Roberto G.",
    }, //hi ser
    {
        value: { fname: "Val Randolf M.", lname: "Madrid" },
        label: "Madrid, Val Randolf M.",
    },
    {
        value: { fname: "Katrina Joy H.", lname: "Magno" },
        label: "Magno, Katrina Joy H.",
    },
    {
        value: { fname: "Rozano S.", lname: "Maniaol" },
        label: "Maniaol, Rozano S.",
    },
    {
        value: { fname: "Danilo", lname: "Mercado" },
        label: "Mercado, Danilo",
    },
    {
        value: { fname: "Rizza DC.", lname: "Mercado" },
        label: "Mercado, Rizza DC.",
    },
    {
        value: { fname: "Toni-Jan Keith P.", lname: "Monserrat" },
        label: "Monserrat, Toni-Jan Keith P.",
    },
    {
        value: { fname: "Jaderick", lname: "Pabico" },
        label: "Pabico, Jaderick",
    },
    {
        value: { fname: "Vladimir", lname: "Mariano" },
        label: "Mariano, Vladimir",
    },
    {
        value: { fname: "Reinald Adrian", lname: "Pugoy"},
        label: "Pugoy, Reinald Adrian",
    },
    {
        value: { fname: "Margarita Carmen", lname: "Paterno" },
        label: "Paterno, Margarita Carmen",
    },
    {
        value: { fname: "Reginald Neil C.", lname: "Recario" },
        label: "Recario, Reginald Neil C.",
    },
    {
        value: { fname: "Jaime", lname: "Samaniego" },
        label: "Samaniego, Jaime",
    },
];

// !!! Should receive an sp/thesis object
export default function EditSPTFormContainer(props) {
    const history = useHistory();
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

    const [advisers, setAdviser] = useState([]);
    const [authors, setAuthor] = useState([]);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState("");

    // return ALL resources (dahil walang search na gumagamit ng id)
    const [spThInfoArr, setSpThInfoArr] = useState([]); //all sp/thesis array
    const [idSource, setIdSource] = useState(); //unique key to identify to which specific sp/thesis
    const [tempAdvisers, setTempAdvisers]=useState([]);
    
    useEffect(()=>{
        try {
            const {id, sourceInfo} = props.location.state; 
            setIdSource(id);
            setSpThInfoArr(sourceInfo); //all objects from table

            let tempSourceInfo = sourceInfo.filter(source=>source.advisers);
            tempSourceInfo = tempSourceInfo.filter(source=>source.sp_thesis_id === id.id);
            tempSourceInfo = tempSourceInfo[0].advisers;
            tempSourceInfo.map(adviser=>
                setTempAdvisers([...tempAdvisers,{
                    value:{fname: adviser.adviser_fname, lname: adviser.adviser_lname},
                    label: `${adviser.adviser_lname}, ${adviser.adviser_fname}`
                }])
            )
        } catch (err) {
            window.location = "/not-found";
        }
    },[])
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
                    setAdviser(advisers);
                    setAuthor(authors);
                    const tempKeyword = [];
                    keywords.map((keyword) =>
                        tempKeyword.push(keyword.sp_thesis_keyword)
                    );
                    setKeyword(tempKeyword);
                    break;
                }
            }
        } catch (err) {
            // console.log("Error 85: edit-res-page-form");
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

    function refactorKeyAdviser(advisers){
        let refactorAdvisers = []
        for(let adviser of advisers){
            refactorAdvisers.push({fname:(adviser.fname || adviser.adviser_fname), lname:(adviser.lname || adviser.adviser_lname)})
        }
        return refactorAdvisers;
    }

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
                authors,
                advisers: refactorKeyAdviser(advisers),
                keywords,
            };
            await ResourceServices.editSpThesis(userInput);
            setSuccess("success");
            setShow(true);
        } catch (err) {
            if (err.response && err.response.data) {
                ToastNotification({ content: err.response.data.errorMessage });
            }
        }
    };

    // const handleAdviserChange = (adviser) => {
    //     const vals = [...advisers].map((opt) => opt.value);
    //     setAdviser(vals);
    // }

    const adviserLabels = [];
    
    
    const handleAdviserChange = (adviserList) => {
        let advisers = [...adviserList].map((obj) => obj.value);
        setAdviser(advisers);
    };
    
    const concatAdviserNames = (val, index, array) => {
        adviserLabels.push(
            { 
                value: {adviser_lname: (val.adviser_lname || val.lname), adviser_fname: (val.adviser_fname || val.fname)},
                label: (val.adviser_lname || val.lname)  + ", " + (val.adviser_fname || val.fname)
            } 
            )
    }
    advisers.forEach(concatAdviserNames)
    
    // get input from type selection
    // const handleChange = (e) => {
    //     setType(e.value);
    // };

    // creates an array of keywords from theh user input
    const handleChips = (chip) => {
        setKeyword(chip);
    };

    const renderAuthorFields = () => {
        setAuthor((authors) => [
            ...authors,
            {
                // author needs to generate ID para di madelete lahat ng fields in one button click
                authorid: nanoid(5),
                author_fname: "",
                author_lname: "",
            },
        ]);
    };

    // var typeInString = JSON.stringify(type);
    // typeInString = typeInString.substring(1,typeInString.length-1);

    return (
        <>
            {props.user && props.user.userType === 1 ? (
                <div className="add-res-form-cont">
                    <EditResourceHeader />
                    <form
                        className="main-form"
                        id="addSPTForm"
                        onSubmit={handleSubmit}
                        autoComplete="off">
                        <div className="form-columns">
                            <div className="form-left-column">
                                {/* Title */}
                                <div className="primaryfields">
                                    <label htmlFor="resTitle">
                                        Title: &nbsp;{" "}
                                    </label>
                                    <input
                                        type="text"
                                        id="resTitle"
                                        defaultValue={title}
                                        required
                                        onChange={(event) => {
                                            setTitle(event.target.value);
                                        }}
                                    />
                                </div>
                                {/* Date Published */}
                                <div className="primaryfields">
                                    <label htmlFor="sptYear">
                                        Year Published: &nbsp;{" "}
                                    </label>
                                    <input 
                                        id="sptYear"
                                        type = "number"
                                        value = {year}
                                        min = {1950}
                                        max = {2022}
                                        // key={`${Math.floor(
                                        // Math.random() * 1000
                                        // )}-min`}
                                        // key is supposed to show defaultValue
                                        // but key makes onChange re-render the whole form
                                        onChange = {(event) =>{
                                            setYear(event.target.value);
                                            }
                                        }
                                    />
                                </div>
                                {/* Author fields */}
                                <div className="authors-group">
                                    <h4 style={{ fontWeight: "normal" }}>
                                        Author(s):
                                    </h4>

                                    {/* button adds fields for author */}
                                    <button
                                        id="addAuthor"
                                        onClick={renderAuthorFields}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-plus"
                                            viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                        Add Author
                                    </button>

                                    {/* for testing only: */}
                                    {/* <div className = "testdiv">
                                        {JSON.stringify(authors, null, 2)}
                                    </div> */}

                                    {authors.map( (p, index)=> {
                                        return(
                                        <div
                                            className="authorfields"
                                            key={index}>
                                            <div className="authorname-cont">
                                                {/* AUTHOR FIRST NAME FIELD */}
                                                <div className="author-name">
                                                    <label htmlFor="resAuthorFN">
                                                        First Name:
                                                    </label>

                                                    <input
                                                        type="text"
                                                        id="resAuthorFN"
                                                        // name="fname"
                                                        required
                                                        value={p.author_fname}
                                                        // defaultValue = {author[0].author_fname}  //cant access?????
                                                        onChange={(e) => {
                                                            const author_fname =e.target.value;
                                                            setAuthor(
                                                                (authors) =>
                                                                    produce(authors,
                                                                        (v) => {v[index].author_fname=author_fname;}
                                                                    )
                                                                );
                                                            // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                                                        }}
                                                    />
                                                </div>

                                                <div className="author-name">
                                                    <label htmlFor="resAuthorLN">
                                                        Last Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="resAuthorLN"
                                                        required
                                                        // name="lname"
                                                        value={p.author_lname}
                                                        // defaultValue={author.author_lname}   //cant access?????
                                                        onChange={(e) => {
                                                            const author_lname =e.target.value;
                                                            setAuthor(
                                                                (authors) =>
                                                                    produce(authors,
                                                                        (v) => {v[index].author_lname=author_lname;}
                                                                    )
                                                                );
                                                            // we call setAuthorList, and return a new array with a new value for the first name (instead of default fname)
                                                        }}
                                                    />
                                                    
                                                </div> {/* last name close */}
                                            </div>{/* authorname-cont close */}

                                            {/* button deletes author fields */}
                                            <button
                                                type = "button"
                                                id="deleteAuthor"
                                                onClick={(e) => {
                                                    setAuthor(
                                                        (authors) =>
                                                            authors.filter(
                                                                (x) =>
                                                                    x.authorid ? (
                                                                        x.authorid !==
                                                                        p.authorid
                                                                    ) :(
                                                                        x.author_name !== p.author_name
                                                                    )
                                                                    
                                                            )
                                                    );
                                                    // function checks if Author-To-Be-Deleted exists.
                                                    // function deletes ALL instances of same author to be deleted
                                                    // we generate a random id so no 2 author fields are the same
                                                    // hence no faulty deleting
                                                    // wag nalang istore si author id sa db
                                                }}>
                                                <span className="res-btn-txt">
                                                    Delete Author
                                                </span>
                                            </button>
                                        </div> //authorfields end
                                        );}
                                    )}



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
                                        // defaultValue={"Select..."}
                                        options={classificationOptions}
                                        value={classificationOptions.find(
                                            (obj) => obj.value === type
                                        )}
                                        // onChange={handleTypeChange}
                                    ></Select>
                                </div>

                                {/* Adviser Dropdown Multi */}
                                <div className="select-advisers">
                                    <label htmlFor="advsel">Advisers:</label>
                                    <Select
                                        id="advsel"
                                        options={adviserchoices}
                                        value={adviserLabels}
                                        onChange={handleAdviserChange}
                                        isMulti></Select>
                                </div>
                                {/* Abstract TextArea */}
                                <div className="abstract-div">
                                    <label htmlFor="abstractText">
                                        Abstract:
                                    </label>
                                    <textarea
                                        id="abstractText"
                                        defaultValue={abstract}
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
                                        defaultValue={source_code}
                                        placeholder={"https://www.example.com/"}
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
                                        placeholder={"https://www.example.com/"}
                                        // onClick={(e) => (e.target.value = null)}
                                        defaultValue={manuscript}
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
                                        defaultValue={journal}
                                        placeholder={"https://www.example.com/"}
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
                                        defaultValue={poster}
                                        placeholder={"https://www.example.com/"}
                                        onChange={(event) => {
                                            setPoster(event.target.value);
                                        }}
                                    />
                                </div>

                                <div className="primaryfields">
                                    <label htmlFor="keywords-field">
                                        Keywords: &nbsp;{" "}
                                    </label>
                                    <ChipInput
                                        id="keywords-field"
                                        defaultValue={keywords}
                                        onChange={(chips) => handleChips(chips)}
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
                    <StatusModal
                        message={success}
                        name={"Sp/Thesis"}
                        show={show}
                        setShow={setShow}
                        operation={"edit"}
                        pathAfter={"/manage-resources"}
                    />
                </div>
            ) : (
                <div
                    style={{
                        minHeight: "90vh",
                        display: "grid",
                        placeItems: "center",
                    }}>
                    <PropagateLoader
                        color={"#0067a1"}
                        speedMultiplier={2}
                        loading={true}
                        size={20}
                    />
                    {accessPrivilege()}
                </div>
            )}
        </>
    );
}
