import React from "react";
import SearchResources from "./resourceSearchbar";

const ManageItemsHeader = () => {
    return (
        <div className="manageresheader">
            <SearchResources />
            <h1>Manage Resources</h1>
        </div>
    );
};

export default ManageItemsHeader;
