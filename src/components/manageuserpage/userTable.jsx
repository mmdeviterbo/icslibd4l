import React, { useState, useEffect, useCallback } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Link, useLocation, useHistory } from "react-router-dom";
import PersonService from "../../services/personService";
import Select from "react-select";
import { jwtPrivateKey } from "./../../config.json";
import PropagateLoader from "react-spinners/PropagateLoader";

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

/****************************************************************************
 * Type: Functional Component
 *
 * Summary:
 * React Component containing the main table of users.
 *
 * Props:
 * user - the currently logged in user on the application
 * selectedFilter - the currently selected filter
 * searchInput - search query that the user typed in the search input field.
 ****************************************************************************/
export default function UserTable({ user, selectedFilter, searchInput }) {
  // Array for user data retreived from database.
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [newClassification, setNewClassification] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();

  tableEntry = userList;

  const classificationString = ["Admin", "Faculty", "Staff", "Student"];
  const classificationObj = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Faculty",
      label: "Faculty",
    },
    {
      value: "Staff",
      label: "Staff",
    },
    {
      value: "Student",
      label: "Student",
    },
  ];

  /****************************************************************************
   * Type: Array of Components
   *
   * Summary:
   * The header array is mapped to their own TableCell component.
   ****************************************************************************/
  const header = tableHeader.map((header_text, index) => (
    <TableCell
      key={index}
      style={{
        align: "left",
        fontWeight: "bold",
        fontSize: "1.4rem",
        zIndex: "0",
        backgroundColor: "#0067a1",
        color: "white",
        padding: "1.5rem",
      }}
    >
      <span>{header_text}</span>
    </TableCell>
  ));

  /****************************************************************************
   * Type: Function
   *
   * Summary:
   * Retrieves data from the data base and filters the response according to
   * the currently selected filters.
   ****************************************************************************/
  const readUsers = useCallback(async () => {
    try {
      await PersonService.readAllUsers().then((response) => {
        if (selectedFilter !== -1) {
          setUserList(
            Array.from(response.data).filter(
              (userItem) => userItem.userType === selectedFilter
            )
          );
        } else {
          setUserList(Array.from(response.data));
        }
        setIsLoading(false);
        setPage(0);
      });
    } catch (err) {}
  }, [selectedFilter]);

  /****************************************************************************
   * Type: Function
   *
   * Summary:
   * Sends a request to the API and the response is an array of objects
   * containing the users that matches the search keyword.
   ****************************************************************************/
  const searchUser = useCallback(
    async (searchInput) => {
      try {
        await PersonService.searchUser(searchInput).then((response) => {
          if (selectedFilter !== -1) {
            setUserList(
              Array.from(response.data).filter(
                (userItem) => userItem.userType === selectedFilter
              )
            );
          } else {
            setUserList(Array.from(response.data));
          }
          setIsLoading(false);
        });
        setPage(0);
      } catch (err) {}
    },
    [selectedFilter]
  );

  /****************************************************************************
   * Type: React Hooks (useEffect)
   *
   * Summary:
   * Checks if the currently logged in user is authorized to access the page.
   * Then, retreives the users if authorized, otherwise is redirected to
   * the home page.
   ****************************************************************************/
  useEffect(() => {
    setIsLoading(true);
    try {
      const jwt = localStorage.getItem(jwtPrivateKey);
      var userInfo = PersonService.decryptToken(jwt);
      if (userInfo?.userType !== 1) history.push("/home");
    } catch (err) {
      history.push("/home");
    }
    readUsers();
  }, [location, history, readUsers]);

  /****************************************************************************
   * Type: React Hooks (useEffect)
   *
   * Summary:
   * If the number of items on the given page of the table becomes zero,
   * the current page turns to the first page.
   ****************************************************************************/
  useEffect(() => {
    if (userList.length === rowsPerPage && page > 0) {
      setPage(0);
    }
  }, [userList.length, rowsPerPage, page]);

  /****************************************************************************
   * Type: React Hooks (useEffect)
   *
   * Summary:
   * Filters the array according to the input of the user
   * if there is a given input in the search field.
   ****************************************************************************/
  useEffect(() => {
    if (searchInput) {
      searchUser(searchInput);
    } else {
      readUsers();
    }
  }, [searchInput, selectedFilter, readUsers, searchUser]);

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Handler function for when the user selects the next page function
   ****************************************************************************/
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {});

  /****************************************************************************
   * Type: Function
   *
   * Summary:
   * Handler function for when the user wants to change the classification
   * of another user.
   ****************************************************************************/
  const handleClassificationChange = (e) => {
    const classificationIdx = classificationString.indexOf(e.value) + 1;
    setNewClassification(classificationIdx);
  };

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Contains the selector component when the user wants to edit classification
   * of a different user.
   ****************************************************************************/
  // Functional component for new classification selection
  const EditClassification = ({ entry, index }) => {
    return (
      <Select
        className="classification-select"
        placeholder={`${classificationString[newClassification - 1]}`}
        options={classificationObj}
        id={`select-classification-${index}`}
        onChange={handleClassificationChange}
        styles={{
          // Fixes the overlapping problem of the component
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
      />
    );
  };

  /****************************************************************************
   * Type: Function
   *
   * Summary:
   * Toggles classification of a user to be editable after clicking the edit icon.
   ****************************************************************************/
  const toggleEdit = (rowIndex) => {
    setUserList((prev) => {
      return userList.map((user, index) => {
        if (rowIndex === index) {
          // The selected user is being edited currently
          if (isEditing && isEditing === user.isEditable) {
            setNewClassification(user.userType);
            setIsEditing(false);
            return { ...user, isEditable: !user.isEditable };
            // There is an ongoing edit but the selected user is not the one being edited
          } else if (isEditing && isEditing !== user.isEditable) {
            console.log("Still editing a different user.");
            // No ongoing edits
          } else {
            setNewClassification(user.userType);
            setIsEditing(true);
            return { ...user, isEditable: !user.isEditable };
          }
        }
        return user;
      });
    });
  };

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Handler function for when the user wants to cancel and move out of
   * edit classification mode.
   ****************************************************************************/
  const discardChange = (rowIndex) => {
    toggleEdit(rowIndex);
  };

  // Computes the number of rows missing in a 10 per item pagination
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

  /****************************************************************************
   * Type: Array of Component
   *
   * Summary:
   * Maps the contents of the userList (referenced by tableEntry) to their own
   * rows in the table.
   ****************************************************************************/
  const entries = tableEntry.map((entry, index) => {
    return (
      <TableRow hover key={entry.googleId} user={entry}>
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
        <TableCell
          style={{
            fontSize: "16px",
            width: "20%",
            align: "left",
            color: "black",
          }}
        >
          <span>{entry.nickname}</span>
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
          {entry.isEditable ? (
            <EditClassification entry={entry} index={index} />
          ) : (
            <span>{classificationString[entry.userType - 1]}</span>
          )}
        </TableCell>
        {user?.fullName !== entry?.fullName ? (
          <TableCell
            style={{
              width: " 10%",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            {entry.isEditable ? (
              <>
                <Link
                  to={{
                    pathname: "/manage-users/save-changes",
                    state: {
                      background: location,
                      id: entry.googleId,
                      item: "user",
                      user: {
                        googleId: entry.googleId,
                        userType: newClassification,
                        fullName: entry.fullName,
                      },
                    },
                  }}
                >
                  <i
                    className={"table-icons fa fa-floppy-o"}
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => toggleEdit(index)}
                    style={{
                      margin: "10px",
                      color: "gray",
                    }}
                  ></i>
                </Link>
                <i
                  className="table-icons fa fa-times"
                  onClick={(e) => discardChange(index)}
                  style={{
                    margin: "10px",
                    color: "red",
                  }}
                ></i>
              </>
            ) : (
              <>
                <i
                  className="table-icons fa fa-pencil"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  onClick={(e) => {
                    toggleEdit(index);
                  }}
                  style={{
                    margin: "10px",
                    color: "gray",
                  }}
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
                    className="table-icons fa fa-trash-o"
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    style={{
                      margin: "10px",
                      color: "red",
                    }}
                  ></i>
                </Link>
              </>
            )}
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
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

          {(searchInput || selectedFilter !== -1) && userList.length === 0 ? (
            <TableBody>
              <TableRow style={{ width: "100%", textAlign: "center" }}>
                <TableCell colSpan="5">
                  <div
                    style={{
                      padding: "5rem",
                      textAlign: "center",
                    }}
                  >
                    {isLoading ? (
                      <PropagateLoader
                        color={"#0067a1"}
                        speedMultiplier={2}
                        loading={true}
                        size={20}
                      />
                    ) : (
                      <h1>
                        Your search/filter returned no results. Please check
                        your spelling and try again, or remove applied filter.
                      </h1>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : userList.length === 0 ? (
            <TableBody>
              <TableRow style={{ width: "100%", textAlign: "center" }}>
                <TableCell colSpan="5">
                  <div
                    style={{
                      padding: "5rem",
                      textAlign: "center",
                    }}
                  >
                    {isLoading ? (
                      <PropagateLoader
                        color={"#0067a1"}
                        speedMultiplier={2}
                        loading={true}
                        size={20}
                      />
                    ) : (
                      <h1>
                        Failed to fetch data from database. Please check if the
                        database is running or please try again later.
                      </h1>
                    )}
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
                <TableRow
                  style={{
                    height: 40 * emptyRows,
                  }}
                ></TableRow>
              )}
            </TableBody>
          )}
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
