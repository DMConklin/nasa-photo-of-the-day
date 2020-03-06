import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MediaDiv = styled.div`
    flex-direction: column;
    width: 100%;
`;
const ApodArticle = styled.article`
    text-align: left;
    width: 75%;
    margin: 0 auto;
    background-color: rgba(255,255,255,1);
    padding: 25px;
    border-radius: 15px;
    box-shadow: 5px 5px 15px;
`;
const ApodArticleHeader = styled.h2`

`;
const ArticleDate = styled.p`

`;
const ArticleContent = styled.p`

`;
const MediaCopyright = styled.p`

`;

const ApodImage = styled.img`
    width: 100%;
`;
const ApodImageLink = styled.a`

`;
const ApodImageContainer = styled.div`

`;

const ApodVideo = styled.iframe`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const ApodVideoContainer = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
`;

const MediaContainer = (props) => {
    const [media, setMedia] = useState();
    useEffect(() => {
        if (props.media_type === 'video') {
            setMedia(
                <ApodVideoContainer>
                    <ApodVideo 
                        width="560" 
                        height="315" 
                        src={props.url} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        title={props.title}>
                    </ApodVideo>
                </ApodVideoContainer>
            )
        } else if (props.media_type === 'image') {
            setMedia(
                <MediaDiv>
                    <ApodImageContainer>
                        <ApodImageLink href={props.url} target="__blank"><ApodImage src={props.url} alt={props.title} /></ApodImageLink>
                    </ApodImageContainer>
                </MediaDiv>
            )
        }
    }, [props])

    return(
            <ApodArticle>
                <ApodArticleHeader>{props.title}</ApodArticleHeader>
                <ArticleDate>{props.date}</ArticleDate>
                <ArticleContent>{props.explanation}</ArticleContent>
                {media}
                <MediaCopyright className="copyright">{props.copyright ? '© ' + props.copyright : ''}</MediaCopyright>
            </ApodArticle>
    )
}

export default MediaContainer;