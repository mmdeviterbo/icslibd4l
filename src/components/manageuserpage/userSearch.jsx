import React from "react";

import "../../styles/managementHeaderStyle.css";

export default function UserSearch() {
    return (
        <div className="user-search-container">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for User"
                />
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <h1>Manage User</h1>
        </div>
    );
}
