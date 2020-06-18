import { RootState } from "types";

export const getLoading = (state: RootState) => state.statuses.pendingRequest;
export const getShowMessage = (state: RootState) => state.statuses.showMessage;
export const getIsError = (state: RootState) => state.statuses.isError;
export const getMessage = (state: RootState) => state.statuses.messageInfo;
export const getUser = (state: RootState) => state.statuses.user;
