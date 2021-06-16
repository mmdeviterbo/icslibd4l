import React, { useState } from "react";
import Select from "react-select";

const resourceType = [
    { value: "Special Problem", label: "Special Problem" },
    { value: "Thesis", label: "Thesis" },
    { value: "Book", label: "Book" },
];

const FiltersContainerRes = ({
    setType,
    setSearchField,
    setSearchInput,
    searchInput,
    handleSearchEnter,
    handleSearchClick
}) => {
    
    const [localType,setLocalType]=useState();
    
    const handleClearFilter = () => {
        setType(null);
        setSearchField("");
        setSearchInput("");
        setLocalType("");
    };

    const handleFilterSelect = (e) => {
        setType(e.value);
        setLocalType(resourceType.find(resource=>resource.value===e.value));
    };

    return (
        <div className="res-filter-container">
            <div className="resource-search-bar-container">
                <input
                    className="search-bar-temp"
                    placeholder={"Search for resource"}
                    value={searchInput}
                    onKeyDown={handleSearchEnter}
                    onChange={(e) => setSearchInput(e.target.value)}/>
                <div className="input-group-append">
                    <button
                        className="btn btn-secondary res-search-btn"
                        type="button"
                        onClick={handleSearchClick}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <Select
                className="res-filters"
                id="res-category"
                placeholder={"Resource Type"}
                options={resourceType}
                value={localType}
                onChange={handleFilterSelect}
            />
            <div style={{width:"30%", display:"flex", justifyContent:"space-between" }}>
                <div className="res-clrbtn">
                    <button
                        className="res-filters-clear"
                        onClick={handleClearFilter}
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
        </div>
    );
};

export default FiltersContainerRes;
