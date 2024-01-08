import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;

    height: 5rem;
    padding: 0.5rem;
    padding-bottom: 5rem;

    align-items: center;
    font-family: "raleway";

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        width: 10rem;
    }
`;

const Header = styled.div`
    text-align: center;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: 500;
    text-decoration: underline;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1.75rem;
    }
`;

const Description = styled.div`
    font-size: 1.5rem;
    font-weight: 300;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1rem;
        font-weight: 400;
    }
`;

const Links = styled.div `
    font-size: 1.5rem;
    font-weight: 400;

    background: rgba(255, 255, 255, 0.25);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    margin: 15px;
    padding: 0.5rem;

    /* display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center; */

    text-align: center;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1.25rem;
    }
`;

const Link = styled.a`
    color: black;

    :hover{
        color: rgb(86,194,255);
        text-decoration: underline;
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
                <Link href={GithubLink}>Github Link</Link>
                {/* {LiveLink  ? <Link href={LiveLink}>Live</Link> : <></>} */}
            </Links>
        </Root>
    );
}

export default ProjectDetail;