
//@ts-nocheck
import axiosInstance from '../axiosInstance';
// Replaces placeholders in a template with corresponding variable values
export const replaceIn = (template) => {
    console.log('replaceIn init')
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.variables[key] || '');
};
