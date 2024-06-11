
import axiosInstance from '../axiosInstance';

export const repopulate = () => {
    // Add your implementation here
    let cookies = axios.get('/cookies');
    cookies.data = items;
    // make axios call to repopulate the cookies data
};
