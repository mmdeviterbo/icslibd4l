import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtPrivateKey, jwtEncryptionKey } from "./config.json";
import * as jwtEncrypt from "jwt-token-encrypt";
import Footer from "./components/footer";
import Homepage from "./components/homepage/homepage";
import NavigationBar from "./components/navigationBar";
import Notfound from "./components/notfound";
// import ManageResPage from './components/manageresourcespage/manageResourcesPage'
// import AddResourcePage from "./components/addresourcepage/addNewResourcesPage";
import EditResourcePage from "./components/editresourcepage/editResourceForm";
import AddSPThesisPage from "./components/addresourcepage/addSPTPageContainer";
import AddBookFormContainer from "./components/addresourcepage/addBookFormContainer";
import ManageUser from "./components/manageuserpage/manageUserPage";
import ViewUserPage from "./components/viewuserpage/viewUserPage";
import PersonService from "./services/personService";
import DeletePopUpCont from "./components/manageresourcespage/deleteModalContainer";
import ReadingSPTContainer from "./components/viewresources/readingSPTContainer";
import ReadingBookContainer from "./components/viewresources/readingBookContainer";
import BrowseResources from "./components/browseresources/browseResources";
import UpdateResourceData from "./components/crud/update";
import About from "./components/about/about";
import GetResources from "./components/manageresourcespage/getResources";
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
        getCurrentToken();
    }, []);

    // see if there's current user logged in the browser
    const getCurrentToken = () => {
        try {
            const jwt = localStorage.getItem(jwtPrivateKey);
            const encryption = {
                key: jwtEncryptionKey,
                algorithm: "aes-256-cbc",
            };
            const decrypted = jwtEncrypt.readJWT(jwt, encryption, "ICSlibrary");
            const userInfo = decrypted.data;
            setUser(userInfo);
        } catch (err) {}
    };

    // login/register a user
    const loginRegisterUser = async (userInfo) => {
        try {
            const { data } = await PersonService.loginRegisterUser(userInfo);
            localStorage.setItem(jwtPrivateKey, data); //set token
            window.location = "/home";
        } catch (err) {}
    };

    // SAMPLE DATA ONLY
    const sampleSP = {
        title: "Adaptive Identification of Rice and Corn Pests (Order Hemiptera) using Back Propagation Neural Network Based on Intensity Histogram",
        type: "Special Problem",
        abstract:
            "Pest identification through image processing using Back Propagation Neural Network with Intensity Histogram as the feature used as basis for classification yielded an accuracy of 100% using 15 test images from each species. However, the application is only limited to pest images that have distinguishable backgrounds. The reliability of the system can be further increased by adding more training data with plain background. This research aims to help users by giving additional information about the pest identified by the system such as description, treatment, and control.",
        year: 1969,
        authorList: ["Concepcion L. Khan", "John Viscel M. Sangkal"],
        adviserList: [
            "Maria Erika Dominique Cunanan",
            "Katrina Joy M. Abriol-Santos",
        ],
        keywords: ["CMSC191", "CMSC173", "CMSC69"],
    };

    const sampleBook = {
        title: "The Little Prince",
        authorList: ["Antoine de Saint-Exupéry"],
        physicalDesc: "Paperback : 96 pages \n ",
        year: 1943,
        publisher: "Mariner Books; 1st edition (May 15, 2000)",
        numOfCopies: 5,
        subjects: [
            "moral education",
            "personalism",
            "dialogic approach",
            "educational relationship",
            "educational interaction",
        ],
    };
    // CLEAR UNTIL HERE

    return (
        <div className="App" ref={appRef}>
            <NavigationBar
                loginRegisterUser={loginRegisterUser}
                browseRef={browseRef}
                user={user}
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
                    component={ViewUserPage}></Route>
                <Route exact path="/not-found" component={Notfound}></Route>
                {/* <Route path="/view-resources" component={BrowseResources}></Route> */}
                <Route
                    path="/update-sp-thesis"
                    component={UpdateResourceData}></Route>
                {/* <Route path="/manage-resources" component={ManageResPage}></Route> */}

                <Route
                    path="/browse-books"
                    render={() => <BrowseResources type={"book"} />}></Route>
                <Route
                    path="/browse-special-problems"
                    render={() => <BrowseResources type={"Special Problem"} />}></Route>
                <Route
                    path="/browse-theses"
                    render={() => <BrowseResources type={"Thesis"} />}></Route>

                <Route
                    path="/manage-resources"
                    render={() => (
                        <GetResources resourceType={"Book"} />
                    )}></Route>
                <Route path="/manage-users" component={ManageUser}></Route>

                <Route path="/add-new-spt" component={AddSPThesisPage}></Route>
                <Route
                    path="/add-new-book"
                    component={AddBookFormContainer}></Route>
                <Route
                    path="/edit-resource"
                    component={EditResourcePage}></Route>
                <Route
                    path="/view-sp-thesis"
                    // component={ReadingSPTContainer}
                    render={() => (
                        <ReadingSPTContainer resourceData={sampleSP}/>
                    )}></Route>

                {/* <Route path ="/view-sp-thesis" component={ReadingSPTContainer}></Route> */}
                <Route
                    path="/view-book"
                    render={() => (
                        <ReadingBookContainer sampleBook={sampleBook} />
                    )}></Route>
                <Route path="/about" render={() => <About appRef={appRef} />} />
                <Route exact path="/not-found" component={Notfound}></Route>
                <Redirect exact from="/" to="/home" />
                <Redirect to="/not-found" />
            </Switch>
            {background && (
                <Route
                    path="/manage-resources/delete-sp-thesis"
                    children={<DeletePopUpCont />}
                />
            )}
            {background && (
                <Route
                    path="/manage-users/delete-user"
                    children={<DeletePopUpCont />}
                />
            )}
            <Footer />
        </div>
    );
}

export default App;
