const Home = () => {
    return (
        <div className="main-container">
            <h1 className="title">Welcome to IMDD</h1>
            <h2 className="subtitle">Discover Movies, TV Shows and more</h2>
            <a href="/movies">
                <button  className="start">Get Started</button>
            </a>
        </div>
    );
};

export default Home;
