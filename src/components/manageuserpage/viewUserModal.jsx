import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap/";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// import { Container } from "@material-ui/core";

export default function ViewUserModal() {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        // history.goBack();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Display</Modal.Title>
                </Modal.Header>

                <Modal.Body className="show-grid">
                    <Container>
                        {/* nickname section */}
                        <Row>
                            <Col xs={2} className="grid-columns"></Col>
                            <Col xs={4} className="grid-columns">
                                <div class="col-4" className="label-text">
                                    Nickname:
                                </div>
                            </Col>
                            <Col xs={4} className="grid-columns">
                                <input
                                    disabled={true}
                                    type="text"
                                    className="text-field"
                                    value={"nickname"}
                                />
                            </Col>
                            <Col xs={1} className="edit-column"></Col>
                        </Row>
                        {/* full name section */}
                        <Row>
                            <Col xs={2} className="grid-columns"></Col>
                            <Col xs={4} className="grid-columns">
                                <div class="col-4" className="label-text">
                                    Name:
                                </div>
                            </Col>
                            <Col xs={4} className="grid-columns">
                                <input
                                    disabled={true}
                                    type="text"
                                    className="text-field"
                                    value={"fullName"}
                                />
                            </Col>
                            <Col xs={1} className="grid-columns"></Col>
                        </Row>

                        {/* user classification section */}
                        <Row>
                            <Col xs={2} className="grid-columns"></Col>
                            <Col xs={4} className="grid-columns">
                                <div class="col-4" className="label-text">
                                    Classification:
                                </div>
                            </Col>
                            <Col xs={4} className="grid-columns">
                                <input
                                    type="text"
                                    disabled={true}
                                    className="text-field"
                                    value={"classification"}
                                />
                            </Col>
                            <Col xs={1} className="grid-columns">
                                <span>edit</span>
                            </Col>
                        </Row>

                        {/* user email section */}
                        <Row>
                            <Col xs={2} className="grid-columns"></Col>
                            <Col xs={4} className="grid-columns">
                                <div class="col-4" className="label-text">
                                    Email:
                                </div>
                            </Col>
                            <Col xs={4} className="grid-columns">
                                <input
                                    disabled={true}
                                    type="text"
                                    className="text-field"
                                    value={"email"}
                                />
                            </Col>
                            <Col xs={1} className="grid-columns"></Col>
                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
