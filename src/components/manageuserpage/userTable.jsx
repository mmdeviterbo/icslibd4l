import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import PersonService from "../../services/personService";
import { Select } from "@material-ui/core";

const tableHeader = [
  "User ID",
  "Full Name",
  "Display Name",
  "Email",
  "Classification",
  " ",
];

let tableEntry = [];

// const initialState = {
//   users: [tableEntry],
// };

export default function UserTable({ user }) {
  // Array for user data retreived from database.
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);

  tableEntry = userList;

  // Computes the number of rows missing in a 10 per item pagination
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

  const classificationString = ["Admin", "Faculty", "Staff", "Student"];
  const location = useLocation();

  useEffect(() => {
    readUsers();
  }, [user]);

  const readUsers = async () => {
    try {
      await PersonService.readAllUsers().then((response) => {
        setUserList(Array.from(response.data));
      });
    } catch (err) {}
  };

  // Handler event for page change in user table
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const useStyles = makeStyles({
    root: {
      borderRadius: "10px",
    },
  });

  const tableContainer = useStyles();

  const editClassification = () => {
    return (
      <Select
        className="classification-chuchu"
        placeholder={"Classification"}
        options={classificationString}
      />
    );
  };

  // Column Header
  const header = tableHeader.map((header_text, index) => {
    return (
      <TableCell key={index} style={{ fontWeight: "bolder" }}>
        <span>{header_text}</span>
      </TableCell>
    );
  });

  const entries = tableEntry.map((entry, index) => {
    return (
      <TableRow hover key={entry.googleId} user={entry}>
        <TableCell style={{ width: "80x", fontWeight: "bold" }}>
          <span>{entry.googleId}</span>
        </TableCell>
        <TableCell
          style={{ align: "left", fontWeight: "bolder", color: "black" }}
        >
          <Link to={`/viewuser/${entry.googleId}`}>{entry.fullName}</Link>
        </TableCell>
        <TableCell
          style={{ align: "left", fontWeight: "bolder", color: "#FFFFFF" }}
        >
          <Link to={`/viewuser/${entry.googleId}`}>{entry.nickname}</Link>
        </TableCell>
        <TableCell style={{ width: "80px" }}>
          <span>{entry.email}</span>
        </TableCell>
        <TableCell style={{ width: "80px", textAlign: "center" }}>
          <span className="user-classification-cell">
            {classificationString[entry.userType - 1]}
          </span>
        </TableCell>
        <TableCell style={{ textAlign: "center", fontSize: "1.5rem" }}>
          <i
            className="fa fa-ellipsis-h"
            style={{ margin: "10px", color: "#CFCFCF" }}
          ></i>
          <Link
            to={{
              pathname: "/manage-users/delete-user",
              state: {
                background: location,
                id: entry.googleId,
                item: "user",
                user: {
                  googleId: entry.googleId,
                  email: entry.email,
                  fullName: entry.fullName,
                  nickName: entry.nickname,
                  userType: entry.userType,
                },
              },
            }}
          >
            <i
              className="fa fa-trash-o"
              style={{ margin: "10px", color: "#CFCFCF" }}
            ></i>
          </Link>
        </TableCell>
      </TableRow>
    );
  });

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
