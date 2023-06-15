import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Overlay from "../components/Overlay.jsx";
import SearchModal from "../components/SearchModal.jsx";
import React, {useEffect, useState} from "react";
import {api_key, fetchDataFromServer} from "../assets/js/api.js";
import MovieCategoryGridList from "../components/MovieCategoryGridList.jsx";

const CategoryPage = ({
      searching,
      setSearching,
      toggleSidebar,
      isSidebarOpen,
      handleSearchInputChange,
      searchQuery,
      handleSearchModalClose
}) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const category = localStorage.getItem("category_name");
    const categoryId = localStorage.getItem("category_id");

    document.title = `${category} Movies - Cinema Central`;

    useEffect(() => {
        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&with_genres=${categoryId}`, function ({ results: movieList, total_pages }) {
            setMovies(movieList);
            setTotalPages(total_pages);
        })
    }, [])

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
            <article className="container-movies" page-content="">
                {
                    movies &&
                    <MovieCategoryGridList movieList={movies} title={`${category} Movies`} currentPage={currentPage} setCurrentPage={setCurrentPage} setMovieList={setMovies} categoryId={categoryId}/>
                }
            </article>
            <SearchModal
                searchQuery={searchQuery}
                handleSearchModalClose={handleSearchModalClose}
                setSearching={setSearching}
            />
        </main>
    )
}

export default CategoryPage;