
//@ts-nocheck

import axiosInstance from '../axiosInstance';

export const unset = (key) => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    delete currentEnv.collectionVariables[key];
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to update the env data by axios
    // axios.delete(`/environment/${currentEnv.id}/variables/${key}`);
};
