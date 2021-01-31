import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import {
    markdownContent,
    markdownWithCode,
} from './Content';

// import Content from './Content';
// const {
//     markdownContent,
//     markdownWithCode
// } = Content;

const Root = styled.div`
    /* border-radius: 15px;
    margin: 5px;
    margin-left: 20px;
    border: 5px solid black;
    border-radius: 15px;
    padding: 1rem; */

    /* width: 50%; */
    
    height: 100%;
    overflow: hidden;

    font-family: "avenir";
    font-size: 25px;

    a {
        color: #f55f4e;
    }

    pre {
        background: lightgray;
        border-radius: 1rem;
        padding: 1rem;
    }
`;

export const SingleBlog = ({
    content
}) => {
    return (
        <Root>
            {/* <Link
                to={`/blog/`}
            >
                All Blogs
            </Link> */}
            <ReactMarkdown source={markdownContent} />
            <ReactMarkdown source={markdownWithCode} />
        </Root>
    );
}

export default SingleBlog;
