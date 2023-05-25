import React, {useEffect, useState} from 'react';
import {api_key, fetchDataFromServer, getMovieList} from "../assets/js/api.js";

const Sidebar = ({isSidebarOpen}) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({genres}) {
            const newGenreList = [];
            for (const {id, name} of genres) {
                newGenreList[id] = name;
            }
            setGenres(newGenreList);
        });
    }, [])

    const setLocalLanguage = (code, name) => {
        localStorage.setItem("language_code", code);
        localStorage.setItem("language_name", name);
    }

    const setLocalCategory = (id, name) => {
        localStorage.setItem("category_id", id);
        localStorage.setItem("category_name", name)
    }

    return (
        <nav className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
            <div className="sidebar-inner">
                <div className="sidebar-list">
                    <p className="title">Genre</p>
                    {genres && Object.entries(genres).map(([genreId, genreName], index) => (<a key={index} className="sidebar-link" href={`/movies/category/${genreName}`} menu-close="" onClick={()=> setLocalCategory(genreId, genreName)}>{genreName}</a>))}
                </div>
                <div className="sidebar-list">
                    <p className="title">Language</p>
                    <a href="/movies/language/en" menu-close="" className="sidebar-link" onClick={()=> setLocalLanguage("en", "English")}>English</a>
                    <a href="/movies/language/fr" menu-close="" className="sidebar-link" onClick={()=> setLocalLanguage("fr", "French")}>French</a>
                    <a href="/movies/language/de" menu-close="" className="sidebar-link" onClick={()=> setLocalLanguage("de", "German")}>German</a>
                    <a href="/movies/language/ro" menu-close="" className="sidebar-link" onClick={()=> setLocalLanguage("ro", "Romanian")}>Romanian</a>
                    <a href="/movies/language/es" menu-close="" className="sidebar-link" onClick={()=> setLocalLanguage("es", "Spanish")}>Spanish</a>
                </div>
                <div className="sidebar-footer">
                    <p className="copyright">&copy; 2023 CodeCrafters</p>
                </div>
                <img
                    src="/tmdb-logo.svg"
                    width={130}
                    height={17}
                    alt="The Movie Database Logo"
                />
            </div>
        </nav>
    );
};

export default Sidebar;
// Nr 1
// <a className="sidebar-link" href="" menu-close="" onClick={()=> getMovieList(urlParam, genreName)}