import React from "react";
import TemporarySearchBar from "./temporarySearchBar";
import "../styles/managementHeaderStyle.css";

// <summary>
// A component that renders the general header for manage resources and manage users
// </summary>
const ManagementHeader = ({ type }) => {
    return (
        <div className="manage-header-container">
            <div className="search-bar-container">
                <TemporarySearchBar />
            </div>
            {type == "resource" ? (
                <h1>Manage Resources</h1>
            ) : (
                [
                    type === "user" ? (
                        <h1>Manage Users</h1>
                    ) : (
                        <h1>Activity Logs</h1>
                    ),
                ]
            )}
        </div>
    );
};

export default ManagementHeader;
