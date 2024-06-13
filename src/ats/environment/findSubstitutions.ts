//@ts-nocheck
import axiosInstance from "../axiosInstance.js";
//         this will find out if there is a variable in the parent environment that matches the given property and return it
       
export const findSubstitutions = (
  property: string,
  customizer?: (...params: any[]) => any
) => {
  const currentEnv = localStorage.getItem("envId");
  const resolveValue = (value, vars) => {
    if (
      typeof value === "string" &&
      value.startsWith("{{") &&
      value.endsWith("}}")
    ) {
      const key = value.slice(2, -2);
      // call axios to get the value of the key or use it from the variables if available
      return vars[key] ? resolveValue(vars[key], vars) : value;
    }
    return value;
  };

  const substitutions = {};
  for (const key in currentEnv.variables) {
    substitutions[key] = resolveValue(
      currentEnv.variables[key],
      currentEnv.variables
    );
  }
  return substitutions;
};
