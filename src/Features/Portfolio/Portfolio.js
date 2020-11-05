import React from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  ContactInformation,
  Grid,
  GridBox,
  Name,
  ProjectDetail,
  ProjectPhoto,
  Skills,
 } from '../../Components/';

const AurelianDetail = {
  TitleCopy: 'Aurelian',
  DescriptionCopy: 'personal finance visualization using sankey diagrams',
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
  DescriptionCopy: 'note taking with rich text wysiwyg editor',
  GithubLink: 'https://github.com/zkevinbai/Augustus',
  LiveLink: 'https://Augustus.ink/#/',
  ShouldEmphasizeLeft: false,
}

const projectsList = [
  AurelianDetail,
  AlexandriaDetail,
  AugustusDetail,
];

const mobileAdjust = [AlexandriaDetail.TitleCopy, AugustusDetail.TitleCopy];

const Portfolio = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1166px)' })

  return (
    <Grid>
      <Name/>
      <ContactInformation/>
      <Skills/>
      {
        projectsList.map((projectDetail) => {
          let emphasizeLeft = projectDetail.ShouldEmphasizeLeft;
          if (isTabletOrMobile && mobileAdjust.includes(projectDetail.TitleCopy)) {
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
