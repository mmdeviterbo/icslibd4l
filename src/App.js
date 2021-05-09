import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import ManageUser from './components/manageuserpage/manageuserpage';
import ViewUser from './components/viewuserpage/viewUserPage';

import './App.css';

function App() {
  const [user, setUser] = useState();
  const [seach, setSearch] = useState();
  
  return (
    <div className="App">
        {/* navigationBar is always visible no matter on what route */}
        <NavigationBar/>

        {/* this route returns component depending on the route */}
        <Switch>
          <Route path="/home" component={Homepage}></Route>
          <Route path="/manageusers" component={ManageUser}></Route>
          <Route path='/viewuser/:userID' component={ViewUser}></Route>
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
