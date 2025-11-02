import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    justify-items: start;
    align-items: center;
    gap: 1.5rem;

    padding: 2rem;

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        justify-items: center;
        padding: 1.5rem;
        gap: 1rem;
    }
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    font-family: "raleway";

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1.25rem;
        text-align: center;
    }
`;

const Links = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        justify-content: center;
        gap: 0.75rem;
    }
`;

const LinkItem = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    
    color: rgba(255, 255, 255, 0.8);
    font-family: "raleway";
    font-size: 1rem;
    font-weight: 400;
    
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background: rgba(48, 127, 246, 0.2);
        border-color: rgba(48, 127, 246, 0.5);
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(48, 127, 246, 0.3);
    }

    i {
        font-size: 1.1rem;
    }

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 0.9rem;
        padding: 0.6rem 1rem;
    }
`;

const aboutDetails = {
    itemIcon: 'fas fa-address-card',
    itemCopy: 'About',
    itemLink: 'https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai',
};

// const blogDetails = {
//     itemIcon: 'fas fa-file-alt',
//     itemCopy: 'Blog',
//     itemLink: 'blog',
// };
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
    // blogDetails,
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