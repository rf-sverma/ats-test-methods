//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const meta = (
  options: { withRoot?: boolean; }, iterator: (...params: any[]) => any
) => {
  const currentEnv = JSON.parse(localStorage.getItem('envId'));
  return {
      id: currentEnv.id,
      name: currentEnv.name,
      createdAt: currentEnv.createdAt,
      updatedAt: currentEnv.updatedAt
  };
};
