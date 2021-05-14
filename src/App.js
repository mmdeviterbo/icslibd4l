import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Footer from "./components/footer";
import Homepage from "./components/homepage/homepage";
import NavigationBar from "./components/navigationBar";
import Notfound from "./components/notfound";
import ManageUser from "./components/manageuserpage/manageuserpage";
import ViewUser from "./components/viewuserpage/viewUserPage";

import ManageResPage from "./components/manageresourcespage/manageresourcespage";

import personService from "./services/personService";
import jwtDecode from "jwt-decode";
import "./App.css";

function App() {
  const [user, setUser] = useState(); //fullname, email, surname, googleId
  const [seach, setSearch] = useState(); //search query from user

  return (
    <div className="App">
      {/* navigationBar is always visible no matter on what route */}
      <NavigationBar loginRegisterUser={loginRegisterUser} />

      {/* this route returns component depending on the route */}
      <Switch>
        <Route path="/home" component={Homepage}></Route>
        {/* add your new route/path here */}
        <Route path="/manageusers" component={ManageUser}></Route>
        <Route path="/viewuser/:googleId" component={ViewUser}></Route>
        <Route path="/manage-resources" component={ManageResPage}></Route>

        <Route exact path="/not-found" component={Notfound}></Route>
        <Redirect exact from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>

      {/* footer is always visible no matter on what route */}
      <Footer />
    </div>
  );
}

export default App;
