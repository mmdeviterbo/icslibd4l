import React from "react";
import { Table } from "@material-ui/core";
import MainResourceTable from "./resMainTable";
import AddNewResource from "./createNewResource";
import AddNewSPT from "./newSptButton";
// import UserTable from '../manageuserpage/userTable'

const ResTableContainer = () => {
    return (
        <div className="res-table-cont">
            {/* <UserTable/> */}
            <MainResourceTable />
            <br />

            <div class="addBtns">
                <AddNewResource />
                {/* <AddNewSPT/> */}
            </div>
        </div>
    );
};

export default ResTableContainer;
