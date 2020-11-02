import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    display: grid;
    /* grid-template-columns: 0.1fr 2fr 2fr 0.1fr; */
    grid-template-columns: 0.1fr 1fr 2fr 0.1fr;

    grid-template-rows: 0.1fr 1fr 0.1fr;

    align-items: center;

    font-family: "raleway";
`;

const Header = styled.div`
    grid-column: 3;
    grid-row: 2;

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
    align-content: space-evenly;
`;

const Link = styled.div`
    color: black;

    :hover{
        color: rgb(86,194,255);
        text-decoration: underline;
    }
`;

export const GridBox = () => {
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

export default GridBox;