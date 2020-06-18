import * as actions from "action/statuses";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionTypesStatuses = ReturnType<InferValueTypes<typeof actions>>;

export type showMessageActionType = ReturnType<typeof actions.showMessage>;
export type signInSuccessActionType = ReturnType<typeof actions.signInSuccess>;
