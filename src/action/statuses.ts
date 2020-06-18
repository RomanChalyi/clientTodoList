import {
  LOADING_START,
  LOADING_END,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGN_UP,
  SIGN_IN,
  SIGN_IN_SUCCESS,
} from "constant";
type userData = {
  password: string;
  login: string;
};

export const loadingStart = () => ({ type: LOADING_START });

export const loadingEnd = () => ({ type: LOADING_END });

export const showMessage = (message: string, isError: boolean = false) => ({
  type: SHOW_MESSAGE,
  message,
  isError,
});

export const signUp = (formData: userData) => {
  return { type: SIGN_UP, payload: { ...formData } };
};

export const signIn = (formData: userData) => {
  return { type: SIGN_IN, payload: { ...formData } };
};

export const signInSuccess = (userToken: any) => ({
  type: SIGN_IN_SUCCESS,
  ...userToken,
});

export const hideMessage = () => ({ type: HIDE_MESSAGE });
