import React from 'react';
import ReactDOM from 'react-dom';
import './add-resource-style.css';
import AddResSidebar from '../addresourcepage/sidebar-add-res';
import AddNewSPThesisForm from '../addresourcepage/add-new-spt-pg';

const AddSPThesisPage = (props) => {
    return(
        <div className = "add-resource-page-container" >
            <AddResSidebar/>
            <AddNewSPThesisForm/>
        </div>
    )
}

export default AddSPThesisPage