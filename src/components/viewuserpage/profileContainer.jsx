import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtPrivateKey } from "../../config.json";
import { jwtEncryptionKey } from "../../config.json";
import * as jwtEncrypt from "jwt-token-encrypt";
import PersonService from "../../services/personService";
import ToastNotification from "../toastNotification";
import "../../styles/profileContainerStyle.css";

/****************************************************
 * Type: Function
 *
 * Summary:
 * a function gets the jwt token from the localStorage and decrypts it to get the information
 * of the logged in user
 *
 * Return value:
 * userInfo = {
 *      userInfo.googleId,
 *      userInfo.nickname,
 *      userInfo.fullName,
 *      userInfo.userType,
 *      userInfo.email
 * }
 * - object that contains the information of the logged in user
 *
 ******************************************************/
const getCurrentToken = () => {
    try {
        const jwt = localStorage.getItem("icslib-privateKey");
        const encryption = {
            key: jwtEncryptionKey,
            algorithm: "aes-256-cbc",
        };
        const decrypted = jwtEncrypt.readJWT(jwt, encryption, "ICSlibrary");
        const userInfo = decrypted.data;
        return userInfo;
    } catch (err) {}
};

/******************************************************
 * Type: React Functional Component
 *
 * Summary:
 * A component that displays the information of the logged in user.
 * The user can:
 *      - edit their display name which will be reflected to the states and the database
 *      - remove their account from the database
 *
 ******************************************************/
export default function ProfileContainer() {
    const [user, setUser] = useState(getCurrentToken()); // lazy initializer to immediately get the user state
    const [type, setType] = useState();
    const [isEditing, setEditing] = useState(false);
    const [nick, setNick] = useState(user && user.nickname);
    const [currNick, setCurrNick] = useState(user && user.nickname);
    const [click, setClick] = useState("false");
    const [disable, setDisable] = useState(true);

    const location = useLocation();
    const inputRef = useRef();

    // handles appearance changing of the edit button
    const setIcon = (click, isEditing, disable) => {
        setClick(click);
        setDisable(disable);
        setEditing(!isEditing);
    };

    // updates the token stored in the local storage after making changes to the nickname
    const updateToken = async (user) => {
        try {
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
            await PersonService.updateNickname(userInfo);
        } catch (err) {}
    };

    // function that handles nickname changing
    const editNickname = (nicknameToken, userInfo) => {
        if (click === "false") {
            setIcon("true", false, isEditing);
            setCurrNick(nick);
        } else if (click === "true") {
            setIcon("false", true, isEditing);
            updateNick(nicknameToken);
            updateToken(userInfo);
            setCurrNick(nick);
        }
    };

    // handles clear changes
    const clearChanges = () => {
        setNick(currNick);
        setIcon("false", true, isEditing);
    };

    // function that renders the toast notification for improper nickname length
    const renderToast = (message) => {
        return ToastNotification({
            content: message,
        });
    };

    // focus nickname field on click
    useEffect(() => {
        if (isEditing) inputRef.current.focus();
    }, [isEditing]);

    // functional component that renders a remove account button and redirects to a modal
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
                <div className="remove-account-button-container">
                    <button
                        className="remove-account-button"
                        onContextMenu={(e) => {
                            e.preventDefault();
                        }}
                        onAuxClick={(e) => {
                            e.preventDefault();
                        }}>
                        Remove Account
                    </button>
                </div>
            </Link>
        );
    };

    // convert userType to its corresponding string representation
    useEffect(() => {
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

    // layout code
    return (
        // column for the title bar "Profile Display"
        <div className="profile-container">
            <div className="info-container">
                {/* nickname section */}
                <div className="grid-row">
                    <div className="label-container">DISPLAY NAME</div>
                    <div className="field-container">
                        <input
                            onChange={(e) => {
                                setNick(e.target.value);
                            }}
                            disabled={disable}
                            ref={inputRef}
                            type="text"
                            size="60"
                            className="text-field field-nickname"
                            value={user ? nick : ""}
                        />
                        <div className="button-container">
                            {click === "true" ? (
                                <>
                                    <i
                                        className="nick-icon fa fa-save"
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                        }}
                                        onClick={() => {
                                            if (nick === currNick) {
                                                clearChanges();
                                            } else {
                                                if (
                                                    nick === user.fullName ||
                                                    (nick.length > 2 &&
                                                        nick.length < 10)
                                                ) {
                                                    editNickname(
                                                        {
                                                            googleId:
                                                                user.googleId,
                                                            newNickname:
                                                                user.nickname,
                                                        },
                                                        user
                                                    );
                                                } else {
                                                    if (
                                                        nick !== user.fullName
                                                    ) {
                                                        if (nick.length < 3) {
                                                            renderToast(
                                                                "Nickname length must be greater than two (2). "
                                                            );
                                                        } else if (
                                                            nick.length > 9
                                                        ) {
                                                            renderToast(
                                                                "Nickname length must be less than ten (10). "
                                                            );
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                        aria-label="edit"
                                        style={{
                                            color: "gray",
                                        }}></i>
                                    <i
                                        className="nick-icon fa fa-times"
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                        }}
                                        onClick={() => {
                                            clearChanges();
                                        }}
                                        style={{
                                            color: "red",
                                        }}></i>
                                </>
                            ) : (
                                <>
                                    <i
                                        className="nick-icon fa fa-pencil"
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                        }}
                                        onClick={() => {
                                            editNickname(
                                                {
                                                    googleId: user.googleId,
                                                    newNickname: user.nickname,
                                                },
                                                user
                                            );
                                        }}
                                        aria-label="edit"
                                        style={{
                                            color: "gray",
                                        }}></i>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* full name section */}
                <div className="grid-row">
                    <div className="label-container">NAME</div>
                    <div className="field-container">
                        <input
                            disabled={true}
                            type="text"
                            className="text-field"
                            defaultValue={user && user.fullName}
                        />
                        <div className="button-container"></div>
                    </div>
                </div>

                {/* user classification section */}
                <div className="grid-row">
                    <div className="label-container">USER TYPE</div>

                    <div className="field-container">
                        <input
                            type="text"
                            disabled={true}
                            className="text-field"
                            defaultValue={user ? type : ""}
                        />
                        <div className="button-container"></div>
                    </div>
                </div>

                {/* user email section */}
                <div className="grid-row">
                    <div className="label-container">EMAIL</div>

                    <div className="field-container">
                        <input
                            disabled={true}
                            type="text"
                            className="text-field"
                            defaultValue={user && user.email}
                        />
                        <div className="button-container"></div>
                    </div>
                </div>
            </div>
            <div
                className="divider"
                style={{
                    borderLeft: "2px solid #c5c5c5",
                    height: "100%",
                    // left: "50%",
                }}></div>

            {/* part for account removal */}
            <div className="remove-account-container">
                <span>Account Removal</span>
                <p>
                    Removing your accounts means dissociating your account from
                    the app.
                </p>
                <p>
                    You can still login using your UP mail but all changes made
                    to your account will be set to default.
                </p>
                <div>
                    <RemoveAccount id={user && user.googleId} user={user} />
                </div>
            </div>
        </div>
    );
}
