import React from "react";

const AddResourcesHeader = ( { type }) => {
    return (
        <div className="add-res-header">
            {type === "book" ? 
                (<h1>Add a New Book</h1>)
                :
                (<h1>Add a New Thesis / Special Problem</h1>)
            }
        </div>
    );
};

export default AddResourcesHeader;
