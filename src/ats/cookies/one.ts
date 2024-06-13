
//@ts-nocheck
import axiosInstance from '../axiosInstance';
 // one: Finds a cookie by ID.
export const one = (id) => {
    console.log('one init')
    // Add your implementation here
    let cookies = axios.get('/cookies');
            let data = cookies.data.find(cookie => cookie.id === id);
            return data;
};
