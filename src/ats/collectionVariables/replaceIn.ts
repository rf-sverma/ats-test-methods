
//@ts-nocheck

import axiosInstance from '../axiosInstance';

export const replaceIn = (template) => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.collectionVariables[key] || '');
};
