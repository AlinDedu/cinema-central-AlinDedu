import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [emailIsValid, setEmailIsValid] = useState(false);

    const [passLengthValid, setPassLengthValid] = useState(false);
    const [passHasCapital, setPassHasCapital] = useState(false);
    const [passHasDigit, setPassHasDigit] = useState(false);
    const [passRepeatMatch, setPassRepeatMatch] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    const [allChecks, setAllChecks] = useState(false);

    const handleUsernameChange = async (e) => {
        const inputUsername = e.target.value;
        setUsername(inputUsername);

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth/check-username?username=${inputUsername}`);
            console.log(response.data.available)
            setUsernameAvailable(response.data.available);
        } catch (error) {
            console.error(error);
        }
        console.log("Username Available: " + usernameAvailable)
    };


    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        (!inputEmail || !/\S+@\S+\.\S+/.test(inputEmail)) ? setEmailIsValid(false) : setEmailIsValid(true);
    };

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);

        const hasCapitalLetter = /[A-Z]/.test(inputPassword);
        const hasDigit = /\d/.test(inputPassword);

        (!inputPassword || inputPassword.length < 8) ? setPassLengthValid(false) : setPassLengthValid(true);
        (!hasCapitalLetter) ? setPassHasCapital(false) : setPassHasCapital(true);
        (!hasDigit) ? setPassHasDigit(false) : setPassHasDigit(true);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value)
    }

    useEffect(() => {
        (password === repeatPassword && repeatPassword.length > 0) ? setPassRepeatMatch(true) : setPassRepeatMatch(false);
    }, [password, repeatPassword]);

    useEffect(() => {
        console.log(usernameAvailable)
        const timer = setTimeout(() => {
            const checks = [emailIsValid, passLengthValid, passHasCapital, passHasDigit, passRepeatMatch, usernameAvailable];
            const areAllChecksValid = checks.every((check) => check);
            setAllChecks(areAllChecksValid);
        }, 100); // Delay in milliseconds
        return () => {
            clearTimeout(timer);
        };
    }, [emailIsValid, passLengthValid, passHasCapital, passHasDigit, passRepeatMatch, usernameAvailable]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            email: email,
            password: password
        }
        console.log(user);
        await axios.post('http://localhost:8080/api/v1/auth/register', user)
            .catch(error => {
                console.error(error)
            });
        navigate("/login");
    };

    return (
        <section className="register vh-100"
                 style={{background: "radial-gradient(circle, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11"
                         style={{background: "linear-gradient(180deg, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"}}>
                        <div className="card text-black" style={{
                            borderRadius: "25px",
                            background: "linear-gradient(90deg, hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%)"
                        }}>
                            <div className="card-body p-md-5"
                                 style={{backgroundColor: "#0D0009", borderRadius: "35px"}}>
                                <div className="row justify-content-center">
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
                                                <span className={`badge rounded-pill ${usernameAvailable ? 'badge-success' : 'badge-danger'}`}>Available</span>
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
                                                <span className={`badge rounded-pill ${emailIsValid ? 'badge-success' : 'badge-danger'}`}>Valid Email</span>
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
                                                <span className={`badge rounded-pill ${passLengthValid ? 'badge-success' : 'badge-danger'}`}>Length</span>
                                                <span className={`badge rounded-pill ${passHasCapital ? 'badge-success' : 'badge-danger'}`}>Capital</span>
                                                <span className={`badge rounded-pill ${passHasDigit ? 'badge-success' : 'badge-danger'}`}>Digit</span>
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
                                                            Confirm Password
                                                        </label>
                                                    }
                                                </div>
                                                <span className={`badge rounded-pill ${passRepeatMatch ? 'badge-success' : 'badge-danger'}`}>Passwords Match</span>
                                            </div>

                                            <span>
                                                <strong>
                                                <p
                                                    style={{
                                                        color: "teal",
                                                        fontSize: "15px",
                                                        textAlign: "center"
                                                    }}
                                                >Already have an account?  <a href="/login" style={{display: "inline", fontSize: "16px", textDecoration: "underline"}}>Log In!</a></p></strong>
                                            </span>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className={`btn btn-primary btn-lg ${!allChecks ? 'disabled' : ''}`}
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
                                            src="/wallpaper1.jpg"
                                            className="img-fluid" alt="Sample image"/>
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
