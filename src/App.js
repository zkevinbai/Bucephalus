import React from 'react';

import GridBox from './Grid/GridBox';
import ProjectDetail from './Grid/ProjectDetail';

function App() {
  return (
    <div>
      {/* <GridBox
        ShouldEmphasizeLeft={true}
      />
      <GridBox
        ShouldEmphasizeLeft={false}
      /> */}
      <GridBox
        ShouldEmphasizeLeft={false}
      >
        <ProjectDetail />
        <ProjectDetail />
      </GridBox>
      {/* <ProjectDetail/> */}
    </div>
  );
}

export default App;
