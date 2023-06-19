import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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

function App() {
    removeTokenIfExpired();

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const token = localStorage.getItem("accessToken");

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

    // useEffect(async () => {
    //     if (token != null) {
    //         await axios.get("http://localhost:8080/api/v1/user/details", {
    //                 headers: {Authorization: `Bearer ${token}`}
    //             }
    //         )
    //             .then((response) => {
    //                 console.log(response.data)
    //                 setUserDetails(response.data)
    //             })
    //     }
    // }, []);


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
                        <Route path="*" element={<Navigate to={"/movies"}/>}/>
                    </Route>
                </Routes>
        </AuthContextProvider>
    );
}

export default App;
