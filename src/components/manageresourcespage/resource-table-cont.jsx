import React from "react";
import { Table } from "@material-ui/core";
import MainResourceTable from "./res-main-table";
import AddNewResource from "./createnewresource";
import AddNewSPT from "./new-sp-t-btn";
// import UserTable from '../manageuserpage/userTable'

const ResTableContainer = ({ resourceList }) => {
  return (
    <div className="res-table-cont">
      {/* <UserTable/> */}
      <MainResourceTable resourceList={resourceList} />
      <br />

      <div class="addBtns">
        <AddNewResource />
        {/* <AddNewSPT/> */}
      </div>
    </div>
  );
};

export default ResTableContainer;
