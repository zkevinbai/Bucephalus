import React from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  Grid,
  GridBox,
  LinksContainer,
  Name,
  ProjectDetail,
  ProjectPhoto,
  Skills,
 } from './Components';
import { MAX_TABLET_WIDTH } from './Components/constants';

const AurelianDetail = {
  TitleCopy: 'Aurelian',
  DescriptionCopy: 'personal finance sankey visualization',
  GithubLink: 'https://github.com/zkevinbai/Aurelian',
  LiveLink: 'https://aurelian.app',
  ShouldEmphasizeLeft: true,
}

const AlexandriaDetail = {
  TitleCopy: 'Alexandria',
  DescriptionCopy: 'book search engine and book tracker',
  GithubLink: 'https://github.com/zkevinbai/Alexandria',
  LiveLink: 'https://alexandria-book.herokuapp.com/#/',
  ShouldEmphasizeLeft: true,
}

const AugustusDetail = {
  TitleCopy: 'Augustus',
  DescriptionCopy: 'note taking with rich text editor',
  GithubLink: 'https://github.com/zkevinbai/Augustus',
  LiveLink: 'https://augustus-ink.herokuapp.com',
  ShouldEmphasizeLeft: false,
}

const projectsList = [
  AurelianDetail,
  AlexandriaDetail,
  AugustusDetail,
];

const adjustForMobile = [AlexandriaDetail.TitleCopy, AugustusDetail.TitleCopy];

const Portfolio = () => {
  const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${MAX_TABLET_WIDTH})` })

  return (
    <Grid>
      <Name/>
      <LinksContainer/>
      <Skills/>
      {
        projectsList.map((projectDetail) => {
          let emphasizeLeft = projectDetail.ShouldEmphasizeLeft;

          if (isTabletOrMobile && adjustForMobile.includes(projectDetail.TitleCopy)) {
            emphasizeLeft = !projectDetail.ShouldEmphasizeLeft;
          }

          return (
            <GridBox
              key={projectDetail.TitleCopy}
              ShouldEmphasizeLeft={emphasizeLeft}
            >
              {
                emphasizeLeft ?
                  (<>
                    <ProjectPhoto
                      TitleCopy={projectDetail.TitleCopy}
                    />
                    <ProjectDetail
                      {...projectDetail}
                    />
                  </>) : (<>
                    <ProjectDetail
                      {...projectDetail}
                    />
                    <ProjectPhoto
                      TitleCopy={projectDetail.TitleCopy}
                    />
                  </>)
              }
            </GridBox>
          )
        })
      }
    </Grid>
  );
}

export default Portfolio;
