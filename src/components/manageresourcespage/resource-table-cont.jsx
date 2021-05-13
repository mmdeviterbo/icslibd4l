import React from 'react';
import { Table } from '@material-ui/core';
import MainResourceTable from './res-main-table';
import AddNewResource from './createnewresource';
// import UserTable from '../manageuserpage/userTable'

const ResTableContainer = () => {
    return(
        <div className = "res-table-cont">
            <AddNewResource/>
            <br/>
            {/* <UserTable/> */}
            <MainResourceTable
                // options={{
                //     cellStyle: {
                //         fontSize: '5rem',
                //     }
                // }}
            />
        </div>
    )
};

export default ResTableContainer
