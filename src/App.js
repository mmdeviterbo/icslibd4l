import {Route, Switch, Redirect} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import ManageResPage from './components/manageresourcespage/manageresourcespage'
import AddBookPage from './components/addresourcepage/add-new-resource-pg'
import AddSPThesisPage from './components/addresourcepage/add-spt-pg-container'
import ReadingSPTContainer from './components/viewresources/readingsptcontainer'
import ReadingBookContainer from './components/viewresources/readingbookcontainer'

import personService from './services/personService';
import jwtDecode from 'jwt-decode'; 
import {jwtPrivateKey} from './config.json';
import './App.css';
import AddResource from './components/additem/add';
import ViewResource from './components/additem/view';
import updateResourceData from './components/additem/update';
import About from './components/about/about';

function App() {
  const [user, setUser] = useState(null);    //fullname, email, userType (integer)
  
  const browseRef = useRef(null);
  const appRef = useRef(null);

  useEffect(()=>{
    getCurrentToken();
  },[])

  // see if there's current user logged in the browser
  const getCurrentToken=()=>{
    try{
      const jwt = localStorage.getItem(jwtPrivateKey);
      const userInfo = jwtDecode(jwt);
      setUser(userInfo);
    }catch(err){console.log("No tokens yet");}
  }
  
  // login/register a user
  const loginRegisterUser=async(userInfo)=>{
    try{
      const {data} = await personService.loginRegisterUser(userInfo);   
      localStorage.setItem(jwtPrivateKey, data);
      window.location = "/home"; 
    }catch(err){console.log("Errorrrrr: " +  err)} 
  }

  return (
    <div className="App" ref={appRef}>
        {/* navigationBar is always visible no matter on what route */}
        <NavigationBar loginRegisterUser={loginRegisterUser} browseRef={browseRef} user={user}/>
        
        {/* this route returns component depending on the route */}
        <Switch>
          <Route path="/home" component={Homepage}></Route>
          {/* add your new route/path here */}
         
          <Route path="/home" render={()=><Homepage browseRef={browseRef} appRef={appRef}/>}/>
          


          <Route path="/home" render={()=><Homepage browseRef={browseRef} appRef={appRef}/>}/>
          <Route exact path="/not-found" component={Notfound}></Route>
          
           {/* add your new route/path here */}
          <Route path="/view-sp-thesis" component={ReadingSPTContainer}></Route>
          <Route path="/view-book" component={ReadingBookContainer}></Route>
          <Route path="/update-sp-thesis" component={updateResourceData}></Route>
          <Route path="/manage-resources" component={ManageResPage}></Route>
          <Route path ="/add-new-book" component={AddBookPage}></Route>
          <Route path ="/add-new-spt" component={AddSPThesisPage}></Route>

          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/>
        </Switch>

        <Footer/>
    </div>
  );
}

export default App;
