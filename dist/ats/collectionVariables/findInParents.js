export const findInParents = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    let parent = currentEnv.parent;
    while (parent) {
        if (customizer(parent[property])) {
            return parent[property];
        }
        parent = parent.parent;
    }
    return null;
};
