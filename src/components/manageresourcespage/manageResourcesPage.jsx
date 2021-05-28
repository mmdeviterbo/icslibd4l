import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "./manageResourcesStyle.css";
// import TempNavbar from './temporary-navbar';
import ManageItemsHeader from "./manageItemsHeader";
import FieldsContainerRes from "./filterFieldsRes";
import ResTableContainer from "./resourceTableCont";

const ManageResPage = () => {
    return (
        <div className="manage-resources-page-container">
            {/* <TempNavbar/> */}
            {/* <Link to='/view-sp-thesis' className="btn btn-warning">View SP/Thesis</Link> */}
            <ManageItemsHeader />
            <FieldsContainerRes />
            <ResTableContainer />
        </div>
    );
};

export default ManageResPage;
