import React from "react";
import { Table } from "@material-ui/core";
import MainResourceTable from "./res-main-table"; // CHANGED TO PREVIOUS VERIOSn
import AddNewResource from "./createnewresource";
import AddNewSPT from "./new-sp-t-btn";
// import UserTable from '../manageuserpage/userTable'

const ResTableContainer = ({ resourceList }) => {
  return (
    <div className="res-table-cont">
      {/* <UserTable/> */}
      <MainResourceTable resourceList={resourceList} />
      {/* <MainResourceTable /> */}
      <br />

      <div className="addBtns">
        <AddNewResource />
        {/* <AddNewSPT/> */}
      </div>
    </div>
  );
};

export default ResTableContainer;
