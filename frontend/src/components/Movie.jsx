

const Movie = (movie) => {
    return (
        <a key={movie.id} href={`movies/${movie.id}`}>
                <img
                    data-mdb-ripple-color="danger"
                    className="movie-item"
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                    style={{maxWidth: "100%", maxHeight: "100%"}}
                />
        </a>
    );
};

export default Movie;
