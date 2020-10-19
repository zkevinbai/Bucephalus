import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    height: 5rem;
    width: 15rem;

    display: grid;
    padding: 0.5rem;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;

    align-items: center;
`;

const TestDiv = styled.div`
    height: 100%;
    background: blue;
`

export const GridBox = ({
    LeftComponent,
    RightComponent,
    ShouldEmphasizeLeft,
}) => {
    if (ShouldEmphasizeLeft) {
        return (
            <Root>
                <div>
                    I am a left emphasized gridBox
                </div>
                <TestDiv />
            </Root>
        )
    }

    return (
        <div>
            I am a gridBox
        </div>
    );
}

export default GridBox;