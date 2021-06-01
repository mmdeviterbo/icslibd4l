import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

//  TODO: add documentation
const MessagePopUpCont = ({ message, show }) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    history.goBack();
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
        <Modal.Body>{message}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MessagePopUpCont;
