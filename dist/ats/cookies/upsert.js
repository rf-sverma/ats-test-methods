export const upsert = () => {
    // Add your implementation here
    let cookies = axios.get('/cookies');
    const index = cookies.data.findIndex(cookie => cookie.key === item.key);
    if (index !== -1) {
        cookies.data[index] = item;
    }
    else {
        cookies.data.push(item);
    }
    // make axios call to update the cookie
};
