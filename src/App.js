import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Footer from "./components/footer";
import Homepage from "./components/homepage/homepage";
import NavigationBar from "./components/navigationBar";
import Notfound from "./components/notfound";
import personService from "./services/personService";
import ManageResPage from "./components/manageresourcespage/manageresourcespage";
import ManageUser from "./components/manageuserpage/manageuserpage";
import ViewUserPage from "./components/viewuserpage/viewUserPage";
import jwtDecode from "jwt-decode";
import { jwtPrivateKey } from "./config.json";
import About from "./components/about/about";
import "./App.css";

function App() {
    const [user, setUser] = useState(null); //fullname, email, userType (integer)

    const browseRef = useRef(null);
    const latestAcqRef = useRef(null);
    const newsRef = useRef(null);
    const appRef = useRef(null);

    useEffect(() => {
        getCurrentToken();
    }, []);

    // see if there's current user logged in the browser
    const getCurrentToken = () => {
        try {
            const jwt = localStorage.getItem(jwtPrivateKey);
            const userInfo = jwtDecode(jwt);
            setUser(userInfo);
        } catch (err) {}
    };

    // login/register a user
    const loginRegisterUser = async (userInfo) => {
        try {
            const { data } = await personService.loginRegisterUser(userInfo);
            localStorage.setItem(jwtPrivateKey, data);
            window.location = "/home";
        } catch (err) {}
    };

    return (
        <div className="App" ref={appRef}>
            <NavigationBar
                loginRegisterUser={loginRegisterUser}
                browseRef={browseRef}
                user={user}
            />

            <Switch>
                <Route
                    path="/home"
                    render={() => (
                        <Homepage
                            browseRef={browseRef}
                            appRef={appRef}
                            latestAcqRef={latestAcqRef}
                            newsRef={newsRef}
                        />
                    )}
                />

                {/* this route returns component depending on the route */}
                {/* add your new route/path here */}

                {/* <Route path="/view-user/:googleId" component={ViewUser}></Route> */}
                <Route
                    path="/account-setting/"
                    component={ViewUserPage}></Route>
                {/* <Route
          path="/account-setting/"
          render={() => <ViewUserPage user={user} />}></Route> */}
                <Route path="/about" render={() => <About appRef={appRef} />} />
                <Route
                    path="/manage-resources"
                    component={ManageResPage}></Route>
                <Route path="/manage-users" component={ManageUser}></Route>

                <Route path="/about" render={() => <About appRef={appRef} />} />
                <Route path="/home" component={Homepage}></Route>
                <Route exact path="/not-found" component={Notfound}></Route>
                <Redirect exact from="/" to="/home" />
                <Redirect to="/not-found" />
            </Switch>

            <Footer />
        </div>
    );
}

export default App;
