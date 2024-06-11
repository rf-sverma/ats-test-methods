export const remove = () => {
    // Add your implementation here
    // the cookie data has to get from the environment or the axios call then iterate over it
    environment.cookies.data = environment.cookies.data.filter(item => !predicate.call(context, item));
    // make axios call to remove the cookies that match the given predicate
    // axios.delete('/cookies', { data: { predicate } });
};
