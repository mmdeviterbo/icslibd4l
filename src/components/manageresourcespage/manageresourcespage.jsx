import React from 'react';
import ReactDOM from 'react-dom';
import './manage-resources-style.css';
// import TempNavbar from './temporary-navbar';
import ManageItemsHeader from './manage-items-header';
import FieldsContainerRes from './filter-fields-res';
import ResTableContainer from './resource-table-cont';


export default function ManageResPage() {
    return(
        <div className = "manage-resources-page-container">
            {/* <TempNavbar/> */}
            <ManageItemsHeader/>
            <FieldsContainerRes/>
            <ResTableContainer/>
            
        </div>
    )
}

