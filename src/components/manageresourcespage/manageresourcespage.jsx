import React from 'react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './manage-resources-style.css';
// import TempNavbar from './temporary-navbar';
import ManageItemsHeader from './manage-items-header';
import FieldsContainerRes from './filter-fields-res';
import ResTableContainer from './resource-table-cont';


const ManageResPage = () => {
    return(
        <div className = "manage-resources-page-container">
            {/* <TempNavbar/> */}
            {/* <Link to='/view-sp-thesis' className="btn btn-warning">View SP/Thesis</Link> */}
            <ManageItemsHeader/>
            <FieldsContainerRes/>
            <ResTableContainer/>
            
        </div>
    )
}

export default ManageResPage

