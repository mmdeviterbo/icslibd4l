import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResourceServices from "../../services/resourceService";
import MessagePopUpCont from "../messageModalContainer";
import "bootstrap/dist/css/bootstrap.min.css";

//  TODO: add documentation
const DeletePopUpCont = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location.state.id;
  const item = location.state.item;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleClose();
    try {
      if (item == "resource") {
        const { data } = await ResourceServices.deleteSpThesis(id);
        // handleClose();
        // MessagePopUpCont(`${id} has been deleted successfully.`);
        handleClose();
        window.location = "/manage-resources";
      } else {
        const { data } = await ResourceServices.deleteUser(id);
        handleClose();
        // MessagePopUpCont(`${id} has been deleted successfully.`);
        window.location = "/manage-users";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        IsDeleted(`Failed to delete ${id}`);
        alert(err.response.data.errorMessage); // some reason error message
      }
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
          <Modal.Header closeButton>
            {item == "resource" ? (
              <Modal.Title>Delete Resource?</Modal.Title>
            ) : (
              <Modal.Title>Delete User?</Modal.Title>
            )}
          </Modal.Header>

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
            <Modal.Title>Delete Resource?</Modal.Title>
          ) : (
            [
              item == "user" ? (
                <Modal.Title>Delete User?</Modal.Title>
              ) : (
                <Modal.Title>Remove Account</Modal.Title>
              ),
            ]
          )}
        </Modal.Header>

        {/* Renders according to item.
          If account, else resource/user */}
        <Modal.Body>
          {item == "account" ? (
            <Modal.Body>
              Are you sure you want to remove your account? Removing your
              accounts means dissociating your account from the app.
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
          <Button variant="primary" onClick={handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePopUpCont;
