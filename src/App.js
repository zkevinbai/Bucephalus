import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Blog from './Features/Blog';
import Portfolio from './Features/Portfolio';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/">
          <Portfolio />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
