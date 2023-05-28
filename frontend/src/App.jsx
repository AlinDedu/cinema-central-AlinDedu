import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import MovieDetail from "./pages/MovieDetail.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import LanguagePage from "./pages/LanguagePage.jsx";

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);

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

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}/>
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
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
    );
}

export default App;
