import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: grid;
    padding: 1rem;
    grid-template-columns: ${({ ShouldEmphasizeLeft }) => (
        ShouldEmphasizeLeft ? '2fr 1fr' : '1fr 2fr' )
    };
    grid-template-rows: 1fr;

    align-items: center;
    justify-items: center;

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 0rem;
    }
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