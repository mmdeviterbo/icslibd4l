import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router";

const StatusModal = ({ message, id, show, operation }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    console.log(show);
    console.log("Hello from status modal");
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    // history.goBack();
  };

  return (
    <>
      <Modal
        show={visible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          {message === "success" ? (
            <Modal.Title>
              {id} has been {operation} successfully.
            </Modal.Title>
          ) : (
            <Modal.Title>
              Failed to {operation} {id}.
            </Modal.Title>
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

export default StatusModal;
