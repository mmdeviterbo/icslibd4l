import React, { Component, useState } from 'react'
import Popup from 'reactjs-popup';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
// import { Modal } from '@material-ui/core';
// import 'reactjs-popup/dist/index.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
 
const DeletePopUpCont = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            {/* delete button */}
            <a onClick = {handleShow}>
                <DeleteForeverIcon/>
            </a>

            {/* popup modal */}
            <Modal
                show = {show}
                onHide = {handleClose}
                backdrop = "static"
                keyboard = {false}
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Resource?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this Resource?
                    {/* read resource title and author here */}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Delete</Button>
                </Modal.Footer>

                </Modal>

        </>
    );
};

export default DeletePopUpCont;