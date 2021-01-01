import React, { useState, useEffect } from "react";
import Home from "./components/pages/Home";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import Lyrics from "./components/pages/Lyrics";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8081/")
      .then((res) => res.json())
      .then((data) => this.setState({ username: data.username }));
  }
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/lyrics" component={Lyrics} />

            <Route path="/profile" component={Profile} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
