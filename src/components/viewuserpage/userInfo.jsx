import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Container,
  TextField,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../styles/userPageStyle.css";

const LabelText = (props) => (
  <div className="labelText" style={labelText}>
    {props.children}
  </div>
);

const useStyles = makeStyles({
  root: {
    paddingTop: "40px",
    paddingLeft: "10px",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

export default function UserInfo() {
  const editButtonStyle = useStyles();
  return (
    <Container>
      <Grid container spacing={4} className="field-container">
        <Grid item xs={5}>
          <Container className="label-container">
            <LabelText>Nickname: </LabelText>
          </Container>
          <Container className="label-container">
            <LabelText>Name: </LabelText>
          </Container>
          <Container className="label-container">
            <LabelText>Classification: </LabelText>
          </Container>
          <Container className="label-container">
            <LabelText>Email: </LabelText>
          </Container>
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            fullWidth="true"
            style={infoTextField}></TextField>
          <TextField
            variant="outlined"
            fullWidth="true"
            disabled="true"
            value="Name M.I. Surname"
            style={infoTextField}></TextField>
          <TextField
            variant="outlined"
            fullWidth="true"
            disabled="true"
            value="Student"
            style={infoTextField}></TextField>
          <TextField
            variant="outlined"
            fullWidth="true"
            disabled="true"
            value="nmsurname@up.edu.ph"
            style={infoTextField}></TextField>
          <Button
            variant="contained"
            color="secondary"
            className="delete-button"
            style={deleteButton}
            startIcon={<DeleteIcon />}>
            Delete Account
          </Button>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="edit"
            className={editButtonStyle.root}
            disableFocusRipple
            disableRipple>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

const labelText = {
  fontWeight: "900",
  fontSize: "25px",
  marginLeft: "25px",
  marginRight: "25px",
  marginTop: "25px",
  marginBottom: "45px",
};

const infoTextField = {
  background: "white",
  marginTop: "25px",
  marginBottom: "25px",
  marginLeft: "25px",
};

const deleteButton = {
  marginLeft: "70px", //temporary
  fontSize: "15px",
  fontWeight: "bold",
};
