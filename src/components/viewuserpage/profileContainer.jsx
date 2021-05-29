import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, makeStyles } from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";
import { jwtPrivateKey } from "../../config.json";
import { jwtEncryptionKey } from "../../config.json";
import * as jwtEncrypt from "jwt-token-encrypt";
import PersonService from "../../services/personService";
import DeleteAccount from "./deleteAccount";

import "../../styles/userPageStyle.css";

//<summary>
// gets the jwt token from the localStorage and decrypts it to get the infor of
// the logged in user
//</summary>
//<output>
// an object containing the information of the logged in user
//</output>
const getCurrentToken = () => {
    const jwt = localStorage.getItem("icslib-privateKey");
    const encryption = {
        key: jwtEncryptionKey,
        algorithm: "aes-256-cbc",
    };
    const decrypted = jwtEncrypt.readJWT(jwt, encryption, "ICSlibrary");
    const userInfo = decrypted.data;
    return userInfo;
};

//<summary>
// create a container that contains user information.
// user information includes their nickname, full name, classification, and email
//</summary>
//<output>
// A component that contains the information regarding the current user
//</output>
export default function ProfileContainer() {
    const location = useLocation();

    const [user, setUser] = useState(getCurrentToken()); // lazy initializer to immediately get the user state

    const [type, setType] = useState(null);
    const [nick, setNick] = useState(user && user.nickname);

    const [click, setClick] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(faPencilAlt);
    const [btnStyle, setBtnStyle] = useState("gray");
    const [disable, setDisable] = useState(true);

    // handles appearance changing of the edit button
    const setIcon = (click, buttonStyle, style) => {
        setClick(click);
        setButtonStyle(buttonStyle);
        setBtnStyle(style);
        setDisable(!disable);
    };

    // updates the token stored in the local storage after making changes to the nickname
    const updateToken = async (user) => {
        try {
            console.log("updateToken", user);
            localStorage.removeItem(jwtPrivateKey); //remove token from localStorage
            await PersonService.logoutUser(user);

            const { data } = await PersonService.loginRegisterUser(user); //get and store new token
            localStorage.setItem(jwtPrivateKey, data); //set token

            window.location = "/account-setting";
        } catch (err) {}
    };

    // updates the user's nickname in the database
    const updateNick = async (userInfo) => {
        try {
            const { data } = await PersonService.updateNickname(userInfo);
        } catch (err) {}
    };

    // function that handles nickname changing
    const editNickname = (nicknameToken, userInfo) => {
        if (click === false) {
            setIcon(true, faCheck, "#90ee90");
        } else if (click === true) {
            setIcon(false, faPencilAlt, "gray");
            updateNick(nicknameToken);
            updateToken(userInfo);
        }
    };

    const RemoveAccount = (id) => {
        return (
            <Link
                to={{
                    pathname: "/account-setting/remove-account",
                    state: {
                        background: location,
                        id: id,
                        item: "account",
                    },
                }}>
                <Button
                    variant="contained"
                    color="secondary"
                    className="delete-button"
                    startIcon={<DeleteIcon />}
                    fontWeight="900">
                    Remove Account
                </Button>
            </Link>
        );
    };

    // convert userType to its corresponding string representation
    useEffect(() => {
        // console.log(userinfos);
        if (user) {
            if (user.userType === 1) setType("Admin");
            else if (user.userType === 2) setType("Faculty");
            else if (user.userType === 3) setType("Staff");
            else setType("Student");
        }
    }, [user]);

    // updates user state nickname when nick state changes
    useEffect(() => {
        setUser({
            ...user,
            nickname: nick,
        });
    }, [nick]);

    return (
        // column for the title bar "Profile Display"
        <Container fixed className="profile-container">
            <Row className="title-bar">
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={8}>
                    <div className="headerText" style={headerText}>
                        Profile Display
                    </div>
                </Col>
                <Col xs={1} className="grid-columns"></Col>
            </Row>
            {/* nickname section */}
            <Row>
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={4} className="grid-columns">
                    <div className="label-text" style={labelText}>
                        Nickname:
                    </div>
                </Col>
                <Col xs={4} className="grid-columns">
                    <input
                        onChange={(e) => {
                            setNick(e.target.value);
                        }}
                        disabled={disable}
                        type="text"
                        className="text-field"
                        value={nick}
                    />
                </Col>
                <Col xs={1} className="edit-column">
                    <div class="button">
                        <FontAwesomeIcon
                            onClick={() => {
                                editNickname(
                                    {
                                        googleId: user.googleId,
                                        newNickname: user.nickname,
                                    },
                                    user
                                );
                            }}
                            state={click}
                            aria-label="edit"
                            style={{
                                width: "20px",
                                height: "20px",
                                color: `${btnStyle}`,
                            }}
                            icon={buttonStyle}
                        />
                    </div>
                </Col>
            </Row>

            {/* full name section */}
            <Row>
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={4} className="grid-columns">
                    <div className="label-text" style={labelText}>
                        Name:
                    </div>
                </Col>
                <Col xs={4} className="grid-columns">
                    <input
                        disabled={true}
                        type="text"
                        className="text-field"
                        value={user && user.fullName}
                    />
                </Col>
                <Col xs={1} className="grid-columns"></Col>
            </Row>

            {/* user classification section */}
            <Row>
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={4} className="grid-columns">
                    <div className="label-text" style={labelText}>
                        Classification:
                    </div>
                </Col>
                <Col xs={4} className="grid-columns">
                    <input
                        type="text"
                        disabled={true}
                        className="text-field"
                        value={type}
                    />
                </Col>
                <Col xs={1} className="grid-columns"></Col>
            </Row>

            {/* user email section */}
            <Row>
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={4} className="grid-columns">
                    <div className="label-text" style={labelText}>
                        Email:
                    </div>
                </Col>
                <Col xs={4} className="grid-columns">
                    <input
                        disabled={true}
                        type="text"
                        className="text-field"
                        value={user && user.email}
                    />
                </Col>
                <Col xs={1} className="grid-columns"></Col>
            </Row>

            {/* part for account removal */}
            <Row className="removal-bar">
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={8}>
                    <div
                        className="header-text"
                        style={{ fontWeight: "900", fontSize: "30px" }}>
                        Account Removal
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={8} className="grid-columns">
                    <div style={{ padding: "5px", fontSize: "15px" }}>
                        Removing your accounts means dissociating your account
                        from the app.
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={2} className="grid-columns"></Col>
                <Col xs={8}>
                    <RemoveAccount id={user.googleId} />
                </Col>
            </Row>
        </Container>
    );
}

const headerText = {
    fontWeight: "900",
    fontSize: "35px",
};

const labelText = {
    verticalAlign: "center",
    paddingTop: "12px",
    fontWeight: "900",
    fontSize: "25px",
};
