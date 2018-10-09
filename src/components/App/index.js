import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactGA from 'react-ga';

import Home from '../Home';
import PageHome from '../Framer/Posts/home';
import PageTranslate from '../Framer/Posts/translate';
import PageUnsplash from '../Framer/Posts/unsplash';


export default class App extends Component {

  componentDidMount() {
    ReactGA.initialize('UA-54549890-1');
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/framer" component={PageHome} />
          <Route exact path="/framer/translate" component={PageTranslate} />
          <Route exact path="/framer/unsplash" component={PageUnsplash} />
        </div>
      </Router>
    );
  }
}
