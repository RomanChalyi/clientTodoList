import { StateStatuses, showMessageActionType } from "types";

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
  return { ...state, messages: [...state.messages, action.message] };
};

export const onHideMessage = (state: StateStatuses, action: any) => {
  const messages = state.messages.filter((message) => message.id !== action.id);
  return {
    ...state,
    messages,
  };
};

export const onSignInSuccess = (state: StateStatuses, action: any) => {
  const { accessToken, refreshToken, user } = action;

  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);

  return { ...state, user };
};

export const onLoadUserDataSuccess = (state: StateStatuses, action: any) => {
  const { login, id } = action.payload;
  return { ...state, user: { login, id } };
};

export const onLogoutSuccess = (state: StateStatuses) => {
  return { ...state, user: {} };
};
