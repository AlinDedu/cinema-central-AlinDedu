const removeTokenIfExpired = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (currentTime > Number(expirationTime)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
    }
};

export default removeTokenIfExpired;