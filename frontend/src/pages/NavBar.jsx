import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/movies" className="nav-link">
                        Movies
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
