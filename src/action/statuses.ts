import { v4 as uuidv4 } from "uuid";
import {
  LOADING_START,
  LOADING_END,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGN_UP,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  LOAD_USER_DATA,
  LOAD_USER_DATA_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
} from "constant";
type userData = {
  password: string;
  login: string;
};

export const loadingStart = () => ({ type: LOADING_START });

export const loadingEnd = () => ({ type: LOADING_END });

export const signUp = (formData: userData) => {
  return { type: SIGN_UP, payload: { ...formData } };
};

export const signIn = (formData: userData) => {
  return { type: SIGN_IN, payload: { ...formData } };
};

export const signInSuccess = (payload: any) => {
  return {
    type: SIGN_IN_SUCCESS,
    ...payload,
  };
};

export const showMessage = ({
  text,
  isError = true,
}: {
  text: string;
  isError?: boolean;
}) => ({
  type: SHOW_MESSAGE,
  message: { text, isError, id: uuidv4() },
});
export const hideMessage = (id: string) => ({ type: HIDE_MESSAGE, id });

export const loadUserData = () => ({ type: LOAD_USER_DATA });

export const logout = () => ({ type: LOGOUT });

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const loadUserDataSuccess = (payload: { login: string }) => ({
  type: LOAD_USER_DATA_SUCCESS,
  payload,
});
