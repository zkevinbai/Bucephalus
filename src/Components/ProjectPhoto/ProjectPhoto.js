import React from 'react';
import styled from 'styled-components';
const baseURL = './';
// const baseURL = '../../../assets/projects';

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
    TitleCopy,
}) => {
    return (
        <Root>
            {/* <img src={require('./aurelian.png')} alt={PhotoCopy}></img> */}
            <img src={require(baseURL + TitleCopy + '.png')} alt={TitleCopy + ' screenshot'} />
        </Root>
    );
}

export default ProjectPhoto;