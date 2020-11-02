import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    height: 5rem;
    width: 15rem;
    padding: 0.5rem;

    display: grid;
    grid-template-columns: ${({ ShouldEmphasizeLeft }) => (
        ShouldEmphasizeLeft ? '1fr 2fr' : '2fr 1fr' )
    };
    grid-template-rows: 1fr;

    align-items: center;
`;

const TestRedDiv = styled.div`
    height: 100%;
    background: red;
`;

const TestBlueDiv = styled.div`
    height: 100%;
    background: blue;
`;

export const GridBox = ({
    LeftComponent,
    RightComponent,
    ShouldEmphasizeLeft,
}) => {
    return (
        <Root
            ShouldEmphasizeLeft={ShouldEmphasizeLeft}
        >
            <TestRedDiv />
            <TestBlueDiv />
        </Root>
    );
}

export default GridBox;