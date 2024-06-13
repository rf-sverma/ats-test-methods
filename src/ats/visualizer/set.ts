
//@ts-nocheck
import axiosInstance from '../axiosInstance';
 // Sets the visualizer template and data with optional settings
export const set = (template, data, options) => {
    console.log('set init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.visualizerTemplate = template;
    currentEnv.visualizerData = data;
    currentEnv.visualizerOptions = options;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to update the visualizer data by axios
    // axios.post(`/environment/${currentEnv.id}/setVisualizer`, { template, data, options });
};
