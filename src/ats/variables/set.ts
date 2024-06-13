
//@ts-nocheck
import axiosInstance from '../axiosInstance';
// Sets a variable with an optional type
export const set = (key, value, type) => {
    console.log('set init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.variables[key] = value;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to update the variable data by axios
    // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
};
