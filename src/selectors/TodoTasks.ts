import { createSelector } from "reselect";
import { ITask, RootState } from "types";
import { ALL, DONE } from "constant";

export const getTasks = (state: RootState) => state.todoTasks.tasks;
export const getFilter = (state: RootState) => state.todoTasks.filter;
export const getOffset = (state: RootState) => state.todoTasks.offset;
export const getLimit = (state: RootState) => state.todoTasks.limit;
export const getTotalElement = (state: RootState) =>
  state.todoTasks.totalElements;

export const getVisiblyTasks = createSelector(
  getTasks,
  getFilter,
  (tasks: ITask[], filter: string) =>
    filter === ALL
      ? tasks
      : tasks.filter((task: ITask) => task.status === filter)
);

export const getChecked = createSelector(
  getTasks,
  (tasks: ITask[]) =>
    tasks.every((task: ITask) => task.status === DONE) && tasks.length !== 0
);
