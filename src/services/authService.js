import * as tokenService from "./tokenService.js";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

function getUser() {
  return tokenService.getUserFromToken();
}

async function signup(user) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (json.token) {
      tokenService.setToken(json.token);
      return json.token;
    }
    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function login(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const json = await res.json();

  if (json.token) {
    tokenService.setToken(json.token);
  }

  if (json.err) {
    throw new Error(json.err);
  }
}

function logout() {
  tokenService.removeToken();
}

export { signup, getUser, logout, login };
