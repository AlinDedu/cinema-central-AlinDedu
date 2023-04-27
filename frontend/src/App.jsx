import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/Home.jsx";
import Movies from "./components/Movies.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";


const App = () => {
    return (
        <Router>
            <div>
            {/* Navigation links */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieDetails />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
