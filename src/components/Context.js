import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const setLoacalNickname = (data) =>
  localStorage.setItem("nickname", JSON.stringify(data));

export const getLocalNickname = () =>
  JSON.parse(localStorage.getItem("nickname"));

export const getLocalToken = () => JSON.parse(localStorage.getItem("token"));

export const setLocalToken = (data) =>
  localStorage.setItem("token", JSON.stringify(data));
