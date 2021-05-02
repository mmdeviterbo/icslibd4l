import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage';
import NavigationBar from './components/navigationbar';
import Notfound from './components/notfound';

import './App.css';

function App() {
  const [user, setUser] = useState();
  
  
  return (
    <div className="App">
        <NavigationBar/>
        <Homepage/>

        {/* <Switch> */}
          {/* <Route path="/home" component={}></Route> */}
          {/* <Route exact path="/not-found" component={Notfound}></Route>  */}
          {/* <Redirect exact from="/" to="/home"/> */}
          {/* <Redirect to="/not-found"/>  */}
        {/* </Switch> */}
        <Footer/>
    </div>
  );
}

export default App;
