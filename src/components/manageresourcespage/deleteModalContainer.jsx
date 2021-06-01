import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
// import StatusModal from "../modal/operationStatusModal";

//  TODO: add documentation
const DeletePopUpCont = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location.state.id;
  const item = location.state.item;
  const toDelete = location.state.user; // Object containing user information to be deleted
  // const userState = user;
  // const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  // const [visible, setVisible] = useState(false); // State for the status message modal

  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

  const handleSubmit = async (event) => {
    console.log(user);
    event.preventDefault();
    // handleClose();
    try {
      if (item === "resource") {
        await ResourceService.deleteSpThesis(id);
        // setMessage("success");
        handleClose();
        // setVisible(true);
        window.location = "/manage-resources";
      } else if (item === "account") {
        localStorage.removeItem(jwtPrivateKey); // removes token from the browser
        await PersonService.logoutUser(user); // logs the user out

        await PersonService.deleteUser(user); //deletes the user from the database
        // setMessage("success");
        window.location = "/";
      } else {
        if (toDelete.googleId === user.googleId) {
          localStorage.removeItem(jwtPrivateKey); // removes token from the browser
          await PersonService.logoutUser(user); // logs the user out
          window.location = "/";
        }

        await PersonService.deleteUser(toDelete);

        // setMessage("success");
        handleClose();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // setMessage("fail");
        alert(err.response.data.errorMessage); // some reason error message
      }
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
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
                  Delete User?
                </Modal.Title>
              ) : (
                <Modal.Title style={{ fontWeight: "bold" }}>
                  Remove Account
                </Modal.Title>
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
            <Modal.Body>Are you sure you want to delete {id}?</Modal.Body>
          )}
          {/* read resource title and author here */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            {item === "account" ? "Remove" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <StatusModal
        message={message}
        id={id}
        visible={visible}
        operation={"delete"}
      /> */}
    </>
  );
};

export default DeletePopUpCont;
