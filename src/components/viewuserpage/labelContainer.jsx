import React, { useState, useContext, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap/";
import { TextField, IconButton, makeStyles, Button } from "@material-ui/core/";

export default function LabelContainer({ msg, value, isType }) {
  const [type, setType] = useState(value);

  useEffect(() => {
    if (isType) {
      if (value === 1) setType("Admin");
      else if (value === 2) setType("Faculty");
      else if (value === 3) setType("Staff");
      else setType("Student");
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={4} className="columns-temp">
          <div className="labelText" style={labelText}>
            {msg}
          </div>
        </Col>
        <Col xs={8} className="columns-temp">
          <TextField
            variant="outlined"
            fullWidth="true"
            size="small"
            disabled="true"
            value={type}
            style={infoTextField}></TextField>
        </Col>
      </Row>
    </Container>
  );
}

const infoTextField = {
  // background: "black",
  // border: "white",
};
const labelText = {
  verticalAlign: "center",
  paddingTop: "12px",
  fontWeight: "900",
  fontSize: "25px",
};
