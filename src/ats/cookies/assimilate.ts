//@ts-nocheck
import axiosInstance from "../axiosInstance.js";
// assimilate: Assimilates a source of cookies data.
export const assimilate = (source, prune) => {
  console.log("assimilate init");
  // Add your implementation here
  let cookies = axios.get("/cookies");
  if (Array.isArray(source)) {
    cookies.data = prune ? source : cookies.data.concat(source);
  } else if (source === "PropertyList") {
    // Assuming PropertyList is a predefined list of cookies
    cookies.data = prune ? PropertyList : cookies.data.concat(PropertyList);
  }
};
