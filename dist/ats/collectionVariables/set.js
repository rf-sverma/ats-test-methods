export const set = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    currentEnv.collectionVariables[key] = value;
    localStorage.setItem('envId', JSON.stringify(currentEnv));
    // make a call to update the env data by axios
    // axios.post(`/environment/${currentEnv.id}/variables`, { key, value, type });
};