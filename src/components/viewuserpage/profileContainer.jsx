import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { Button } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { jwtPrivateKey } from "../../config.json";
import jwtDecode from "jwt-decode";
import PersonService from "../../services/personService";
import DeleteAccount from "./deleteAccount"

import "../../styles/userPageStyle.css";

export default function ProfileContainer() {
    const [user, setUser] = useState(null);

    const [type, setType] = useState(null);
    const [nick, setNick] = useState(null);

    const [click, setClick] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(faPencilAlt);
    const [style, setStyle] = useState(editButtonDefault);
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        getCurrentToken();
    }, []);

    // removes JWT token from the browser
    const logout = async () => {
        try {
            localStorage.removeItem(jwtPrivateKey);
            await PersonService.logoutUser(user);
            window.location = "/";
        } catch (err) {}
    };

    const getCurrentToken = () => {
        try {
            const jwt = localStorage.getItem(jwtPrivateKey);
            const userInfo = jwtDecode(jwt);
            setUser(userInfo);
            setNick(userInfo && userInfo.nickname);
            setType(userInfo && userInfo.userType);
        } catch (err) {}
    };

    const setIcon = (click, buttonStyle, style) => {
        setClick(click);
        setButtonStyle(buttonStyle);
        setStyle(style);
        setDisable(!disable);
    };

    const editNickname = () => {
        !click
            ? setIcon(true, faCheck, editButtonConfirm)
            : setIcon(false, faPencilAlt, editButtonDefault);
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
                        onChange={(e) => setNick(e.target.value)}
                        disabled={disable}
                        type="text"
                        className="text-field"
                        value={nick}
                    />
                </Col>
                <Col xs={1} className="edit-column">
                    <div class="button">
                        <FontAwesomeIcon
                            onClick={editNickname}
                            state={click}
                            aria-label="edit"
                            style={style}
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
                    <DeleteAccount user={user}/>
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
