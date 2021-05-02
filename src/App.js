import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './App.css';
import Homepage from './components/homepage';

function App() {
  const [user, setUser] = useState();
  
  
  return (
    <div className="App">
        <Homepage/>
        
          {/* <Switch>
            <Route path="/home" component={**insert component here**>}></Route>
            <Route exact path="/not-found" component={**insert component here**}></Route> 
            <Redirect exact from="/" to="/home"/>
            <Redirect to="/not-found"/> 
          </Switch> */}

    </div>
  );
}

export default App;
