import React from 'react';
import styled from 'styled-components';

import GridBox from '../GridBox';

const Root = styled.div`
    padding: 2.5rem 2rem 0rem 3rem;
    margin-top: 1.45rem;
`;

const Title = styled.div`
    align-self: center;
    text-align: start;

    font-weight: 500;
    font-size: 35px;
    font-family: "raleway";
`;

const Technologies = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 3px;
    
    padding: 5px;
    margin-left: 4rem;

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
    margin: 0.15rem;

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
];
/*
things i'd like to add
---
styled components
graphql
redux
*/

export const Skills = () => {
    return (
        <Root>
            <GridBox
                ShouldEmphasizeLeft={false}
            >
                <Title>
                    Technologies and Frameworks
                </Title>
                <Technologies>
                    {
                        TechnologyList.map((icon) => (
                            <TechnologyItem
                                key={icon}
                            >
                                <i className={icon}/>
                            </TechnologyItem>
                        ))
                    }
                </Technologies>
            </GridBox>
        </Root>
    );
}

export default Skills;