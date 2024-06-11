export const clear = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.collectionVariables = {};
    localStorage.setItem('envId', JSON.stringify(currentEnv));
};
