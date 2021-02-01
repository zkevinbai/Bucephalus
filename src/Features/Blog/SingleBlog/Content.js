// since this is markdown, it must be left aligned to show properly
export const markdownContent = `
# Why I became a Software Engineer

---

\`\`\`js
Date Published: 1 February 2021 Monday
\`\`\`

I became a software engineer 

## Part 1: From High School to the United Nations

1. it would increase my chances of getting to the united nations
2. it would remove my regrets
3. it would be insurance

## Part 2: How I became a Software Engineer
`;

export const markdownWithCode = `## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\``;