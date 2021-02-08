import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;

    padding: 3rem 2rem 3rem 2rem;

    font-family: "raleway";
`;

const Title = styled.div`
    grid-row: 1;
    grid-column: 1;

    font-size: 3rem;
    font-weight: 700;

    @media(max-width: ${ MAX_MOBILE_WIDTH }) {
        font-size: 1.75rem;
    }
`;

const Links = styled.div`
    grid-row: 2;
    grid-column: 1;

    font-family: "raleway";
    font-size: 1.5rem;
    font-weight: 400;

    background: rgba(255, 255, 255, 0.25);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    padding: 0.5rem;

    display: flex;
    justify-items: middle;

    @media(max-width: ${ MAX_MOBILE_WIDTH }) {
        font-size: 1.25rem;
    }
`;

const LinkItem = styled.a`
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    display: grid;
    grid-template-columns: 2rem 1fr;
    grid-template-rows: 1fr;

    color: black;   

    :hover{
        color: rgb(86, 194, 255);
    }

    i {
        align-self: center;
        justify-self: center;
    }

    div {
        padding-left: 0.25rem;
        :hover{
            text-decoration: underline;
        }
    }

    @media(max-width: ${ MAX_MOBILE_WIDTH }) {
        grid-template-columns: 1.5rem 1fr;
    }
`;

const aboutDetails = {
    itemIcon: 'fas fa-address-card',
    itemCopy: 'About',
    itemLink: 'https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai',
};

const blogDetails = {
    itemIcon: 'fas fa-file-alt',
    itemCopy: 'Blog',
    itemLink: 'blog',
};
// XXX will want to use react router link instead of a tag, but for now its fine

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

const ContactList = [
    aboutDetails,
    blogDetails,
    emailDetails,
    githubDetails,
    linkedinDetails,
];

export const ContactInformation = () => {
    return (
        <Root>
            <Title>
                Full Stack Software Engineer
            </Title>
            <Links>
                {ContactList.map(({
                        itemIcon,
                        itemCopy,
                        itemLink,
                    }) => (
                        <LinkItem
                            href={itemLink}
                            key={itemCopy}
                        >                            
                            <i className={itemIcon} />
                            <div>{itemCopy}</div>
                        </LinkItem>
                    ))
                }
            </Links>
        </Root>
    );
}

export default ContactInformation;