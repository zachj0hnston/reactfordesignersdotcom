import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactGA from 'react-ga';

import Home from '../Home';
import FramerHome from '../Framer/Home';
import PageTranslate from '../Framer/Posts/translate';


class App extends Component {

  componentDidMount() {
    ReactGA.initialize('UA-54549890-1');
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/framer" component={FramerHome} />
          <Route exact path="/framer/translate" component={PageTranslate} />
        </div>
      </Router>
    );
  }
}

export default App;
