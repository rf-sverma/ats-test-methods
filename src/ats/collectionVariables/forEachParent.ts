
//@ts-nocheck

import axiosInstance from '../axiosInstance.js';

export const forEachParent = (options, iterator) => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    let parent = currentEnv.parent;
    if (options.withRoot) {
        iterator(currentEnv);
    }
    while (parent) {
        iterator(parent);
        parent = parent.parent;
    }
};
