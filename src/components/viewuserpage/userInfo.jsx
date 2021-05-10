import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  IconButton,
  makeStyles,
} from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import WithStyles from "@material-ui/styles";
import "../../styles/userPageStyle.css";

const LabelText = (props) => (
  <div className="labelText" style={labelText}>
    {props.children}
  </div>
);

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function UserInfo() {
  const editButtonStyle = useStyles();
  return (
    <Container>
      <Box display="flex" flexDirection="row" className="infoContainer">
        <Box display="flex" flexDirection="column" className="labelContainer">
          <LabelText>Nickname: </LabelText>
          <LabelText>Name: </LabelText>
          <LabelText>Classification: </LabelText>
          <LabelText>Email: </LabelText>
        </Box>
        <Box display="flex" flexDirection="column" className="fieldContainer">
          <Box display="flex">
            <TextField
              variant="outlined"
              className="nicknameField"
              style={infoTextField}></TextField>
            <IconButton
              aria-label="edit"
              className={editButtonStyle.root}
              disableFocusRipple
              disableRipple>
              <EditIcon />
            </IconButton>
          </Box>
          <TextField
            variant="outlined"
            className="NameField"
            disabled="true"
            value="Name M.I. Surname"
            style={infoTextField}></TextField>
          <TextField
            variant="outlined"
            className="categoryField"
            disabled="true"
            value="Student"
            style={infoTextField}></TextField>
          <TextField
            variant="outlined"
            className="emailField"
            disabled="true"
            value="nmsurname@up.edu.ph"
            style={infoTextField}></TextField>
        </Box>
      </Box>
    </Container>
  );
}

const labelText = {
  fontWeight: "black",
  fontSize: "25px",
  margin: "25px",
};

const infoTextField = {
  background: "white",
  marginTop: "25px",
  marginBottom: "25px",
  marginLeft: "25px",
  fontSize: "26px",
};
