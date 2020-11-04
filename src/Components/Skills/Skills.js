import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 0.15fr 1fr 1fr 0.15fr;
    justify-items: center;
    align-items: center;

    font-family: "raleway";
`;

const Title = styled.div`
    grid-row: 2;
    grid-column: 2;

    font-weight: 700;
    font-size: 39px;
`;

const Links = styled.div`
    grid-row: 3;
    grid-column: 2;

    font-family: "raleway";
    font-weight: 300;
    font-size: 25px;

    background: rgba(255, 255, 255, 0.25);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    padding: 5px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    justify-items: middle;
`;

const LinkItem = styled.div`
    display: grid;
    grid-template-columns: 35px 1fr;
    grid-template-columns: 28px 1fr;
    grid-template-rows: 1fr;

    color: black;

    :hover {
        color: rgb(242, 242, 242);
        color: rgb(86, 194, 255);
    }

    a:hover{
        color: rgb(198, 234, 255);
        color: rgb(86, 194, 255);
        text-decoration: underline;
    }
`;

const aboutDetails = {
    itemIcon: 'fas fa-address-card',
    itemCopy: 'About',
    itemLink: 'https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai',
};

const emailDetails = {
    itemIcon: 'fas fa-paper-plane',
    itemCopy: 'Email',
    itemLink: 'mailto:hello@zkevinbai.com',
};

const githubDetails = {
    itemIcon: 'fab fa-github',
    itemCopy: 'Github',
    itemLink: 'https://github.com/zkevinbai',
};

const linkedinDetails = {
    itemIcon: 'fab fa-linkedin',
    itemCopy: 'Linkedin',
    itemLink: 'https://www.linkedin.com/in/zkevinbai/',
};

const SkillsList = [
    aboutDetails,
    emailDetails,
    githubDetails,
    linkedinDetails,
];

export const Skills = () => {
    return (
        <Root>
            <Title>
                Full Stack Software Engineer
            </Title>
            <Links>
                {SkillsList.map(({
                        itemIcon,
                        itemCopy,
                        itemLink,
                    }) => (
                        <LinkItem>
                            <i class={itemIcon}/>
                            <a href={itemLink}>{itemCopy}</a>
                        </LinkItem>
                    ))
                }
            </Links>
        </Root>
    );
}

export default Skills;