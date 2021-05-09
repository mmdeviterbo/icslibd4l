import {Route, Switch, Redirect} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import personService from './services/personService';
import jwtDecode from 'jwt-decode'; 
import {jwtPrivateKey} from './config.json';
import './App.css';
import ParallaxEffect from './components/homepage/parallaxEffect'

function App() {
  const [user, setUser] = useState({});    //fullname, email, surname, googleId
  const [search, setSearch] = useState(""); //search query from user
  // insert your other states here

  useEffect(()=>{
    getCurrentToken();
  },[])

  // see if there's current user logged in the browser
  const getCurrentToken=()=>{
    try{
      const jwt = localStorage.getItem(jwtPrivateKey);
      const userInfo = jwtDecode(jwt);
      console.log("DECODED JWT: " + userInfo);
      // set state
      // do full reload

    }catch(err){
      console.log("No tokens yet");
    }
  }
  
  // login/register a user
  const loginRegisterUser=async(userInfo)=>{
    try{
      const {data} = await personService.loginRegisterUser(userInfo);   
      setUser(data);
    }catch(err){
      console.log("Errorrrrr: " +  err);
    } 
  }

  return (
    <div className="App">
        <NavigationBar loginRegisterUser={loginRegisterUser}/>
        
        <Switch>
          <Route path="/home" render={()=><Homepage onSearch={setSearch}/>}/>
          <Route path="/parallax" render={()=><ParallaxEffect search={search}/>}/>

          {/* insert you new path here */}

          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/> 
        </Switch>

        <Footer/>
    </div>
  );
}

export default App;
