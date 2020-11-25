import React, { Fragment } from 'react';
import { BrowserRoute, Route } from 'react-router-dom';

import { AllPosts, OnePost } from './Components';

import GlobalStyles from './GlobalStyles';
import Portfolio from './Features/Portfolio';

const App = () => {
  return (
    <BrowserRoute>
      <Fragment>
        <Route component={AllPosts} path="/blog" exact />
        <Route component={OnePost} path="/blog/:slug" />
      </Fragment>
    </BrowserRoute>
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
