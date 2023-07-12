import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import axios from "axios";
import MainPage from './pages/MainPage.jsx';
import MovieDetail from "./pages/MovieDetail.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"
import CategoryPage from "./pages/CategoryPage.jsx";
import LanguagePage from "./pages/LanguagePage.jsx";
import removeTokenIfExpired from "./assets/js/token.js";
import {AuthContextProvider} from "./assets/js/AuthContext.jsx";
import ProfilePage from "./components/UserProfilePage.jsx";
import Cart from "./pages/Cart.jsx"

function App() {
    removeTokenIfExpired();

    const user = localStorage.getItem("user");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [itemsCount, setItemsCount] = useState(0)
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).token : null;

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

   const handleSearchInputChange = (e) => {
       setSearchQuery(e.target.value);
       console.log(e.target.value)
   }

   const handleSearchModalClose = () => {
       setSearchQuery('');
   }

    useEffect(() => {
        if (token != null) {
            axios.get(`http://localhost:8080/api/v1/cart-items?username=${user}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data)
                    setItemsCount(response.data.length)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route
                        path="/login"
                        element={<Login/>}
                    />
                    <Route
                        path="/register"
                        element={<Register/>}
                    />
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/movies"
                            element={
                                <MainPage
                                    toggleSidebar={toggleSidebar}
                                    isSidebarOpen={isSidebarOpen}
                                    itemsCount={itemsCount}
                                    handleSearchInputChange={handleSearchInputChange}
                                    searchQuery={searchQuery}
                                    handleSearchModalClose={handleSearchModalClose}
                                    searching={searching}
                                    setSearching={setSearching}
                                />
                            }
                        />
                        <Route
                            path="/movie/:id"
                            element={
                                <MovieDetail
                                    toggleSidebar={toggleSidebar}
                                    isSidebarOpen={isSidebarOpen}
                                    itemsCount={itemsCount}
                                    setItemsCount={setItemsCount}
                                    handleSearchInputChange={handleSearchInputChange}
                                    searchQuery={searchQuery}
                                    handleSearchModalClose={handleSearchModalClose}
                                    searching={searching}
                                    setSearching={setSearching}
                                />
                            }
                        />
                        <Route
                            path="/movies/category/:category"
                            element={
                                <CategoryPage
                                    toggleSidebar={toggleSidebar}
                                    isSidebarOpen={isSidebarOpen}
                                    itemsCount={itemsCount}
                                    handleSearchInputChange={handleSearchInputChange}
                                    searchQuery={searchQuery}
                                    handleSearchModalClose={handleSearchModalClose}
                                    searching={searching}
                                    setSearching={setSearching}
                                />
                            }
                        />
                        <Route
                            path="/movies/language/:language"
                            element={
                                <LanguagePage
                                    toggleSidebar={toggleSidebar}
                                    isSidebarOpen={isSidebarOpen}
                                    itemsCount={itemsCount}
                                    handleSearchInputChange={handleSearchInputChange}
                                    searchQuery={searchQuery}
                                    handleSearchModalClose={handleSearchModalClose}
                                    searching={searching}
                                    setSearching={setSearching}
                                />
                            }
                        />
                        <Route
                            path="user-profile/:username"
                            element={<ProfilePage />}
                        />
                        <Route path="/cart" element = {<Cart />}/>
                        <Route path="*" element={<Navigate to={"/movies"}/>}/>
                    </Route>
                </Routes>
        </AuthContextProvider>
    );
}

export default App;
