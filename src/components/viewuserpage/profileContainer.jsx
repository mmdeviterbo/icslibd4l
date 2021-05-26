import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { Button } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { jwtPrivateKey } from "../../config.json";
import { jwtEncryptionKey } from "../../config.json";
import * as jwtEncrypt from "jwt-token-encrypt";
import PersonService from "../../services/personService";
import DeleteAccount from "./deleteAccount";

import "../../styles/userPageStyle.css";

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
    const [user, setUser] = useState(getCurrentToken());
    const [user, setUser] = useState(null);

    const [type, setType] = useState(null);
    const [nick, setNick] = useState(null);

    const [click, setClick] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(faPencilAlt);
    const [style, setStyle] = useState(editButtonDefault);
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        // getCurrentToken();
    }, []);

    // removes JWT token from the browser
    const logout = async () => {
        try {
            localStorage.removeItem(jwtPrivateKey);
            await PersonService.logoutUser(user);
            window.location = "/";
        } catch (err) {}
    };

    const setIcon = (click, buttonStyle, style) => {
        setClick(click);
        setButtonStyle(buttonStyle);
        setBtnStyle(style);
        setDisable(!disable);
    };

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

    const updateNick = async (userInfo) => {
        console.log("i am updating");
        try {
            const { data } = await PersonService.updateNickname(userInfo);
        } catch (err) {}
    };

    const editNickname = (nicknameToken, userInfo) => {
        if (click === false) {
            setIcon(true, faCheck, editButtonConfirm);
        } else if (click === true) {
            setIcon(false, faPencilAlt, editButtonDefault);
            updateNick(nicknameToken);
            updateToken(userInfo);
        }
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

    useEffect(() => {
        setUser({
            ...user,
            nickname: nick,
        });
        console.log(user.nickname);
    }, [nick]);

    useEffect(async () => {
        console.log("do u exist", user);
        console.log(user.googleId);
        try {
            const { data } = await PersonService.readUser(user.googleId);
            setUser2(data);
        } catch (err) {
            console.log(err);
        }
        console.log("user2: ", user2);
    }, []);
    console.log("user2: ", user2);

    return (
        // column for the title bar "Profile Display"
        <Container fixed className="profile-container">
            <Row className="title-bar">
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={8}>
                    <div className="headerText" style={headerText}>
                        Profile Display
                    </div>
                </Col>
                <Col xs={1} className="columns-temp"></Col>
            </Row>

            <Row>
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={4} className="columns-temp">
                    <div class="col-4" className="label-text" style={labelText}>
                        Nickname:
                    </div>
                </Col>
                <Col xs={4} className="columns-temp">
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
                            style={btnStyle}
                            icon={buttonStyle}
                        />
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={4} className="columns-temp">
                    <div class="col-4" className="label-text" style={labelText}>
                        Name:
                    </div>
                </Col>
                <Col xs={4} className="columns-temp">
                    <input
                        disabled={true}
                        type="text"
                        className="text-field"
                        value={user && user.fullName}
                    />
                </Col>
                <Col xs={1} className="columns-temp"></Col>
            </Row>
            <Row>
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={4} className="columns-temp">
                    <div class="col-4" className="label-text" style={labelText}>
                        Classification:
                    </div>
                </Col>
                <Col xs={4} className="columns-temp">
                    <input
                        type="text"
                        disabled={true}
                        className="text-field"
                        value={type}
                        // value={user && user.userType}
                    />
                </Col>
                <Col xs={1} className="columns-temp"></Col>
            </Row>
            <Row>
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={4} className="columns-temp">
                    <div class="col-4" className="label-text" style={labelText}>
                        Email:
                    </div>
                </Col>
                <Col xs={4} className="columns-temp">
                    <input
                        disabled={true}
                        type="text"
                        className="text-field"
                        value={user && user.email}
                    />
                </Col>
                <Col xs={1} className="columns-temp"></Col>
            </Row>
            {/* part for account removal */}
            <Row className="removal-bar">
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={8}>
                    <div
                        className="header-text"
                        style={{ fontWeight: "900", fontSize: "30px" }}>
                        Account Removal
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={8} className="columns-temp">
                    <div style={{ padding: "12px", fontSize: "15px" }}>
                        Removing your accounts means dissociating your account
                        from the app.
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={2} className="columns-temp"></Col>
                <Col xs={8}>
                    <DeleteAccount user={user} />
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

const editButtonDefault = {
    color: "gray",
    // margin: "5px 0 0px 0px",
    width: "20px",
    height: "20px",
};

const editButtonConfirm = {
    color: "#90ee90",
    // margin: "5px 0 0px 0px",
    width: "20px",
    height: "20px",
};