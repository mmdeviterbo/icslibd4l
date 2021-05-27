import React from "react";
import { Table } from "@material-ui/core";
import MainResourceTable from "./resourcesMainTbl2"; // CHANGED TO PREVIOUS VERIOSn
import AddNewResource from "./createNewResource";
import AddNewSPT from "./newSPTButton";
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
