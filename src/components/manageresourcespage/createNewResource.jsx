import React from "react";

// TODO: add documentation
const AddNewResource = () => {
    return (
        <div className="new-res-container">
            <a href="/add-new-book">
                <button className="new-res-button">
                    <span className="res-btn-txt">Add Book</span>
                </button>
            </a>
        </div>
    );
};

export default AddNewResource;
