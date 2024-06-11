
import axiosInstance from '../axiosInstance';

export const toObject = (excludeDisabled, caseSensitive, multiValue, sanitizeKeys) => {
    // Add your implementation here
    let result = {};
    let cookies = axios.get('/cookies');
    cookies.data.forEach(cookie => {
        if (excludeDisabled && cookie.disabled) return;

        let key = sanitizeKeys ? cookie.key.replace(/[^a-zA-Z0-9]/g, '') : cookie.key;
        if (!caseSensitive) key = key.toLowerCase();

        if (multiValue) {
            if (!result[key]) result[key] = [];
            result[key].push(cookie.value);
        } else {
            result[key] = cookie.value;
        }
    });
    return result;

};
