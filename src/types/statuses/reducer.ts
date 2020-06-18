export interface StateStatuses {
  pendingRequest: number;
  showMessage: boolean;
  isError: boolean;
  messageInfo: string;
  user: { login: string; id: string };
}
