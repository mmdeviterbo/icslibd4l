import React from "react";
// import ReactDOM from 'react-dom';
import "../../styles/addresource/addResourceStyle.css";
import AddResourcesHeader from "./addResourcesHeader";
import AddNewSPThesisForm from "./addNewSPTPage";

const AddSPThesisPage = () => {
    return (
        <div className="add-resource-page-container">
             {/* header at the side */}
            <AddResourcesHeader/>
            <AddNewSPThesisForm />
        </div>
    );
};

export default AddSPThesisPage;
