import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/addresource/add-resource-style.css';
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