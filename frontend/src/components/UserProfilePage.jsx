import React, { useContext, useEffect, useState } from 'react';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdbreact';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../assets/js/AuthContext.jsx";

const UserProfilePage = () => {
    const { user, logout } = useAuthContext();
    const token = JSON.parse(localStorage.getItem("token")).token
    console.log(token)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const handleLogout = () => {
        logout();
    }

    const handleEditProfile = () => {

    }

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/user/profile?username=${user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const { username, email, favoriteMovies } = response.data;
                setUsername(username);
                setEmail(email);
            } catch (error) {
                console.log(error);
            }
            console.log(user)
            await axios.get(`http://localhost:8080/api/v1/user/favorite-movies?username=${user}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response)
                    setFavoriteMovies(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
        };
        fetchProfileData();
    }, []);

    const handleDelete = (movie) => {
        axios.delete(`http://localhost:8080/api/v1/user/favorite-movies?username=${user}&movie=${movie}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Movie deleted successfully');
                // Perform any necessary actions after successful deletion
            })
            .catch(error => {
                console.error('Error deleting movie:', error);
                // Handle any errors that occurred during deletion
            });
    }


    return (
        <div>
            <p
                className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                style={{ color: 'indianred', fontWeight: 'bold' }}
            >Profile</p>
            <div className="d-flex justify-content-center align-items-center">
                <MDBContainer>
                    <div className="d-flex justify-content-between mt-4">
                        <h1
                            className="text-primary"
                        >{user && user}</h1>
                        <div className="d-flex gap-3">
                            <button className="badge rounded-pill badge-primary" onClick={handleEditProfile}>Edit Profile</button>
                            <button className="badge rounded-pill badge-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>


                    <h3
                        style={{
                            textAlign: 'center',
                            color: "darkkhaki",
                            fontSize: '24px',
                            marginTop: '20px'
                    }}
                    >Favorite Movies:</h3>
                    <MDBListGroup>
                        {favoriteMovies.map((movie, index) => (
                            <MDBListGroupItem
                                key={index}>
                                {movie.movieName}
                                <button
                                    className=' badge badge-danger float-end'
                                    onClick={() => handleDelete(movie.movieName)}
                                >Remove</button>
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>

                    {/*<div className="my-4">*/}
                    {/*    <h3>Profile Information</h3>*/}
                    {/*    <form>*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label>Username</label>*/}
                    {/*            <input type="text" className="form-control" value={user.username} onChange={handleUsernameChange} />*/}
                    {/*        </div>*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label>Email</label>*/}
                    {/*            <input type="email" className="form-control" value={user.email} onChange={handleEmailChange} />*/}
                    {/*        </div>*/}
                    {/*        <div className="form-group">*/}
                    {/*            <label>Password</label>*/}
                    {/*            <input type="password" className="form-control" value={user.password} onChange={handlePasswordChange} />*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </MDBContainer>
            </div>
        </div>


    );
}

export default UserProfilePage;
