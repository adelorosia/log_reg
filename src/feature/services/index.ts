import axios from "axios";
import { TUser } from "../interface";

const SERVER_URL = "http://localhost:3003/api";

export const registerUser = (user: TUser) => {
  const url = `${SERVER_URL}/users/register`;
  return axios.post(url, user);
};

export const loginUser = (user: TUser) => {
  const url = `${SERVER_URL}/users/login`;
  return axios.post(url, user);
};

export const logoutUser = () => {
  const url = `${SERVER_URL}/users/logout`;
  return axios.delete(url);
};
