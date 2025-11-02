import React from 'react';
import styled from 'styled-components';

import { MAX_MOBILE_WIDTH } from '../constants';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 2rem;
    justify-content: center;
    max-width: 900px;

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        padding: 2rem 1.5rem;
        gap: 1.5rem;
    }
`;

const Greeting = styled.h1`
    font-family: "raleway";
    font-size: 3.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.1;
    
    background: linear-gradient(
        135deg,
        #ffffff 0%,
        #a0a0ff 50%,
        #ffffff 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s ease-in-out infinite;

    @keyframes shimmer {
        0%, 100% {
            background-position: 0% center;
        }
        50% {
            background-position: 100% center;
        }
    }

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 2.25rem;
    }
`;

const Paragraph = styled.p`
    font-family: "raleway";
    font-size: 1.1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.8;
    letter-spacing: 0.01em;

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1rem;
        line-height: 1.7;
    }
`;

const EmojiSection = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
`;

const Emoji = styled.span`
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
`;

const ClosingParagraph = styled.p`
    font-family: "raleway";
    font-size: 1.1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.8;
    letter-spacing: 0.01em;

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 1rem;
        line-height: 1.7;
    }
`;

const ContactLinks = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
`;

const ContactLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    
    color: rgba(255, 255, 255, 0.9);
    font-family: "raleway";
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    
    transition: all 0.2s ease;

    &:hover {
        background: rgba(48, 127, 246, 0.25);
        border-color: rgba(48, 127, 246, 0.5);
        color: #ffffff;
        transform: translateY(-1px);
    }

    i {
        font-size: 1rem;
    }

    @media(max-width: ${MAX_MOBILE_WIDTH}) {
        font-size: 0.85rem;
        padding: 0.5rem 1rem;
    }
`;

export const Name = () => {
    return (
        <Root>
            <Greeting>Hello, my name is Kevin.</Greeting>
            
            <Paragraph>
                I know three things: FDE, Enterprise, and International. I am a William Jefferson Clinton Presidential Scholar and have studied at the University of California Berkeley, Oxford University, and the American University in Dubai.
            </Paragraph>

            <EmojiSection>
                <Emoji>🚀</Emoji>
                <Paragraph>
                    My main focus is leveraging technology to solve enterprise problems at the local, regional, and global level. Technology is the means, not the goal.
                </Paragraph>
            </EmojiSection>

            <EmojiSection>
                <Emoji>🧠</Emoji>
                <Paragraph>
                    My background spans diplomacy, sales, business development, product management, customer success, software engineering, and forward deployed engineering—which brings them all together. I build full-stack applications with JavaScript, TypeScript, React, and Python, love new opportunities, and learn quickly.
                </Paragraph>
            </EmojiSection>

            <EmojiSection>
                <Emoji>🌎</Emoji>
                <Paragraph>
                    I've lived and worked across North America, Europe, the Middle East, East Asia, Southeast Asia, and South America, and speak the six official languages of the United Nations.
                </Paragraph>
            </EmojiSection>

            <div>
                <ClosingParagraph>
                    You're very welcome to reach out.
                </ClosingParagraph>
                <ContactLinks>
                    <ContactLink href="https://www.linkedin.com/in/zkevinbai/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin" />
                        <span>LinkedIn</span>
                    </ContactLink>
                    <ContactLink href="mailto:hello@zkevinbai.com">
                        <i className="fas fa-paper-plane" />
                        <span>Email</span>
                    </ContactLink>
                    <ContactLink href="https://twitter.com/zkevinbai" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter" />
                        <span>Twitter</span>
                    </ContactLink>
                </ContactLinks>
            </div>
        </Root>
    );
}

export default Name;