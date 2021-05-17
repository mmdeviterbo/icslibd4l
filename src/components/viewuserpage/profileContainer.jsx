import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { Button } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import { jwtPrivateKey } from "../../config.json";
import PersonService from "../../services/personService";

// import { GlobalContext } from "../manageuserpage/userTable";
import { useHistory } from "react-router-dom";
import LabelContainer from "./labelContainer";

import "../../styles/userPageStyle.css";

export default function ProfileContainer({ user }) {
    useEffect(() => {
        const nickname = {};
        console.log(user);
    }, []);

    // removes JWT token from the browser
    const logout = async () => {
        try {
            localStorage.removeItem(jwtPrivateKey);
            await PersonService.logoutUser(user);
            window.location = "/";
        } catch (err) {}
    };

    return (
        // column for the title bar "Profile Display"
        <div class="container" className="profile-container">
            <div class="row" className="title-bar">
                <div class="col" l className="header-text" style={headerText}>
                    Profile Display
                </div>
            </div>
            <div class="row">
                <div class="col-4" className="label-text" style={labelText}>
                    Nickname:
                </div>
                <div class="col-4" className="text-field-container">
                    <input
                        className="text-field"
                        value={user && user.nickname}
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4" className="label-text" style={labelText}>
                    Name:
                </div>
                <div class="col-4" className="text-field-container">
                    <input
                        className="text-field"
                        value={user && user.fullName}
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4" className="label-text" style={labelText}>
                    Classification:
                </div>
                <div class="col-4" className="text-field-container">
                    <input
                        className="text-field"
                        value={user && user.userType}
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4" className="label-text" style={labelText}>
                    Email:
                </div>
                <div class="col-4" className="text-field-container">
                    <input className="text-field" value={user && user.email} />
                </div>
            </div>
            <div class="row">
                <div class="col" className="label-text" style={labelText}></div>
            </div>
        </div>

        // <Container fixed className="profile-container">
        //   <Row className="title-bar">
        //     <Col xs={2}></Col>
        //     <Col xs={8}>
        //       <div className="headerText" style={headerText}>
        //         Profile Display
        //       </div>
        //     </Col>
        //     <Col xs={1} className="columns-temp"></Col>
        //   </Row>
        //   <Row>
        //     <Col xs={2}></Col>
        //     <Col xs={8} className="columns-temp">
        //       <input
        //         value={user && user.nickname}
        //       />
        //       <LabelContainer
        //         msg={"Nickname: "}
        //         // access mo 'to sa database
        //         userinfos={user && user.nickname}
        //         // userinfos={user}
        //         iseditable={true}
        //         // whatInfo={"nickname"}
        //       />
        //     </Col>
        //     <Col xs={1} className="columns-temp"></Col>
        //   </Row>
        //   <Row>
        //     <Col xs={2}></Col>
        //     <Col xs={8} className="columns-temp">
        //       <LabelContainer msg={"Name: "} userinfos={user && user.fullName} />
        //     </Col>
        //     <Col xs={1} className="columns-temp"></Col>
        //   </Row>
        //   <Row>
        //     <Col xs={2}></Col>
        //     <Col xs={8} className="columns-temp">
        //       <LabelContainer
        //         msg={"Classification: "}
        //         userinfos={user && user.userType}
        //         isType={true}
        //       />
        //     </Col>
        //     <Col xs={1} className="columns-temp"></Col>
        //   </Row>
        //   <Row>
        //     <Col xs={2}></Col>
        //     <Col xs={8} className="columns-temp">
        //       <LabelContainer msg={"Email: "} userinfos={user && user.email} />
        //     </Col>
        //     <Col xs={1} className="columns-temp"></Col>
        //   </Row>
        //   {/* part for account removal */}
        //   <Row className="removal-bar">
        //     <Col xs={2}></Col>
        //     <Col xs={8}>
        //       <div
        //         className="header-text"
        //         style={{ fontWeight: "900", fontSize: "30px" }}>
        //         Account Removal
        //       </div>
        //     </Col>
        //   </Row>
        //   <Row>
        //     <Col xs={2}></Col>
        //     <Col xs={8} className="columns-temp">
        //       <div style={{ padding: "12px", fontSize: "15px" }}>
        //         Removing your accounts means dissociating your account from the app.
        //       </div>
        //     </Col>
        //   </Row>
        //   <Row>
        //     <Col xs={2}></Col>
        //     <Col xs={8}>
        //       {/* BACKLOG:
        //     - MODAL OR POP-UP TO WARN USER ABOUT DISSOCIATION
        //     - ACCOUNT DISSOCIATION (FROM BACKEND(?)) */}
        //       <Button
        //         onClick={logout}
        //         variant="contained"
        //         color="secondary"
        //         className="delete-button"
        //         style={{ paddingLeft: "10px" }}
        //         startIcon={<DeleteIcon />}
        //         fontWeight="900">
        //         Remove Account
        //       </Button>
        //     </Col>
        //   </Row>
        // </Container>
    );
}

const headerText = {
    fontWeight: "900",
    fontSize: "35px",
};

const labelText = {
    verticalAlign: "center",
    // paddingTop: "22px",
    fontWeight: "900",
    fontSize: "25px",
};

const editButtonDefault = {
    color: "gray",
    margin: "24px 0 0px -30px",
    width: "20px",
    height: "20px",
};

const editButtonConfirm = {
    color: "#90ee90",
    margin: "24px 0 0px -30px",
    width: "20px",
    height: "20px",
};
