import React, {useEffect, useState} from 'react';
import Banner from "./Banner.jsx";
import {api_key, fetchDataFromServer} from "../assets/js/api.js";
import MovieRowList from "./MovieRowList.jsx";

const Container = () => {
    const [upcoming, setUpcoming] = useState([])
    const [trending, setTrending] = useState([])
    const [topRated, setTopRated] = useState([])

    const homePageSections = [
        {
            title: "Upcoming Movies",
            path: "/movie/upcoming"
        },
        {
            title: "Weekly Trending Movies",
            path: "/trending/movie/week"
        },
        {
            title: "Top Rated Movies",
            path: "/movie/top_rated"
        }
    ]

    useEffect(() => {
        fetchDataFromServer(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=1`, function (movieList) {
            setUpcoming(movieList)
        });
        fetchDataFromServer(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=1`, function (movieList) {
            setTrending(movieList)
        });
        fetchDataFromServer(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&page=1`, function (movieList) {
            setTopRated(movieList)
        });
    }, [])


    return (
        <article className="container-movies" page-content="">
            <Banner />
            <MovieRowList movieList={upcoming} title={"Upcoming Movies"}/>
            <MovieRowList movieList={trending} title={"Weekly Trending Movies"}/>
            <MovieRowList movieList={topRated} title={"Top Rated Movies"}/>
            {/*{map categories to make movie list}*/}
        </article>
    );
};

export default Container;