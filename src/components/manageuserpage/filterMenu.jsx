import React, { useEffect } from "react";
import Select from "react-select";

import "../../styles/manageUserStyle.css";

export default function FilterMenu({ selection, setSelection }) {
    useEffect(() => {
        setSelection(-1);
    }, [setSelection]);

    const classificationList = [
        { value: 1, label: "Admin" },
        { value: 2, label: "Faculty" },
        { value: 3, label: "Staff" },
        { value: 4, label: "Student" },
    ];

    const filterContainer = {
        width:"100%",
        position:"relative",
        display: "flex",
        justifyContent: "space-evenly",
        zIndex: "1",
        margin:0,
        padding:0,
    };

    const handleFilterSelect = (e) => {
        setSelection(e.value);
    };

    return (
        <div className="filtermenu-container" style={filterContainer}>
            <Select
                className="user-filter"
                id="user-category"
                placeholder={"Classification"}
                options={classificationList}
                value={selection !== -1 ? selection.value : null}
                onChange={handleFilterSelect}
            />

            <div className="user-clrbtn">
                <button
                    id="user-filters-clear"
                    onClick={(e) => setSelection(-1)}
                    style={{ border: 0, backgroundColor: "white" }}
                >
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
}
