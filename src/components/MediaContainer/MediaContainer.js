import React, { useState, useEffect } from 'react';

const MediaContainer = (props) => {
    const [media, setMedia] = useState();
    useEffect(() => {
        if (props.media_type === 'video') {
            setMedia(
                <iframe 
                    width="560" 
                    height="315" 
                    src={props.url} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title={props.title}>
                </iframe>
            )
        } else if (props.media_type === 'image') {
            setMedia(
                <img src={props.url} alt={props.title} />
            )
        }
    }, [props])
    return(
        <div className="media-container">
            <h1>{props.title}</h1>
            {media}
            <p>{props.explanation}</p>
        </div>
    )
}

export default MediaContainer;