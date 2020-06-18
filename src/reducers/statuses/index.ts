import {
  LOADING_START,
  LOADING_END,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGN_IN_SUCCESS,
} from "constant";
import {
  onLoadingStart,
  onLoadingEnd,
  onShowMessage,
  onHideMessage,
  onSignInSuccess,
} from "./reducer";
import { StateStatuses, ActionTypesStatuses } from "types";

const initialState: StateStatuses = {
  pendingRequest: 0,
  showMessage: false,
  isError: false,
  messageInfo: "",
  user: { login: "", id: "" },
};

export const statuses = (state = initialState, action: ActionTypesStatuses) => {
  switch (action.type) {
    case LOADING_START:
      return onLoadingStart(state);

    case LOADING_END:
      return onLoadingEnd(state);

    case SHOW_MESSAGE:
      return onShowMessage(state, action);

    case HIDE_MESSAGE:
      return onHideMessage(state);

    case SIGN_IN_SUCCESS:
      return onSignInSuccess(state, action);
    default: {
      return state;
    }
  }
};
