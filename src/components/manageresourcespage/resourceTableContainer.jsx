import React from "react";
<<<<<<< HEAD
// import MainResourceTable from "./resourcesMainTbl2"; // CHANGED TO PREVIOUS VERIONS
import MainResourceTable from "./resourcesMainTable"; // CHANGED TO PREVIOUS VERIONS
=======
import MainResourceTable from "./resourcesMainTable";
>>>>>>> ae082da2b7284b865341aa681a1129a1fe56e3d6
import AddNewResource from "./createNewResources";
import AddNewSPT from "./newSPTButton";
// import UserTable from '../manageuserpage/userTable'

const ResourcesTableContainer = () => {
  return (
    <div className="res-table-cont">
      <MainResourceTable />
      <br />

      <div className="addBtns">
        <AddNewResource /> {/* Add book */}
        <AddNewSPT /> {/* Add Sp/Thesis */}
      </div>
    </div>
  );
};

export default ResourcesTableContainer;
