import {
  LOADING_START,
  LOADING_END,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGN_IN_SUCCESS,
  LOAD_USER_DATA_SUCCESS,
  LOGOUT_SUCCESS,
} from "constant";
import {
  onLoadingStart,
  onLoadingEnd,
  onShowMessage,
  onHideMessage,
  onSignInSuccess,
  onLoadUserDataSuccess,
  onLogoutSuccess,
} from "./reducer";
import { StateStatuses, ActionTypesStatuses } from "types";

export const initialState = {
  pendingRequest: 0,
  messages: [],
  user: {},
};

export const statuses = (
  state: StateStatuses = initialState,
  action: ActionTypesStatuses
) => {
  switch (action.type) {
    case LOADING_START:
      return onLoadingStart(state);

    case LOADING_END:
      return onLoadingEnd(state);

    case SHOW_MESSAGE:
      return onShowMessage(state, action);

    case HIDE_MESSAGE:
      return onHideMessage(state, action);

    case SIGN_IN_SUCCESS:
      return onSignInSuccess(state, action);

    case LOAD_USER_DATA_SUCCESS:
      return onLoadUserDataSuccess(state, action);

    case LOGOUT_SUCCESS:
      return onLogoutSuccess(state);

    default: {
      return state;
    }
  }
};
