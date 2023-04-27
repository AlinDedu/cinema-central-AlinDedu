import {useEffect, useState} from "react";
import Movie from "./Movie.jsx";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b11b1adf41fea93b12a7421bf293f00e&page=" + page)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => console.log(error));
    }, [page]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        console.log(page);
    }

    const handlePrevPage = () => {
        setPage((prevPage) => prevPage - 1);
        console.log(page);
    }



    return (
        <div>
            <h1 className="title">Movies</h1>
            <div className="movies-grid">
                {movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
            <div className="page-buttons">
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Previous Page
                </button>
                <button onClick={handleNextPage}>Next Page</button>
            </div>
        </div>
    );
}

export default Movies;