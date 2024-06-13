
//@ts-nocheck
import axiosInstance from '../axiosInstance';

export const clear = () => {
    console.log('clear init')
    // Add your implementation here
     // make axios call to clear all cookies
            // let cookies = axios.delete('/cookies');
            environment.cookies.data = [];
};
