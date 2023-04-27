import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./styles/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <h1 className="title">Welcome to IMDD</h1>
                        <h2 className="subtitle">
                            Discover Movies, TV Shows and more
                        </h2>
                        <p className="description">
                            IMDD is the ultimate source for all your entertainment needs.
                            Whether you are looking for the latest blockbuster movie, binge-worthy
                            TV show or must-watch documentary, we got you covered.
                        </p>
                        <MDBBtn href="/register" color="primary" size="lg" className="m-5">
                            Get Started
                        </MDBBtn>
                        <MDBBtn href="/login" color="success" size="lg" className= "m-5">
                            Log In
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Home;
