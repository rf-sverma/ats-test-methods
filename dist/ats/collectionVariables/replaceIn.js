export const replaceIn = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => currentEnv.collectionVariables[key] || '');
};
