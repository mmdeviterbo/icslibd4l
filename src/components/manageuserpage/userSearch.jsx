import React, { useState } from "react";

import "../../styles/managementHeaderStyle.css";

export default function UserSearch({ searchField, setSearchField }) {
    const [searchInput, setSearchInput] = useState(searchField);

    // const handleSearchEnter = (e) => {
    //     if (e.key === "enter") {
    //         setSearchField(searchInput);
    //     }
    // };

    // Functional Component of Search bar
    const SearchUser = () => {
        return (
            <div className="staff-search-bar-container">
                <input
                    className="search-bar-temp"
                    placeholder={"Search for users search"}
                    value={searchInput}
                    // onKeyDown={handleSearchEnter}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                {/* temporary search bar */}
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="manage-header-container">
            <div className="search-bar-container">
                <SearchUser />
            </div>
            <h1>Manage User</h1>
        </div>
    );
}
