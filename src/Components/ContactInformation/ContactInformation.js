import React from 'react';
import styled from 'styled-components';

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

    font-weight: 700;
    font-size: 3rem;
`;

const Links = styled.div`
    grid-row: 2;
    grid-column: 1;

    font-family: "raleway";
    font-weight: 300;
    font-size: 25px;

    background: rgba(255, 255, 255, 0.25);
    border-radius: 15px;
    box-shadow: 0 0 3px;

    padding: 0.5rem;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    justify-items: middle;

    @media (max-width: 1166px) {
        margin-top: 1rem;
    }
`;

const LinkItem = styled.a`
    display: grid;
    grid-template-columns: 35px 1fr;
    grid-template-columns: 28px 1fr;
    grid-template-rows: 1fr;

    color: black;   

    :hover{
        color: rgb(86, 194, 255);
    }

    i {
        align-self: center;
        justify-self: start;
    }

    p {
        padding-left: 0.25rem;
        :hover{
            text-decoration: underline;
        }
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

const ContactList = [
    aboutDetails,
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
                            <p>{itemCopy}</p>
                        </LinkItem>
                    ))
                }
            </Links>
        </Root>
    );
}

export default ContactInformation;