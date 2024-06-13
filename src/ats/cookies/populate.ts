
//@ts-nocheck
import axiosInstance from '../axiosInstance';
 // populate: Replaces the current cookies data with the given items.
export const populate = (items) => {
    console.log('populate init')
    // Add your implementation here
    let cookies = axios.get('/cookies');
    cookies.data = items;
    // make axios call to populate the cookies data
};
