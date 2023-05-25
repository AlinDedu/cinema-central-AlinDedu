import React from 'react';
import {imageBaseURL} from "../assets/js/api.js";

const MovieCard = ({movie}) => {
    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    return (
        <div className="movie-card">
            <figure className="poster-box card-banner">
                <img
                    src={`${imageBaseURL}w342${poster_path}`}
                    alt={title}
                    className="img-cover"
                    loading="lazy"
                />
            </figure>
            <div className="meta-list">
                <div className="meta-item">
                    <img
                        src={"/star.png"}
                        width={20}
                        height={20}
                        loading="lazy"
                        alt="rating"
                    />
                    <span className="span">{vote_average ? vote_average.toFixed(1) : "NA"}</span>
                </div>
                <div className="card-badge">{release_date ? release_date.split("-")[0] : "NA"}</div>
                <a
                    href={`/movie/${id}`}
                    className="card-btn"
                    title={title}
                ></a>
            </div>
        </div>
    );
};

export default MovieCard;