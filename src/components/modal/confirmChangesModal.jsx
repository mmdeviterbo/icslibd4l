import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import StatusModal from "./operationStatusModal";

//  TODO: add documentation
const ConfirmChangeModal = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location.state.id;
  const item = location.state.item;
  const toEdit = location.state.user; // Object containing user information to be deleted
  // const userState = user;
  const [message, setMessage] = useState("");
  const [itemName, setItemName] = useState("");
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(false);
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
    event.preventDefault();
    // handleClose();
    try {
      if (item === "resource") {
        // const { data } = await ResourceService.deleteSpThesis(id);
        setMessage("success");
        handleClose();
        setPathAfter("/manage-resources");
        // window.location = "/manage-resources";
      } else if (item === "account") {
        localStorage.removeItem(jwtPrivateKey); // remove token from the browser
        await PersonService.updateNickname(user); //edit the user from the database

        await PersonService.logoutUser(user); // logs the user out
        setIsSelf(true);
        setMessage("success");
        setItemName(user.fullName);
        setPathAfter("/");
        // window.location = "/";
      } else {
        if (toEdit.googleId === user.googleId) {
          localStorage.removeItem(jwtPrivateKey); // removes token from the browser
          await PersonService.logoutUser(user); // logs the user out
          setIsSelf(true);
          setPathAfter("/");
          // window.location = "/";
        }

        await PersonService.updateClassification(toEdit);

        setMessage("success");
        setItemName(toEdit.fullName);
        handleClose();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage("fail");
        alert(err.response.data.errorMessage); // some reason error message
      }
    }
  };

  return (
    <>
      <StatusModal
        show={visible}
        setShow={setShow}
        message={message}
        name={itemName}
        operation={"edit"}
        pathAfter={pathAfter}
        isSelf={isSelf}
      />
      <Modal
        show={show}
        onHide={handleCancel}
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
            <Modal.Body>Save changes to your account?</Modal.Body>
          ) : (
            <Modal.Body>
              Are you sure you want to save changes to{" "}
              {item === "resource" ? id : toEdit.fullName}?
            </Modal.Body>
          )}
          {/* read resource title and author here */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
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
