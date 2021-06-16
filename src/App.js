import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtPrivateKey } from "./config.json";
import Footer from "./components/footer";
import Homepage from "./components/homepage/homepage";
import NavigationBar from "./components/navigationBar";
import Notfound from "./components/notfound";
import Unauthorized from "./components/unauthorized";
import About from "./components/about/aboutAlternative";

import AddSPThesisPage from "./components/addresourcepage/addSPTPageContainer";
import ReadingSPTContainer from "./components/viewresources/readingSPTContainer";
import EditSPTFormContainer from "./components/editresourcepage/editSPTForm";

import AddBookPage from "./components/addresourcepage/addBookPage";
import EditBookFormContainer from "./components/editresourcepage/editBookForm";
import ReadingBookContainer from "./components/viewresources/readingBookContainer";

import ViewUserPage from "./components/viewuserpage/viewUserPage";
import ManageUserPage from "./components/manageuserpage/manageUserPage";

import PersonService from "./services/personService";
import DeleteModalContainer from "./components/manageresourcespage/deleteModalContainer";
import BrowseResources from "./components/browseresources/browseResources";
import ConfirmChangeModal from "./components/modal/confirmChangesModal";
import Search from "./components/searchResult/advancedSearch.jsx";
import ManageResourcesPage from "./components/manageresourcespage/manageResourcesPage";
import SummaryReportPage from "./components/summaryreport/summaryReportPage";
// import activityLogsContainer from "./components/activitylogs/activityLogsContainer";

import "./App.css";
import ActivityLogsContainer from "./components/activitylogs/activityLogsContainer";

function App() {
    const [user, setUser] = useState(null); //fullName, email, userType (integer)

    const browseRef = useRef(null);
    const latestAcqRef = useRef(null);
    const newsRef = useRef(null);
    const appRef = useRef(null);

    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        // see if there's current user logged in the browser
        const getCurrentToken = async () => {
            try {
                //to know if there's is currently logged in
                const jwt = localStorage.getItem(jwtPrivateKey);
                var userInfo = PersonService.decryptToken(jwt);
                setUser(userInfo);

                // if there is (no error), then go to backend and get the updated userInfo
                const { data } = await PersonService.getSpecificPerson({
                    googleId: userInfo.googleId,
                });
                localStorage.setItem(jwtPrivateKey, data); //set token
                userInfo = PersonService.decryptToken(data);
                setUser(userInfo);
            } catch (err) {}
        };
        getCurrentToken();
    }, []);

    // login/register a user
    const loginRegisterUser = async (userInfo) => {
        try {
            const { data } = await PersonService.loginRegisterUser(userInfo);
            localStorage.setItem(jwtPrivateKey, data); //set token

            // get current param, it must stay on where the user's current path
            window.location = window.location.search || window.location.pathname;
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
                {/* <Route path="/view-user/:googleId" component={ViewUser}></Route> */}
                <Route
                    path="/account-setting/"
                    render={() => <ViewUserPage user={user} />}
                />
                {/* <Route path="/update-sp-thesis" component={UpdateResourceData}></Route> */}
                <Route
                    path="/browse-books"
                    render={() => <BrowseResources type={"book"} />}
                />
                <Route
                    path="/browse-special-problems"
                    render={() => <BrowseResources type={"Special Problem"} />}
                />
                <Route
                    path="/browse-theses"
                    render={() => <BrowseResources type={"Thesis"} />}
                />
                <Route
                    path="/sp-thesis/:id"
                    render={(props) => (
                        <ReadingSPTContainer user={user} {...props} />
                    )}
                />
                <Route
                    path="/book/:id"
                    render={(props) => (
                        <ReadingBookContainer appRef={appRef} user={user} {...props} />
                    )}
                />
                <Route
                    path="/manage-resources"
                    render={() => <ManageResourcesPage user={user} />}
                />
                <Route
                    path="/manage-users"
                    render={() => <ManageUserPage user={user} />}
                />
                <Route path="/add-new-spt" render={(props)=><AddSPThesisPage {...props} user={user}/>} />
                <Route path="/add-new-book" render={(props)=><AddBookPage {...props} user={user}/>} />
                <Route path="/edit-spt/:id" render={(props)=><EditSPTFormContainer {...props} user={user}/>} />
                <Route path="/edit-book/:id" render={(props)=><EditBookFormContainer {...props} user={user}/>}/>
                <Route
                    path="/view-activitylogs"
                    render={() => <ActivityLogsContainer user={user} />}
                />
                <Route
                    path="/view-summaryreport"
                    render={() => <SummaryReportPage user={user} />}
                />
                <Route
                    path="/search"
                    render={() => <Search appRef={appRef} />}
                />
                <Route path="/about" render={() => <About appRef={appRef} />} />
                <Route exact path="/not-found" component={Notfound}></Route>
                <Route exact path="/unauthorized" component={Unauthorized} />
                <Redirect exact from="/" to="/home" />
                <Route exact path="/not-found" component={Notfound}></Route>
                <Redirect to="/not-found" />
            </Switch>

            {background && (
                <Route
                    path="/manage-resources/delete-sp-thesis"
                    children={<DeleteModalContainer user={user} />}
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
            {background && (
                <Route
                    path="/view-activitylogs/clear-activitylogs"
                    children={<DeleteModalContainer />}
                />
            )}

            <Footer />
        </div>
    );
}

export default App;
