import { Container, Row, Col } from "react-bootstrap/";
import { TextField, IconButton, makeStyles, Button } from "@material-ui/core/";

const LabelText = (props) => (
  <div className="labelText" style={labelText}>
    {props.children}
  </div>
);

export default function LabelContainer() {
  return (
    <Container fluid>
      <Row>
        <Col xs={6} className="columns-temp">
          <LabelText>somasdaeth9ing</LabelText>
        </Col>
        <Col xs={6} className="columns-temp">
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
  fontWeight: "900",
  fontSize: "15px",
};
