import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
// import StatusModal from "./operationStatusModal";

//  TODO: add documentation
const ConfirmChangeModal = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const id = location.state.id;
  const item = location.state.item;
  const toEdit = location.state.user; // Object containing user information to be deleted
  // const userState = user;
  // const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  // const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleClose();
    try {
      if (item === "resource") {
        // const { data } = await ResourceService.deleteSpThesis(id);
        // setMessage("success");
        handleClose();
        window.location = "/manage-resources";
      } else if (item === "account") {
        localStorage.removeItem(jwtPrivateKey); // remove token from the browser
        await PersonService.logoutUser(user); // logs the user out

        await PersonService.updateNickname(user); //edit the user from the database
        // setMessage("success");
        window.location = "/";
      } else {
        if (toEdit.googleId === user.googleId) {
          localStorage.removeItem(jwtPrivateKey); // removes token from the browser
          await PersonService.logoutUser(user); // logs the user out
          window.location = "/";
        }

        await PersonService.updateClassification(toEdit);

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
      {/* <StatusModal
        show={visible}
        message={message}
        id={id}
        operation={"edit"}
      /> */}
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
              Edit Resource?
            </Modal.Title>
          ) : (
            [
              item === "user" ? (
                <Modal.Title style={{ fontWeight: "bold" }}>
                  Edit User?
                </Modal.Title>
              ) : (
                <Modal.Title style={{ fontWeight: "bold" }}>
                  Edit User
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
            <Modal.Body>
              Are you sure you want to save changes to {toEdit.fullName}?
            </Modal.Body>
          )}
          {/* read resource title and author here */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmChangeModal;
