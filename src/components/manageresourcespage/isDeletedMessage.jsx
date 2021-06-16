import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ResourceServices from "../../services/resourceService";

//  TODO: add documentation
const DeleteMessagePopUp = ({ message }) => {
  const history = useHistory();
  const location = useLocation();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

//   console.log(message);
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
          {/* {item == "resource" ? (
            <Modal.Title>Delete Resource?</Modal.Title>
          ) : (
              )} */}
          <Modal.Title>Confirm User?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {message == "success" ? (
            <Modal.Title>Deleted successfully.</Modal.Title>
          ) : (
            <Modal.Title>Failed to delete.</Modal.Title>
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

export default DeleteMessagePopUp;
