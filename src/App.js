import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

// import BlogRouter from './Features/Blog/BlogRouter';
import Portfolio from './Features/Portfolio';

const BlogRouter = () => {
  return (
    <div>
      hello
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/blog">
          <BlogRouter />
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
