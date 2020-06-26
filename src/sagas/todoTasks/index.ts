import { put, takeEvery, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import { QueryParams, ITask } from "types";
import {
  LOAD_TASKS,
  UPDATE_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TASKS_PATH,
  TASK_PATH,
  CHANGE_STATUS_TASK,
  EDIT_TASK_VALUE,
  CHANGE_TASKS_STATUSES,
  DELETE_COMPLETED_TASKS,
  CHANGE_FILTER,
} from "constant";
import {
  loadingStart,
  showMessage,
  loadingEnd,
  loadingTasksSuccess,
} from "action";
import { watchResponse } from "sagas/authorization";
import { socket } from "App";

type onLoadingTasksParams = {
  type: string;
  offset: string | number;
  limit: string;
  redirect?: boolean;
  filter?: string;
};

function* onLoadingTasks(action: onLoadingTasksParams) {
  try {
    yield put(loadingStart());
    const { limit, offset, filter, redirect } = action;
    const status = `&status=${filter}`;
    const queryParams: string = `?page=${offset}&limit=${limit}`;
    const allPath = TASKS_PATH + queryParams + status;
    const payload = yield watchResponse(allPath);

    if (payload) {
      yield all([put(loadingEnd()), put(loadingTasksSuccess(payload))]);
    }
    if (redirect) {
      yield put(push(queryParams));
    }
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: true })),
    ]);
  }
}

export function* watchLoadTasks() {
  yield takeEvery([LOAD_TASKS, CHANGE_FILTER], onLoadingTasks);
}

function* onUpdateTasks(action: onLoadingTasksParams) {
  try {
    const { limit, offset, filter } = action;
    const status = `&status=${filter}`;
    const queryParams: string = `?page=${offset}&limit=${limit}`;
    const allPath = TASKS_PATH + queryParams + status;
    const payload = yield watchResponse(allPath);

    if (payload) {
      yield all([put(loadingTasksSuccess({ ...payload, offset, limit }))]);
    }
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: true })),
    ]);
  }
}

export function* watchUpdateTasks() {
  yield takeEvery(UPDATE_TASKS, onUpdateTasks);
}

interface OnAddTaskParams extends QueryParams {
  type: string;
  task: { value: string; status?: string };
}

function* onAddTask(action: OnAddTaskParams) {
  try {
    yield put(loadingStart());

    yield watchResponse(TASK_PATH, {
      method: "post",
      body: action.task,
    });
    socket.emit("update tasks", localStorage.getItem("accessToken"));

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: false })),
    ]);
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
    yield watchResponse(TASK_PATH, {
      method: "delete",
      body: action.task,
    });
    // socket.emit("update tasks", localStorage.getItem("accessToken"));

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: false })),
    ]);
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
    yield watchResponse(TASK_PATH, {
      method: "put",
      body: action.task,
    });
    // socket.emit("update tasks", localStorage.getItem("accessToken"));

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: false })),
    ]);
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
    yield watchResponse(TASKS_PATH, {
      method: "put",
      body: { status, ids },
    });
    // socket.emit("update tasks", localStorage.getItem("accessToken"));

    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: false })),
    ]);
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

    yield watchResponse(TASKS_PATH, {
      method: "delete",
      body: action.ids,
    });

    // socket.emit("update tasks", localStorage.getItem("accessToken"));
    yield all([put(loadingEnd()), onLoadingTasks(action)]);
  } catch (err) {
    yield all([
      put(loadingEnd()),
      put(showMessage({ text: err.message, isError: false })),
    ]);
  }
}

export function* watchDeleteCompletedTasks() {
  yield takeEvery(DELETE_COMPLETED_TASKS, onDeleteCompletedTasks);
}
