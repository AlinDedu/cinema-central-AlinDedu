import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuthContext} from "../assets/js/AuthContext.jsx";
import axios from "axios";

const Header = ({
    toggleSidebar,
    isSidebarOpen,
    itemsCount,
    handleSearchInputChange,
    searching,
}) => {

    const [searchOpen, setSearchOpen] = useState(false);
    const {user} = useAuthContext();
    const token = JSON.parse(localStorage.getItem("token")).token;
    const profileUrl = user && `/user-profile/${user}`;
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
            <a href="/cart">
                <i className="fas fa-shopping-cart fa-lg"></i>
                <span
                    className="badge rounded-pill badge-notification bg-danger"
                    style={{
                        fontSize: "10px"
                    }}
                >{itemsCount}</span>
            </a>
            <div className="dropdown">
                <Link to={profileUrl}>
                    <button
                        className="btn btn-sm bg-transparent btn-rounded"
                        type="button"
                        id="profileBtn"
                    >
                        {user && user}
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;