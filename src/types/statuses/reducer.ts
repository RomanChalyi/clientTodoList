import { isError } from "util";

import { IMessage } from "./IMessage";

export interface StateStatuses {
  pendingRequest: number;
  messages: IMessage[];
  user: { login: string; id: string } | {};
}
