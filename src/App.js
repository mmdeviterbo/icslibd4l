import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtPrivateKey, jwtEncryptionKey } from "./config.json";
import * as jwtEncrypt from "jwt-token-encrypt";
import Footer from "./components/footer";
import Homepage from "./components/homepage/homepage";
import NavigationBar from "./components/navigationBar";
import Notfound from "./components/notfound";
import About from "./components/about/about";

import AddSPThesisPage from "./components/addresourcepage/addSPTPageContainer";
import ReadingSPTContainer from "./components/viewresources/readingSPTContainer";
import EditSPThesisPage from "./components/editresourcepage/editSPTPage";

import AddBookPage from "./components/addresourcepage/addBookPage";
import ReadingBookContainer from "./components/viewresources/readingBookContainer";

import ViewUserPage from "./components/viewuserpage/viewUserPage";
import ManageUser from "./components/manageuserpage/manageUserPage";

import PersonService from "./services/personService";
import DeleteModalContainer from "./components/manageresourcespage/deleteModalContainer";
import BrowseResources from "./components/browseresources/browseResources";
import ConfirmChangeModal from "./components/modal/confirmChangesModal";
// import GetResources from "./components/manageresourcespage/getResources";
import ManageResourcesPage from "./components/manageresourcespage/manageResourcesPage";
import "./App.css";

function App() {
    const [user, setUser] = useState(null); //fullname, email, userType (integer)

    const browseRef = useRef(null);
    const latestAcqRef = useRef(null);
    const newsRef = useRef(null);
    const appRef = useRef(null);

    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        const currentUrl = window.location.pathname;
        console.log(currentUrl);
        getCurrentToken();
    }, []);

    const decryptToken = (jwt) => {
        const encryption = {
            key: jwtEncryptionKey,
            algorithm: "aes-256-cbc",
        };
        return jwtEncrypt.readJWT(jwt, encryption, "ICSlibrary").data;
    };

    // see if there's current user logged in the browser
    const getCurrentToken = async () => {
        try {
            //to know if there's is currently logged in
            const jwt = localStorage.getItem(jwtPrivateKey);
            var userInfo = decryptToken(jwt);
            setUser(userInfo);

            // if there is (no error), then go to backend and get the updated userInfo
            const { data } = await PersonService.getSpecificPerson({
                googleId: userInfo.googleId,
            });
            userInfo = decryptToken(data);
            setUser(userInfo);
        } catch (err) {}
    };

    // login/register a user
    const loginRegisterUser = async (userInfo) => {
        try {
            const { data } = await PersonService.loginRegisterUser(userInfo);
            localStorage.setItem(jwtPrivateKey, data); //set token

            // get current param, it must stay on where the user's current path
            window.location = window.location.pathname;
        } catch (err) {}
    };

    return (
        <div className="App" ref={appRef}>
            <NavigationBar
                loginRegisterUser={loginRegisterUser}
                browseRef={browseRef}
                user={user}
                appRef={appRef}
            />
            <Switch location={background || location}>
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
                    component={ViewUserPage}
                ></Route>
                <Route exact path="/not-found" component={Notfound}></Route>

                {/* <Route
                    path="/update-sp-thesis"
                    component={UpdateResourceData}></Route> */}
                {/* <Route
                    path="/manage-resources"
                    component={ManageResPage}></Route> */}

                {/* placeholder componenets */}
                <Route
                    path="/browse-books"
                    render={() => <BrowseResources type={"book"} />}
                ></Route>
                <Route
                    path="/browse-special-problems"
                    render={() => <BrowseResources type={"Special Problem"} />}
                ></Route>
                <Route
                    path="/browse-theses"
                    render={() => <BrowseResources type={"Thesis"} />}
                ></Route>

                <Route
                    path="/sp-thesis/:id"
                    render={(props) => (
                        <ReadingSPTContainer user={user} {...props} />
                    )}
                ></Route>

                <Route
                    path="/book/:id"
                    render={(props) => (
                        <ReadingBookContainer appRef={appRef} {...props} />
                    )}
                ></Route>
                {/* placeholder componenets */}

                {/* <Route
                    path="/manage-resources"
                    render={() => (
                        <GetResources resourceType={"Book"} />
                    )}></Route> */}

                {/* sp/thesis/Special Problem/Thesis ang types */}
                {/* <Route path ="/manage-resources" render={()=><ManageResourcesPage/>}></Route> */}
                <Route
                    path="/manage-resources"
                    component={ManageResourcesPage}
                ></Route>
                <Route
                    path="/manage-users"
                    render={() => <ManageUser user={user} />}
                ></Route>

                <Route path="/add-new-spt" component={AddSPThesisPage}></Route>
                <Route path="/add-new-book" component={AddBookPage}></Route>
                <Route
                    path="/edit-resource"
                    component={EditSPThesisPage}
                ></Route>

                <Route path="/about" render={() => <About appRef={appRef} />} />
                <Redirect exact from="/" to="/home" />
                <Route exact path="/not-found" component={Notfound}></Route>
                <Redirect to="/not-found" />
            </Switch>

            {background && (
                <Route
                    path="/manage-resources/delete-sp-thesis"
                    children={<DeleteModalContainer />}
                />
            )}
            {background && (
                <Route
                    path="/manage-users/delete-user"
                    children={<DeleteModalContainer user={user} />}
                />
            )}
            {background && (
                <Route
                    path="/account-setting/remove-account"
                    children={<DeleteModalContainer user={user} />}
                />
            )}
            {background && (
                <Route
                    path="/manage-users/save-changes"
                    children={<ConfirmChangeModal user={user} />}
                />
            )}
            <Footer />
        </div>
    );
}

export default App;
