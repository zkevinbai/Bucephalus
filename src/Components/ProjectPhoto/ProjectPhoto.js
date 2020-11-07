import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    padding: 10px;
    margin: 3px;
    justify-self: center;

    img {
        height: 14rem;
        border-radius: 15px;
        box-shadow: 0 0 3px;
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