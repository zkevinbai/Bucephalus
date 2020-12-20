import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    padding: 0.75rem;
    margin: 0.25rem;
    justify-self: center;

    img {
        height: 14rem;
        border-radius: 15px;
        box-shadow: 0 0 3px;
    }

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 0.50rem;
        margin: 0rem;

        img {
            height: 8rem;
        }
    }
`;

export const ProjectPhoto = ({
    TitleCopy,
}) => {
    const requireImage = (title) => require('./assets/' + title + '.png');

    return (
        <Root>
            <img src={requireImage(TitleCopy)} alt={TitleCopy + ' screenshot'} />
        </Root>
    );
}

export default ProjectPhoto;