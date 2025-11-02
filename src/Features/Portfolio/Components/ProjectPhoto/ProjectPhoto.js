import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        max-height: 20rem;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        object-fit: cover;
    }

    &:hover img {
        transform: scale(1.02);
        box-shadow: 0 12px 32px rgba(48, 127, 246, 0.3);
        border-color: rgba(48, 127, 246, 0.3);
    }

    @media (max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 0.75rem;

        img {
            max-height: 12rem;
        }
    }
`;

export const ProjectPhoto = ({
    TitleCopy,
}) => {
    // note to self, figure out how to do import '~/assets/projects` where ~ resolves to src
    const requireImage = (title) => require('../../../../assets/projects/' + title + '.png');

    return (
        <Root>
            <img src={requireImage(TitleCopy)} alt={TitleCopy + ' screenshot'} />
        </Root>
    );
}

export default ProjectPhoto;