import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

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
        <>
            <h1>{postData.title}</h1>
            <div>
                One Post
                <img
                    src={urlFor(postData.authorImage).width(100).url()}
                    alt='Kevin'
                />
                <p>{postData.name}</p>
            </div>
            <div>
                <img
                    src={urlFor(postData.mainImage).width(100).url()}
                    alt='hello'
                />
                <BlockContent
                    blocks={postData.body}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div>
        </>
    )
};

export default OnePost;
