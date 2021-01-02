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
    border-radius: 15px;
    margin: 5px;
    margin-left: 20px;
    border: 5px solid black;
    border-radius: 15px;
    padding: 1rem;

    width: 50%;

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
    markdownContent,
}) => {
    // since this is markdown, it must be left aligned to show properly
    const content = `
# This is my blog title

---

## Header 2

_italic_

**bold**

[test](bai)

[hhhhh](j)

> quote

Close out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom Dad
Close out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

Lunch with Mom DadClose out PR from last night for disabling preview and fixing the IE view of a proposals component.Finish a new ticket to update the SPR sample

  `;
    const markdownWithCode = `## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\``;

    // 1px represents 0.0625rem

    return (
        <Root>
            <ReactMarkdown source={content} />
            <ReactMarkdown source={markdownWithCode} />
        </Root>
    );
}

export default SingleBlog;