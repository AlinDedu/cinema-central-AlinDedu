import { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/users', user)
            .then(r => {
                console.log(r.data)
            })
            .catch(error => {
                console.error(error)
            });
    };

    return (
        <MDBContainer fluid className="bg-dark-gradient py-5">
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="6" className="mx-auto">
                    <div className="text-center text-white mb-5">
                        <h1 className="display-4 font-weight-bold">Create an Account</h1>
                        <p className="lead">Join our community of like-minded individuals today!</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grey-text">
                            <MDBInput
                                label="Your username"
                                name="username"
                                onChange={handleChange}
                                value={user.username}
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                label="Your email"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                label="Your password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                                icon="lock"
                                group
                                validate
                            />
                        </div>
                        <div className="text-center mt-4">
                            <MDBBtn color="primary" type="submit">Register</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
