import React from 'react';
import { Table } from '@material-ui/core';
import MainResourceTable from './res-main-table';
import AddNewResource from './createnewresource';
// import UserTable from '../manageuserpage/userTable'

const ResTableContainer = () => {
    return(
        <div className = "res-table-cont">
            
            
            {/* <UserTable/> */}
            <MainResourceTable
                // options={{
                //     cellStyle: {
                //         fontSize: '5rem',
                //     }
                // }}
            />
            <br/>
            <AddNewResource/>
        </div>
    )
};

export default ResTableContainer
