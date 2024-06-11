import axiosInstance from "../axiosInstance";

export const insertAfter = () => {
  // Add your implementation here
  let cookies = axios.get("/cookies");
  const index = cookies.data.indexOf(after);
  if (index !== -1) {
    cookies.data.splice(index + 1, 0, item);
  } else {
    cookies.data.push(item);
  }
  // make axios call to insert the cookie after another cookie
};
