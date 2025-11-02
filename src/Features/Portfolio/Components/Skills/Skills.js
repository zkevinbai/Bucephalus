import React from 'react';
import styled from 'styled-components';

import GridBox from '../GridBox';
import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    align-items: center;
    justify-content: center;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 1.5rem;
        gap: 1rem;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    font-family: "raleway";
    margin: 0;
    text-align: center;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1.25rem;
    }
`;

const Technologies = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;

    justify-items: center;
    align-items: center;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        grid-template-columns: repeat(3, 1fr);
        padding: 1rem;
        gap: 0.75rem;
    }
`;

const TechnologyItem = styled.div`
    font-size: 2.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 4rem;
    width: 4rem;
    padding: 0.5rem;
    border-radius: 10px;
    
    display: grid;
    align-content: center;
    justify-content: center;
    
    transition: all 0.3s ease;

    &:hover {
        background: rgba(48, 127, 246, 0.15);
        border-color: rgba(48, 127, 246, 0.4);
        transform: translateY(-4px) scale(1.1);
        box-shadow: 0 6px 16px rgba(48, 127, 246, 0.2);
    }

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 2rem;
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