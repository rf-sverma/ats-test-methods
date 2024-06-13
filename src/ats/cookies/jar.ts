//@ts-nocheck
import axiosInstance from "../axiosInstance.js";

export const jar = () => {
  console.log("jar init");
  // Add your implementation here
  // let cookies = axios.get('/cookies'); //make axios call to get all cookies
  // return cookies;

  // else return environment.cookies.data; which is an array of cookies in local storage of the browser
  return environment.cookies.data;
};
