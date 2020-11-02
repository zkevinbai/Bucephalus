import React from 'react';

import GridBox from './Grid/GridBox';
import ProjectDisplay from './Grid/Project';

function App() {
  return (
    <div>
      <GridBox
        ShouldEmphasizeLeft={true}
      />
      <GridBox
        ShouldEmphasizeLeft={false}
      />
      <ProjectDisplay/>
    </div>
  );
}

export default App;
