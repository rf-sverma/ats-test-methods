export const forEachParent = () => {
    // Add your implementation here
    const currentEnv = JSON.parse(localStorage.getItem('envId'));
    let parent = currentEnv.parent;
    if (options.withRoot) {
        iterator(currentEnv);
    }
    while (parent) {
        iterator(parent);
        parent = parent.parent;
    }
};
