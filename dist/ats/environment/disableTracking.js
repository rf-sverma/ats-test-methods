export const disableTracking = () => {
    // Add your implementation here
    const currentEnv = localStorage.getItem('envId');
    const trackingSystem = {
        isTracking: currentEnv === 'tracking' ? true : false,
        stop: function () {
            this.isTracking = false;
            // make axios call to stop tracking
        }
    };
    if (trackingSystem.isTracking)
        trackingSystem.stop();
    else
        console.log("Tracking is already disabled");
};
