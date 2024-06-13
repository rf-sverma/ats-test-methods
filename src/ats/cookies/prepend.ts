//@ts-nocheck
import axiosInstance from "../axiosInstance.js";
// prepend: Adds a cookie to the beginning of the cookies data array.
export const prepend = (item) => {
  console.log("prepend init");
  // Add your implementation here
  let cookies = axios.get("/cookies");
  cookies.data.unshift(item);
  // make axios call to add the cookie to the cookies data array
};
