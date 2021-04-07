import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import {
    markdownContent,
    markdownWithCode,
    blogOne
} from './Content';

const Root = styled.div`
    height: 100%;
    overflow: hidden;

    font-family: "avenir";
    font-size: 1.5rem;

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
            <Link
                to={`/`}
            >
                Back to Portfolio
            </Link>
            {/* <ReactMarkdown source={blogOne} /> */}
            {/* <ReactMarkdown source={markdownContent} /> */}
            {/* <ReactMarkdown source={markdownWithCode} /> */}
        </Root>
    );
}

export default SingleBlog;
