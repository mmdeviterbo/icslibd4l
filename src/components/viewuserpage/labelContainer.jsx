import React, { useState, useContext, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap/";
import { TextField } from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// component that returns an edit button
const EditNickname = () => {
  const [click, setClick] = useState(false);
  const [style, setStyle] = useState(editButtonDefault);
  const [buttonStyle, setButtonStyle] = useState(faPencilAlt);
  const [disable, setDisable] = useState(false);

  const setIcon = (click, buttonStyle, style) => {
    setClick(click);
    setButtonStyle(buttonStyle);
    setStyle(style);
    setDisable(!disable);
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

export default function LabelContainer({
  msg,
  userinfos,
  isType,
  iseditable,
  disable,
}) {
  const [type, setType] = useState(userinfos);
  const [hasButton, setHasButton] = useState();

  const setButton = (btn) => {
    setHasButton(btn);
  };

  useEffect(() => {
    if (isType) {
      if (userinfos === 1) setType("Admin");
      else if (userinfos === 2) setType("Faculty");
      else if (userinfos === 3) setType("Staff");
      else setType("Student");
    }
    iseditable ? setButton(<EditNickname />) : setButton();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={4} className="columns-temp">
          <div className="labelText" style={labelText}>
            {msg}
          </div>
        </Col>
        <Col xs={7} className="columns-temp">
          <TextField
            // InputLabelProps={{style: {fontSize: 20}}}
            variant="outlined"
            fullWidth="true"
            size="medium"
            disabled="true"
            value={type}
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            style={infoTextField}></TextField>
        </Col>
        <Col xs={1} className="edit-column">
          {hasButton}
        </Col>
      </Row>
    </Container>
  );
}

const infoTextField = {
  fontSize: "15px",
  // background: "black",
  // border: "white",
};

const labelText = {
  verticalAlign: "center",
  paddingTop: "22px",
  fontWeight: "900",
  fontSize: "25px",
};

const editButtonDefault = {
  color: "gray",
  margin: "12px 0 0px -10px",
  width: "20px",
  height: "20px",
};

const editButtonConfirm = {
  color: "#90ee90",
  margin: "12px 0 0px -10px",
  width: "20px",
  height: "20px",
};
