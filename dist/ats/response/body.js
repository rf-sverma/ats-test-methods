import ats from "./index.ts";
export const body = () => {
    // Add your implementation here
    ats.test("", () => {
        ats.response.set({ responseTime: "1s" });
    });
};
