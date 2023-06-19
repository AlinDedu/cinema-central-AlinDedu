import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../assets/js/AuthContext.jsx";

const Login = () => {
    const [user, setUser] = useState({username: '', password: ''});
    const { login } = useAuthContext();
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        const {username, password} = user;
        if (username && password) {
            console.log(user);
            try {
                await login(username, password);
            } catch (err) {
                setError(true);
                console.error("Erorare" + err);
            }
        }
    };

    const onUsernameChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            username: e.target.value,
        }));
    };

    const onPasswordChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            password: e.target.value,
        }));
    };

    return (
        <section className="register vh-100" style={{background: "radial-gradient(circle, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11" style={{background: "linear-gradient(180deg, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
                        <div className="card text-black" style={{borderRadius: "25px", backgroundColor: "#0D0000"}}>
                            <div className="card-body p-md-5" style={{backgroundColor: "#0D0000", borderRadius: "35px"}}>
                                <div className="row justify-content-center" >
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p
                                            className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                                            style={{color: "yellowgreen"}}
                                        >Log In</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i
                                                    className="fas fa-user fa-lg me-3 fa-fw"
                                                    style={{color: "yellowgreen"}}
                                                ></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text"
                                                           className="form-control fs-3 fa-bold"
                                                           style={{
                                                               color: "dodgerblue"
                                                           }}
                                                           value={user.username}
                                                           onChange={onUsernameChange}
                                                    />
                                                    {
                                                        !user.username && <label
                                                            className="form-label fw-bold"
                                                            style={{
                                                                color: "white",
                                                                pointerEvents: "none",
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "16px",
                                                                transform: "translateY(-50%)",
                                                                opacity: "0.5",
                                                            }}
                                                        >
                                                            Username
                                                        </label>
                                                    }
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i
                                                    className="fas fa-lock fa-lg me-3 fa-fw"
                                                    style={{color: "yellowgreen"}}
                                                ></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        className="form-control fs-3 fa-bold"
                                                        style={{
                                                            color: "dodgerblue"
                                                        }}
                                                        value={user.password}
                                                        onChange={onPasswordChange}
                                                    />
                                                    {
                                                        !user.password && <label
                                                            className="form-label fw-bold"
                                                            style={{
                                                                color: "white",
                                                                pointerEvents: "none",
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "16px",
                                                                transform: "translateY(-50%)",
                                                                opacity: "0.5",
                                                            }}
                                                        >
                                                            Password
                                                        </label>
                                                    }
                                                </div>
                                            </div>


                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={handleSubmit}
                                                >
                                                    Log In
                                                </button>
                                            </div>
                                            <p
                                                className="fs-4 badge badge-danger rounded-pill"
                                                style={{
                                                    color: "red",
                                                    textAlign: "center",
                                                    display: error ? "block" : "none"
                                                }}
                                            >Username or password incorrect!</p>
                                        </form>

                                    </div>
                                    <div
                                        className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img
                                            src="/wallpaper2.jpg"
                                            className="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;