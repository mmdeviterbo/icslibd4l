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
import PropagateLoader from "react-spinners/PropagateLoader";
import PersonService from "../../services/personService";
import { Link, useLocation, useHistory } from "react-router-dom";
import { jwtPrivateKey } from "./../../config.json";
import "../../styles/activityLogsStyle.css";

/****************************************************
 * Type: Global Variable
 *
 * Summary:
 * An array that contains the table headers of the activity logs table
 *
 ******************************************************/
const tableHeader = [
  "User ID",
  "Full Name",
  "Email",
  "Classification",
  "Activity",
  "Timestamp",
];

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 * A component that renders the userlogs fetched from the database to the activity logs table
 * The user can clear the activity logs which is reflected to the database
 *
 ******************************************************/
export default function ActivityTable() {
  const [activityLogs, setActivityLogs] = useState([]);
  const [isLoading, setLoading] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const location = useLocation();
  const history = useHistory();

  let tableEntry = activityLogs;

  const classificationString = ["Admin", "Faculty", "Staff", "Student"];

  // Column Header
  const header = tableHeader.map((headerTxt, index) => (
    <TableCell
      key={index}
      style={{
        backgroundColor: "#0067a1",
        align: "left",
        fontWeight: "bold",
        fontSize: "1.4rem",
        color: "white",
      }}
    >
      <p>{headerTxt}</p>
    </TableCell>
  ));

  // executes if the location is changed. (Opening modals)
  useEffect(() => {
    //if no user is logged in, redirect it to homepage
    try {
      const jwt = localStorage.getItem(jwtPrivateKey);
      var userInfo = PersonService.decryptToken(jwt);
      if (userInfo?.userType !== 1) history.push("/home");
    } catch (err) {
      history.push("/home");
    }
    readLogs();
  }, [location, history]);

  // Get activity logs from database
  const readLogs = async () => {
    try {
      const { data } = await PersonService.readUserLogs();
      data.reverse(); //reverses the order (latest first)
      setActivityLogs(data);
      setLoading(1);
    } catch (err) {}
  };

  // functional component that renders a button that redirects to a delete modal when clicked
  const ClearLogs = () => {
    return (
      <Link
        to={{
          pathname: "/view-activitylogs/clear-activitylogs",
          state: {
            background: location,
            item: "logs",
            id: "",
          },
        }}
      >
        <div className="clear-container">
          <button className="clear-logs-btn">
            <span className="clear-btn-txt">Clear Logs</span>
          </button>
        </div>
      </Link>
    );
  };

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
    rowsPerPage - Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

  const entries = tableEntry.reverse().map((entry, index) => {
    return (
      <TableRow
        hover
        key={`${entry.googleId}-${entry.updatedAt}`}
        activity={entry}
      >
        <TableCell
          style={{
            fontSize: "16px",
            width: "15%",
          }}
        >
          <span>{entry.googleId}</span>
        </TableCell>
        <TableCell
          style={{
            fontSize: "16px",
            width: "20%",
            align: "left",
            color: "black",
          }}
        >
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
          }}
        >
          <span>{classificationString[entry.userType - 1]}</span>
        </TableCell>
        <TableCell
          style={{
            fontSize: "16px",
            width: "15%",
            textAlign: "left",
          }}
        >
          <span>{entry.activity}</span>
        </TableCell>
        <TableCell
          style={{
            fontSize: "16px",
            width: "15%",
            textAlign: "left",
          }}
        >
          <span>{dateFormat(entry.updatedAt, "mmmm dd yyyy h:MM TT")}</span>
        </TableCell>
      </TableRow>
    );
  });
  return (
    <>
      <TableContainer
        component={Paper}
        className="main-table-container"
        style={{
          borderRadius: "10px",
          boxShadow: "4px 4px 20px #cfcfcf",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>{header}</TableRow>
          </TableHead>
          {isLoading === 0 ? (
            <TableBody>
              <TableRow
                style={{
                  width: "100%",
                  textAlign: "center",
                  height: 54 * 10,
                }}
              >
                <TableCell colSpan="6" rowSpan="10">
                  <div
                    style={{
                      // minHeight: "100%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <PropagateLoader
                      color={"#0067a1"}
                      speedMultiplier={2}
                      loading={true}
                      size={20}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : activityLogs.length === 0 ? (
            <TableBody>
              <TableRow
                style={{
                  width: "100%",
                  textAlign: "center",
                  height: 54 * 10,
                }}
              >
                <TableCell colSpan="6">
                  <div
                    style={{
                      padding: "5rem",
                      textAlign: "center",
                    }}
                  >
                    <h1>User activity logs is empty</h1>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
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
          )}
        </Table>

        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={entries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <br />
      {activityLogs.length === 0 ? (
        <></>
      ) : (
        <div className="clear-logs-button-container">
          <ClearLogs />
        </div>
      )}
    </>
  );
}
