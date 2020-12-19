import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

// import myMarkdownFile from 'src/Features/Blog/SingleBlog/OriginalInstructions.md';

// let content;

// fetch(myMarkdownFile)
//     .then(response => response.text())
//     .then(text => {
//         // Logs a string of Markdown content.
//         // Now you could use e.g. <rexxars/react-markdown> to render it.
//         content = text;
//     });

const Root = styled.div`
    margin-left: 20px;

    border-radius: 15px;
    margin: 5px;
    border: 5px solid black;
    border-radius: 15px;

    width: 50%;

    font-family: "avenir";
    font-size: 25px;
`;

export const SingleBlog = ({
    markdownContent,
}) => {
    const content = `
# Header 1

---

## Header 2

_italic_

**bold**


[test](bai)


Close out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample


Lunch with Mom Dad
  `;

    return (
        <Root>
            <ReactMarkdown source={content} />
        </Root>
    );
}

export default SingleBlog;
