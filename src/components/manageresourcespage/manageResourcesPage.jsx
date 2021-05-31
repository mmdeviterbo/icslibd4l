import React from "react";
import ManageItemsHeader from "./manageItemsHeader";
import FieldsContainerRes from "./filterFieldsResources";
import ResourceTableContainer from "./resourceTableContainer";
import "../../styles/manageresources/manageResourcesStyle.css";

const ManageResourcesPage = () => {
  return (
    <div className="manage-resources-page-container">
      <ManageItemsHeader />
      <FieldsContainerRes />
      <ResourceTableContainer />
    </div>
  );
};

export default ManageResourcesPage;
