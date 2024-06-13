
//@ts-nocheck
import axiosInstance from '../axiosInstance';

export const reduce = (iterator, accumulator, context) => {
    console.log('reduce init')
    // Add your implementation here
    let data = environment.cookies.data.reduce((acc, item, index) => iterator.call(context, acc, item, index), accumulator);
    // make api call to add the data to the cookies
};
