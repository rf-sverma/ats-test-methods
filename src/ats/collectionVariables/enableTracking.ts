
//@ts-nocheck

import axiosInstance from '../axiosInstance';

export const enableTracking = (options) => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.trackingEnabled = true;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to enable tracking by axios
    // axios.post(`/environment/${currentEnv.id}/collectionVariables/enableTracking`, { options });
};
