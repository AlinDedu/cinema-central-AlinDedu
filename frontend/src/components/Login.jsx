import { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/users/login', user)
            .then(response => {
                console.log(response.data)
                alert("Welcome " + response.data.username)
            })
            .catch(error => {
                console.error(error)
            });
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h4 text-center mb-4">Log In</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Your email"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                            />
                            <MDBInput
                                label="Your password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit">Log In</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;