import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const getLocalToken = () =>
  JSON.parse(localStorage.getItem("authorization"));

export const setLocalToken = (data) =>
  localStorage.setItem("authorization", JSON.stringify(data));
