import React from 'react';

import GridBox from './Grid/GridBox';
import ProjectDetail from './Grid/ProjectDetail';

const AlexandriaDetail = {
  Title: 'Alexandria',
  Description: 'book search engine and book tracker',
  GithubLink: 'https://github.com/zkevinbai/Alexandria',
  LiveLink: 'https://alexandria-book.herokuapp.com/#/',
}

const AurelianDetail = {
  Title: 'Aurelian',
  Description: 'personal finance visualization using sankey diagrams',
  GithubLink: 'https://github.com/zkevinbai/Aurelian',
  LiveLink: 'https://aurelian.app',
}

function App() {
  return (
    <div>
      <GridBox
        ShouldEmphasizeLeft={false}
      >
        <ProjectDetail>
          {...AlexandriaDetail}
        </ProjectDetail>
        <ProjectDetail 
          {...AurelianDetail}
        />
      </GridBox>
    </div>
  );
}

export default App;
