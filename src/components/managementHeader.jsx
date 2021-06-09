import React from "react";
import SearchResources from "./temporarySearchBar";
import SearchUsers from "./temporarySearchBar";
import "../styles/managementHeaderStyle.css";

// <summary>
// A component that renders the general header for manage resources and manage users
// </summary>
const ManagementHeader = ({ type }) => {
    return (
        <div className="manage-header-container">
            <div className="search-bar-container">
                {type === "resource" ? (
                    <SearchResources type={type} />
                ) : (
                    <SearchUsers type={type} />
                )}
            </div>
            {type == "resource" ? (
                <h1>Manage Resources</h1>
            ) : (
                <h1>Manage Users</h1>
            )}
        </div>
    );
};

export default ManagementHeader;
