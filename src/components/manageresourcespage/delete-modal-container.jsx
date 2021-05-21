import React, { Component, useState } from 'react'
import { Link, useLocation, useHistory, withRouter } from "react-router-dom";
import Popup from 'reactjs-popup';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
// import { Modal } from '@material-ui/core';
// import 'reactjs-popup/dist/index.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ResourceServices from '../../services/resourceService'
 
const DeletePopUpCont = (props) => {
    const history = useHistory();
    const [show, setShow] = useState(true);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        // history.goBack();
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const {resourceId} = await ResourceServices.deleteSpThesis(props.id)
            handleClose()
            alert("Delete successful")
        } catch(err){
            if (err.response && err.response.data) {
                alert(err.response.data.errorMessage) // some reason error message
            }
        }
    }

    return(
        <>
            {/* delete button */}
            {/* <a onClick = {handleShow}>
                <DeleteForeverIcon/>

            </a> */}

            {/* popup modal */}
            <Modal
                show = {show}
                onHide = {handleClose}
                backdrop = "static"
                keyboard = {false}
                onRequestClose = {() => setShow(false)}
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Resource?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete {props.id}?
                    {/* read resource title and author here */}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Delete</Button>
                </Modal.Footer>

                </Modal>

        </>
    );
};

export default DeletePopUpCont;