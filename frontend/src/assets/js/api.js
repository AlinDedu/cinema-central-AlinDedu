'use strict'

const api_key = 'b11b1adf41fea93b12a7421bf293f00e';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

/**
 * fetch data from a server using the 'url' and passes
 * the result in JSON data to a 'callback' function,
 * along with an optional parameter if it has 'optionalParam'
 */

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

const fetchData = function (url) {
    return fetch(url)
        .then(response => response.json());
}

/**
 * Add event on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
}

/**
 * Toggle search box in mobile device || small screen
 */
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
    searchBox.classList.toggle("active");
})

const getMovieDetail = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
}

/**
 * store movieId in 'localStorage' when you click any movie card
 */

const getMovieList = function (urlParam, genreName) {
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
}

export { imageBaseURL, api_key, fetchDataFromServer, getMovieDetail, getMovieList, addEventOnElements }