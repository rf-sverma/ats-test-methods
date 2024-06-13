//@ts-nocheck
import axiosInstance from "../axiosInstance";
// Checks if a variable exists by key
export const has = (key) => {
  console.log("has init");
  // Add your implementation here
  const currentEnv = JSON.parse(localStorage.getItem("envId"));
  return key in currentEnv.variables;
};
