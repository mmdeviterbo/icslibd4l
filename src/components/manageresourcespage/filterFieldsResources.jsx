//filter field for resources
//components: div container, search filters

import React, { useState } from "react";
import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import ResourceServices from "../../services/resourceService";
// import SearchBar from "../temporarySearchBar";

const courseList = [
    { value: "CMSC 12", label: "CMSC 12" },
    { value: "CMSC 21", label: "CMSC 21" },
    { value: "CMSC 22", label: "CMSC 22" },
    { value: "CMSC 23", label: "CMSC 23" },
    { value: "CMSC 56", label: "CMSC 56" },
    { value: "CMSC 57", label: "CMSC 57" },
    { value: "CMSC 123", label: "CMSC 123" },
    { value: "CMSC 124", label: "CMSC 124" },
    { value: "CMSC 125", label: "CMSC 125" },
    { value: "CMSC 127", label: "CMSC 127" },
    { value: "CMSC 128", label: "CMSC 128" },
    { value: "CMSC 130", label: "CMSC 130" },
    { value: "CMSC 131", label: "CMSC 131" },
    { value: "CMSC 132", label: "CMSC 132" },
    { value: "CMSC 141", label: "CMSC 141" },
    { value: "CMSC 142", label: "CMSC 142" },
    { value: "CMSC 150", label: "CMSC 150" },
    { value: "CMSC 170", label: "CMSC 170" },
    { value: "CMSC 173", label: "CMSC 173" },
    { value: "CMSC 180", label: "CMSC 180" },
    { value: "CMSC 190", label: "CMSC 190" },
    { value: "CMSC 191", label: "CMSC 191" },
];

const resourceType = [
    { value: "Special Problem", label: "Special Problem" },
    { value: "Thesis", label: "Thesis" },
    { value: "Book", label: "Book" },
];

const FiltersContainerRes = ({ setYear, setType, setSubject }) => {
    const [localType, setLocalType] = useState(null);
    const [localYear, setLocalYear] = useState(0);
    const [localSubs, setLocalSubs] = useState([]);

    const handleFilter = async () => {
        console.log("Filter Updated");
        setYear(localYear ? localYear.getFullYear() : 0);
        setType(localType);
        setSubject(localSubs);
    };

    const handleSubjectFilter = (event) => {
        setLocalSubs(event.map((sub) => sub.label));
    };

    return (
        <div className="res-filter-container">
            <Select
                className="res-filters"
                id="res-category"
                placeholder={"Resource Type"}
                options={resourceType}
                defaultValue={localType}
                onChange={(e) => setLocalType(e.value)}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ marginLeft: "2rem" }} className="picker">
                    <DatePicker
                        selected={localYear}
                        value={localYear}
                        views={["year"]}
                        onChange={(year) => setLocalYear(year)}
                        animateYearScrolling
                        isclearable={"true"}
                        placeholder={"Year"}
                        style={{ width: "50px" }}
                        maxDate={new Date()}
                    />
                    <IconButton
                        edge="end"
                        size="small"
                        disabled={!localYear}
                        onClick={() => setLocalYear(null)}
                    >
                        <ClearIcon />
                    </IconButton>
                </div>
            </MuiPickersUtilsProvider>

            {/* <Select
                className="res-filters"
                placeholder={"Related Courses"}
                id="res-related-courses"
                options={courseList}
                onChange={handleSubjectFilter}
                isMulti
            /> */}
            {/* <Select className="res-filters" id="res-author/publisher" /> */}
            <button className="apply-filter-button" onClick={handleFilter}>
                Apply Filters
            </button>

            <div className="res-clrbtn">
                <button className="res-filters-clear">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    Clear all filters
                </button>
            </div>
        </div>
    );
};

export default FiltersContainerRes;
