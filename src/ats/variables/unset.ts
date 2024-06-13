
//@ts-nocheck
import axiosInstance from '../axiosInstance';

export const unset = (key) => {
    console.log('unset init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    delete currentEnv.variables[key];
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to delete the variable by axios
    axios.delete(`/environment/${currentEnv.id}/variables/${key}`);
};
