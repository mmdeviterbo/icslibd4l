import React, { useState, useContext, useEffect } from "react";
import { Container } from "@material-ui/core/";
import userImg from "../../assets/userImage.png";

export default function ImageContainer() {
  return (
    <Container fixed className="image-container" style={usrImgContainer}>
      <img src={userImg} alt="#" style={imgStyle} />
    </Container>
  );
}

const imgStyle = {
  padding: "65px",
};

const usrImgContainer = {
  alignItems: "flex-end",
  justifyContent: "center",
};
