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
  const [user, setUser] = useState({});    //fullname, email, surname, googleId, classification


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
    <div className="App" ref={appRef}>
        <NavigationBar loginRegisterUser={loginRegisterUser} browseRef={browseRef}/>
        
        <Switch>
          <Route path="/home" render={()=><Homepage browseRef={browseRef} appRef={appRef}/>}/>
          



          {/* <Route path="/about" component={About}/> */}
          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/> 
        </Switch>

        <Footer/>
    </div>
  );
}

export default App;
