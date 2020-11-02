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

export const GridBox = ({
    ShouldEmphasizeLeft,
    children
}) => {
    return (
        <Root
            ShouldEmphasizeLeft={ShouldEmphasizeLeft}
        >
            {children}
        </Root>
    );
}

export default GridBox;