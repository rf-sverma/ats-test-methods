import axiosInstance from "../axiosInstance";

export const insert = () => {
  // Add your implementation here
  let cookies = axios.get("/cookies");
  const index = cookies.data.indexOf(before);
  if (index !== -1) {
    cookies.data.splice(index, 0, item);
  } else {
    cookies.data.push(item);
  }
  // make axios call to insert the cookie before another cookie
};
