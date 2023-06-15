import React, {useEffect} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import Overlay from "../components/Overlay.jsx";
import Container from "../components/Container.jsx";
import SearchModal from "../components/SearchModal.jsx";
import "../assets/css/style.css"
import Header from "../components/Header.jsx";
import axios from "axios";

const MainPage = ({
      toggleSidebar,
      isSidebarOpen,
      handleSearchInputChange,
      searchQuery,
      handleSearchModalClose,
      searching,
      setSearching,
    setUserDetails
}) => {
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        if (token != null) {
            axios.get("http://localhost:8080/api/v1/user/details", {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
                .then((response) => {
                    setUserDetails(response.data)
                })
        }
    }, []);

    return (
        <main>
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                handleSearchInputChange={handleSearchInputChange}
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