import React from "react";
import MainResourceTable from "./resourcesMainTable";
import AddNewResource from "./createNewResource";
import AddNewSPT from "./newSPTButton";
// import UserTable from '../manageuserpage/userTable'

const ResourcesTableContainer = () => {
  return (
    <div className="res-table-cont">
      <MainResourceTable />
      <br />

      <div class="addBtns">
        <AddNewResource /> {/* Add book */}
        <AddNewSPT /> {/* Add Sp/Thesis */}
      </div>
    </div>
  );
};

export default ResourcesTableContainer;
