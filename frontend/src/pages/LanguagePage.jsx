import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {api_key, fetchDataFromServer} from "../assets/js/api.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Overlay from "../components/Overlay.jsx";
import SearchModal from "../components/SearchModal.jsx";
import MovieLanguageGridList from "../components/MovieLanguageGridList.jsx";

const LanguagePage = ({
      handleSearchInputChange,
      searchQuery,
    itemsCount,
      handleSearchModalClose,
      searching,
      toggleSidebar,
      isSidebarOpen,
      setSearching
}) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const language = localStorage.getItem("language_name");
    const language_code = localStorage.getItem("language_code");

    document.title = `${language} Movies - Cinema Central`

    useEffect(() => {
        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&with_original_language=${language_code}`, function ({ results: movieList, total_pages }) {
            setMovies(movieList);
            setTotalPages(total_pages);
        })
    }, [])

    return (
        <main>
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                itemsCount={itemsCount}
                handleSearchInputChange={handleSearchInputChange}
                searching={searching}
            />
            <Sidebar isSidebarOpen={isSidebarOpen}/>
            <Overlay isSidebarOpen={isSidebarOpen}/>
            <article className="container-movies" page-content="">
                {
                    movies &&
                    <MovieLanguageGridList movieList={movies} title={`${language} Movies`} currentPage={currentPage} setCurrentPage={setCurrentPage} setMovieList={setMovies} languageCode={language_code}/>
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

export default LanguagePage;