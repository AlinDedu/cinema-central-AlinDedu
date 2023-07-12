import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_key } from '../assets/js/api.js';

const CartItem = ({ movie, onDelete, addToSum}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [itemSum, setItemSum] = useState(movie.pricePerPiece);

    useEffect(() => {
        const fetchImage = async () => {
            const id = movie.imdbId;

            try {
                const response = await axios.get(`https://api.themoviedb.org/3/find/${id}`, {
                    params: {
                        api_key: api_key,
                        external_source: 'imdb_id',
                    },
                });

                const fetchedImageUrl = response.data.movie_results[0]?.poster_path;
                setImageUrl(fetchedImageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [movie.imdbId]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
    };

    const handleQuantityIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        addToSum(movie.pricePerPiece);
    };

    const handleQuantityDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
            addToSum(-movie.pricePerPiece);
        }
    };

    useEffect(() => {
        setItemSum(quantity * movie.pricePerPiece)
    }, [quantity])

    const handleDeleteClick = () => {
        onDelete(movie.id);
    };

    return (
        <div className="row mb-4 d-flex justify-content-between align-items-center">
            <div className="col-md-2 col-lg-2 col-xl-2">
                {imageUrl && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
                        alt="Movie Poster"
                        className="img-fluid rounded-3"
                        style={{ maxWidth: '75px', maxHeight: '120px' }}
                    />
                )}
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
                <h6 className="text-muted">{movie.production}</h6>
                <h6
                    className="text-black mb-0"
                    style={{
                        fontFamily: 'Gotham, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#000000',
                    }}
                >
                    {movie.movieTitle}
                </h6>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button className="btn btn-link px-2" onClick={handleQuantityDecrement}>
                    <i className="fas fa-minus" style={{ color: 'black' }}></i>
                </button>
                <input
                    id="form1"
                    min="0"
                    name="quantity"
                    value={quantity}
                    type="number"
                    className="form-control form-control-sm"
                    style={{ fontSize: '15px' }}
                    onChange={handleQuantityChange}
                />
                <button className="btn btn-link px-2" onClick={handleQuantityIncrement}>
                    <i className="fas fa-plus" style={{ color: 'black' }}></i>
                </button>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 className="mb-0" style={{ color: 'black', fontSize: '15px' }}>
                    ${itemSum}
                </h6>
            </div>
            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" className="text-muted">
                    <button onClick={handleDeleteClick} className="fas fa-trash-alt"></button>
                </a>
            </div>
        </div>
    );
};

export default CartItem;