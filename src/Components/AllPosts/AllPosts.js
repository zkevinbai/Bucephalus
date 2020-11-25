import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../../client';

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
                            <span key={index}>
                                <img
                                    src={post.mainImage.asset.url}
                                    alt="hero"
                                />
                            </span>
                            <span>
                                {post.title}
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
};

export default AllPosts;
