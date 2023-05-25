import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "../assets/css/Landing.css";

const Landing = () => {
    return (
        <div className="landing-container">
            <MDBContainer className="landing-container">
                <MDBRow>
                    <MDBCol md="6">
                        <h1 className="landing-title">Welcome to</h1>
                        <h1 className="landing-title">Cinema Central</h1>
                        <h2 className="landing-subtitle">
                            Discover Movies, TV Shows and more
                        </h2>
                        <p className="landing-description">
                            Cinema Central is the ultimate source for all your entertainment needs.
                            Whether you are looking for the latest blockbuster movie, binge-worthy
                            TV show or must-watch documentary, we got you covered.
                        </p>
                        <MDBCol className="landing-button-container">
                            <MDBBtn href="/register" color="primary" size="lg" className="m-5 btn-landing">
                                Get Started
                            </MDBBtn>
                            <MDBBtn href="/login" color="success" size="lg" className="m-5 btn-landing">
                                Log In
                            </MDBBtn>
                        </MDBCol>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Landing;
