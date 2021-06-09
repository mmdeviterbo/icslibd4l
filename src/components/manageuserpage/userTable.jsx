import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
// import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation, useHistory } from "react-router-dom";
import PersonService from "../../services/personService";
import Select from "react-select";
import { jwtPrivateKey } from "./../../config.json";

import "../../styles/manageUserStyle.css";
// import { MongoServerSelectionError } from "mongodb";

const tableHeader = [
    "User ID",
    "Full Name",
    "Display Name",
    "Email",
    "Classification",
    " ",
];

let tableEntry = [];

export default function UserTable({ user, selectedFilter }) {
    // Array for user data retreived from database.
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [newClassification, setNewClassification] = useState(0);
    const [selectedUser, setSelectedUser] = useState({});

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

    // Column Header
    const header = tableHeader.map((header_text, index) => (
        <TableCell
            key={index}
            style={{
                align: "left",
                fontWeight: "bold",
                fontSize: "1.4rem",
                zIndex: "0",
            }}
        >
            <span>{header_text}</span>
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
        readUsers();
    }, [history]);

    // Set the current page of table to the first page if the previous page becomes empty.
    useEffect(() => {
        if (userList.length === rowsPerPage && page > 0) {
            setPage(0);
        }
    }, [userList.length, rowsPerPage, page]);

    // Filters the array if the filter is changed
    useEffect(() => {
        if (selectedFilter === -1) {
            readUsers();
        } else if (selectedFilter === 1) {
            readAdmins();
        } else if (selectedFilter === 2) {
            readFaculty();
        } else if (selectedFilter === 3) {
            readStaff();
        } else {
            readStudents();
        }
    }, [selectedFilter]);

    // Get users from database
    const readUsers = async () => {
        try {
            await PersonService.readAllUsers().then((response) => {
                setUserList(Array.from(response.data));
            });
        } catch (err) {}
    };

    // Filter admins from database
    const readAdmins = async () => {
        try {
            await PersonService.readAdmins().then((response) => {
                setUserList(Array.from(response.data));
            });
        } catch (err) {}
    };

    // Filter Faculty from database
    const readFaculty = async () => {
        try {
            await PersonService.readFaculty().then((response) => {
                setUserList(Array.from(response.data));
            });
        } catch (err) {}
    };

    // Filter Staff from database
    const readStaff = async () => {
        try {
            await PersonService.readStaff().then((response) => {
                setUserList(Array.from(response.data));
            });
        } catch (err) {}
    };

    // Filter Students from database
    const readStudents = async () => {
        try {
            await PersonService.readStudents().then((response) => {
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

    // window.addEventListener("contextmenu", (event) => {
    //     event.preventDefault();
    // });
    useEffect(() => {});

    // Sets newClassification variable if the select field is changed
    const handleClassificationChange = (e) => {
        const classificationIdx = classificationString.indexOf(e.value) + 1;
        setNewClassification(classificationIdx);
    };

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
                menuPortalTarget={document.querySelector(
                    ".main-table-container"
                )}
            />
        );
    };

    // Toggles the classification selection field when admin wants to edit a user.
    const toggleEdit = (rowIndex) => {
        setUserList((prev) => {
            return userList.map((user, index) => {
                if (rowIndex === index) {
                    // The selected user is being edited currently
                    if (isEditing && isEditing === user.isEditable) {
                        setNewClassification(user.userType);
                        setSelectedUser({});
                        setIsEditing(false);
                        return { ...user, isEditable: !user.isEditable };
                        // There is an ongoing edit but the selected user is not the one being edited
                    } else if (isEditing && isEditing !== user.isEditable) {
                        console.log("Still editing a different user.");
                        // No ongoing edits
                    } else {
                        setNewClassification(user.userType);
                        setSelectedUser(user);
                        setIsEditing(true);
                        return { ...user, isEditable: !user.isEditable };
                    }
                }
                return user;
            });
        });
    };

    // Handler function for saving the changes is user classification
    // const handleSave = async (rowIndex) => {
    //   toggleEdit(rowIndex);
    // };

    // Handler function for discarding the changes in user classification
    const discardChange = (rowIndex) => {
        // TODO: If the admin selected a new classification, there should be a prompt that ask if the user will discard the current changes.
        // Else, if there are no changes, then the edit mode should quit immediately.
        console.log(selectedUser);
        toggleEdit(rowIndex);
    };

    // Computes the number of rows missing in a 10 per item pagination
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, tableEntry.length - page * rowsPerPage);

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
                                    style={{ margin: "10px", color: "red" }}
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
                                    style={{ margin: "10px", color: "gray" }}
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
            <TableContainer component={Paper} className="main-table-container">
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
