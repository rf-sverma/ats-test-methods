import axiosInstance from "../axiosInstance";

export const enableTracking = (options?: "MutationTracker.definition") => {
  // Add your implementation here
  const currentEnv = localStorage.getItem("envId");
  const trackingSystem = {
    isTracking: currentEnv === "tracking" ? true : false,
    start: function () {
      this.isTracking = false;
      // make axios call to start tracking
    },
  };
  if (trackingSystem.isTracking) trackingSystem.start();
  else console.log("Tracking is already enabled");
};
