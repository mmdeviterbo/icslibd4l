import React from "react";
import Select from "react-select";

import "../../styles/manageUserStyle.css";

export default function FilterMenu() {
    const classificationList = [
        { value: "Admin", label: "Admin" },
        { value: "Faculty", label: "Faculty" },
        { value: "Staff", label: "Staff" },
        { value: "Student", label: "Student" },
    ];

    const filterContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem 6%",
        zIndex: "1",

        // margin: "30px 50px 30px 50px",
    };

    const filterButtonContainer = {
        width: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
    };

    return (
        <div className="filtermenu-container" style={filterContainer}>
            <Select
                style={filterButtonContainer}
                className="activity-filter"
                id="activity-category"
                placeholder={"Users Classification"}
                options={classificationList}
            />

            <div className="activity-clrbtn">
                <a id="activity-filters-clear" href="#">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-circle"
                        viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    Clear all filters
                </a>
            </div>
        </div>
    );
}
