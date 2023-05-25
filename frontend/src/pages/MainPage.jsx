import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import Overlay from "../components/Overlay.jsx";
import Container from "../components/Container.jsx";
import SearchModal from "../components/SearchModal.jsx";
import "../assets/css/style.css"
import Header from "../components/Header.jsx";

const MainPage = ({toggleSidebar, isSidebarOpen, handleSearchInputChange, handleSearch, searchQuery, handleSearchModalClose, searching, setSearching}) => {
    return (
        <main>
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                handleSearchInputChange={handleSearchInputChange}
                handleSearch={handleSearch}
                handleSearchModalClose={handleSearchModalClose}
                searching={searching}
            />
            <Sidebar isSidebarOpen={isSidebarOpen}/>
            <Overlay isSidebarOpen={isSidebarOpen}/>
            <Container/>
            <SearchModal
                searchQuery={searchQuery}
                handleSearchModalClose={handleSearchModalClose}
                setSearching={setSearching}
            />
        </main>
    );
};

export default MainPage;