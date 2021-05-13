import React from 'react';
import ReactDOM from 'react-dom';
import './add-resource-style.css';
import AddResSidebar from './sidebar-add-res';
import AddResFormContainer from './add-res-form-container';

const AddResourcePage = () => {
    return(
        <div className = "add-resource-page-container" >
            <AddResSidebar/>
            <AddResFormContainer/>
        </div>
    )
}

export default AddResourcePage