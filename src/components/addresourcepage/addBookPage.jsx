import React from "react";
// import ReactDOM from 'react-dom';
import "../../styles/addresource/addResourceStyle.css";
import AddResourcesHeader from "./addResourcesHeader";
import AddBookFormContainer from "./addBookFormContainer";

const AddBookPage = () => {
    return (
        <div className="add-resource-page-container">
             {/* header at the side */}
            <AddResourcesHeader type = {"book"}/>
            <AddBookFormContainer/>
        </div>
    );
};

export default AddBookPage;