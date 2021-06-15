import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import StatusModal from "../modal/operationStatusModal";
import "bootstrap/dist/css/bootstrap.min.css";

//  TODO: add documentation
const DeletePopUpCont = ({ user }) => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.resid;
    const type = location.state.type;
    const item = location.state.item;
    const toDelete = location.state.user; // Object containing user information to be deleted
    // const userState = user;
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(true);
    const [visible, setVisible] = useState(false); // State for the status message modal
    const [itemName, setItemName] = useState("");
    const [pathAfter, setPathAfter] = useState("");
    const [isSelf, setIsSelf] = useState(false);

    const handleClose = () => {
        setShow(false);
        // history.goBack();
        setVisible(true);
    };

    const handleCancel = () => {
        setShow(false);
        history.goBack();
    };

    const handleSubmit = async (event) => {
        console.log(id);
        console.log(type);
        // console.log(id);
        event.preventDefault();
        // handleClose();
        try {
            if (item === "resource") {
                if (type === "book") {
                    await ResourceService.deleteBook(id);
                } else {
                    await ResourceService.deleteSpThesis(id);
                }
                setItemName(id);
                setMessage("success");
                handleClose();
                // setVisible(true);
                // window.location = "/manage-resources";
                setPathAfter("/manage-resources");
            } else if (item === "logs") {
                await PersonService.clearUserLogs();
                setMessage("success");
                handleClose();
                setPathAfter("/view-activitylogs");
            } else if (item === "account") {
                setItemName(user.fullName);
                await PersonService.deleteUser(user); //deletes the user from the database
                await PersonService.logoutUser(user); // logs the user out
                localStorage.removeItem(jwtPrivateKey); // removes token from the browser
                setIsSelf(true);
                setMessage("success");
                setPathAfter("/");
                handleClose();
            } else {
                if (toDelete.googleId === user.googleId) {
                    await PersonService.deleteUser(toDelete);

                    await PersonService.logoutUser(user); // logs the user out
                    localStorage.removeItem(jwtPrivateKey); // removes token from the browser
                    setIsSelf(true);
                    setMessage("success");
                    setPathAfter("/");
                    // window.location = "/";
                    handleClose();
                } else {
                    await PersonService.deleteUser(toDelete);

                    setMessage("success");
                    setItemName(toDelete.fullName);
                    handleClose();
                }
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage("fail");
                alert(err);
                // alert(err.response.data.errorMessage); // some reason error message
            }
            console.log(err);
        }
    };

    return (
        <>
            <StatusModal
                show={visible}
                setShow={setVisible}
                message={message}
                name={itemName}
                item={item}
                operation={"delete"}
                pathAfter={pathAfter}
                isSelf={isSelf}
            />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                {/* Renders according to item.
          If resource, else if user, else account */}
                <Modal.Header closeButton>
                    {item === "resource" ? (
                        <Modal.Title style={{ fontWeight: "bold" }}>
                            Delete Resource?
                        </Modal.Title>
                    ) : (
                        [
                            item === "user" ? (
                                <Modal.Title style={{ fontWeight: "bold" }}>
                                    Delete User
                                </Modal.Title>
                            ) : (
                                [
                                    item === "logs" ? (
                                        <Modal.Title
                                            style={{ fontWeight: "bold" }}>
                                            Clear Activity Logs
                                        </Modal.Title>
                                    ) : (
                                        <Modal.Title
                                            style={{ fontWeight: "bold" }}>
                                            Remove Account
                                        </Modal.Title>
                                    ),
                                ]
                            ),
                        ]
                    )}
                </Modal.Header>

                {/* Renders according to item.
          If account, else resource/user */}
                <Modal.Body>
                    {item === "account" ? (
                        <Modal.Body>
                            Are you sure you want to remove your account?
                        </Modal.Body>
                    ) : (
                        [
                            item === "logs" ? (
                                <Modal.Body>
                                    Are you sure you want to clear Activity
                                    Logs?
                                </Modal.Body>
                            ) : (
                                <Modal.Body>
                                    Are you sure you want to delete{" "}
                                    {item === "resource"
                                        ? id
                                        : toDelete.fullName}
                                    ?
                                </Modal.Body>
                            ),
                        ]
                    )}
                    {/* read resource title and author here */}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        {item === "account"
                            ? "Remove"
                            : [item === "logs" ? "Clear" : "Delete"]}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeletePopUpCont;
