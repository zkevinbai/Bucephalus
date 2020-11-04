import React from 'react';

import Grid from './Components/Grid/';
import GridBox from './Components/GridBox';
import ProjectDetail from './Components/ProjectDetail';

const AurelianDetail = {
  TitleCopy: 'Aurelian',
  DescriptionCopy: 'personal finance visualization using sankey diagrams',
  GithubLink: 'https://github.com/zkevinbai/Aurelian',
  LiveLink: 'https://aurelian.app',
}

const AlexandriaDetail = {
  TitleCopy: 'Alexandria',
  DescriptionCopy: 'book search engine and book tracker',
  GithubLink: 'https://github.com/zkevinbai/Alexandria',
  LiveLink: 'https://alexandria-book.herokuapp.com/#/',
}

const AugustusDetail = {
  TitleCopy: 'Augustus',
  DescriptionCopy: 'book search engine and book tracker',
  GithubLink: 'https://github.com/zkevinbai/Augustus',
  LiveLink: 'https://Augustus.ink/#/',
}

const projects = [
  AurelianDetail,
  AlexandriaDetail,
  AugustusDetail,
];

function App() {
  return (
    <Grid>
      <div>
        name
      </div>
      <div>
        contact
      </div>
      <div>
        skills
      </div>
      {
        projects.map((projectDetail) => {
          return (
            <GridBox
              ShouldEmphasizeLeft={false}
            >
              <ProjectDetail
                {...projectDetail}
              />
              <ProjectDetail
                {...projectDetail}
              />
            </GridBox>
          )
        })
      }
    </Grid>
  );
}

export default App;
