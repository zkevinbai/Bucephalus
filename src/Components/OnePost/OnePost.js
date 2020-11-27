import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';

import sanityClient from '../../client';

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => {
    return builder.image(source);
};

const OnePost = () => {
    const [postData, setPostData] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[slug.current == $slug]{
                    title,
                    slug,
                    mainImage{
                        asset->{
                        _id,
                        url
                        }
                    },
                    body,
                    "name": author->name,
                    "authorImage": author->image
                }`,
            { slug }
        )
        .then((data) => setPostData(data[0]))
        .catch(console.error);
    }, [slug]);

    if (!postData) {
        return <div> loading... </div>;
    }

    return (
        <div>
            One Post
            <h2>{postData.title}</h2>
            <img
                src={postData.author.image.asset.url}
                alt='Kevin'
            />
        </div>
    )
};

export default OnePost;
