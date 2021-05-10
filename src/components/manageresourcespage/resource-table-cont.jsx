import React from 'react';
import { Table } from '@material-ui/core';
import MainResourceTable from './res-main-table';
import AddNewResource from './createnewresource';

const ResTableContainer = () => {
    return(
        <div className = "res-table-cont">
            <AddNewResource/>
            <br/>
            <MainResourceTable/>
            {/* put table here */}
        </div>
    )
};

export default ResTableContainer
