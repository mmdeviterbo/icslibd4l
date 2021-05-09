import React from 'react';
import { Table } from '@material-ui/core';
import MainResourceTable from './res-main-table';

const ResTableContainer = () => {
    return(
        <div className = "res-table-cont">
            <MainResourceTable/>
            {/* put table here */}
        </div>
    )
};

export default ResTableContainer
