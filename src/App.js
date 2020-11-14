import React from 'react';
import Home from './components/pages/Home';
import LogIn from './components/pages/LogIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Fragment } from 'react';
import './App.css'


function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={LogIn} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;