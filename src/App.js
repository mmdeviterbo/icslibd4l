import {Route, Switch, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1> Hello world! </h1>
        <h1> Test ... </h1>

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
