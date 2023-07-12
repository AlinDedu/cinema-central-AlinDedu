import "./Cart.css";
import CartItem from "../components/CartItem.jsx";
import { useState, useEffect } from 'react';
import { useAuthContext } from "../assets/js/AuthContext.jsx";
import { Link } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import axios from "axios";

const Cart = () => {
    const [movies, setMovies] = useState([]);
    const { user, logout } = useAuthContext();
    const token = JSON.parse(localStorage.getItem("token")).token;
    const [sum, setSum] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/cart-items?username=${user}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setMovies(response.data);
                calculateTotalPrice(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // Update local storage whenever movies change
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [movies]);

    const calculateTotalPrice = (movies) => {
        let totalPrice = 0;

        if (movies.length > 0) {
            totalPrice = movies.reduce((acc, movie) => {
                const price = parseFloat(movie.pricePerPiece);

                if (!isNaN(price) && !isNaN(sum)) {
                    return acc + price;
                }

                return acc;
            }, 0);
        }

        setSum(totalPrice.toFixed(2));
    };

    const handleDelete = (movieId) => {
        axios
            .delete(`http://localhost:8080/api/v1/cart-items/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                // Remove the deleted movie from favoriteMovies
                setMovies(prevFavoriteMovies =>
                    prevFavoriteMovies.filter(movie => movie.id !== movieId)
                );
                calculateTotalPrice(movies.filter((movie) => movie.id !== movieId));
            })
            .catch(error => {
                console.log(error);
            });
    }
    const addToSum = (price) => {
        setSum((prevSum) => (parseFloat(prevSum) + parseFloat(price)).toFixed(2));
    }
    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#0F1115" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-0" style={{ backgroundColor: "" }}>
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 className="mb-0 text-muted">Items {movies.length}</h6>
                                            </div>
                                            <hr className="my-4" />
                                            {movies.map((movie) => (
                                                <CartItem movie={movie}  onDelete={handleDelete}  addToSum={addToSum}/>
                                            ))}
                                            <div className="pt-5">
                                                <Link to="/movies" className="text-body btn btn-lg btn-warning">
                                                    <i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop
                                                </Link>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1" style={{ color: "black" }}>Summary</h3>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase" style={{ color: "black" }}>Items {movies.length}</h5>
                                                <h5 style={{ color: "black" }}>€ {sum}</h5>
                                            </div>
                                            {/*<h5 className="text-uppercase mb-3" style={{ color: "black" }}>Shipping</h5>*/}
                                            {/*<div className="mb-4 pb-2">*/}
                                            {/*    <select className="select">*/}
                                            {/*        <option value="1">Standard-Delivery- €5.00</option>*/}
                                            {/*        <option value="2">Two</option>*/}
                                            {/*        <option value="3">Three</option>*/}
                                            {/*        <option value="4">Four</option>*/}
                                            {/*    </select>*/}
                                            {/*</div>*/}
                                            <h5 className="text-uppercase mb-3" style={{ color: "black" }}>Give code</h5>
                                            <div className="mb-5">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase" style={{ color: "black" }}>Total price</h5>
                                                <h5 style={{ color: "black" }}>€ {sum}</h5>
                                            </div>
                                            <PayPalScriptProvider options={{ clientId: "test" }}>
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: sum.toString(),
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then((details) => {
                                                            const name = details.payer.name.given_name;
                                                            alert(`Transaction completed by ${name}`);
                                                        });
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        </div>
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

export default Cart;