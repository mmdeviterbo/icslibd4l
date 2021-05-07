import {Route, Switch, Redirect, Link } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import personService from './services/personService';
import jwtDecode from 'jwt-decode'; 
import './App.css';


function App() {
  const [user, setUser] = useState();    //fullname, email, surname, googleId
  const [seach, setSearch] = useState(); //search query from user
  // insert your other states here

  
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
        <NavigationBar loginRegisterUser={loginRegisterUser}/>

        <Switch>
          <Route path="/home" component={Homepage}></Route>
          {/* insert you new path here */}
          


          {/* if /not-found, then go to "notfound" component*/}
          <Route exact path="/not-found" component={Notfound}></Route> 
          
          {/* if / only, the redirect it to /home path */}
          <Redirect exact from="/" to="/home"/>
          
          {/* if no path is found, it will fall under "notfound" component */}
          <Redirect to="/not-found"/> 
        </Switch>

        <Footer/>
    </div>
  );
}

export default App;
