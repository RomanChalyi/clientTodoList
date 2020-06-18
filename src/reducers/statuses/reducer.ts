import {
  StateStatuses,
  showMessageActionType,
  signInSuccessActionType,
} from "types";

export const onLoadingStart = (state: StateStatuses) => {
  return { ...state, pendingRequest: state.pendingRequest + 1 };
};

export const onLoadingEnd = (state: StateStatuses) => {
  const pendingRequest =
    state.pendingRequest === 0 ? 0 : state.pendingRequest - 1;
  return { ...state, pendingRequest };
};

export const onShowMessage = (
  state: StateStatuses,
  action: showMessageActionType
) => {
  const { isError, message } = action;
  return {
    ...state,
    showMessage: true,
    isError: isError,
    messageInfo: message.toString(),
  };
};

export const onHideMessage = (state: StateStatuses) => ({
  ...state,
  showMessage: false,
  isError: false,
  messageInfo: "",
});

export const onSignInSuccess = (state: StateStatuses, action: any) => {
  const { accessToken, login, refreshToken, exp, id } = action;

  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
  window.localStorage.setItem("exp", exp);
  return { ...state, user: { login, id } };
};
