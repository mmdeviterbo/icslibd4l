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

const label = ["Nickname", "Name", "Classificaion", "Email"];

const EditNickname = () => {
  const [click, setClick] = useState(false);
  const [style, setStyle] = useState(editButtonDefault);
  const [buttonStyle, setButtonStyle] = useState(faPencilAlt);

  const setIcon = (click, buttonStyle, style) => {
    setClick(click);
    setButtonStyle(buttonStyle);
    setStyle(style);
  };

  return (
    <FontAwesomeIcon
      onClick={() =>
        click === false
          ? setIcon(true, faCheck, editButtonConfirm)
          : setIcon(false, faPencilAlt, editButtonDefault)
      }
      state={click}
      aria-label="edit"
      style={style}
      icon={buttonStyle}
    />
  );
};

export default function ProfileContainer({ user }) {
  const logout = async () => {
    try {
      localStorage.removeItem(jwtPrivateKey);
      await PersonService.logoutUser(user);
      window.location = "/";
    } catch (err) {}
  };

  return (
    <Container fixed className="profile-container">
      <Row className="title-bar">
        <Col xs={2}></Col>
        <Col xs={8}>
          <div className="headerText" style={headerText}>
            Profile Display
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg={"Nickname: "} value={user.nickname} />
        </Col>
        <Col xs={1} className="edit-column">
          <EditNickname />
        </Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg={"Name: "} value={user.fullName} />
        </Col>

        <Col xs={1} className="columns-temp"></Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer
            msg={"Classification: "}
            value={user.userType}
            isType={true}
          />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg={"Email: "} value={user.email} />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>

      <Row className="removal-bar">
        <Col xs={2}></Col>
        <Col xs={8}>
          <div
            className="headerText"
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
          {/* 

BACKLOG: 
- MODAL OR POP-UP TO WARN USER ABOUT DISSOCIATION
- ACCOUNT DISSOCIATION (FROM BACKEND(?))

 */}
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
  margin: "12px 0 0px -20px",
  width: "20px",
  height: "20px",
};

const editButtonConfirm = {
  color: "#90ee90",
  margin: "12px 0 0px -20px",
  width: "20px",
  height: "20px",
};
