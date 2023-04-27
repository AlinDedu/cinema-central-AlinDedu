import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./styles/MovieDetails.css";
import NavBar from "./NavBar.jsx";

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState();

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=b11b1adf41fea93b12a7421bf293f00e")
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.log(error));
    }, [id]);

    const getGenres = () => {
        let string = '';
        const genres = movie.genres;
        console.log(genres);
        genres.map((genre, index) => {
            string += genre.name;
            if (index < genres.length - 1) {
                string += ', ';
            }
        });
        return string;
    }

    const backgroundStyle = {
        backgroundImage: movie ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : ''
    };


    return (
        movie&&
            <div className="movie-details" style={backgroundStyle}>
                <NavBar />
                <h1 className="original-title">{movie.title}</h1>
                <p>Language: {movie.original_language}</p>
                <p>Genres: {getGenres()}</p>
                <p>Description: {movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Vote Count: {movie.vote_count}</p>
                <p>Vote Average: {movie.vote_average}</p>
            </div>
    )

}

export default MovieDetails;
