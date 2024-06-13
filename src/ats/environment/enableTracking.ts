
//@ts-nocheck
import axiosInstance from '../axiosInstance';
// Enables tracking of collection variables with optional settings
export const enableTracking = (options) => {
    console.log('enableTracking init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.trackingEnabled = true;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to enable tracking by axios
    // axios.post(`/environment/${currentEnv.id}/collectionVariables/enableTracking`, { options });
};
