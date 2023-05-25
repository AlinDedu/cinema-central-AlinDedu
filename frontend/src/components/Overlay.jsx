import React from 'react';

const Overlay = ({isSidebarOpen}) => {
    return (
        <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} overlay="" menu-toggler=""></div>
    );
};

export default Overlay;