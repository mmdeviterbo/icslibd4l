import React from "react";
import "../styles/managementHeaderStyle.css";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 * A component that renders the general header for admin interace.
 * Conditionally renders depending on the property entered
 *
 * props:
 * - type = resource || user || logs
 ******************************************************/
const ManagementHeader = ({ type }) => {
    return (
        <div className="manage-header-container">
            <></>
            {type === "resource" ? (
                <h1 style={{ textAlign: "right" }}>Manage Resources</h1>
            ) : (
                [
                    type === "user" ? (
                        <h1 style={{ textAlign: "right" }}>Manage Users</h1>
                    ) : (
                        <h1 style={{ textAlign: "right" }}>Activity Logs</h1>
                    ),
                ]
            )}
        </div>
    );
};
export default ManagementHeader;
