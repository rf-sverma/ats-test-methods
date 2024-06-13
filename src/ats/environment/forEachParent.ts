//@ts-nocheck
import axiosInstance from "../axiosInstance.js";
//         this will find out if there is a variable in the parent environment that matches the given property and return it
       
export const forEachParent = (
  options: { withRoot?: boolean; }, iterator: (...params: any[]) => any
) => {
  const currentEnv = JSON.parse(localStorage.getItem('envId'));
            const parents = currentEnv.parents || [];
            if (options.withRoot) {
                iterator(currentEnv);
            }
            parents.forEach(parent => {
                iterator(parent);
            });
};
