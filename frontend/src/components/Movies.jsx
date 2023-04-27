import {useEffect, useState} from "react";
import {MDBRow, MDBCol, MDBBtn} from "mdbreact";
import Movie from "./Movie.jsx";
import NavBar from "./NavBar.jsx";

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
            <NavBar />
            <MDBRow className="justify-content-center p-5 bg-dark movies-container">
                {movies.map(movie => (
                    <MDBCol key={movie.id} xl="2" lg="3" md="4" sm="6" xs="12">
                        <Movie {...movie} />
                    </MDBCol>
                ))}
            </MDBRow>
            <div className="page-buttons d-flex justify-content-center bg-dark">
                <MDBCol size="6" md="3" className="text-center mb-3">
                    <MDBBtn color="primary" onClick={handlePrevPage} disabled={page === 1}>
                        Previous Page
                    </MDBBtn>
                </MDBCol>
                <MDBCol size="6" md="3" className="text-center mb-3">
                    <MDBBtn color="primary" onClick={handleNextPage}>
                        Next Page
                    </MDBBtn>
                </MDBCol>
            </div>
        </div>
    );
}

export default Movies;