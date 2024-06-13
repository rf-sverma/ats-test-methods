//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const toJson = () => {
  const currentEnv = JSON.parse(localStorage.getItem('envId'));
  return JSON.stringify(currentEnv);
};
