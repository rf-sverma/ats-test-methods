
import axiosInstance from '../axiosInstance';

export const eachParent = () => {
    // Add your implementation here
    // Assuming eachParent is supposed to iterate over parent cookies
    const parents = environment.cookies.data.filter(item => item.parent);
    parents.forEach((item, index) => iterator.call(context, item, index));
};
