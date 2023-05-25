import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/users/login", user)
            .then((response) => {
                console.log(response.data);
                alert("Welcome " + response.data.username);
                // Redirect or perform additional actions after successful login
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePasswordResetRequest = (e) => {
        e.preventDefault();
        // Send password reset request to the server
        axios
            .post("http://localhost:8080/users/forgot-password", { email: user.email })
            .then((response) => {
                console.log(response.data);
                alert("Password reset email sent. Check your inbox.");
            })
            .catch((error) => {
                console.error(error);
                alert("Password reset request failed. Please try again.");
            });
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/users/reset-password", {
                resetToken,
                newPassword,
            })
            .then((response) => {
                console.log(response.data);
                alert("Password reset successful!");
                setShowPasswordResetForm(false); // Reset back to login form
            })
            .catch((error) => {
                console.error(error);
                alert("Password reset failed. Please try again.");
            });
    };

//   const handlePasswordReset = (e) => {
//       e.preventDefault();
//       // Send password reset request to the backend API
//       axios
//         .post("http://localhost:8080/users/reset-password", { email: user.email })
//         .then((response) => {
//           console.log(response.data);
//           alert("Password reset email sent.");
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };

    return (
        <MDBContainer fluid className="bg-dark-gradient py-5">
            <MDBRow>
                <MDBCol md="6" className="mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {showPasswordResetForm ? (
                                <form onSubmit={handlePasswordReset}>
                                    <p className="h4 text-center mb-4">Password Reset</p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Reset Token"
                                            name="resetToken"
                                            onChange={(e) => setResetToken(e.target.value)}
                                            value={resetToken}
                                        />
                                        <MDBInput
                                            label="New Password"
                                            type="password"
                                            name="newPassword"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn type="submit" color="primary">
                                            Reset Password
                                        </MDBBtn>
                                    </div>
                                </form>
                            ) : (
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
                                        <MDBBtn type="submit" color="primary">
                                            Log In
                                        </MDBBtn>
                                        <br />
                                        <br />
                                        <span
                                            className="btn btn-link"
                                            onClick={() => setShowPasswordResetForm(true)}
                                        >
                      Forgot Password?
                    </span>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;