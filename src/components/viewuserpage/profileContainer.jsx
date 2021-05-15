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

const HeaderText = (props) => (
  <div className="headerText" style={headerText}>
    {props.children}
  </div>
);

const LabelText = (props) => (
  <div className="labelText" style={labelText}>
    {props.children}
  </div>
);

const label = ["Nickname", "Name", "Classificaion", "Email"];

const useStyles = makeStyles({
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
          <HeaderText>Profile Display</HeaderText>
        </Col>
      </Row>

      <Row className="label-container">
        <Col xs={2}></Col>
        <Col xs={6} className="columns-temp">
          <LabelContainer />
        </Col>
        <Col xs={2} className="columns-temp">
          <IconButton
            aria-label="edit"
            className={editButtonStyle.root}
            disableFocusRipple
            disableRipple>
            <EditIcon />
          </IconButton>
        </Col>
      </Row>

      <Row className="label-container">
        <Col xs={2}></Col>
        <Col xs={6} className="columns-temp">
          <LabelContainer />
        </Col>

        <Col xs={2} className="columns-temp"></Col>
      </Row>

      <Row className="label-container">
        <Col xs={2}></Col>
        <Col xs={6} className="columns-temp">
          <LabelContainer />
        </Col>
        <Col xs={2} className="columns-temp"></Col>
      </Row>

      <Row className="label-container">
        <Col xs={2}></Col>
        <Col xs={6} className="columns-temp">
          <LabelContainer />
        </Col>
        <Col xs={2} className="columns-temp"></Col>
      </Row>
    </Container>
  );
}

const headerText = {
  fontWeight: "900",
  fontSize: "25px",
};

const labelText = {
  fontWeight: "900",
  fontSize: "15px",
};

const infoTextField = {
  // background: "black",
  // border: "white",
};
