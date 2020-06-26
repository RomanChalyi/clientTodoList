import {
  ADD_TASK,
  CHANGE_FILTER,
  CHANGE_TASKS_STATUSES,
  DELETE_TASK,
  DELETE_COMPLETED_TASKS,
  CHANGE_STATUS_TASK,
  EDIT_TASK_VALUE,
  LOAD_TASKS,
  LOADING_TASKS_SUCCESS,
  UPDATE_TASKS,
} from "constant";
import { ITask, QueryParams } from "types";

interface LoadTasksParams extends QueryParams {
  redirect?: boolean;
  filter?: string;
}

export const loadTasks = ({
  offset,
  limit,
  redirect,
  filter,
}: LoadTasksParams) => {
  return { type: LOAD_TASKS, offset, limit, redirect, filter };
};

export const updateTasks = ({
  offset,
  limit,
  redirect,
  filter,
}: LoadTasksParams) => ({
  type: UPDATE_TASKS,
  offset,
  limit,
  redirect,
  filter,
});

interface LoadingTasksSuccessParams extends QueryParams {
  tasks: ITask[];
  totalElements: number;
  filter: string;
}

export const loadingTasksSuccess = (payload: LoadingTasksSuccessParams) => {
  return { type: LOADING_TASKS_SUCCESS, payload };
};

interface AddTaskParams extends QueryParams {
  value: string;
  status?: string;
  filter?: string;
}

export const addTask = ({
  value,
  status,
  limit,
  offset,
  filter,
}: AddTaskParams) => {
  return {
    type: ADD_TASK,
    task: { value, status },
    limit,
    offset,
    filter,
  };
};
interface deleteTaskParams extends QueryParams {
  task: ITask;
  filter?: string;
  redirect?: boolean;
}

export const deleteTask = ({
  task,
  limit,
  offset,
  filter,
  redirect,
}: deleteTaskParams) => ({
  type: DELETE_TASK,
  task,
  limit,
  offset,
  filter,
  redirect,
});
interface ChangeFilterParams extends QueryParams {
  filter: string;
  redirect: boolean;
}

export const changeFilter = ({
  filter,
  offset,
  limit,
  redirect,
}: ChangeFilterParams) => ({
  type: CHANGE_FILTER,
  filter,
  offset,
  limit,
  redirect,
});

interface ChangeVisibleTaskStatusesParams extends QueryParams {
  status: string;
  ids: string[];
  filter?: string;
  redirect: boolean;
}

export const changeTasksStatuses = ({
  status,
  limit,
  offset,
  ids,
  filter,
  redirect,
}: ChangeVisibleTaskStatusesParams) => ({
  type: CHANGE_TASKS_STATUSES,
  status,
  limit,
  offset,
  ids,
  redirect,
  filter,
});

interface ChangeStatusTaskParams extends QueryParams {
  task: ITask;
  redirect?: boolean;
  filter?: string;
}

export const changeStatusTask = ({
  task,
  limit,
  offset,
  redirect,
  filter,
}: ChangeStatusTaskParams) => ({
  type: CHANGE_STATUS_TASK,
  task,
  limit,
  offset,
  redirect,
  filter,
});

interface DeleteCompletedTasksParams extends QueryParams {
  ids: string[];
  redirect?: boolean;
  filter?: string;
}

export const deleteCompletedTasks = ({
  ids,
  offset,
  limit,
  redirect,
  filter,
}: DeleteCompletedTasksParams) => ({
  type: DELETE_COMPLETED_TASKS,
  ids,
  offset,
  limit,
  redirect,
  filter,
});

interface EditTaskValueParams extends QueryParams {
  task: ITask;
  filter: string;
}

export const editTaskValue = ({
  task,
  limit,
  offset,
  filter,
}: EditTaskValueParams) => ({
  type: EDIT_TASK_VALUE,
  task,
  limit,
  offset,
  filter,
});
