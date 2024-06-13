
//@ts-nocheck
import axiosInstance from '../axiosInstance';
 // Clears the visualizer data
export const clear = () => {
    console.log('clear init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.visualizerData = null;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to clear the visualizer data by axios
    // axios.post(`/environment/${currentEnv.id}/clearVisualizer`);
};
