import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

const register = (username, password, passwordConfirm) => {
  return axios.post(API_URL + "auth/register", {
    username,
    password,
    passwordConfirm,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
