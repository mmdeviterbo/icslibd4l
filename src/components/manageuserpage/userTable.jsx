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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HttpService from "../../services/httpService";

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

export const GlobalContext = createContext(initialState);

export default function UserTable() {
  // const [ studentList, setStudentList ] = useState([]);

  // useEffect (() => {
  //   HttpService.get('http://localhost:3001/authentication/readStudents').then((response) => {
  //     setStudentList(Array.from(response.data));

  //     console.log("Hello. Getting Data from database");
  //   });
  // }, []);

  // console.log(studentList);
  // console.log("Hello World");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const header = tableHeader.map((header_text, index) => (
    <TableCell key={index}>{header_text}</TableCell>
  ));

  const useStyles = makeStyles({
    root: {
      borderRadius: "10px",
    },
  });

  const tableContainer = useStyles();

  const entries = tableEntry.map((entry, index) => (
    <TableRow hover>
      <TableCell key={entry.googleId} style={{ width: "80x" }}>
        {entry.googleId}
      </TableCell>
      <TableCell key={entry.fullName} style={{ align: "left" }}>
        <Link to={`/viewuser/${entry.googleId}`}>{entry.fullName}</Link>
      </TableCell>
      <TableCell key={entry.nickname} style={{ align: "left" }}>
        <Link to={`/viewuser/${entry.googleId}`}>{entry.nickname}</Link>
      </TableCell>
      <TableCell key={entry.email} style={{ width: "80px" }}>
        {entry.email}
      </TableCell>
      <TableCell key={entry.userType} style={{ width: "80px" }}>
        {entry.userType}
      </TableCell>
      <TableCell
        key={index}
        style={{ textAlign: "center", verticalAlign: "middle" }}>
        <FontAwesomeIcon
          icon={faPencilAlt}
          style={{ margin: "0 0 10px 10px" }}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{ margin: "0 0 10px 10px" }}
        />
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
