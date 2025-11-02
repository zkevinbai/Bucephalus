import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    height: 100%;
    justify-content: center;
    font-family: "raleway";

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 1.5rem;
        gap: 1rem;
        text-align: center;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.01em;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1.5rem;
    }
`;

const Description = styled.p`
    font-size: 1.1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    line-height: 1.6;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 0.95rem;
    }
`;

const Links = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        justify-content: center;
    }
`;

const Link = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    
    transition: all 0.2s ease;

    &:hover {
        background: rgba(48, 127, 246, 0.25);
        border-color: rgba(48, 127, 246, 0.5);
        color: #ffffff;
        transform: translateY(-1px);
    }

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 0.85rem;
        padding: 0.5rem 1rem;
    }
`;

export const ProjectDetail = ({
    TitleCopy,
    DescriptionCopy,
    GithubLink,
    LiveLink,
}) => {
    return (
        <Root>
            <Header>
                <Title>{TitleCopy}</Title>
                <Description>{DescriptionCopy}</Description>
            </Header>
            <Links>
                <Link href={GithubLink}>Github</Link>
                {LiveLink  ? <Link href={LiveLink}>Live</Link> : <></>}
            </Links>
        </Root>
    );
}

export default ProjectDetail;