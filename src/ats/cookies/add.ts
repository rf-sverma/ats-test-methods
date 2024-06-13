
//@ts-nocheck
import axiosInstance from '../axiosInstance';

export const add = (item) => {
    console.log('add init')
    // Add your implementation here
    environment.cookies.data.push(item);
    // make axios call to add the cookie to the cookies data array
};
