import React from "react";

// THIS IS A TEMPORARY SEARCH BAR
// THIS WILL BE DELETED ONCE A SEPARATE SEARCH FUNCTIONALITY HAS BEEN CREATED

const SearchResources = ({ type }) => {
    return (
        <div className="staff-search-bar-container">
            <input
                className="search-bar-temp"
                placeholder={
                    type === "resource"
                        ? "Search for Resources #temporary search"
                        : "Search for users"
                }
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

export default SearchResources;
