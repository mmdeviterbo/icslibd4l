import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';

import ManageResPage from './components/manageresourcespage/manageresourcespage'
import AddResourcePage from './components/addresourcepage/add-new-resource-pg'

import personService from './services/personService';
import jwtDecode from 'jwt-decode'; 
import './App.css';

function App() {
  const [user, setUser] = useState();    //fullname, email, surname, googleId
  const [seach, setSearch] = useState(); //search query from user
  
  useEffect(()=>{
    topWhenRefresh();
    getCurrentToken();
  },[])


  // refresh when full reload happens
  function topWhenRefresh(){
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }

  // to see if there's current user logged in the browser
  const getCurrentToken=()=>{
    try{
      const jwt = localStorage.getItem("tokey");
      const userInfo = jwtDecode(jwt);
      console.log(userInfo);
      // set state

    }catch(err){
      console.log("No tokens yet");
    }
  }
  
  // login/register a user
  const loginRegisterUser=async(userInfo)=>{
    setUser(userInfo);
    
    //call database
    try{
      const {data} = await personService.loginRegisterUser(userInfo);   
      console.log("Response: " + data);
    }catch(err){
      console.log("Error: " +  err);
    } 

  }

  return (
    <div className="App">
        {/* navigationBar is always visible no matter on what route */}
        <NavigationBar loginRegisterUser={loginRegisterUser}/>

        {/* this route returns component depending on the route */}
        <Switch>
          <Route path="/home" component={Homepage}></Route>
          {/* add your new route/path here */}
          <Route path="/manage-resources" component={ManageResPage}></Route>
          <Route path ="/add-new-resource" component={AddResourcePage}></Route>

          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/> 
        </Switch>

        {/* footer is always visible no matter on what route */}
        <Footer/>
    </div>
  );
}

export default App;
