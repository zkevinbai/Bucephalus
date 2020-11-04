import React from 'react';

import {
  ContactInformation,
  Grid,
  GridBox,
  Name,
  ProjectDetail,
  Skills,
 } from './Components';

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

const projectsList = [
  AurelianDetail,
  AlexandriaDetail,
  AugustusDetail,
];

function App() {
  return (
    <Grid>
      <Name/>
      <ContactInformation/>
      <Skills/>
      {
        projectsList.map((projectDetail) => {
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
