
import axiosInstance from '../axiosInstance';

export const findSubstitutions = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return currentEnv.collectionVariables;
};
