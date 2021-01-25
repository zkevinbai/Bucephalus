import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Root = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(7, 10rem);
`;

const Name = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    background: lightblue;
`;

const Current = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
    background: coral;
`;

const AllBlogs = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
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

    text-align: center;
    font-size: 8rem;
    font-family: avenir;
`;

const getBlogs = () => {
    const array = [];

    for (let i = 1; i < 13; i++) {
        array.push(
            <Link
                to={`/blog/${i}`}
            >
                <BlogBox>
                    {i}
                </BlogBox>
            </Link>
        );
    };

    return array;
}

export const BlogLandingPage = () => {

    const blogs = getBlogs();

    return (
        <Root>
            <Name>
                Name
            </Name>
            <Current>
                Current
                ReadmoreButton
            </Current>
            <AllBlogs>
                {blogs}
            </AllBlogs>
        </Root>
    );
}

export default BlogLandingPage;
