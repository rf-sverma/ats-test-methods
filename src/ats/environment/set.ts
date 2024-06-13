//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const set = (
  key, value, type
) => {
  const currentEnv = JSON.parse(localStorage.getItem('envId'));
            currentEnv.variables[key] = value;
            localStorage.setItem('envId', JSON.stringify(currentEnv));
            // make axios call to set the environment variables by this id :{currentEnv}
            // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
};
