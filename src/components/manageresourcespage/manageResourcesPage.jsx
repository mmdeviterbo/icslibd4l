import React from "react";
import ManagementHeader from "../managementHeader";
import FieldsContainerRes from "./filterFieldsResources";
import ResourceTableContainer from "./resourceTableContainer";
import "../../styles/manageresources/manageResourcesStyle.css";

const ManageResourcesPage = ({ resourceList }) => {
    return (
        <div className="manage-resources-page-container">
            <ManagementHeader type={"resource"} />
            <FieldsContainerRes />
            {/* <ResTableContainer resourceList={resourceList} /> */}
            <ResourceTableContainer />
        </div>
    );
};

export default ManageResourcesPage;
