import React from 'react';
import styled from 'styled-components';

import GridBox from '../GridBox';
import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;

    padding-right: 2rem;
    padding-bottom: 0rem;
    padding-left: 2rem;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding-top: 0rem;
        padding-right: 1rem;
        padding-left: 1rem;

        margin-top: 0rem;
    }
`;

const Title = styled.div`
    align-self: center;
    text-align: start;

    font-size: 2.2rem;
    font-weight: 500;
    font-family: "raleway";

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1.5rem;
    }
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

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 0rem;
        margin-left: 0rem;
    }
`;

const TechnologyItem = styled.div`
    font-size: 3rem;

    background: rgba(255, 255, 255, 1);

    height: 4rem;
    width: 4rem;
    
    padding: 3px;
    margin: 0.15rem;

    border-radius: 100%;
    box-shadow: 0 0 3px;

    display: grid;
    align-content: center;
    justify-content: center;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 2.75rem;
        height: 3.5rem;
        width: 3.5rem;
    }
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