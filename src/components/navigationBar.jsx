import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";
import { gsap } from "gsap";
import { jwtPrivateKey } from "../config.json";
import PersonService from "../services/personService";
import ResourceService from "../services/resourceService";
import logo from '../assets/mainlogo/icslibd4l.png';
import "../styles/homepageStyle.css";


// the entire navigation bar
export default function NavigationBar({
    loginRegisterUser,
    browseRef,
    user,
    appRef,
}) {
    const [classNavBar, setClassNavBar] = useState("navbar-container");
    const history = useHistory();

    useEffect(() => {
        animationTitle(classNavBar);
    }, [classNavBar]);

    // if not found (404), hide the navbar component
    useEffect(() => {
        return history.listen((location) => {
            if (["/not-found", "/unauthorized"].includes(location.pathname))
                setClassNavBar("navbar-container-none");
            else setClassNavBar("navbar-container");
        });
    }, [history]);

    useEffect(() => {
        if (["/not-found", "/unauthorized"].includes(window.location.pathname))
            setClassNavBar("navbar-container-none");
        else setClassNavBar("navbar-container");
    }, [classNavBar]);

    const responseGoogleSuccess = (response) => {
        const { googleId, email, name, familyName } = response.profileObj;
        const userInfo = {
            googleId: googleId,
            email: email,
            fullName: name,
            surname: familyName,
        };
        loginRegisterUser(userInfo);
    };
    const responseGoogleFail = (response) => {};

    const scrollToBrowse = () => {
        if (window.location.pathname === "/home")
            browseRef.current &&
                browseRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        else if (
            [
                "/browse-books",
                "/browse-special-problems",
                "/browse-theses",
            ].includes(window.location.pathname)
        ) {
            appRef.current &&
                appRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        } else history.push("/browse-special-problems");
    };
    const logInButton = () => {
        return (
            <GoogleLogin
                clientId="157703212486-qm8nb25m86guqvsg4fhbtc9kl3sk6ubp.apps.googleusercontent.com"
                clientSecret="u06bcQiePSj-3fbkdTxS0VUd"
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFail}
                cookiePolicy={"single_host_origin"}
                className="login-link"
                hostedDomain={"up.edu.ph"}
                icon={false}>
                <i className="fa fa-lg fa-sign-in mr-2" />
                <span className="login-link-label">Login</span>
            </GoogleLogin>
        );
    };
    const profileDisplay = () => {
        return <SearchFilter user={user} />;
    };

    return (
        <div className={classNavBar}>
            <div style={mainBgStyleContainer} />
            <ul className="navbar-elements">
                <Link className="left-half" to="/home">
                    <div style={logoContainer}>
                        <img src={logo} alt="#" style={logoStyle}/>
                    </div>
                    <p style={{letterSpacing:"2px"}}>Analytica</p>
                </Link>
                <div className="right-half">
                    <Link to="/home" className="navItem">
                        <i
                            className="fa fa-lg fa-home mr-2"
                            aria-hidden="true"
                        />
                        Home
                    </Link>
                    <Link to="/browse-special-problems"
                        className="navItem">
                        <i
                            className="fa fa-lg fa-search mr-2"
                            aria-hidden="true"
                        />
                        Browse
                    </Link>
                    <Link to="/about" className="navItem">
                        <i
                            className="fa fa-lg fa-info-circle mr-2"
                            aria-hidden="true"
                        />
                        About
                    </Link>
                    <div className="login-link">
                        {(user && profileDisplay()) || logInButton()}
                    </div>
                </div>
            </ul>
        </div>
    );
}

// login dropdown menu (in navigation bar)
const SearchFilter = ({ user }) => {
    const history = useHistory();

    const logout = async () => {
        try {
            await PersonService.logoutUser(user);
            localStorage.removeItem(jwtPrivateKey);
            if (
                [
                    "/manage-users",
                    "/manage-resources",
                    "/view-activitylogs",
                    "/view-summaryreport",
                ].includes(window.location.pathname)
            )
                window.location = "/home";
            else window.location = window.location.pathname;
        } catch (err) {}
    };

    const trigger = (
        <span>
            <Icon className="user" />
            {user && user.fullName && user.fullName.split(" ")[0]}
            {/* {user && user.nickname} */}
        </span>
    );

    const optionsNotAdmin = [
        {
            key: "user",
            text: (
                <span>
                    {" "}
                    Signed in as <strong>{user.fullName}</strong>
                </span>
            ),
            disabled: true,
        },
        {
            key: "accountSettings",
            text: (
                <span>
                    <i
                        className="fa fa-lg fa-cog mr-3 ml-2"
                        aria-hidden="true"
                    />
                    Account Settings
                </span>
            ),
            value: "Account Settings",
            onClick: () => history.push("/account-setting"),
        },
    ];

    const options = [
        {
            key: "manageU",
            text: (
                <span>
                    <i className="fa fa-lg fa-users mr-3 ml-2" />
                    Manage Users
                </span>
            ),
            value: "Manage Users",
            onClick: () => history.push("/manage-users"),
        },
        {
            key: "manageR",
            text: (
                <span>
                    <i className="fa fa-lg fa-sitemap mr-3 ml-2" />
                    Manage Resources
                </span>
            ),
            value: "Manage Resources",
            onClick: () => history.push("/manage-resources"),
        },
        {
            key: "viewActivityLogs",
            text: (
                <span>
                    <i className="fa fa-lg fa-list mr-3 ml-2" />
                    View Activity Logs
                </span>
            ),
            value: "View Activity Logs",
            onClick: () => history.push("/view-activitylogs"),
        },
        {
            key: "viewSummaryReports",
            text: (
                <span>
                    <i className="fa fa-lg fa-print mr-3 ml-2" />
                    View Summary Report
                </span>
            ),
            value: "View Summary Report",
            onClick: () => {
                const generateSummary = async () => {
                    try {
                        await ResourceService.generateReport("all");
                        console.log("Generating");
                    } catch (error) {}
                };
                generateSummary();
                history.push("/view-summaryreport");
            },
        },
        {
            key: "sign-out",
            text: (
                <span>
                    <i className="fa fa-lg fa-sign-out mr-3 ml-2" />
                    Sign Out
                </span>
            ),
            value: "Sign out",
            onClick: logout,
        },
    ];
    return (
        <Dropdown
            trigger={trigger}
            options={
                user.userType === 1
                    ? optionsNotAdmin.concat(options)
                    : optionsNotAdmin.concat(options[options.length - 1])
            }
        />
    );
};

const logoContainer = {
    height:"80%",
    marginRight:"1%"
}

const logoStyle = {
    height:"90%",
}

const mainBgStyleContainer = {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
    overflowX: "hidden",
    overflowY: "visible",
};

const animationTitle = (classNavBar) => {
    let tempClassName = "." + classNavBar;
    gsap.from(tempClassName, { yPercent: -50, duration: 0.8 });
};
