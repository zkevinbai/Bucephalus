import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AllPosts, OnePost } from './Components';

import GlobalStyles from './GlobalStyles';
import Portfolio from './Features/Portfolio';

const App = () => {
  return (
    <Fragment>
      <GlobalStyles/>
      <BrowserRouter>
        <Fragment>
          <Route component={AllPosts} path="/" exact />
          <Route component={OnePost} path="/:slug" />
          {/* <Route component={AllPosts} path="/blog" exact />
        <Route component={OnePost} path="/blog/:slug" /> */}
        </Fragment>
      </BrowserRouter>
    </Fragment>
  );
}

// function App() {
//   return (
//     <Fragment>
//       <GlobalStyles/>
//       <Portfolio/>
//     </Fragment>
//   );
// }

export default App;
