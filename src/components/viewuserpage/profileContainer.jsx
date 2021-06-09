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
    <Container fixed className="profile-container">
      <Row className="title-bar">
        <Col xs={2}></Col>
        <Col xs={8}>
          <div className="headerText" style={headerText}>
            Profile Display
          </div>
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="columns-temp">
          <LabelContainer
            msg={"Nickname: "}
            userinfos={user.nickname}
            iseditable={true}
          />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="columns-temp">
          <LabelContainer msg={"Name: "} userinfos={user.fullName} />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="columns-temp">
          <LabelContainer
            msg={"Classification: "}
            userinfos={user.userType}
            isType={true}
          />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="columns-temp">
          <LabelContainer msg={"Email: "} userinfos={user.email} />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>
      {/* part for account removal */}
      <Row className="removal-bar">
        <Col xs={2}></Col>
        <Col xs={8}>
          <div
            className="header-text"
            style={{ fontWeight: "900", fontSize: "30px" }}>
            Account Removal
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="columns-temp">
          <div style={{ padding: "12px", fontSize: "15px" }}>
            Removing your accounts means dissociating your account from the app.
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          {/* BACKLOG: 
        - MODAL OR POP-UP TO WARN USER ABOUT DISSOCIATION
        - ACCOUNT DISSOCIATION (FROM BACKEND(?)) */}
          <Button
            onClick={logout}
            variant="contained"
            color="secondary"
            className="delete-button"
            style={{ paddingLeft: "10px" }}
            startIcon={<DeleteIcon />}
            fontWeight="900">
            Remove Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

const headerText = {
  fontWeight: "900",
  fontSize: "35px",
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
