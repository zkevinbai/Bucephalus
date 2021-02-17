import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

// my signature color rgb(48, 127, 246)

const Root = styled.div`
    /* background-image: linear-gradient(to bottom right,rgb(255,150,141), rgb(255,252,103), rgb(86,194,255)); */
    display: grid;
    justify-items: center;
    align-items: center;

    border-radius: 15px;
    margin: 5px;
    /* border: 5px solid black; */
    border-radius: 15px;

    font-family: "lobster";
    font-size: 5.5rem;
    /* color: rgb(48, 127, 246); */

    @media(max-width: ${ MAX_MOBILE_WIDTH }) {
        font-size: 4.2rem;
    }
`;

export const Name = () => {
    return (
        <Root>
            Ziheng Kevin Bai   
        </Root>
    );
}

export default Name;