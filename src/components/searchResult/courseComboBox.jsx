import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { coursesData } from "./coursesData";

export default function CourseComboBox({course, setCourse}) {
    
    const handleCourseChange = (newVal) => {
        if (newVal !== undefined || newVal !== null) {
            setCourse(newVal);
            // setSearchFilterAdviser({fname:newVal.value.fname, lname:newVal.value.lname});
        }
    };

    return (
        <div>
            <span style={sidebarLink} className="sidebarLink">
                <span style={sidebarLabel}>Courses</span>
            </span>

            <div style={optionRowStyle} className="row">
                <Autocomplete
                    freeSolo
                    id="combo-box-courses"
                    value={course}
                    options={coursesData.map((option) => option.label)}
                    // getOptionLabel={(option) => option.label}
                    onChange={(e, newValue) => {
                        handleCourseChange(newValue);
                    }}
                    style={{
                        width: "120px",
                    }}
                    renderInput={(params) => <TextField {...params} label="Course" />}
                />
            </div>
        </div>
    );
}

const optionRowStyle = {
    backgroundColor: "white",
    overflowWrap: "break-word",
    marginLeft: "2rem",
    position: "relative",
    width: "15vw",
    zIndex: "1",
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
