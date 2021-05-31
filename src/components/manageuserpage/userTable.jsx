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
import { Link, useLocation } from "react-router-dom";
import PersonService from "../../services/personService";

import "../../styles/manageUserStyle.css";

const tableHeader = [
    "User ID",
    "Full Name",
    "Display Name",
    "Email",
    "Classification",
    " ",
];

let tableEntry = [];

const initialState = {
    users: [tableEntry],
};

// Data can be used in view user page
export const GlobalContext = createContext(initialState);

export default function UserTable({ user }) {
    const [userList, setUserList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        PersonService.readAllUsers().then((response) => {
            setUserList(Array.from(response.data));
        });
    });

    tableEntry = userList;

    // Array for user data retreived from database.

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // Computes the number of rows missing in a 10 per item pagination
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

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
        <TableCell
            key={index}
            style={{
                align: "left",
                fontWeight: "bold",
                fontSize: "14px",
            }}>
            <span>{header_text}</span>
        </TableCell>
    ));

    const useStyles = makeStyles({
        root: {
            borderRadius: "8px",
        },
    });

    const tableContainer = useStyles();

    const entries = tableEntry.map((entry, index) => (
        <TableRow hover key={entry.googleId} user={entry}>
            <TableCell
                style={{
                    width: "15%",
                    fontWeight: "bold",
                }}>
                <span>{entry.googleId}</span>
            </TableCell>
            <TableCell
                style={{
                    width: "20%",
                    align: "left",
                    fontWeight: "bolder",
                    color: "black",
                }}>
                <Link to={`/viewuser/${entry.googleId}`}>{entry.fullName}</Link>
            </TableCell>
            <TableCell
                style={{
                    width: "20%",
                    align: "left",
                    fontWeight: "bolder",
                    color: "#FFFFFF",
                }}>
                <Link to={`/viewuser/${entry.googleId}`}>{entry.nickname}</Link>
            </TableCell>
            <TableCell style={{ width: "20  %" }}>
                <span>{entry.email}</span>
            </TableCell>
            <TableCell style={{ width: "15%", textAlign: "left" }}>
                <span>{entry.userType}</span>
            </TableCell>
            <TableCell
                style={{
                    width: " 10%",
                    textAlign: "center",
                    fontSize: "1.5rem",
                }}>
                <i
                    className="fa fa-ellipsis-h"
                    style={{ margin: "10px", color: "#CFCFCF" }}></i>
                <Link
                    to={{
                        pathname: "/manage-users/delete-user",
                        state: {
                            background: location,
                            id: entry.googleId,
                            item: "account",
                            user: {
                                googleId: entry.googleId,
                                email: entry.email,
                                fullName: entry.fullName,
                                nickName: entry.nickname,
                                userType: entry.userType,
                            },
                        },
                    }}>
                    <i
                        className="fa fa-trash-o"
                        style={{ margin: "10px", color: "#CFCFCF" }}></i>
                </Link>
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
