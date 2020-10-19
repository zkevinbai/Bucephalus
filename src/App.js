import React from 'react';

import GridBox from './Grid/GridBox';

function App() {
  return (
    <div>
      <GridBox
        ShouldEmphasizeLeft={true}
      />
      <GridBox
        ShouldEmphasizeLeft={false}
      />
    </div>
  );
}

export default App;
