import React from "react";
import { Table } from "@material-ui/core";
import MainResourceTable from "./res-main-table2"; // CHANGED TO PREVIOUS VERIOSn
import AddNewResource from "./createnewresource";
import AddNewSPT from "./new-sp-t-btn";
// import UserTable from '../manageuserpage/userTable'

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
};

export default ResTableContainer;
