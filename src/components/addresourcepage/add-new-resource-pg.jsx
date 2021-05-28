import React from 'react';
import './add-resource-style.css';
import AddResSidebar from './sidebar-add-res';
import AddBookFormContainer from './add-res-form-container';

const AddBookPage = () => {
    return(
        <div className = "add-resource-page-container" >
            <AddResSidebar/>
            <AddBookFormContainer/>
        </div>
    )
}

export default AddBookPage