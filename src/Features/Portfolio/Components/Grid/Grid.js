import React from 'react';
import styled from 'styled-components';

import { MAX_TABLET_WIDTH } from '../constants';

const Root = styled.div`
    min-width: 100%; 
    min-height: 100vh;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem;

    background: linear-gradient(
        135deg,
        #0f0f23 0%,
        #1a1a3a 50%,
        #0f0f23 100%
    );
    
    /* Subtle animated gradient overlay */
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            circle at 20% 50%,
            rgba(48, 127, 246, 0.1) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 80% 80%,
            rgba(138, 43, 226, 0.1) 0%,
            transparent 50%
        );
        pointer-events: none;
        z-index: 0;
    }

    & > * {
        position: relative;
        z-index: 1;
    }

    @media (max-width: ${MAX_TABLET_WIDTH}) {
        height: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, auto);
        gap: 1.5rem;
        padding: 1.5rem;
        padding-bottom: 3rem;
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