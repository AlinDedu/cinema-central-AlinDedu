import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {api_key, fetchDataFromServer, imageBaseURL} from "../assets/js/api.js";
import Sidebar from "../components/Sidebar.jsx";
import Overlay from "../components/Overlay.jsx";
import MovieCard from "../components/MovieCard.jsx";
import VideoCard from "../components/VideoCard.jsx";
import "../assets/css/style.css"
import Header from "../components/Header.jsx";
import SearchModal from "../components/SearchModal.jsx";

const MovieDetail = ({
     toggleSidebar,
     isSidebarOpen,
     handleSearchInputChange,
     searchQuery,
     handleSearchModalClose,
     searching,
     setSearching
}) => {
    const [movie, setMovie] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchDataFromServer(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=casts,videos,images,releases`, function (movie) {
            setMovie(movie);
        })
        fetchDataFromServer(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&page=1`, function(movieList) {
            setSuggestions(movieList);
        });
    }, []);

    const getGenres = function (genreList) {
        const newGenreList = [];

        for (const { name } of genreList) newGenreList.push(name);
        return newGenreList.join(", ");
    }

    const getCasts = function (castList) {
        const newCastList = [];

        for (let i = 0, len = castList.length; i < len && i < 10; i++) {
            const { name } = castList[i];
            newCastList.push(name);
        }
        return newCastList.join(", ");
    }

    const getDirectors = function (crewList) {
        const directors = crewList.filter(({ job }) => job === "Director");
        const directorList = [];
        for (const { name } of directors) directorList.push(name);
        return directorList.join(", ");
    }

    const filterVideos = function (videoList) {
        console.log(videoList)
        return videoList.filter(({ type, site}) => (type === "Trailer" || type === "Teaser") && site === "YouTube");
    }

    document.title = `${movie.title} - Cinema Central`;
    console.log(movie)

    return (
        <main>
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                handleSearchInputChange={handleSearchInputChange}
                searching={searching}
            />
            <Sidebar isSidebarOpen={isSidebarOpen}/>
            <Overlay isSidebarOpen={isSidebarOpen}/>
            {movie &&
                <article className="container-movies" page-content="">
                    <div className="movie-detail">
                        <div className="backdrop-image" style={{backgroundImage: `url(${imageBaseURL}${"w1280" || "original"}${movie.backdrop_path || movie.poster_path})`}}></div>
                        <figure className="poster-box movie-poster">
                            <img
                                src={`${imageBaseURL}w342${movie.poster_path}`}
                                alt={`${movie.title} poster`}
                                className="img-cover"
                            />
                        </figure>
                        <div className="detail-box">
                            <div className="detail-content">
                                <h1 className="heading">{movie.title}</h1>
                                <div className="meta-list">
                                    <div className="meta-item">
                                        <img
                                            src={"/star.png"}
                                            width={20}
                                            height={20}
                                            alt="rating"
                                        />
                                        <span className="span">{`${movie.vote_average ? movie.vote_average.toFixed(1) : "NA"}`}</span>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="meta-item">{movie.runtime}m</div>
                                    <div className="separator"></div>
                                    <div className="menu-item">{`${movie.release_date ? movie.release_date.split("-")[0] : "NA"}`}</div>
                                    <div className="meta-item card-badge">{movie.releases?.countries[0].certification}</div>
                                </div>
                                <p className="genre">{movie.genres&&getGenres(movie.genres)}</p>
                                <p className="overview">{movie.overview}</p>
                                <ul className="detail-list">
                                    <div className="list-item">
                                        <p className="list-name">Starring</p>
                                        <p>{movie.casts?.cast&&getCasts(movie.casts.cast)}</p>
                                    </div>
                                    <div className="list-item">
                                        <p className="list-name">Directed By</p>
                                        <p>{movie.casts?.crew&&getDirectors(movie.casts.crew)}</p>
                                    </div>
                                </ul>
                            </div>
                            <div className="title-wrapper">
                                <h3 className="title-large">Trailers and Clips</h3>
                            </div>
                            <div className="slider-list">
                                <div className="slider-inner">
                                    {movie.videos?.results&&filterVideos(movie.videos.results).map((video, index) => <VideoCard name={video.name} videoKey={video.key} key={index}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="movie-list" aria-label="You May Also Like">
                        <div className="title-wrapper">
                            <h3 className="title-large">You May Also Like</h3>
                        </div>
                        <div className="slider-list">
                            <div className="slider-inner">
                                {suggestions.results?.map((movie, index) => <MovieCard key={index} movie={movie}/>)}
                            </div>
                        </div>
                    </section>
                </article>
            }
            <SearchModal
                searchQuery={searchQuery}
                handleSearchModalClose={handleSearchModalClose}
                setSearching={setSearching}
            />
        </main>
    );
};

export default MovieDetail;
