import React from "react";
// import ReactDOM from 'react-dom';
import "../../styles/addresource/addResourceStyle.css";
// import AddResourcesSidebar from "./addResourcesHeader";
import AddNewSPThesisForm from "./addNewSPTPage";

const AddSPThesisPage = () => {
    return (
        <div className="add-resource-page-container">
            {/* <AddResSidebar/> */}
            <AddNewSPThesisForm />
        </div>
    );
};

export default AddSPThesisPage;
