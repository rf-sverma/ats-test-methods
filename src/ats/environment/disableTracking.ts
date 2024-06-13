
//@ts-nocheck
import axiosInstance from '../axiosInstance';
// Disables tracking of collection variables
export const disableTracking = () => {
    console.log('disableTracking init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.trackingEnabled = false;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to disable tracking by axios
    // axios.post(`/environment/${currentEnv.id}/collectionVariables/disableTracking`);
};
