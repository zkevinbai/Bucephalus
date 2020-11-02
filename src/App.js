import React from 'react';

import GridBox from './Grid/GridBox';
import ProjectDetail from './Grid/ProjectDetail';

function App() {
  return (
    <div>
      <GridBox
        ShouldEmphasizeLeft={true}
      />
      <GridBox
        ShouldEmphasizeLeft={false}
      />
      <ProjectDetail/>
    </div>
  );
}

export default App;
