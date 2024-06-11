export const clear = () => {
    // Add your implementation here
    // make axios call to clear all cookies
    // let cookies = axios.delete('/cookies');
    environment.cookies.data = [];
};
