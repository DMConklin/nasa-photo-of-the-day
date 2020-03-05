import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MediaContainerDiv = styled.div``;
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

const ApodImage = styled.img`
    width: 100%;
`;
const ApodImageContainer = styled.div`
    position: relative;
    top: -50px;
    z-index: -1;
`;

const ApodVideo = styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
`;
const ApodVideoContainer = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
    margin-top: 35px;
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
                        <ApodImage src={props.url} alt={props.title} />
                    </ApodImageContainer>
                    <p className="copyright">{props.copyright ? '© ' + props.copyright : ''}</p>
                </MediaDiv>
            )
        }
    }, [props])

    return(
        <MediaContainerDiv>
            <ApodArticle>
                <h2>{props.title}</h2>
                <p>{props.date}</p>
                <p>{props.explanation}</p>
                {props.media_type === 'video' ? media : null}
            </ApodArticle>
                {props.media_type === 'image' ? media : null}
        </MediaContainerDiv>
    )
}

export default MediaContainer;