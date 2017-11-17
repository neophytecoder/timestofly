import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Switch>
          <Route path="/test" render={()=> <div>Test</div>} />
          <Route path="/Contact" render={()=> <div>Contact</div>} />
        </Switch>

        <Link to="/test">test</Link>
        <Link to="/home">home</Link>
      </div>
    );
  }

  componentDidMount() {
    fetch("/api")
      .then(res=>res.json())
      .then(data=> console.log(data), error=>console.log("error", error));
  }
}

export default App;
