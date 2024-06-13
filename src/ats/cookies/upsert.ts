
//@ts-nocheck
import axiosInstance from '../axiosInstance';
 // upsert: Updates an existing cookie or inserts a new one.
export const upsert = (item) => {
    console.log('upsert init')
    // Add your implementation here
    let cookies = axios.get('/cookies');
    const index = cookies.data.findIndex(cookie => cookie.key === item.key);
    if (index !== -1) {
        cookies.data[index] = item;
    } else {
        cookies.data.push(item);
    }
};
