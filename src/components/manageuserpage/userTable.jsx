import React, { useState, createContext, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import httpService from "../../services/httpService";
import { apiEndpoint } from "../../config.json";

// Temporary User Entries while fetching data from database is not yet implemented.
const tableHeader = [
  "User ID",
  "Full Name",
  "Display Name",
  "Email",
  "Classification",
  " ",
];

const tableEntry = [
  {
    googleId: "0001",
    email: "sample@email.com",
    fullName: "Elcid X. Cruzado",
    userType: 4,
    nickname: "Nickname",
  },
  {
    googleId: "0002",
    email: "sample@email.com",
    fullName: "John Mel Ramos",
    userType: 4,
    nickname: "Nickname",
  },
  {
    googleId: "0003",
    email: "sample@email.com",
    fullName: "Rita Isabel C. Federer",
    userType: 4,
    nickname: "Nickname",
  },
  {
    googleId: "0004",
    email: "sample@email.com",
    fullName: "Joayma H. Mufasa",
    userType: 4,
    nickname: "Nickname",
  },
  {
    googleId: "0005",
    email: "sample@email.com",
    fullName: "Olivia Alexis C. Aranas",
    userType: 4,
    nickname: "Nickname",
  },
  {
    googleId: "0006",
    email: "sample@email.com",
    fullName: "Maria Franchette Beatrix F. Gacad",
    userType: 4,
    nickname: "Nickname",
  },
  {
    googleId: "0007",
    email: "sample@email.com",
    fullName: "Josesito Joseph T. Batumbakal III",
    userType: 4,
    nickname: "Nickname",
  },
];

const initialState = {
  users: [tableEntry],
};

// Data can be used in view user page
export const GlobalContext = createContext(initialState);

export default function UserTable({user}) {

  useEffect(() => {
    console.log(user)

    httpService.get(`${apiEndpoint}/admin/readAllUsers`, user, {withCredentials:true}).then((response) => {
      // setUserList(Array.from(response.data));

      console.log("Hello. Getting Data from database");
    });
  }, [user]);

  // Array for user data retreived from database.
  // const [ userList, setUserList ] = useState([]);
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Computes the number of rows missing in a 10 per item pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handler event for page change in user table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Column Header
  const header = tableHeader.map((header_text, index) => (
    <TableCell key={index} style={{ fontWeight: "bolder" }}><span>{header_text}</span></TableCell>
  ));

  const useStyles = makeStyles({
    root: {
      borderRadius: "10px",
    },
  });

  const tableContainer = useStyles();

  const entries = tableEntry.map((entry, index) => (
    <TableRow hover>
      <TableCell key={entry.googleId} style={{ width: "80x", fontWeight: "bold" }}>
        <span>{entry.googleId}</span>
      </TableCell>
      <TableCell key={entry.fullName} style={{ align: "left", fontWeight: "bolder", color: "black"}}>
        <Link to={`/viewuser/${entry.googleId}`}>{entry.fullName}</Link>
      </TableCell>
      <TableCell key={entry.nickname} style={{ align: "left", fontWeight: "bolder", color: "#FFFFFF" }}>
        <Link to={`/viewuser/${entry.googleId}`}>{entry.nickname}</Link>
      </TableCell>
      <TableCell key={entry.email} style={{ width: "80px" }}>
        <span>{entry.email}</span>
      </TableCell>
      <TableCell key={entry.userType} style={{ width: "80px", textAlign: "center"}}>
        <span>{entry.userType}</span>
      </TableCell>
      <TableCell key={index} style={{ textAlign: "center", fontSize: "1.5rem" }}>
        <i className="fa fa-ellipsis-h" style={{ margin: "10px", color: "#CFCFCF",  }}></i>
        <i className="fa fa-trash-o" style={{ margin: "10px", color: "#CFCFCF" }}></i>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableContainer component={Paper} className={tableContainer.root}>
        <Table stickyHeader>
          <TableHead>{header}</TableHead>
          <TableBody>
            {entries.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}

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
          component="div"
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          count={entries.length}
        />
      </TableContainer>
    </>
  );
}
