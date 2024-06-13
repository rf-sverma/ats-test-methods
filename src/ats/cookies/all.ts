//@ts-nocheck
import axiosInstance from "../axiosInstance.js";
 // all: Returns all cookies.
export const all = () => {
  console.log("all init");
  // Add your implementation here
  let cookies = axiosInstance.get('/cookies'); //make axios call to get all cookies
  return cookies;

  // else return environment.cookies.data; which is an array of cookies in local storage of the browser
  // return environment.cookies.data;
};
