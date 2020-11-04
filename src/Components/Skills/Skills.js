import React from 'react';
import styled from 'styled-components';

import GridBox from '../GridBox';

const Title = styled.div`
    grid-column: 2;
    grid-row: 2;
    align-self: center;
    text-align: start;

    font-weight: 500;
    font-size: 35px;
    font-family: "raleway";
`;
const Technologies = styled.div`
    grid-column: 3;
    grid-row: 2;

    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 3px;
    
    padding: 5px;
    margin: 3px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);

    justify-items: center;
    align-items: end;
`;

const TechnologyItem = styled.div`
    font-size: 50px;

    background: rgba(255, 255, 255, 1);

    height: 65px;
    width: 65px;
    
    padding: 3px;
    margin: 2px;

    border-radius: 100%;
    box-shadow: 0 0 3px;

    display: grid;
    align-content: center;
    justify-content: center;
`;

const TechnologyList = [
    'devicon-javascript-plain colored',
    'devicon-html5-plain colored',
    'devicon-css3-plain colored',
    'devicon-react-original colored',
    'devicon-d3js-plain colored',
    'devicon-express-original colored',
    'devicon-nodejs-plain colored',
    'devicon-postgresql-plain colored',
    'devicon-ruby-plain colored',
    'devicon-git-plain colored',
    'devicon-rails-plain colored',
    'devicon-mongodb-plain colored',
]
/*
things i'd like to add
---
styled components
graphql
redux
*/

export const Skills = () => {
    return (
        <GridBox
            ShouldEmphasizeLeft={false}
        >
            <Title>
                Technologies and Frameworks
            </Title>
            <Technologies>
                {
                    TechnologyList.map((icon) => (
                        <TechnologyItem>
                            <i class={icon}/>
                        </TechnologyItem>
                    ))
                }
            </Technologies>
        </GridBox>
    );
}

export default Skills;