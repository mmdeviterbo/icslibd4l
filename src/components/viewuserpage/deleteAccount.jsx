import { Container, Button } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteAccount() {
  return (
    <Container className="delete-container">
      <Button
        variant="contained"
        color="secondary"
        className="deleteButton"
        startIcon={<DeleteIcon />}
        fontWeight="900">
        Delete Account
      </Button>
    </Container>
  );
}
