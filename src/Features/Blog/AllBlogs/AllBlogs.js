import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SingleBlog from '../SingleBlog';

// import { MAX_MOBILE_WIDTH } from '../constants';
const MAX_MOBILE_WIDTH = '800px';

const Root = styled.div`
    /* display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(7, 10rem); */

    @media(max-width: ${ MAX_MOBILE_WIDTH }) {
        margin: 0rem;
    }
    margin-left: 10rem;
    margin-right: 10rem;
`;

const Name = styled.div`
    /* grid-column-start: 1;
    grid-column-end: 4; */
    font-family: "avenir";
    font-weight: 3rem;
    font-size: 5rem;

    border-radius: 15px;
    margin: 0.35rem;
    margin-left: 3rem;
    border-radius: 15px;
    padding: 1rem; 
`;

const Current = styled.div`
    /* grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4; */
    /* background: coral; */

    /* height: 30rem; */

    border-radius: 15px;
    margin: 5px;
    /* margin-left: 3rem;
    margin-right: 3rem; */
    border: 0.25rem solid black;
    border-radius: 15px;
    padding: 1rem; 
`;

const MainBlogView = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
`;

const AllBlogs = styled.div`
    /* grid-column-start: 1;
    grid-column-end: 5; */
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
                Ziheng Kevin Bai
            </Name>
            <MainBlogView>
                <Current>
                    <SingleBlog />
                    <Link
                        to={`/blog/1`}
                    >
                        Read More
                    </Link>
                </Current>
                <AllBlogs>
                    {blogs}
                </AllBlogs>
            </MainBlogView>
        </Root>
    );
}

export default BlogLandingPage;
