import React, {useState} from 'react';

const Header = ({
    toggleSidebar,
    isSidebarOpen,
    handleSearchInputChange,
    searching
}) => {

    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(!searchOpen)
    }

    return (
        <header className="header">
            <a href="/movies" className="logo">
                <img
                    src="/logo.png"
                    width={300}
                    height={30}
                    style={{marginLeft: "24px"}}
                    alt="Cinema Central Home"
                />
            </a>
            <div className={`search-box ${searchOpen ? "active" : ""}`} search-box="">
                <div className={`search-wrapper ${searching ? "searching" : ""}`} search-wrapper="">
                    <input
                        type="text"
                        name="search"
                        aria-label="search movies"
                        placeholder="Search any movies"
                        className="search-field"
                        autoComplete="off"
                        search-field=""
                        onChange={(e) => handleSearchInputChange(e)}
                    />
                    <img
                        src="/search.png"
                        width={24}
                        height={24}
                        alt="search"
                        className="leading-icon"
                    />
                </div>
                <button className={`search-btn`} search-toggler="">
                    <img
                        src="/close.png"
                        width={24}
                        height={24}
                        alt="close search box"
                        onClick={handleSearchOpen}
                    />
                </button>
            </div>
            <button className="search-btn" search-toggler="" menu-close="">
                <img
                    src="/search.png"
                    width={24}
                    height={24}
                    alt="open search box"
                    onClick={handleSearchOpen}
                />
            </button>
            <button className="menu-btn" menu-btn="" menu-toggler="" onClick={toggleSidebar}>
                <img
                    src={isSidebarOpen ? "/menu-close.png" : "/menu.png"}
                    width={24}
                    height={24}
                    alt={isSidebarOpen ? "close menu" : "open menu"}
                    className={isSidebarOpen ? "close" : "menu"}
                />
            </button>
        </header>
    );
};

export default Header;