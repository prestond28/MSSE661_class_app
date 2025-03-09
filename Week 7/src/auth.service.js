import { BASE_API_URL } from "./api.config";
import { _post } from "./service-helpers";
import { clearStorage } from "./simple-storage";

export const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:3000/api/auth
export const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user

export const register = (formData) => _post(`${AUTH_API}/register`, formData);

export const login = (formData) => _post(`${AUTH_API}/login`, formData);

export const logout = () => {
  clearStorage('isAuth');
  clearStorage('access_token');
  clearStorage('refresh_token');
};
