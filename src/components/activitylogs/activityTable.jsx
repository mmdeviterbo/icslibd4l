import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import dateFormat from "dateformat";
import ClearLogs from "./clearLogs";

import "../../styles/activityLogsStyle.css";

// DUMMY DATA

const logs = [
    {
        googleId: "109795266748670169483",
        email: "escruzado@up.edu.ph",
        fullName: "Elcid Cruzado",
        userType: 1,
        activity: "User login",
        createdAt: "2021-06-02T12:50:04.572+00:00",
        updatedAt: "2021-06-02T12:50:04.572+00:00",
    },
    {
        googleId: "109795266742734169483",
        email: "dumdum@up.edu.ph",
        fullName: "Dum Dum",
        userType: 4,
        activity: "User login",
        createdAt: "2021-07-02T12:50:04.572+00:00",
        updatedAt: "2021-07-02T12:50:04.572+00:00",
    },
    {
        googleId: "109795266742734122483",
        email: "dummydum@up.edu.ph",
        fullName: "Dummy Dum",
        userType: 4,
        activity: "User login",
        createdAt: "2021-07-02T12:50:04.572+00:00",
        updatedAt: "2021-07-02T12:50:04.572+00:00",
    },
    {
        googleId: "109005266742734169483",
        email: "dummydum@up.edu.ph",
        fullName: "Dummy Dum",
        userType: 4,
        activity: "User login",
        createdAt: "2021-07-02T12:50:04.572+00:00",
        updatedAt: "2021-07-02T12:50:04.572+00:00",
    },
];

const tableHeader = [
    "User ID",
    "Full Name",
    "Email",
    "Classification",
    "Activity",
    "Timestamp",
];

export default function ActivityTable() {
    const [activityLogs, setActivityLogs] = useState(logs);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedActivity, setSelectedActivity] = useState({});

    let tableEntry = activityLogs;

    const classificationString = ["Admin", "Faculty", "Staff", "Student"];

    // Column Header
    const header = tableHeader.map((headerTxt, index) => (
        <TableCell
            key={index}
            style={{
                align: "left",
                fontWeight: "bold",
                fontSize: "1.4rem",
            }}>
            <span>{headerTxt}</span>
        </TableCell>
    ));

    // Set the current page of table to the first page if the previous page becomes empty.
    useEffect(() => {
        if (activityLogs.length === rowsPerPage && page > 0) {
            setPage(0);
        }
    }, [activityLogs.length, rowsPerPage, page]);

    // Handler event for page change
    const handlePageChange = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // Computes the number of rows missing in a 10 per item pagination
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

    const entries = tableEntry.map((entry, index) => {
        return (
            <TableRow hover key={entry.googleId} activity={entry}>
                <TableCell
                    style={{
                        fontSize: "16px",
                        width: "15%",
                    }}>
                    <span>{entry.googleId}</span>
                </TableCell>
                <TableCell
                    style={{
                        fontSize: "16px",
                        width: "20%",
                        align: "left",
                        color: "black",
                    }}>
                    <span>{entry.fullName}</span>
                </TableCell>
                <TableCell style={{ fontSize: "16px", width: "20%" }}>
                    <span>{entry.email}</span>
                </TableCell>
                <TableCell
                    style={{
                        fontSize: "16px",
                        width: "15%",
                        textAlign: "left",
                    }}>
                    <span>{classificationString[entry.userType - 1]}</span>
                </TableCell>
                <TableCell
                    style={{
                        fontSize: "16px",
                        width: "15%",
                        textAlign: "left",
                    }}>
                    <span>{entry.activity}</span>
                </TableCell>
                <TableCell
                    style={{
                        fontSize: "16px",
                        width: "15%",
                        textAlign: "left",
                    }}>
                    <span>
                        {dateFormat(entry.createdAt, "yyyy, mmmm dd;  hh:mm")}
                    </span>
                </TableCell>
            </TableRow>
        );
    });
    return (
        <>
            <TableContainer component={Paper} className="main-table-container">
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>{header}</TableRow>
                    </TableHead>
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
            <br />
            <div className="clear-logs-button-container">
                <ClearLogs />
            </div>
        </>
    );
}
