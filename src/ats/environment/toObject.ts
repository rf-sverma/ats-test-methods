//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const toObject = (
  excludeDisabled, caseSensitive
) => {
  const currentEnv = JSON.parse(localStorage.getItem('envId'));
  let result = {};
  for (const [key, value] of Object.entries(currentEnv.variables)) {
      if (excludeDisabled && value.disabled) continue;
      if (caseSensitive) result[key] = value.value;
      else result[key.toLowerCase()] = value.value;
  }
  return result;
};
