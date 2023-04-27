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
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h4 text-center mb-4">Register</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Your username"
                                name="username"
                                onChange={handleChange}
                                value={user.username}
                            />
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
                            <MDBBtn type="submit">Register</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );

}

export default Register;