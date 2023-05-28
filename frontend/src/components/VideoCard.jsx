import React from 'react';

const VideoCard = ({
   name,
   videoKey
}) => {
    return (
        <div className="video-card">
            <iframe
                width={500}
                height={294}
                src={`https://www.youtube.com/embed/${videoKey}?&theme=dark&color=white&rel=0`}
                frameBorder="0"
                allowFullScreen={true}
                title={name}
                className="img-cover"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default VideoCard;