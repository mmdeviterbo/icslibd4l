import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ResourceServices from "../../services/resourceService";

//  TODO: add documentation
const DeletePopUpCont = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location.state.id;
  const item = location.state.item;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    // history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleClose();
    try {
      if (item == "resource") {
        const { data } = await ResourceServices.deleteSpThesis(id);
        IsDeleted("success");
        handleClose();
        window.location = "/manage-resources";
      } else {
        const { data } = await ResourceServices.deleteUser(id);
        IsDeleted("success");
        // window.location = "/manage-users";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        IsDeleted("fail");
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
        onModalHide={IsDeleted}
      >
        <Modal.Header closeButton>
          {item == "resource" ? (
            <Modal.Title>Delete Resource?</Modal.Title>
          ) : (
            <Modal.Title>Delete User?</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete {id}?
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
