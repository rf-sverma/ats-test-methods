//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const toString = () => {
  console.log("toString init");
  // Add your implementation here
  // make axios call to get all cookies
  // let cookies = axios.get('/cookies');
  // return JSON.stringify(cookies);

  // else return the cookies data array as a JSON string
  return JSON.stringify(environment.cookies.data);
};
