import React from "react";
import { FilterSidebarData } from "./filterSidebarData";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { coursesData } from "./coursesData";
import { topicData } from "./topicData";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Multiselect} from "multiselect-react-dropdown";

import "../../styles/searchResultStyle/advancedSearch.css";
import FilterSubMenu from "./filterSubMenu";

export default function FilterSidebar({
    searchFilterAuthor,
    setSearchFilterAuthor,
    searchFilterAdviser,
    setSearchFilterAdviser,
    resourceType,
    setResourceType,
    searchFilterYear,
    setSearchFilterYear,
    searchFilterPublisher,
    setSearchFilterPublisher,
    course,
    setCourse,
    filterArray,
    // setfilterArray,
    // fieldArray,
    // setfieldArray,
    keywords,
    setKeywords
}) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const handleChange = (event) => {
        setResourceType(event.target.value);
    };

    const handleCourseChange = (newVal) => {
        if (newVal !== undefined || newVal !== null) {
            setCourse(newVal);
            // setSearchFilterAdviser({fname:newVal.value.fname, lname:newVal.value.lname});
        }
    };

    const getSelected = (data) => {
        setKeywords(keywords => [...keywords, data[data.length-1].label]);
    }

    const deselect = (data) => {
        const newArray = data.map(e => e.label);
        setKeywords(newArray);
    }    

    return (
        <div>
            <nav style={sidebarNav}>
                <div style={wrapper}>
                    <p style={sidebarTitle}>Filters</p>
                    {FilterSidebarData.map((item, index) => {
                        return (
                            <FilterSubMenu
                                item={item}
                                key={index}
                                searchFilterAuthor={searchFilterAuthor}
                                setSearchFilterAuthor={setSearchFilterAuthor}
                                searchFilterAdviser={searchFilterAdviser}
                                setSearchFilterAdviser={setSearchFilterAdviser}
                                searchFilterPublisher={searchFilterPublisher}
                                setSearchFilterPublisher={setSearchFilterPublisher}
                                course={course}
                                setCourse={setCourse}
                                // filterArray={filterArray}
                                // setfilterArray={setfilterArray}
                                // fieldArray={fieldArray}
                                // setfieldArray={setfieldArray}
                            />
                        );
                    })}

                    {/* Courses */}
                    <span style={sidebarLink} className="sidebarLink">
                        <span style={sidebarLabel}>Courses</span>
                    </span>

                    <div style={optionRowStyle} className="row">
                        <Autocomplete
                            freeSolo
                            id="combo-box-courses"
                            value={course}
                            options={coursesData.map((option) => option.label)}
                            // options={AdviserData}
                            // getOptionLabel={(option) => option.label}
                            onChange={(e, newValue) => {
                                handleCourseChange(newValue);
                            }}
                            style={{
                                width: "120px",
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Course" />
                            )}
                        />
                    </div>

                    {/* Topics */}
                    <span style={sidebarLink} className="sidebarLink">
                        <span style={sidebarLabel}>Topic</span>
                    </span>
                    <Multiselect    options={topicData} 
                                    displayValue="label"
                                    style={multipleSearchStyle}
                                    onSelect={getSelected}
                                    onRemove={deselect}
                    />

                    {/* TYPE filter */}
                    <span style={sidebarLink} className="sidebarLink">
                        <span style={sidebarLabel}>Type</span>
                    </span>
                    <FormControl
                        className={classes.formControl}
                        style={{ marginLeft: "2rem", top: "-1.5vw" }}
                    >
                        <Select
                            value={resourceType}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Resource Type" }}
                        >
                            <MenuItem style={menuItems} value={resourceType}>
                                <em>{resourceType}</em>
                            </MenuItem>
                            <MenuItem style={menuItems} value="any">
                                Any
                            </MenuItem>
                            <MenuItem style={menuItems} value="books">
                                Books
                            </MenuItem>
                            <MenuItem style={menuItems} value="special problem">
                                Special Problem
                            </MenuItem>
                            <MenuItem style={menuItems} value="thesis">
                                Thesis
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ position: "relative", top: "-2vh" }}>
                        <span style={sidebarLink} className="sidebarLink">
                            <span style={sidebarLabel}>Year</span>
                        </span>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div style={{ marginLeft: "2rem" }} className="picker">
                                <DatePicker
                                    selected={searchFilterYear}
                                    value={searchFilterYear}
                                    views={["year"]}
                                    onChange={(date) => setSearchFilterYear(date)}
                                    animateYearScrolling
                                    placeholder={"Year"}
                                />
                            </div>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
            </nav>
        </div>
    );
}

const sidebarNav = {
    display: "flex",
    height: "auto",
    width: "19vw",
    marginLeft: "0.5vw",
    marginRight: "0.75vw",
    paddingBottom: "2vw",
    MsOverflowStyle: "none",
};

const wrapper = {
    margin: "1vw 0 0.5vw 1.5vw",
    width: "100%",
};

const sidebarTitle = {
    margin: "1vw 0 1vw -0.5vw",
    fontSize: "1.5em",
    fontWeight: "800",
    fontFamily: "Trebuchet MS",
};

const menuItems = {
    fontSize: "1em",
    fontWeight: "800",
    fontFamily: "Trebuchet MS",
};

const sidebarLink = {
    display: "flex",
    color: "black",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1vw 0 0",
    marginTop: "1vw",
    listStyle: "none",
    height: "3vw",
    fontSize: "1.1em",
    fontWeight: "600",
    position: "relative",
    left: "-1.5vw",
};

const sidebarLabel = {
    marginLeft: "1.3vw",
};

const optionRowStyle = {
    backgroundColor: "white",
    overflowWrap: "break-word",
    marginLeft:"2rem",
    position:"relative",
    width: "15vw",
    zIndex: "1",
};

const multipleSearchStyle = {
    display:"flex",
    searchBox: { // To change search box element look
        // border:"none",
        borderRadius:"0",
        borderTop:"0",
        borderRight:"0",
        borderLeft:"0",
        borderColor:"gray",
        outline:"none",
        padding:"0",
        margin:"0",
        minHeight: "30px",
        maxWidth: "120px",
        position: "relative",
        left:"2vw",
    },
    inputField: {
        padding:"0",
        margin:"1px",
    },
    chips: {
        whiteSpace:"normal",
    }
}

// for classes of Select
