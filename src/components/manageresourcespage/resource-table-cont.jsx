import React from "react";
import { Table } from "@material-ui/core";
import MainResourceTable from "./res-main-table2"; // CHANGED TO PREVIOUS VERIOSn
import AddNewResource from "./createnewresource";
import AddNewSPT from "./new-sp-t-btn";
// import UserTable from '../manageuserpage/userTable'

<<<<<<< HEAD
const ResTableContainer = () => {
    return(
        <div className = "res-table-cont">
            
            <MainResourceTable/>
            <br/>

            <div class = "addBtns">
            <AddNewResource/>   {/* Add book */}
            <AddNewSPT/>        {/* Add Sp/Thesis */}
            </div>
        </div>
    )
=======
const ResTableContainer = ({ resourceList }) => {
  return (
    <div className="res-table-cont">
      {/* <UserTable/> */}
      {/* <MainResourceTable resourceList={resourceList} /> */}
      <MainResourceTable />
      <br />

      <div className="addBtns">
        <AddNewResource />
        {/* <AddNewSPT/> */}
      </div>
    </div>
  );
>>>>>>> 63d235409c2673cba208ca6f934f564d6f3a8081
};

export default ResTableContainer;
