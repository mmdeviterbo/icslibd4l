import React, { useState, createContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const resTableHeader = [
  "ID", "Classification", "Title", "Author" 

];

const sampleResData = [
    {
        resID: "00001",
        resClass: "SP",
        title: "Sample SP Title Here",
    }
];

const resInitState = {
    resources: [sampleResData]
};

export const resGlobalContext = createContext(resInitState);

export default function MainReosurceTable() {
    return(
        <div></div>
    )
}
// export default function ResourceTable(){


//     // make table
//     const resTable = sampleResData.map((entry,index) => (
        
//         )
//     )
// }