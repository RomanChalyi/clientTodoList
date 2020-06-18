import * as actions from "action/todoTasks";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionTypesTodoTasks = ReturnType<InferValueTypes<typeof actions>>;

export type changeFilterActionType = ReturnType<typeof actions.changeFilter>;

export type loadingTasksSuccessActionType = ReturnType<
  typeof actions.loadingTasksSuccess
>;
