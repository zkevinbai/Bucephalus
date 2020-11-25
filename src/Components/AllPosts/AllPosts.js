import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import sanityClient from '../../client';

const Thumbnail = styled.div`
    height: 10rem;

    align-items: center;
    font-size: 5rem;

    :hover {
        background: lightblue;
    }
`;

const ThumbnailImage = styled.img`
    height: inherit;
`;

const AllPosts = () => {
    const [allPostsData, setAllPosts] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }
        `)
        .then((data) => setAllPosts(data))
        .catch(console.error);
    }, [])

    return (
        <div>
            All Posts
            {
                allPostsData && 
                allPostsData.map((post, index) => {
                    return (
                        <Link
                            to={'/' + post.slug.current}
                            key={post.slug.current}
                        >
                            <Thumbnail>
                                <ThumbnailImage
                                    src={post.mainImage.asset.url}
                                    alt="hero"
                                />
                                {post.title}
                            </Thumbnail>
                        </Link>
                    )
                })
            }
        </div>
    )
};

export default AllPosts;
