import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log(email)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            email: email,
            password: password
        }
        console.log(user);
        axios.post('http://localhost:8080/api/v1/auth/register', user)
            .catch(error => {
                console.error(error)
            });
        axios
            .post("http://localhost:8080/api/v1/auth/authenticate", {
                username: user.username,
                password: user.password
            })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("expirationTime", (new Date().getTime() + 24 * 60 * 60 * 1000).toString());
                navigate("/movies");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <section className="register vh-100" style={{background: "radial-gradient(circle, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11" style={{background: "linear-gradient(180deg, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
                        <div className="card text-black" style={{borderRadius: "25px", background: "linear-gradient(90deg, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
                            <div className="card-body p-md-5" style={{backgroundColor: "#0D0009", borderRadius: "35px"}}>
                                <div className="row justify-content-center" >
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p
                                            className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                                            style={{color: "indianred"}}
                                        >Sign up</p>

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
                                                           value={username}
                                                           onChange={handleUsernameChange}
                                                    />
                                                    {
                                                        !username && <label
                                                            htmlFor="form3Example3c"
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
                                                    className="fas fa-envelope fa-lg me-3 fa-fw"
                                                    style={{color: "yellowgreen"}}
                                                ></i>
                                                <div
                                                    className="form-outline flex-fill mb-0"
                                                >
                                                    <input
                                                        type="email"
                                                        className="form-control fs-3 fa-bold"
                                                        style={{
                                                            color: "dodgerblue",
                                                        }}
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                    />
                                                    {
                                                       !email && <label
                                                            htmlFor="form3Example3c"
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
                                                            Email
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
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    {
                                                        !password && <label
                                                            htmlFor="form3Example3c"
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

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i
                                                    className="fas fa-key fa-lg me-3 fa-fw"
                                                    style={{color: "yellowgreen"}}
                                                ></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        className="form-control fs-3 fa-bold"
                                                        style={{
                                                            color: "dodgerblue"
                                                        }}
                                                        value={repeatPassword}
                                                        onChange={handleRepeatPasswordChange}
                                                    />
                                                    {
                                                        !repeatPassword && <label
                                                            htmlFor="form3Example3c"
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
                                                            Email
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
                                                    Register
                                                </button>
                                            </div>

                                        </form>

                                    </div>
                                    <div
                                        className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img
                                            src="../../public/wallpaper1.jpg"
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
}

export default Register;
