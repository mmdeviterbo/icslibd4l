import {Route, Switch, Redirect, useParams } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import ManageResPage from './components/manageresourcespage/manageresourcespage'
import AddBookPage from './components/addresourcepage/add-new-resource-pg'
import AddSPThesisPage from './components/addresourcepage/add-spt-pg-container'
import ManageUser from "./components/manageuserpage/manageuserpage";
import ViewUserPage from "./components/viewuserpage/viewUserPage";
import personService from './services/personService';
import jwtDecode from 'jwt-decode'; 

import {jwtPrivateKey} from './config.json';
import * as jwtEncrypt from 'jwt-token-encrypt';
import './App.css';
import AddResource from './components/crud/add';
import ViewResource from './components/crud/view';
import updateResourceData from './components/crud/update';
import About from './components/about/about';

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
      // const encryption = {key: jwtPrivateKey,algorithm: 'aes-256-cbc'};
      // const decrypted = jwtEncrypt.readJWT(jwt, encryption, 'ICSlibrary');
      // const userInfo = decrypted.data;
      const userInfo = jwtDecode(jwt);
      setUser(userInfo);
    } catch (err) {}
  };

  // login/register a user
  const loginRegisterUser = async (userInfo) => {
    try {
      const {data} = await personService.loginRegisterUser(userInfo);
      localStorage.setItem(jwtPrivateKey, data); //set token
      window.location = "/home";
    } catch (err) {}
  };

  const ParamUrl=()=> {
    // for dynamic url
    let { id } = useParams();
    return (
      null
    );
  }
  
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
            {/* <Route path="/account-setting/" component={ViewUser}></Route> */}
            <Route
              path="/account-setting/"
              render={() => <ViewUserPage user={user} />}></Route>
          <Route path="/home" render={()=><Homepage browseRef={browseRef} appRef={appRef} latestAcqRef={latestAcqRef} newsRef={newsRef}/>}/>
          <Route exact path="/not-found" component={Notfound}></Route>
          
           {/* add your new route/path here */}
          <Route path="/view-sp-thesis" component={ViewResource}></Route>
          <Route path="/update-sp-thesis" component={updateResourceData}></Route>
          <Route path="/manage-resources" component={ManageResPage}></Route>
          <Route path ="/add-new-book" component={AddBookPage}></Route>
          <Route path ="/add-new-spt" component={AddSPThesisPage}></Route>
          <Route path="/delete/:id" children={<ParamUrl />}  component={ViewResource}></Route>
          <Route path="/manage-users" component={ManageUser}></Route>
          <Route path="/about" render={()=><About appRef={appRef}/>}/>
          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/>
        </Switch>

      <Footer />
    </div>
  );
}

export default App;
