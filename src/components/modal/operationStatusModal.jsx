import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";

const StatusModal = ({
    message,
    name,
    show,
    setShow,
    operation,
    pathAfter,
    // item,
    isSelf,
}) => {
    const history = useHistory();

    const handleClose = () => {
        setShow(false);
        if (pathAfter) {
            // console.log(pathAfter);
            window.location = pathAfter;
        } else {
            history.goBack();
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
                <Modal.Body>
                    {message === "success" ? (
                        <Modal.Title>
                            {isSelf ? "Your account" : name} has been{" "}
                            {operation === "edit" || operation === "add"
                                ? `${operation}ed`
                                : "deleted"}{" "}
                            successfully.
                            {isSelf ? " You will be logged out." : ""}
                        </Modal.Title>
                    ) : (
                        <Modal.Title>
                            Failed to {operation} {name}.
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
