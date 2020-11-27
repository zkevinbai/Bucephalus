import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import sanityClient from '../../client';

const OnePost = () => {
    const [postData, setPost] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient.fetch(`
            *[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                author{
                    name,
                    image{
                        asset{
                            _id,
                            url
                        }
                    }
                }
            }
        `)
            .then((data) => setPost(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!postData) return <div> loading... </div>; 

    return (
        <div>
            One Post
            {postData.title}
            <img
                src={postData.author.image.asset.url}
                alt='Kevin'
            />
        </div>
    )
};

export default OnePost;
