import React from "react";
import TemporarySearchBar from "./temporarySearchBar";
import "../styles/managementHeaderStyle.css";
import background from "../assets/searchBg_4.png";

// <summary>
// A component that renders the general header for manage resources and manage users
// </summary>
const ManagementHeader = ({ type }) => {
    return (
        <div>
            <img src={background} style={backgroundStyle} alt="#" />
            <div className="manage-header-container">
                {type === "logs" ? (
                    <></>
                ) : (
                    <div className="search-bar-container">
                        {/* <TemporarySearchBar /> */}
                    </div>
                )}
                {type == "resource" ? (
                    <h1 style={{ textAlign: "right" }}>Manage Resources</h1>
                ) : (
                    [
                        type === "user" ? (
                            <h1 style={{ textAlign: "right" }}>Manage Users</h1>
                        ) : (
                            <h1 style={{ textAlign: "left" }}>Activity Logs</h1>
                        ),
                    ]
                )}
            </div>
        </div>
    );
};

export default ManagementHeader;

const backgroundStyle = {
    paddingLeft: "-6%",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "-1",
    transform: "scaleY(-1)",
};
