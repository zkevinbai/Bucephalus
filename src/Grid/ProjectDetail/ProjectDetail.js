import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    display: grid;
    /* grid-template-columns: 2fr 2fr  */
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;

    height: 5rem;
    width: 15rem;
    padding: 0.5rem;

    align-items: center;
    font-family: "raleway";
`;

const Header = styled.div`
    text-align: center;
`;

const Title = styled.div`
    font-weight: 400;
    font-size: 35px;
    text-decoration: underline;
`;

const Description = styled.div`
    font-weight: 200;
    font-size: 18px;
`;

const Links = styled.div `
    font-weight: 300;
    font-size: 25px;

    background: rgba(255, 255, 255, 0.25);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    margin: 15px;
    padding: 5px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
`;

const Link = styled.a`
    color: black;

    :hover{
        color: rgb(86,194,255);
        text-decoration: underline;
    }
`;

export const ProjectDetail = () => {
    return (
        <Root>
            <Header>
                <Title>Aurelian</Title>
                <Description>personal finance visualization using sankey diagrams</Description>
            </Header>
            <Links>
                <Link href="https://github.com/zkevinbai/Aurelian">Github</Link>
                <Link href="https://aurelian.app">Live</Link>
            </Links>
        </Root>
    );
}

export default ProjectDetail;