import { Container, Row, Col } from "react-bootstrap/";
import { TextField, IconButton, makeStyles, Button } from "@material-ui/core/";

export default function LabelContainer(props) {
  return (
    <Container fluid>
      <Row>
        <Col xs={4} className="columns-temp">
          <div className="labelText" style={labelText}>
            {props.msg}
          </div>
        </Col>
        <Col xs={8} className="columns-temp">
          <TextField
            variant="outlined"
            fullWidth="true"
            size="small"
            disabled="true"
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
