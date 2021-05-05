import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';

import './App.css';
import ParallaxEffect from './components/homepage/parallaxEffect';

function App() {
  const [user, setUser] = useState(); //fullname, classification, email
  const [seach, setSearch] = useState(); //search query from user
  
  return (
    <div className="App">
        {/* navigationBar is always visible no matter on what route */}
        
        {/* <ParallaxEffect/> */}
        <NavigationBar/>

        {/* this route returns component depending on the route */}
        <Switch>
          <Route path="/home" component={Homepage}></Route>
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
