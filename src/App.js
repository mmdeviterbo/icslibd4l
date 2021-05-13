import {Route, Switch, Redirect} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import personService from './services/personService';
import jwtDecode from 'jwt-decode'; 
import {jwtPrivateKey} from './config.json';
import './App.css';
import About from './components/about/about';

function App() {
  const [user, setUser] = useState(null);    //fullname, email, userType (integer)


  const browseRef = useRef(null);
  const latestAcqRef = useRef(null);
  const newsRef = useRef(null);

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
    }catch(err){}
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
        <NavigationBar loginRegisterUser={loginRegisterUser} browseRef={browseRef} user={user}/>

        <Switch>
          <Route path="/home" render={()=><Homepage browseRef={browseRef} appRef={appRef} latestAcqRef={latestAcqRef} newsRef={newsRef}/>}/>
          



          <Route path="/about" render={()=><About appRef={appRef}/>}/>
          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/> 
        </Switch>

        <Footer/>
    </div>
  );
}

export default App;
