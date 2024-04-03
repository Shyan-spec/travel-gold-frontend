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

    if (!res.ok) {
      // This checks if the response status code is not in the 2xx success range
      const errorBody = await res.json(); // Assuming the server sends back a JSON with the error message
      throw new Error(errorBody.err || 'Something went wrong, please try again.');
    }

    const json = await res.json();
    if (json.token) {
      tokenService.setToken(json.token);
      return json.token;
    } else {
      throw new Error('No token received, please try again.');
    }
  } catch (err) {
    console.error('Signup error:', err.message);
    throw err; // Or you can handle it differently, maybe return a specific error message
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
