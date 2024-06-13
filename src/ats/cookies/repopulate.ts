
//@ts-nocheck
import axiosInstance from '../axiosInstance';
// repopulate: Same as populate.
export const repopulate = (items) => {
    console.log('repopulate init')
    // Add your implementation here
    let cookies = axios.get('/cookies');
    cookies.data = items;
    // make axios call to repopulate the cookies data
};
