import { StateTodoTasks, loadingTasksSuccessActionType } from "types";

export const onLoadingTasksSuccess = (
  state: StateTodoTasks,
  action: loadingTasksSuccessActionType
) => {
  const { tasks, totalElements, offset, limit, filter } = action.payload;
  if (filter) {
    localStorage.setItem("filter", filter);
  }

  return {
    ...state,
    tasks,
    totalElements,
    offset,
    limit,
    filter: localStorage.getItem("filter"),
  };
};
