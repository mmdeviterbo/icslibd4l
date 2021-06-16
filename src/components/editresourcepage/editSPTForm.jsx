  
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

var adviserchoices = [
    {
        value: { adviser_fname: "Eliezer A.", adviser_lname: "Albacea" },
        label: "Albacea, Aliezer A.",
    },
    // follow format
    {
        value: { adviser_fname: "Maria Art Antonette D.", adviser_lname: "Clariño" },
        label: "Clariño, Maria Art Antonette D.",
    },
    {
        value: { adviser_fname: "Lailanie R.", adviser_lname: "Danila" },
        label: "Danila, Lailanie R.",
    },
    {
        value: { adviser_fname: "Joseph Anthony C.", adviser_lname: "Hermocilla" },
        label: "Hermocilla, Joseph Anthony C.",
    },
    {
        value: { adviser_fname: "Arian J.", adviser_lname: "Jacildo" },
        label: "Jacildo, Arian J.",
    },
    {
        value: { adviser_fname: "Concepcion L.", adviser_lname: "Khan" },
        label: "Khan, Concepcion L.",
    },
    {
        value: { adviser_fname: "Fermin Roberto G", adviser_lname: "Lapitan" },
        label: "Lapitan, Fermin Roberto G.",
    }, //hi ser
    {
        value: { adviser_fname: "Val Randolf M.", adviser_lname: "Madrid" },
        label: "Madrid, Val Randolf M.",
    },
    {
        value: { adviser_fname: "Katrina Joy H", adviser_lname: "Magno" },
        label: "Magno, Katrina Joy H.",
    },
    {
        value: { adviser_fname: "Rozano S.", adviser_lname: "Maniaol" },
        label: "Maniaol, Rozano S.",
    },
    {
        value: { adviser_fname: "Danilo J.", adviser_lname: "Mercado" },
        label: "Mercado, Danilo J.",
    },
    {
        value: { adviser_fname: "Rizza DC", adviser_lname: "Mercado" },
        label: "Mercado, Rizza DC.",
    },
    {
        value: { adviser_fname: "Toni-Jan Keith P.", adviser_lname: "Monserrat" },
        label: "Monserrat, Toni-Jan Keith P.",
    },
    {
        value: { adviser_fname: "Jaderick P.", adviser_lname: "Pabico" },
        label: "Pabico, Jaderick P.",
    },
    {
        value: { adviser_fname: "Margarita Carmen S.", adviser_lname: "Paterno" },
        label: "Paterno, Margarita Carmen S.",
    },
    {
        value: { adviser_fname: "Reginald Neil C.", adviser_lname: "Recario" },
        label: "Recario, Reginald Neil C.",
    },
    {
        value: { adviser_fname: "Samaniego, Jaime M.", adviser_lname: "Samaniego" },
        label: "Samaniego, Jaime M.",
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
    
    const [advisers, setAdviser] = useState([])
    const [authors, setAuthor] = useState([]);
    // const [authorList, setAuthorList] = useState([
    //     {
    //         authorid: nanoid(5),
    //         author_fname: "",
    //         author_lname: "",
    //     },
    // ]);
    // const [adviserList, setAdviserList] = useState([]);

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState("");

    // return ALL resources (dahil walang search na gumagamit ng id)
    const [spThInfoArr, setSpThInfoArr] = useState([]); //all sp/thesis array
    const [idSource, setIdSource] = useState(); //unique key to identify to which specific sp/thesis

    useEffect(() => {
        try {
            setIdSource(props.location?.state.id);
            setSpThInfoArr(props.location?.state.sourceInfo); //all objects from table
        } catch (err) {
            window.location = "/not-found";
        }
    }, []);

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

                    // console.log(authors)
                    // console.log("fsdfsdfd");
                    // console.log(sourceItem);

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
                advisers,
                keywords,
            };
            // console.log(userInput);
            await ResourceServices.editSpThesis(userInput);
            setSuccess("success");
            setShow(true);
        } catch (err) {
            if (err.response && err.response.data) {
                ToastNotification({ content: err.response.data.errorMessage });
            }
        }
    };

    // const handleAdviserChange = (adviserList) => {
    //     const adviser = [...adviserList].map((obj) => obj.value);
    //     // setCourses(values);
    //     setAdviserList(adviser);
    // };

    // creates an array of keywords from theh user input
    const handleChips = (chip) => {
        setKeyword([...keywords, chip[chip.length - 1]]);
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

    const adviserLabels = [];
    
    // adviserLabels = [{value:"adviser_fname"+"adviser_lname", label:"adviser_lname"+", "+adviser_firstname}]
    const concatAdviserNames = (val, index, array) => {

        adviserLabels.push(
            { label: val.adviser_lname + ", " + val.adviser_fname,
            value: {adviser_fname: val.adviser_fname, adviser_lname: val.adviser_lname} }
            )
    }

    advisers.forEach(concatAdviserNames)

    console.log(adviserLabels)

    var typeInString = JSON.stringify(type);
    typeInString = typeInString.substring(1,typeInString.length-1);

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
                                                            // we call setAuthorList, and return a new array with a new value for the first name (instead of default adviser_fname)
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
                                                            // we call setAuthorList, and return a new array with a new value for the first name (instead of default adviser_fname)
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
                                </div>
                                {/* authors-group close */}
                            </div>
                            {/*closing for left column  */}

                            
                            <div className="form-mid-column">

                                {/* Classification */}
                                <div className="classifSelect">
                                    Classification:
                                    <Select
                                        id="resClassification"
                                        // defaultValue={"Select..."}
                                        options={classificationOptions}
                                        value={{label: typeInString, value:typeInString}}
                                        onChange={(e)=>{
                                            setType(e.value)
                                        }}
                                    >
                                    </Select>
                                </div>

                                {/* Adviser Dropdown Multi */}
                                <div className="select-advisers">

                                    <div className = "testdiv">
                                        {JSON.stringify(adviserLabels, null, 2)}
                                    </div>

                                    <label htmlFor="advsel">Advisers:</label>
                                    <Select
                                        id="advsel"
                                        options={adviserchoices}
                                        value={adviserLabels}
                                        // defaultValue={adviserchoices.find((obj) => obj.value === adviser)}
                                        // onChange={handleAdviserChange}
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
                        minHeight: "80vh",
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
