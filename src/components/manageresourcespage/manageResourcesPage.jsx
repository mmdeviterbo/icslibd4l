import React from "react";
import ManageItemsHeader from "./manageItemsHeader";
import FieldsContainerRes from "./filterFieldsResources";
import ResTableContainer from "./resourceTableContainer";
import "../../styles/manageresources/manage-resources-style.css";

const ManageResPage = ({ resourceList }) => {
    return (
        <div className="manage-resources-page-container">
            <ManageItemsHeader />
            <FieldsContainerRes />
            {/* <ResTableContainer resourceList={resourceList} /> */}
            <ResTableContainer />
        </div>
    );
};

export default ManageResPage;
