
//@ts-nocheck
import axiosInstance from '../axiosInstance';

export const count = () => {
    console.log('count init')
    // Add your implementation here
     // make axios call to get the number of cookies
            // let cookies = axios.get('/cookies');
            // return cookies.length;

            // else return the length of the cookies data array
            return environment.cookies.data.length;
};
