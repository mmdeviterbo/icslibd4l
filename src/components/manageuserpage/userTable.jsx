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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const tableHeader = [
  "User ID", "Full Name", "Classification", " "

];
const tableEntry = [
{
  userID : "0001",
  name : "Elcid X. Cruzado",
  classification : "Student",
},
{
  userID : "0002",
  name : "John Mel Ramos",
  classification : "Student",
},
{
  userID : "0003",
  name : "Rita Isabel C. Federer",
  classification : "Faculty",
},
{
  userID : "0004",
  name : "Joayma H. Mufasa",
  classification : "Student"
},
{
  userID : "0005",
  name: "Olivia Alexis C. Aranas",
  classification : "Student"
},
{
  userID : "0006",
  name : "Maria Franchette Beatrix F. Gacad",
  classification : "Student"
},
{
  userID : "0007", 
  name : "Josesito Joseph T. Batumbakal III",
  classification : "Student"
}
];

const initialState = {
  users:[tableEntry]
}

export const GlobalContext = createContext(initialState);

export default function UserEntry() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);


  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

  }

  const header = tableHeader.map((header_text, index) => (
      <TableCell key={index}>{header_text}</TableCell>
  )); 
  
  const useStyles = makeStyles({
    root : {
      borderRadius: '10px',
    }
  });

  const tableContainer = useStyles();

  const entries = tableEntry.map((entry, index) => (
      <TableRow hover>
        <TableCell key={entry.userID} style={{width: '80x'}}>{entry.userID}</TableCell>
        <TableCell key={entry.name} style={{align: 'left'}}><Link to={`/viewuser/${entry.userID}`}>{entry.name}</Link></TableCell>
        <TableCell key={entry.classification} style={{width : '80px'}}>{entry.classification}</TableCell>
        <TableCell key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
          <FontAwesomeIcon icon={faPencilAlt} style={{margin: '0 0 10px 10px'}}/> 
          <FontAwesomeIcon icon={faTrashAlt} style={{margin: '0 0 10px 10px'}}/>
        </TableCell>
      </TableRow>
  ))

  return(
    <>
      <TableContainer component={Paper} className={tableContainer.root}>
        <Table stickyHeader>
          <TableHead>
            {header}
          </TableHead>
          <TableBody>
            {entries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

          </TableBody>
        </Table>

        <TablePagination 
          rowsPerPage={rowsPerPage} 
          rowsPerPageOptions={[5]}
          component='div'
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          count={entries.length}
        />

      </TableContainer>
    </>
  );
}