import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Portfolio from './Features/Portfolio';
import {
  AllBlogs,
  SingleBlog,
} from './Features/Blog';

const App = () => {

  return (
    <Router
      basename={process.env.PUBLIC_URL}
    >
      <Switch>
        <Route path="/blog/:slug">
          <SingleBlog />
        </Route>
        <Route path="/blog">
          <AllBlogs />
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
