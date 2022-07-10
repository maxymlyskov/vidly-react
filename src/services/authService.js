import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

async function login(email, password) {
  const { data: jwt } = await httpService.post(`${config.apiEndpoint}/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
function getToken() {
  return localStorage.getItem(tokenKey);
}
httpService.setJwt(getToken());

export default {
  logout,
  login,
  getCurrentUser,
  loginWithJwt,
  getToken,
};
