import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResourceService from "../../services/resourceService";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";

//  TODO: add documentation
const DeletePopUpCont = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location.state.id;
  const item = location.state.item;
  const toDelete = location.state.user; // Object containing user information to be deleted
  // const userState = user;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

  const handleSubmit = async (event) => {
    console.log(user);
    event.preventDefault();
    // handleClose();
    try {
      if (item == "resource") {
        const { data } = await ResourceService.deleteSpThesis(id);
        IsDeleted("success");
        handleClose();
        window.location = "/manage-resources";
      } else if (item == "account") {
        if (toDelete && user.googleId !== toDelete.googleId) {
          // The user to be deleted is not undefined and not the user currently logged in.
          await PersonService.deleteUser(toDelete);

          IsDeleted("sucess");
          handleClose();
        } else {
          localStorage.removeItem(jwtPrivateKey); // removes token from the browser
          await PersonService.logoutUser(user); // logs the user out

          const { data } = await PersonService.deleteUser(user); //deletes the user from the database
          IsDeleted("success");
          window.location = "/";
        }
      } else {
        const { data } = await PersonService.deleteUser(id);
        IsDeleted("success");
        // window.location = "/manage-users";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        IsDeleted("fail");
        alert(err.response.data.errorMessage); // some reason error message
      }
      console.log(err);
    }
  };

  const IsDeleted = ({ message }) => {
    console.log(message);
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body>
            {message == "success" ? (
              <Modal.Title>{id} has been deleted successfully.</Modal.Title>
            ) : (
              <Modal.Title>Failed to delete {id}.</Modal.Title>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
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
          {item == "resource" ? (
            <Modal.Title style={{ fontWeight: "bold" }}>
              Delete Resource?
            </Modal.Title>
          ) : (
            [
              item == "user" ? (
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
          {item == "account" ? (
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
            {item == "account" ? "Remove" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePopUpCont;
