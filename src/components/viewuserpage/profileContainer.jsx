import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { TextField, IconButton, makeStyles, Button } from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";

import { GlobalContext } from "../manageuserpage/userTable";
import { useHistory } from "react-router-dom";
import UserInfo from "./userInfo";
// import DeleteAccount from "./deleteAccount";
import LabelContainer from "./labelContainer";

import "../../styles/userPageStyle.css";

const label = ["Nickname", "Name", "Classificaion", "Email"];

const useStyles = makeStyles({
  paddingTop: "5px",
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function ProfileContainer() {
  const editButtonStyle = useStyles();

  return (
    <Container fixed className="profile-container">
      <Row className="title-bar">
        <Col xs={2}></Col>
        <Col xs={8} className="title-bar">
          <div className="headerText" style={headerText}>
            Profile Display
          </div>
        </Col>
      </Row>
      <br />

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg="Nickname: " />
        </Col>
        <Col xs={1} className="edit-column">
          <IconButton
            aria-label="edit"
            className={editButtonStyle.root}
            disableFocusRipple
            disableRipple>
            <EditIcon />
          </IconButton>
        </Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg="Name: " />
        </Col>

        <Col xs={1} className="columns-temp"></Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg="Classification: " />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>

      <Row style={{ paddingLeft: "0px" }}>
        <Col xs={2}></Col>
        <Col xs={7} className="columns-temp">
          <LabelContainer msg="Email:" />
        </Col>
        <Col xs={1} className="columns-temp"></Col>
      </Row>
    </Container>
  );
}

const headerText = {
  fontWeight: "900",
  fontSize: "35px",
};
