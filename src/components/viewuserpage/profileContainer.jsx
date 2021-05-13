import React, { useState, useContext, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Box, Grid, Paper, Typography, ButtonBase } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../manageuserpage/userTable";
import { useHistory } from "react-router-dom";
import UserInfo from "./userInfo";
// import DeleteAccount from "./deleteAccount";
import ImageContainer from "./imageContainer";

const HeaderText = (props) => (
  <div className="headerText" style={headerText}>
    {props.children}
  </div>
);

export default function ProfileContainer() {
  return (
    <Container fixed style={userInfoContainerGrid}>
      <Grid
        container
        spacing={3}
        className="user-info-container-grid"
        style={infoGrid}>
        <Grid item xs={12} className="info-header" style={infoTopNav}>
          <HeaderText>Profile Display</HeaderText>
        </Grid>
        <Grid item xs={4} className="image-container" style={imageContainer}>
          <ImageContainer />
        </Grid>
        <Grid item xs={8}>
          <UserInfo />
        </Grid>
        <Grid item xs={12}>
          {/* <DeleteAccount /> */}
        </Grid>
      </Grid>
    </Container>
  );
}

const userInfoContainerGrid = {
  // backgroundColor: "#cfe8f0", //temp[orary]
  justifyContent: "center",
  alignItems: "center",
};

const infoGrid = {
  padding: "10px",
  margin: "auto",
  maxWidth: "sm",
  height: "auto",
  flexGrow: 1,
  // height: "100vh", //temp
  // border: "1px solid black",
};

const infoTopNav = {
  padding: "25px",
  height: "75px",
  // backgroundColor: "white", //temp[orary]
};

const imageContainer = {
  // backgroundColor: "white", //temp[orary]
};

const headerText = {
  fontWeight: "900",
  fontSize: "35px",
};
