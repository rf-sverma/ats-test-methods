
import axiosInstance from '../axiosInstance';

export const disableTracking = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.trackingEnabled = false;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to disable tracking by axios
    // axios.post(`/environment/${currentEnv.id}/collectionVariables/disableTracking`);
};
