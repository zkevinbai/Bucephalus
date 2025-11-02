import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: grid;
    padding: 1.5rem;
    grid-template-columns: ${({ ShouldEmphasizeLeft }) => (
        ShouldEmphasizeLeft ? '1.5fr 1fr' : '1fr 1.5fr' )
    };
    grid-template-rows: 1fr;
    gap: 1.5rem;

    align-items: center;
    justify-items: stretch;

    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        padding: 1rem;
        gap: 1rem;
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