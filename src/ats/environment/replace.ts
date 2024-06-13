//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const replace = (
  template
) => {
  const currentEnv = JSON.parse(localStorage.getItem('envId'));
            return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.variables[key] || '');
};
