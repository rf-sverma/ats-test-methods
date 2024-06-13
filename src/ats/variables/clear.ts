
//@ts-nocheck
import axiosInstance from '../axiosInstance';
// Clears all variables
export const clear = () => {
    console.log('clear init')
    // Add your implementation here
    const currentEnv = localStorage.getItem('envId');
    // make a call to clear the variables by axios
    axios.delete(`/clear/variables/${currentEnv}`);
};
