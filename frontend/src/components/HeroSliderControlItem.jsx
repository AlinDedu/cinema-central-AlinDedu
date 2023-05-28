import React from 'react';
import {imageBaseURL} from "../assets/js/api.js";

const HeroSliderControlItem = ({
   index,
   movie,
   active,
   toggleSlide
}) => {
    const {
        poster_path,
        title
    } = movie
    return (
        <button className={`poster-box slider-item ${active ? "active" : ""}`} slider-control={index} onClick={toggleSlide}>
            <img
                src={`${imageBaseURL}w154${poster_path}`}
                alt={`Slide to ${title}`}
                loading="lazy"
                draggable="false"
                className="img-cover"
            />
        </button>
    );
};

export default HeroSliderControlItem;