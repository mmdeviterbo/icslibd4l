import React, { useState } from "react";
import { Container, Button, Modal, makeStyles } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { jwtPrivateKey } from "../../config.json";
import PersonService from "../../services/personService";
import exportFunctions from "../../services/personService";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function DeleteAccount({ user }) {
    // State of model -> Open if true, closed if false
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteCurrentUser = async () => {
        handleClose();
        try {
            logout();
            await exportFunctions.deleteUser(user);
        } catch (err) {}
    };

    const logout = async () => {
        try {
            localStorage.removeItem(jwtPrivateKey);
            await PersonService.logoutUser(user);
            window.location = "/";
        } catch (err) {}
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 class="remove-account-confimation-title">Remove Account</h2>
            <p class="remove-account-confirmation-description">
                Are you sure you want to remove your account? Removing your
                accounts means dissociating your account from the app.
            </p>
            <div className="confimation-container" style={{ display: "flex" }}>
                <Button
                    onClick={deleteCurrentUser}
                    variant="contained"
                    color="primary"
                    className="confirm-delete-button"
                    startIcon={<CheckIcon />}
                >
                    Confirm
                </Button>

                <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    className="cancel-delete-button"
                    startIcon={<CloseIcon />}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );

    return (
        <Container className="delete-container" style={deleteContainer}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>

            <Button
                onClick={handleOpen}
                variant="contained"
                color="secondary"
                className="delete-button"
                startIcon={<DeleteIcon />}
                fontWeight="900"
            >
                Remove Account
            </Button>
        </Container>
    );
}

const deleteContainer = {
    alignItems: "flex-right",
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
