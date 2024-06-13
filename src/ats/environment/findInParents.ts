
//@ts-nocheck
import axiosInstance from '../axiosInstance';

export const findInParents = (property: string, customizer?: (...params: any[]) => any) => {
    console.log('findInParents init')
    // Add your implementation here
    const currentEnv = localStorage.getItem('envId');
            const findProperty = (obj, prop) => {
                if (obj.hasOwnProperty(prop)) return obj[prop];
                for (const key in obj) {
                    if (typeof obj[key] === 'object') {
                        const result = findProperty(obj[key], prop);
                        if (result !== undefined) {
                            return result;
                        }
                    }
                }
                return undefined;
            };
            let value = findProperty(currentEnv.variables, property);
            if (customizer && typeof customizer === 'function') value = customizer(value);
            return value;
};
