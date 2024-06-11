export const one = () => {
    // Add your implementation here
    let cookies = axios.get('/cookies');
    let data = cookies.data.find(cookie => cookie.id === id);
    return data;
};
