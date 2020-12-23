import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(11rem, 1fr));
        // by setting min to be greater than the max of my elements
        // the alignment will always be perfect
`;

const BlogBox = styled.div`
    background-image: linear-gradient(to bottom right,rgb(255,150,141), rgb(255,252,103), rgb(86,194,255));

    border-radius: 15px;
    margin: 5px;
    border: 5px solid black;
    border-radius: 15px;

    height: 10rem;
    width: 20rem;
`;

const getBlogs = () => {
    const array = [];

    for (let i = 0; i < 11; i++) {
        array.push(
            <BlogBox>
                {i}
            </BlogBox>
        );
    };

    return array;
}

export const Name = () => {

    const blogs = getBlogs();

    return (
        <Root>
            {blogs}
        </Root>
    );
}

export default Name;
