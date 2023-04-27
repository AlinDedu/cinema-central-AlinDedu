import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";


const App = () => {
    return (
        <Router>
            <div>
            {/* Navigation links */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieDetails />}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
