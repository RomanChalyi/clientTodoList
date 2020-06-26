import { RootState } from "types";

export const getLoading = (state: RootState) => state.statuses.pendingRequest;
export const getMessages = (state: RootState) => state.statuses.messages;
export const getUser = (state: RootState) => state.statuses.user;
