
//@ts-nocheck

import axiosInstance from '../axiosInstance';

export const findInParents = (property: string | number, customizer: (arg0: any) => any) => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    let parent = currentEnv.parent;
    while (parent) {
        if (customizer(parent[property])) {
            return parent[property];
        }
        parent = parent.parent;
    }
    return null;
};
