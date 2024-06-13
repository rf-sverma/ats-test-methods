//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const unset = (key) => {
  const currentEnv = JSON.parse(localStorage.getItem("envId"));
  delete currentEnv.variables[key];
  localStorage.setItem("envId", JSON.stringify(currentEnv));
  // make axios call to unset the environment variable by this id :{currentEnv}
  // axios.delete(`/environment/${currentEnv.id}/variables/${key}`);
};
