import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    min-width: 100vw; 
    height: 100vh;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);

    background-image: linear-gradient(
        to bottom right,
        rgb(255, 210, 206),
        rgb(255, 254, 180),
        rgb(183, 229, 255)
    );

    @media (max-width: 1450px) {
        height: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, 1fr);

        background-image: linear-gradient(
            to bottom,
            rgb(255, 210, 206),
            rgb(255, 254, 180),
            rgb(183, 229, 255),
            rgb(255, 210, 206)
        );
    }
`;

export const Grid = ({
    children
}) => {
    return (
        <Root>
            {children}
        </Root>
    );
}

export default Grid;