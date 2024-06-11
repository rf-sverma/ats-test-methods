import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        console.error('Error response', error.response);
    }
    else if (error.request) {
        console.error('Error request', error.request);
    }
    else {
        console.error('Error message', error.message);
    }
    return Promise.reject(error);
});
export default axiosInstance;
