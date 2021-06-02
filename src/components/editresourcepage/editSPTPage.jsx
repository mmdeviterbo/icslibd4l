import React, { useState } from "react";
import "../../styles/addresource/addResourceStyle.css";
import AddNewSPThesisForm from "../addresourcepage/addNewSPTPage";

const EditSPThesisPage = (props) => {
    const [data, setData] = useState(null)

    return (
        <div className="add-resource-page-container">
            <AddNewSPThesisForm />
        </div>
    );
};

export default EditSPThesisPage;
