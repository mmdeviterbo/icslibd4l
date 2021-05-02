import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';
import NavigationBar from './components/navigationbar';
import Notfound from './components/notfound';
import './App.css';

function App() {
  const [user, setUser] = useState();
  
  
  return (
    <div className="App">
        <NavigationBar/>

        {/* <Switch> */}
          {/* <Route path="/home" component={}></Route> */}
          {/* <Route exact path="/not-found" component={Notfound}></Route>  */}
          {/* <Redirect exact from="/" to="/home"/> */}
          {/* <Redirect to="/not-found"/>  */}
        {/* </Switch> */}


    </div>
  );
}

export default App;
