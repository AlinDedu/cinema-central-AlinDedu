import React from 'react';
import {imageBaseURL} from "../assets/js/api.js";

const HeroSliderItem = ({
    index,
    movie,
    active
}) => {

    const genreList =  {
        asString(genreIdList) {
            let newGenreList = [];
            for (const genreId of genreIdList) {
                this[genreId] && newGenreList.push(this[genreId]);
            }
            return newGenreList.join(", ");
        }
    }

    return (
        <div className={`slider-item ${active ? "active" : ""}`} slider-item="">
            <img
                src={`${imageBaseURL}w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="img-cover"
                loading={"lazy"}
            />
            <div className="banner-content">
                <h2 className="heading">{movie.title}</h2>
                <div className="meta-list">
                    <div className="meta-item">{movie.release_date ? movie.release_date.split("-")[0] : "NA"}</div>
                    <div className="meta-item card-badge">{movie.vote_average ? movie.vote_average.toFixed(1) : "NA"}</div>
                </div>
                <p className="genre">{genreList.asString(movie.genre_ids)}</p>
                <p className="banner-text">{movie.overview}</p>
                <a href={`/movie/${movie.id}`} className="btn">
                    <img
                        src="/play_circle.png"
                        width={24}
                        height={24}
                        aria-hidden="true"
                        alt="play circle"
                    />
                    <span className="span">Watch Now</span>
                </a>
            </div>
        </div>
    );
};

export default HeroSliderItem;