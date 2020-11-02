import React from 'react';

import GridBox from './Grid/GridBox';
import ProjectDisplay from './Grid/ProjectDisplay';

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
