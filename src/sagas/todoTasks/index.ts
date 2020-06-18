import { put, takeEvery, call, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import { QueryParams, ITask } from "types";
import { callApi } from "utils";
import {
  LOAD_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TASKS_PATH,
  TASK_PATH,
  CHANGE_STATUS_TASK,
  EDIT_TASK_VALUE,
  CHANGE_TASKS_STATUSES,
  DELETE_COMPLETED_TASKS,
  ALL,
  CHANGE_FILTER,
} from "constant";

import {
  loadingStart,
  showMessage,
  loadingEnd,
  loadingTasksSuccess,
} from "action";

type onLoadingTasksParams = {
  type: string;
  offset: string | number;
  limit: string;
  redirect?: boolean | undefined;
  filter?: string | undefined;
};

function* onLoadingTasks(action: onLoadingTasksParams) {
  try {
    yield put(loadingStart());
    const { limit, offset, filter, redirect } = action;
    const status = `&status=${
      filter === ALL || filter === undefined ? "" : filter
    }`;

    const queryParams: string = `?page=${offset}&limit=${limit}`;

    const allPath = TASKS_PATH + queryParams + status;

    const payload = yield call(callApi, allPath);

    yield all([put(loadingEnd()), put(loadingTasksSuccess(payload))]);
    if (redirect) {
      yield put(push(queryParams));
    }
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err, true))]);
  }
}

export function* watchLoadTasks() {
  yield takeEvery([LOAD_TASKS, CHANGE_FILTER], onLoadingTasks);
}

interface OnAddTaskParams extends QueryParams {
  type: string;
  task: { value: string; status?: string };
}

function* onAddTask(action: OnAddTaskParams) {
  try {
    yield put(loadingStart());

    yield call(callApi, TASK_PATH, {
      method: "post",
      body: action.task,
    });

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err, true))]);
  }
}

export function* watchAddTask() {
  yield takeEvery(ADD_TASK, onAddTask);
}

interface onDeleteTaskParams extends QueryParams {
  type: string;
  task: ITask;
}

function* onDeleteTask(action: onDeleteTaskParams) {
  try {
    yield put(loadingStart());
    yield call(callApi, TASK_PATH, {
      method: "delete",
      body: action.task,
    });

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err, true))]);
  }
}

export function* watchDeleteTask() {
  yield takeEvery(DELETE_TASK, onDeleteTask);
}

interface onChangeTaskParams extends QueryParams {
  type: string;
  task: ITask;
}

function* onChangeTask(action: onChangeTaskParams) {
  try {
    yield put(loadingStart());
    yield call(callApi, TASK_PATH, {
      method: "put",
      body: action.task,
    });

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err, true))]);
  }
}

export function* watchChangeTask() {
  yield takeEvery([CHANGE_STATUS_TASK, EDIT_TASK_VALUE], onChangeTask);
}

interface onChangeVisibleTaskStatusesParams extends QueryParams {
  type: string;
  status: string;
  ids: string[];
}

function* onChangeVisibleTaskStatuses(
  action: onChangeVisibleTaskStatusesParams
) {
  try {
    yield put(loadingStart());
    const { ids, status } = action;
    yield call(callApi, TASKS_PATH, {
      method: "put",
      body: { status, ids },
    });

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err, true))]);
  }
}

export function* watchChangeVisibleTaskStatuses() {
  yield takeEvery(CHANGE_TASKS_STATUSES, onChangeVisibleTaskStatuses);
}

interface onDeleteCompletedTasksParams extends QueryParams {
  type: string;
  ids: string[];
}

function* onDeleteCompletedTasks(action: onDeleteCompletedTasksParams) {
  try {
    yield put(loadingStart());

    yield call(callApi, TASKS_PATH, {
      method: "delete",
      body: action.ids,
    });

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([put(loadingEnd()), put(showMessage(err, true))]);
  }
}

export function* watchDeleteCompletedTasks() {
  yield takeEvery(DELETE_COMPLETED_TASKS, onDeleteCompletedTasks);
}