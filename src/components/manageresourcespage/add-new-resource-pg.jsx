import React from 'react';
import ReactDOM from 'react-dom';
import './manage-resources-style.css';
import AddResSidebar from './sidebar-add-res';
import AddResFormContainer from './add-res-form-container';

export default function AddResourcePage() {
    return(
        <div className = "add-resource-page-container" >
            <AddResSidebar/>
            <AddResFormContainer/>
        </div>
    )
}