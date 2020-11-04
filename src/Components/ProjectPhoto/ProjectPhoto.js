import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    background: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    padding: 10px;
    margin: 3px;
    justify-self: center;

    .img{
        height: 210px;
        border-radius: 15px;
        box-shadow: 0 0 3px;
    }
`;

export const ProjectPhoto = ({
    imagePath,
    imageCopy,
}) => {
    return (
        <Root>
            <img src={imagePath} alt={imageCopy}/>
        </Root>
    );
}

export default ProjectPhoto;