export const populate = () => {
    // Add your implementation here
    let cookies = axios.get('/cookies');
    cookies.data = items;
    // make axios call to populate the cookies data
};
