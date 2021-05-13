import { Container, Button } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteAccount() {
  return (
    <Container className="delete-container" style={deleteContainer}>
      <Button
        variant="contained"
        color="secondary"
        className="delete-button"
        startIcon={<DeleteIcon />}
        fontWeight="900">
        Delete Account
      </Button>
    </Container>
  );
}

const deleteContainer = {
  alignItems: "flex-right",
};
