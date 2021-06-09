import React from "react";

// THIS IS A TEMPORARY SEARCH BAR
// THIS WILL BE DELETED ONCE A SEPARATE SEARCH FUNCTIONALITY HAS BEEN CREATED

const TemporarySearchBar = ({ type }) => {
    return (
        <div className="staff-search-bar-container">
            <input
                className="search-bar-temp"
                placeholder={"Search for something #temporary search"}
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

export default TemporarySearchBar;
